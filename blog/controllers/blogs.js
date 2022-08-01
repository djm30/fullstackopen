const express = require("express");
const Blog = require("../models/blog");

const router = express.Router();

router.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

router.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  await blog.save();
  response.status(201).json(blog);
});

router.put("/:id", async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  response.json(blog);
});

router.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = router;
