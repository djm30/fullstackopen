const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");

const router = express.Router();

router.post("/reset", async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  res.status(200).send({ message: "reset!" });
});

module.exports = router;
