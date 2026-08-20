import { z } from "zod";

const optionalText = (max, message) =>
  z
    .string()
    .trim()
    .max(max, message)
    .optional();

const isHttpUrl = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export const profileSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters"),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters"),
    phone: optionalText(30, "Phone must be 30 characters or fewer"),
    bio: optionalText(500, "Bio must be 500 characters or fewer"),
    location: optionalText(100, "Location must be 100 characters or fewer"),
    resumeUrl: optionalText(500, "Resume link is too long"),
    companyName: optionalText(
      100,
      "Company name must be 100 characters or fewer"
    ),
    companyWebsite: optionalText(500, "Website link is too long"),
    companyDescription: optionalText(
      1000,
      "Company description must be 1000 characters or fewer"
    ),
  })
  .superRefine((data, ctx) => {
    if (data.resumeUrl && !isHttpUrl(data.resumeUrl)) {
      ctx.addIssue({
        code: "custom",
        path: ["resumeUrl"],
        message: "Resume link must start with http:// or https://",
      });
    }

    if (data.companyWebsite && !isHttpUrl(data.companyWebsite)) {
      ctx.addIssue({
        code: "custom",
        path: ["companyWebsite"],
        message: "Website must start with http:// or https://",
      });
    }
  });
