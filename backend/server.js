if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const listRoutes = require("./routes/listRoutes");
const listEntryRoutes = require("./routes/listEntryRoutes");
const mongoose = require("mongoose");
const db = require("./config/db");
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");
const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();
const { InMemoryMessageStore } = require("./messageStore");
const messageStore = new InMemoryMessageStore();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

db();
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: "*",
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

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
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
  socket.userID = randomId();
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

io.on("connection", (socket) => {
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  // emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // join the "userID" room
  socket.join(socket.userID);
  // fetch existing users
  const users = [];
  const messagesPerUser = {};
  messageStore.findMessagesForUser(socket.userID).forEach((message) => {
    const { from, to } = message;
    //const otherUser = socket.userID === from ? to : from;
    if (messagesPerUser[socket.userID]) {
      messagesPerUser[socket.userID].push(message);
    } else {
      messagesPerUser[socket.userID] = [message];
    }
  });
  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      userID: session.userID,
      username: session.username,
      connected: session.connected,
      messages: messagesPerUser[session.userID] || [],
    });
  });
  console.log("socket id is " + socket.userID);
  console.log("messages for socket " + messagesPerUser[socket.userID]);
  io.emit("users", users);
  /*const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  io.emit("users", users); */

  socket.on("follow", (data) => {
    console.log(data);
    console.log("following");
    let message = {
      to: data.to,
      from: data.from,
      content: `You (${data.followed}) have received a new follower: ${data.follower}`,
    };
    socket.broadcast.to(data.to).emit("new_follower", message.content);
    //console.log(`${follower} is not following ${following}`);
    messageStore.saveMessage(message);
    //console.log(messageStore);
    socket.emit("users", users);
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

server.listen(5000, console.log("Listening on port 5000"));
