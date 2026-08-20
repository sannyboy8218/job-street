import { z } from "zod";

const isHttpUrl = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export const applySchema = z
  .object({
    coverLetter: z
      .string()
      .trim()
      .min(20, "Cover letter must be at least 20 characters.")
      .max(2000, "Cover letter must be 2000 characters or fewer."),
    resume: z
      .string()
      .trim()
      .min(1, "Resume link is required.")
      .max(500, "Resume link is too long."),
  })
  .superRefine((data, ctx) => {
    if (data.resume && !isHttpUrl(data.resume)) {
      ctx.addIssue({
        code: "custom",
        path: ["resume"],
        message: "Resume link must start with http:// or https://",
      });
    }
  });
