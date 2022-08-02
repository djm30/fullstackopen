const { ENV } = require("./config");

const info = (...args) => {
  if (ENV !== "test") console.log(`[INFO]`, ...args);
};
const error = (...args) => {
  if (ENV !== "test") console.log(`[ERROR]`, ...args);
};
const debug = (...args) => {
  if (ENV !== "test") console.log(`[DEBUG]`, ...args);
};

module.exports = { info, error, debug };
