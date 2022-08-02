require("dotenv").config();

const ENV = process.env.NODE_ENV;
const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.MONGO_URI;
const PORT = process.env.PORT;

module.exports = { MONGO_URI, PORT, ENV };
