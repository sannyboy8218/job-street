import bcrypt from "bcryptjs";
import userRepository from "../repositories/user.repository.js";
import ConflictError from "../errors/ConflictError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";
import { generateAccessToken } from "../utils/jwt.js";
import { serializeUser } from "../utils/serializeUser.js";

const register = async (userData) => {
  const existingUser = await userRepository.findByEmail(userData.email);

  if (existingUser) {
    throw new ConflictError("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await userRepository.create({
    ...userData,
    password: hashedPassword,
  });

  return serializeUser(newUser);
};

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const token = generateAccessToken(user);

  return {
    token,
    user: serializeUser(user),
  };
};

const getCurrentUser = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return serializeUser(user);
};

const updateProfile = async (userId, profileData) => {
  const user = await userRepository.updateById(userId, profileData);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return serializeUser(user);
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await userRepository.findByIdWithPassword(userId);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  const isCurrentValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentValid) {
    throw new BadRequestError("Current password is incorrect.");
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.password);

  if (isSamePassword) {
    throw new BadRequestError(
      "New password must be different from the current password."
    );
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};

const updateAvatar = async (userId, file) => {
  if (!file) {
    throw new BadRequestError("Please choose a photo to upload.");
  }

  const user = await userRepository.findByIdWithAvatar(userId);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  user.avatarData = file.buffer;
  user.avatarContentType = file.mimetype;
  await user.save();

  return serializeUser(user);
};

const getUserAvatar = async (userId) => {
  const user = await userRepository.findByIdWithAvatar(userId);

  if (!user || !user.avatarData || !user.avatarContentType) {
    throw new NotFoundError("Profile photo not found.");
  }

  return {
    data: user.avatarData,
    contentType: user.avatarContentType,
  };
};

export default {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
  updateAvatar,
  getUserAvatar,
};
