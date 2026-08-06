import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3, "Job title is required"),

  company: z.string().min(2, "Company is required"),

  location: z.string().min(2, "Location is required"),

  employmentType: z.string().min(1, "Employment type is required"),

  salary: z.coerce.number().min(0, "Salary must be positive").optional(),

  description: z.string().min(20, "Description is too short"),

  requirements: z.string().min(20, "Requirements are too short"),
});