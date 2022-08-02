const express = require("express");
const middleware = require("./utils/middleware");
require("express-async-errors");
const mongoose = require("mongoose");
const cors = require("cors");

const { MONGO_URI } = require("./utils/config");
const logger = require("./utils/logger");

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

const blogRouter = require("./controllers/blogs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
