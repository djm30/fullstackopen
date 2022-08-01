const app = require("./app");
const mongoose = require("mongoose");
const { MONGO_URI, PORT } = require("./utils/config");
const logger = require("./utils/logger");

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
