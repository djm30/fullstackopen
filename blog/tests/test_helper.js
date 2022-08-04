const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    user: "5a422bc61b54a676234d17fa",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    user: "6a422bc61b54a676234d17fa",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    user: "6a422bc61b54a676234d17fa",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    user: "5a422bc61b54a676234d17fa",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    user: "6a422bc61b54a676234d17fb",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    user: "6a422bc61b54a676234d17fb",
    likes: 2,
    __v: 0,
  },
];

const users = [
  {
    _id: "5a422bc61b54a676234d17fd",
    _v: 0,
    username: "dylan30",
    passwordHash:
      "$2b$10$zXQaFdH8RLH6XQZ5bq0YVOKYEddmnjCDjJjiEGR2LKxgMkjJcpVv6",
    name: "Dylan",
  },
  {
    _id: "5a422bc61b54a676234d17fa",
    _v: 0,
    username: "mchan",
    passwordHash:
      "$2b$10$zXQaFdH8RLH6XQZ5bq0YVOKYEddmnjCDjJjiEGR2LKxgMkjJcpVv6",
    name: "Michael Chan",
    notes: ["5a422a851b54a676234d17f7"],
  },
  {
    _id: "6a422bc61b54a676234d17fa",
    _v: 0,
    username: "adike",
    passwordHash:
      "$2b$10$zXQaFdH8RLH6XQZ5bq0YVOKYEddmnjCDjJjiEGR2LKxgMkjJcpVv6",
    name: "Edsger W. Dijkstra",
    notes: ["5a422b891b54a676234d17fa", "5a422b3a1b54a676234d17f9"],
  },
  {
    _id: "6a422bc61b54a676234d17fb",
    _v: 0,
    username: "robo",
    passwordHash:
      "$2b$10$zXQaFdH8RLH6XQZ5bq0YVOKYEddmnjCDjJjiEGR2LKxgMkjJcpVv6",
    name: "Robert C. Martin",
    notes: [
      "5a422aa71b54a676234d17f8",
      "5a422ba71b54a676234d17fb",
      "5a422bc61b54a676234d17fc",
    ],
  },
];

const addBlogsToDb = async () => {
  await Blog.insertMany(blogs);
};

const removeBlogsFromDb = async () => {
  await Blog.deleteMany({});
};

const getBlogs = async () => {
  return Blog.find({});
};

const getBlog = async (id) => {
  const blog = await Blog.findById(id);
  return blog;
};

const addUsersToDb = async () => {
  await User.insertMany(users);
};

const removeUsersFromDb = async () => {
  await User.deleteMany({});
};

const getUsersFromDb = async () => {
  const users = await User.find({});
  return users;
};

const getUserFromDb = async (id) => {
  const user = await User.findById(id);
  return user;
};

const loginAndGetToken = async (api) => {
  const user = {
    username: "djm30",
    password: "password",
    name: "dylan morrison",
  };
  await api.post("/api/users").send(user);
  const response = await api.post("/api/login").send(user);
  return response.body.token;
};

const getUserAndToken = async (api) => {
  const user = {
    username: "djm30",
    password: "password",
    name: "dylan morrison",
  };
  const userResponse = await api.post("/api/users").send(user);
  const response = await api.post("/api/login").send(user);
  return { token: response.body.token, user: userResponse.body };
};

const getValidUserId = () => {
  return users[1]._id;
};

module.exports = {
  addBlogsToDb,
  getBlogs,
  getBlog,
  removeBlogsFromDb,
  addUsersToDb,
  removeUsersFromDb,
  getUserFromDb,
  getUsersFromDb,
  loginAndGetToken,
  getValidUserId,
  getUserAndToken,
};
