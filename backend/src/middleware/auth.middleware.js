import asyncHandler from "../utils/asyncHandler.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { verifyAccessToken } from "../utils/jwt.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Authorization header is missing");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Invalid authorization format");
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyAccessToken(token);

  req.user = decoded;

  next();
});

export default authenticate;