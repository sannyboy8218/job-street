import { z } from "zod";

export const createJobSchema = z.object({
  title: z
    .string()
    .min(3, "Job title must be at least 3 characters."),

  company: z
    .string()
    .min(2, "Company name is required."),

  location: z
    .string()
    .min(2, "Location is required."),

  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
  ]),

  salary: z
    .number({
      invalid_type_error: "Salary must be a number.",
    })
    .min(0, "Salary must be greater than or equal to 0."),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters."),

  requirements: z
    .string()
    .min(10, "Requirements must be at least 10 characters."),

  positionsNeeded: z.coerce
    .number()
    .int("Openings must be a whole number.")
    .min(1, "You need at least 1 opening.")
    .max(99, "Openings must be 99 or fewer.")
    .default(1),
});

export const updateJobSchema = createJobSchema.extend({
  status: z.enum(["OPEN", "CLOSED"]),
});

export const publicJobQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  location: z.string().trim().max(100).optional(),
  employmentType: z
    .enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"])
    .optional(),
});