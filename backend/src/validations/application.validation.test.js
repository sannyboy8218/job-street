import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  applyToJobSchema,
  updateApplicationStatusSchema,
} from "./application.validation.js";

describe("updateApplicationStatusSchema", () => {
  it("accepts a known application status", () => {
    const result = updateApplicationStatusSchema.parse({
      status: "INTERVIEW",
    });

    assert.equal(result.status, "INTERVIEW");
  });

  it("rejects an unknown status", () => {
    assert.throws(() =>
      updateApplicationStatusSchema.parse({ status: "HIRED" })
    );
  });
});

describe("applyToJobSchema", () => {
  const validApply = {
    jobId: "507f1f77bcf86cd799439011",
    coverLetter: "I am excited to apply because I have relevant experience.",
    resume: "https://example.com/resume.pdf",
  };

  it("accepts a complete application", () => {
    const result = applyToJobSchema.parse(validApply);
    assert.equal(result.resume, validApply.resume);
  });

  it("rejects a short cover letter", () => {
    assert.throws(() =>
      applyToJobSchema.parse({
        ...validApply,
        coverLetter: "Hello",
      })
    );
  });

  it("rejects a missing resume link", () => {
    assert.throws(() =>
      applyToJobSchema.parse({
        ...validApply,
        resume: "",
      })
    );
  });

  it("rejects a resume that is not http(s)", () => {
    assert.throws(() =>
      applyToJobSchema.parse({
        ...validApply,
        resume: "ftp://files.example.com/resume.pdf",
      })
    );
  });
});
