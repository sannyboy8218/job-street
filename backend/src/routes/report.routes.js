import express from "express";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import * as reportController from "../controllers/report.controller.js";

const router = express.Router();

router.get(
  "/applications",
  authenticate,
  authorize("EMPLOYER"),
  reportController.getApplicationReport
);

router.get(
  "/applications/export",
  authenticate,
  authorize("EMPLOYER"),
  reportController.exportApplicationReport
);

export default router;
