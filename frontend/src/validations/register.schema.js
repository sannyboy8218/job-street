import { z } from "zod";
import { ROLES } from "@/constants/roles";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters"),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters"),
    email: z.email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    role: z.enum([ROLES.JOB_SEEKER, ROLES.EMPLOYER], {
      message: "Select an account type",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
