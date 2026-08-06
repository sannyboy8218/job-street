import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";
import logger from "./config/logger.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
   logger.info(`Server running on port ${PORT}`);
  });
};

startServer();