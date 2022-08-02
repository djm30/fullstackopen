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
  let { title, author, url, likes } = request.body;
  // if (!title || !url) {
  //   return response
  //     .status(400)
  //     .json({ error: "Title and author fields must be defined" });
  // }
  // if (!likes) likes = 0;
  const blog = new Blog({ title, author, url, likes });
  const savedNote = await blog.save();
  response.status(201).json(savedNote);
});

router.put("/:id", async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });
  response.status(200).json(blog);
});

router.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = router;
