import express from "express";

import authenticate from "../middleware/auth.middleware.js";
import * as notificationController from "../controllers/notification.controller.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  notificationController.getMyNotifications
);

router.patch(
  "/read-all",
  authenticate,
  notificationController.markAllNotificationsRead
);

router.patch(
  "/:id/read",
  authenticate,
  notificationController.markNotificationRead
);

export default router;
