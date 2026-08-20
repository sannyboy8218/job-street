import { z } from "zod";

export const updateApplicationStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "REVIEWED",
    "INTERVIEW",
    "ACCEPTED",
    "REJECTED",
  ]),
});
