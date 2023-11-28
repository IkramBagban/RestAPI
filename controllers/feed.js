const { validationResult } = require("express-validator");
const Post = require("../models/post");
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "../images/duck.jpg",
        creator: { name: "Ikram" },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req); // checking validation result.
  if (!errors.isEmpty()) {
    // if body is not valid and has errors it will send some error response.
    return res.status(422).json({
      message: "Validation Failed, Entered Data Is Incorrect.",
      errors: errors.array(),
    });
  }
  const { title, content } = req.body;
  const post = new Post({
    title,
    content,
    imageUrl: "images/duck.jpg",
    creator: { name: "ikram" },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        // response 201 that's mean in this post is created without any error
        message: "Post Created Successfully.",
        post: result,
      });
    })
    .catch((e) => console.log(e));
};
