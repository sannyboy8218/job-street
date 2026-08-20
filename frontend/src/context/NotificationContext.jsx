import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "@/context/AuthContext";
import {
  getMyNotifications,
  markAllNotificationsRead as markAllNotificationsReadRequest,
  markNotificationRead as markNotificationReadRequest,
} from "@/services/notification.service";

const POLL_MS = 30000;
const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    try {
      const data = await getMyNotifications();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch {
      // Keep the last list if a poll fails.
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) {
      return undefined;
    }

    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return undefined;
    }

    refreshNotifications();

    const timer = window.setInterval(refreshNotifications, POLL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [authLoading, user, refreshNotifications]);

  const markRead = async (notificationId) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification._id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount((current) => Math.max(0, current - 1));

    try {
      await markNotificationReadRequest(notificationId);
    } catch {
      refreshNotifications();
    }
  };

  const markAllRead = async () => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true }))
    );
    setUnreadCount(0);

    try {
      await markAllNotificationsReadRequest();
    } catch {
      refreshNotifications();
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        refreshNotifications,
        markRead,
        markAllRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }

  return context;
}
