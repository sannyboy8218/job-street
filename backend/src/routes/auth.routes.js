import express from "express";
import validate from "../middleware/validate.js";
import { registerSchema } from "../validators/auth.validator.js";
import { register } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { loginSchema } from "../validators/login.validator.js"
import authenticate from "../middleware/auth.middleware.js";
import {
  getCurrentUser,
  updateProfile,
  changePassword,
} from "../controllers/auth.controller.js";
import { updateProfileSchema } from "../validations/profile.validation.js";
import { changePasswordSchema } from "../validations/password.validation.js";

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

router.patch(
  "/me",
  authenticate,
  validate(updateProfileSchema),
  updateProfile
);

router.patch(
  "/password",
  authenticate,
  validate(changePasswordSchema),
  changePassword
);


export default router;