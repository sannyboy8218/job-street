import express from "express";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import validate from "../middleware/validate.js";
import { updateApplicationStatusSchema } from "../validations/application.validation.js";

import * as applicationController from "../controllers/application.controller.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("JOB_SEEKER"),
  applicationController.applyToJob
);

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

router.patch(
  "/:id/status",
  authenticate,
  authorize("EMPLOYER"),
  validate(updateApplicationStatusSchema),
  applicationController.updateApplicationStatus
);
export default router;