const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/all", async (request, response) => {
  const users = await User.find({});
  const resObj = users.map((user) => {
    return {
      id: user.id,
      user: user.name,
      blogs: user.blogs.length,
    };
  });
  response.status(200).json(resObj);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const users = await User.findById(request.params.id).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "Password must be at least 3 characters wrong" });
  }

  if (username && username.length < 3) {
    return response
      .status(400)
      .json({ error: "Username must be at least 3 characters wrong" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
