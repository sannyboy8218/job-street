import express from "express";
import validate from "../middleware/validate.js";
import { registerSchema } from "../validators/auth.validator.js";
import { register } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { loginSchema } from "../validators/login.validator.js"
import authenticate from "../middleware/auth.middleware.js";
import { getCurrentUser } from "../controllers/auth.controller.js";
import authorize from "../middleware/authorize.middleware.js";

const router = express.Router();

router.post(
    "/register",
    validate(registerSchema),
    register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);
router.get(
  "/me",
  authenticate,
  getCurrentUser
);


export default router;