import asyncHandler from "../utils/asyncHandler.js";
import authService from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {

    const user = await authService.register(req.body);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user
    });

});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);


  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);

  return res.status(200).json({
    success: true,
    message: "Current user retrieved successfully",
    data: user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user.id, req.body);

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.user.id, req.body);

  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});