import express from "express";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

import * as applicationController from "../controllers/application.controller.js";

const router = express.Router();

// Job Seeker applies
router.post(
  "/",
  authenticate,
  authorize("JOB_SEEKER"),
  applicationController.applyToJob
);

// Employer views applicants
router.get(
  "/job/:jobId",
  authenticate,
  authorize("EMPLOYER"),
  applicationController.getApplicantsByJob
);
router.get(
  "/me",
  authenticate,
  authorize("JOB_SEEKER"),
  applicationController.getMyApplications
);
export default router;