import express from "express";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import * as jobController from "../controllers/job.controller.js";

const router = express.Router();


router.get(
  "/public",
  jobController.getPublicJobs
);

router.get(
  "/public/:id",
  jobController.getPublicJob
);

router.post(
  "/",
  authenticate,
  authorize("EMPLOYER"),
  jobController.createJob
);

router.get(
  "/",
  authenticate,
  authorize("EMPLOYER"),
  jobController.getEmployerJobs
);

router.get(
  "/:id",
  authenticate,
  authorize("EMPLOYER"),
  jobController.getJob
);

router.put(
  "/:id",
  authenticate,
  authorize("EMPLOYER"),
  jobController.updateJob
);

router.delete(
  "/:id",
  authenticate,
  authorize("EMPLOYER"),
  jobController.deleteJob
);

export default router;