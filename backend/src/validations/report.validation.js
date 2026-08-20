import { z } from "zod";

export const applicationReportQuerySchema = z
  .object({
    from: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "From date must be YYYY-MM-DD"),
    to: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "To date must be YYYY-MM-DD"),
    status: z
      .enum(["PENDING", "REVIEWED", "INTERVIEW", "ACCEPTED", "REJECTED"])
      .optional(),
  })
  .refine((data) => data.from <= data.to, {
    message: "From date must be on or before the To date.",
    path: ["to"],
  });
