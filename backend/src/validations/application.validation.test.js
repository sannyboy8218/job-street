import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { updateApplicationStatusSchema } from "./application.validation.js";

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
