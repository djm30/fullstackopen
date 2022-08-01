const express = require("express");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const cors = require("cors");

const blogRouter = require("./controllers/blogs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
