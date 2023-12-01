// const fs = require("fs");
// const path = require("path");
// const { validationResult } = require("express-validator");
// const Post = require("../models/post");
// exports.getPosts = (req, res, next) => {
//   Post.find()
//     .then((posts) => {
//       res
//         .status(200)
//         .json({ message: "Fetched Posts Successfully.", posts: posts });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
//   // res.status(200).json({
//   //   posts: [
//   //     {
//   //       _id: "1",
//   //       title: "First Post",
//   //       content: "This is the first post!",
//   //       imageUrl: "../images/duck.jpg",
//   //       creator: { name: "Ikram" },
//   //       createdAt: new Date(),
//   //     },
//   //   ],
//   // });
// };

// exports.createPost = (req, res, next) => {
//   const errors = validationResult(req); // checking validation result.
//   if (!errors.isEmpty()) {
//     // if body is not valid and has errors it will send some error response.

//     const error = new Error("Validation Failed, Entered Data Is Incorrect.");
//     error.statusCode = 422;
//     throw error;
//   }

//   if (!req.file) {
//     const error = new Error("No Image Provided.");
//     error.statusCode = 422;
//     throw error;
//   }

//   const imageUrl = req.file.path.replace("\\", "/");
//   const { title, content } = req.body;
//   const post = new Post({
//     title,
//     content,
//     imageUrl: imageUrl,
//     creator: { name: "ikram" },
//   });
//   post
//     .save()
//     .then((result) => {
//       console.log(result);
//       res.status(201).json({
//         // response 201 that's mean in this post is created without any error
//         message: "Post Created Successfully.",
//         post: result,
//       });
//     })
//     .catch((e) => {
//       if (!e.statusCode) {
//         e.statusCode = 500;
//       }
//       next(e);
//     });
// };

// exports.getPost = (req, res, next) => {
//   const postId = req.params.postId;
//   Post.findById(postId)
//     .then((post) => {
//       if (!post) {
//         const error = new Error("Could Not Found Post");
//         error.statusCode = 404;
//         throw error;
//       }
//       res.status(200).json({ message: "Post Fetched", post: post });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// exports.updatePost = (req, res, next) => {
//   const postId = req.params.postId;

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error("Validation Failed, Entered data is incorrect.");
//     error.statusCode = 422;
//     throw error;
//   }

//   const title = req.body.title;
//   const content = req.body.content;
//   const imageUrl = req.body.image;

//   if (req.file) {
//     req.file.path.replace("\\", "/");
//   }

//   if (!imageUrl) {
//     const error = new Error("No file picked.");
//     error.statusCode = 422;
//     throw error;
//   }

//   Post.findById(postId)
//     .then((post) => {
//       if (!post) {
//         const error = new Error("could not find post.");
//         error.statusCode = 404;
//         throw error;
//       }

//       if (imageUrl !== post.imageUrl) {
//         clearImage(post.imageUrl);
//       }

//       post.title = title;
//       post.imageUrl = imageUrl;
//       post.content = content;
//       return post.save();
//     })
//     .then((result) => {
//       res.status(200).json({ message: "post updated", post: result });
//       // .json({ message: "post updated", post: result, isError: "NO" });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// const clearImage = (filePath) => {
//   filePath = path.join(__dirname, "..", filePath);
//   fs.unlink(filePath, (err) => console.log(err));
// };


const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res
        .status(200)
        .json({ message: 'Fetched posts successfully.', posts: posts });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }
  const imageUrl =  req.file.path.replace("\\", "/");
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: { name: 'Maximilian' }
  });
  post
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Post fetched.', post: post });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl =  req.file.path.replace("\\", "/");
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Post updated!', post: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
