const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const app = express();

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
   // Extracting the file extension and appending it to the uuid
   const ext = path.extname(file.originalname);
   cb(null, uuidv4() + ext);
  },
});

const fileFilter = (req,file, cb) =>{
  if(
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' 
  ){
    cb(null, true)
  }else{
    cb(null, false)
  }
}

app.use(bodyParser.json()); // for json body

app.use(multer({storage : fileStorage, fileFilter: fileFilter}).single('image'))

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
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
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
