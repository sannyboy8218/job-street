import express from "express";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

import * as dashboardController from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(
  "/employer",
  authenticate,
  authorize("EMPLOYER"),
  dashboardController.getEmployerDashboard
);

export default router;