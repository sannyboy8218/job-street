import Notification from "../models/notification.model.js";
import NotFoundError from "../errors/NotFoundError.js";
import ForbiddenError from "../errors/ForbiddenError.js";
import logger from "../config/logger.js";

export async function createNotification(payload) {
  try {
    return await Notification.create(payload);
  } catch (error) {
    logger.error("Failed to create notification", {
      error: error.message,
      recipient: payload?.recipient,
      type: payload?.type,
    });

    return null;
  }
}

export async function getMyNotifications(recipientId) {
  const [notifications, unreadCount] = await Promise.all([
    Notification.find({ recipient: recipientId })
      .sort({ createdAt: -1 })
      .limit(30),
    Notification.countDocuments({ recipient: recipientId, read: false }),
  ]);

  return { notifications, unreadCount };
}

export async function markNotificationRead(recipientId, notificationId) {
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new NotFoundError("Notification not found.");
  }

  if (notification.recipient.toString() !== String(recipientId)) {
    throw new ForbiddenError("You are not allowed to update this notification.");
  }

  if (!notification.read) {
    notification.read = true;
    await notification.save();
  }

  return notification;
}

export async function markAllNotificationsRead(recipientId) {
  await Notification.updateMany(
    { recipient: recipientId, read: false },
    { $set: { read: true } }
  );
}
