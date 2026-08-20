import logger from "../config/logger.js";
import multer from "multer";

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Image must be 2MB or smaller."
        : "Could not upload that file.";

    return res.status(400).json({
      success: false,
      statusCode: 400,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    timestamp: new Date().toISOString(),
  });
};

export default errorHandler;
