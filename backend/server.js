const express = require("express");

const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

const app = express();

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/users", userRoutes);

app.listen(5000, console.log("Listening on port 5000"));
