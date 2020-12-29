const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(5000, console.log("Listening on port 5000"));
