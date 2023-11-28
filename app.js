const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");
const app = express();

app.use(bodyParser.json()); // for json body

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

// mongoose.connect("mongodb://localhost:27017/messages").then((result) => {
// console.log("Mongoose connectted", result);
// app.listen(8080, () => {
//     console.log("PORT is Listing at ", 8080);
// });
// });

// mongoose.connect("mongodb://localhost:27017/messages")
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
