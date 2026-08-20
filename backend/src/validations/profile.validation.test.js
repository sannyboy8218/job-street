import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { updateProfileSchema } from "./profile.validation.js";

describe("updateProfileSchema", () => {
  it("accepts a seeker profile with a resume URL", () => {
    const result = updateProfileSchema.parse({
      firstName: "Ana",
      lastName: "Santos",
      resumeUrl: "https://example.com/ana.pdf",
    });

    assert.equal(result.resumeUrl, "https://example.com/ana.pdf");
  });

  it("rejects a resume link that is not http(s)", () => {
    const result = updateProfileSchema.safeParse({
      firstName: "Ana",
      lastName: "Santos",
      resumeUrl: "ftp://files.example.com/resume.pdf",
    });

    assert.equal(result.success, false);
  });

  it("rejects a first name that is too short", () => {
    const result = updateProfileSchema.safeParse({
      firstName: "A",
      lastName: "Santos",
    });

    assert.equal(result.success, false);
  });
});
