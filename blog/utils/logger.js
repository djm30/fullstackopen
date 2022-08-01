const info = (...args) => {
  console.log(`[INFO]`, ...args);
};
const error = (...args) => {
  console.log(`[ERROR]`, ...args);
};
const debug = (...args) => {
  console.log(`[DEBUG]`, ...args);
};

module.exports = { info, error, debug };
