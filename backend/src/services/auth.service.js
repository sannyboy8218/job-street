import bcrypt from "bcryptjs";
import userRepository from "../repositories/user.repository.js";
import ConflictError from "../errors/ConflictError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import BadRequestError from "../errors/BadRequestError.js";
import { generateAccessToken } from "../utils/jwt.js";


const register = async (userData) => {
  // Check if email already exists
  const existingUser = await userRepository.findByEmail(userData.email);

if (existingUser) {
    throw new ConflictError("Email already exists");
}

  // Hash the password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Create a new object with the hashed password
  const userToCreate = {
    ...userData,
    password: hashedPassword,
  };

  // Save the user
  const newUser = await userRepository.create(userToCreate);

  // Remove password before returning the response
  const { password, ...userWithoutPassword } = newUser.toObject();

  return userWithoutPassword;
};
//end register

const login = async ({ email, password }) => {
  // Find user by email
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  // Generate JWT
  const token = generateAccessToken(user);

  // Remove password before returning
  const { password: _, ...userWithoutPassword } = user.toObject();

  return {
    token,
    user: userWithoutPassword,
  };
};

const getCurrentUser = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return user;
};

const updateProfile = async (userId, profileData) => {
  const user = await userRepository.updateById(userId, profileData);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return user;
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

export default {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
};