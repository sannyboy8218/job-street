import api from "@/services/api";

export const getMyNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data.data;
};

export const markNotificationRead = async (notificationId) => {
  const response = await api.patch(`/notifications/${notificationId}/read`);
  return response.data.data;
};

export const markAllNotificationsRead = async () => {
  await api.patch("/notifications/read-all");
};
