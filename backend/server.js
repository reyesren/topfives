if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Redis = require("ioredis");
const redisClient = new Redis();
const { setupWorker } = require("@socket.io/sticky");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const listRoutes = require("./routes/listRoutes");
const listEntryRoutes = require("./routes/listEntryRoutes");
const mongoose = require("mongoose");
const db = require("./config/db");
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { RedisSessionStore } = require("./sessionStore");
const sessionStore = new RedisSessionStore(redisClient);

const { RedisMessageStore } = require("./messageStore");
const messageStore = new RedisMessageStore(redisClient);

const { RedisFollowerStore } = require("./followersStore");
const followerStore = new RedisFollowerStore(redisClient);

const { notFound, errorHandler } = require("./middleware/errorMiddleware");


db();
const app = express();
const httpServer = http.createServer(app);
/*const io = socketio(server, {
  cors: "*",
});*/
const io = socketio(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  },
  adapter: require("socket.io-redis")({
    pubClient: redisClient,
    subClient: redisClient.duplicate(),
  }),
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

io.use(async (socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = await sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.sessionID = randomId();
  socket.userID = username;
  socket.username = username;
  next();
});

/* io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  console.log(username);
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
}); */

io.on("connection", async (socket) => {
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });
  /*console.log("before");
  console.log(messageStore);
  messageStore.allocateSpaceForUser(socket.userID);
  followerStore.allocateSpaceForUser(socket.userID);
  console.log("after");
  console.log(messageStore);
  console.log('followers store: ', followerStore); */

  // emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // join the "userID" room
  socket.join(socket.userID);
  // fetch existing users
  let users = [];
  let [messagesPerUser, followerData, sessions] = await Promise.all([
    messageStore.findMessagesForUser(socket.userID),
    followerStore.findFollowDataForUser(socket.userID),
    sessionStore.findAllSessions()
  ]); // returns a promise
    sessions.forEach((session) => {
      users.push({
        userID: session.userID,
        username: session.username,
        connected: session.connected,
        messages: messagesPerUser || [],
      });
    });
  socket.emit("all_messages", messagesPerUser);

  // users.push(messageStore); // was causing an exception
  io.emit("users", users);
  console.log(followerData);
  socket.emit("all_follow_data", followerData);

  socket.on("follow", (data) => {
    console.log(data);
    console.log("following");
    let message = {
      to: data.followed,
      from: data.follower,
      content: `${data.follower} is now following you.`, // **** if this message changes, change it in the "unfollow" event too *****
      hasSeen: false,
    };
    socket.broadcast.to(data.to).emit("new_follower", {content: message.content, follower: message.from});
    //console.log(`${follower} is not following ${following}`);
    messageStore.saveMessage(message);
    followerStore.follow(message);
    // users.push(messageStore);
    io.emit("users", users);
  });

  socket.on("unfollow", async (user) => {
    followerStore.unfollow(socket.userID, user);
    let newFollowerData = await followerStore.findFollowDataForUser(socket.userID);
    // Remove message/notification that you've been followed if the person unfollows you.
    await messageStore.removeMessageForUser(user, `${socket.userID} is now following you.`) // **** if you change it here, change it in the "follow" event too ****
    let messagesForUnfollowedUser = await messageStore.findMessagesForUser(user);
    console.log(messagesForUnfollowedUser);
    socket.broadcast.to(user).emit("all_messages", messagesForUnfollowedUser);
    socket.emit("all_follow_data", newFollowerData);
  })

  socket.on("seen_all_messages", async () => {
    const messagesPerUser = await messageStore.seenAllMessages(socket.userID);
    socket.emit("all_messages", messagesPerUser);
  });

  socket.on("updateUserList", (usersList) => {
    users = [...usersList];
  });

  // notify users upon disconnection
  socket.on("disconnect", async () => {
    console.log("user disconnected");

    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userID);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
    }
  });
});

app.use("/api/users", userRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/listEntry", listEntryRoutes);

app.use(notFound);
app.use(errorHandler);

// server.listen(5000, console.log("Listening on port 5000"));
setupWorker(io);
