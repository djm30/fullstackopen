const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

router.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

router.post("/", async (request, response) => {
  let { title, author, url, likes } = request.body;

  const user = request.user;
  if (!user)
    return response.status(401).json({ error: "Please provide a valid token" });

  const blog = new Blog({ title, author, url, likes, user: user.id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

router.put("/:id", async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });
  response.status(200).json(blog);
});

router.delete("/:id", async (request, response) => {
  const blogToRemove = await Blog.findById(request.params.id);

  // const user = request.user;

  // if (user.id.toString() === blogToRemove.user._id.toString()) {
  //   await Blog.findByIdAndRemove(request.params.id);
  //   return response.status(204).end();
  // }
  // return response
  // .status(401)
  // .json({ error: "Not authorized to delete this blog post" });

  await Blog.findByIdAndRemove(request.params.id);
  return response.status(204).end();
});

module.exports = router;
