import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { changePasswordSchema } from "./password.validation.js";

describe("changePasswordSchema", () => {
  it("accepts a valid password change payload", () => {
    const result = changePasswordSchema.parse({
      currentPassword: "old-secret",
      newPassword: "new-secret",
    });

    assert.equal(result.newPassword, "new-secret");
  });

  it("rejects a new password that is too short", () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: "old-secret",
      newPassword: "short",
    });

    assert.equal(result.success, false);
  });
});
