import asyncHandler from "../utils/asyncHandler.js";
import * as notificationService from "../services/notification.service.js";

export const getMyNotifications = asyncHandler(async (req, res) => {
  const data = await notificationService.getMyNotifications(req.user.id);

  res.status(200).json({
    success: true,
    data,
  });
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await notificationService.markNotificationRead(
    req.user.id,
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: "Notification marked as read.",
    data: notification,
  });
});

export const markAllNotificationsRead = asyncHandler(async (req, res) => {
  await notificationService.markAllNotificationsRead(req.user.id);

  res.status(200).json({
    success: true,
    message: "All notifications marked as read.",
  });
});
