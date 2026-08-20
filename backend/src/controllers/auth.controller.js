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

export const updateAvatar = asyncHandler(async (req, res) => {
  const user = await authService.updateAvatar(req.user.id, req.file);

  return res.status(200).json({
    success: true,
    message: "Profile photo updated.",
    data: user,
  });
});

export const getUserAvatar = asyncHandler(async (req, res) => {
  const avatar = await authService.getUserAvatar(req.params.id);

  res.set("Content-Type", avatar.contentType);
  res.set("Cache-Control", "public, max-age=3600");
  return res.status(200).send(avatar.data);
});