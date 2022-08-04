const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET } = require("../utils/config");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token: " + error,
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "unknown endpoint" });
};

const tokenParser = (request, response, next) => {
  const auth = request.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer")) {
    jwt.verify(auth.substring(7), SECRET);
    request.token = jwt.decode(auth.substring(7));
  } else request.token = "";
  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;
  if (token) {
    const user = await User.findById(token.id);
    request.user = user;
  } else request.user = null;
  next();
};

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  requestLogger,
  tokenParser,
  userExtractor,
};
