const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");
const app = express();

app.use(bodyParser.json()); // for json body

app.use("/images", express.static(path.join(__dirname, "images")));
// for cors problem
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow requests from any url/origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  ); // Allow All HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // this allow client to setHeaders
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message  });
});
mongoose
  .connect("mongodb://127.0.0.1:27017/messages")
  .then((result) => {
    console.log("Mongoose connected");
    app.listen(8080, () => {
      console.log("PORT is Listening at", 8080);
    });
  })
  .catch((error) => {
    console.error("Mongoose connection error:", error);
  });
