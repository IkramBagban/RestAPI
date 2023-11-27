exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "First Post", content: "This is the first post!" }],
  });
};

exports.createPost = (req, res, next) => {
  const { title, content } = req.body;
  res.status(201).json({
    // response 201 that's mean in this post is created without any error
    message: "Post Created Successfully.",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
