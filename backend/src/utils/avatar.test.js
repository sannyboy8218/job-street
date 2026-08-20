import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { isAllowedAvatarType } from "./avatar.js";

describe("isAllowedAvatarType", () => {
  it("allows common photo types", () => {
    assert.equal(isAllowedAvatarType("image/jpeg"), true);
    assert.equal(isAllowedAvatarType("image/png"), true);
    assert.equal(isAllowedAvatarType("image/webp"), true);
  });

  it("rejects non-image files", () => {
    assert.equal(isAllowedAvatarType("application/pdf"), false);
    assert.equal(isAllowedAvatarType("image/gif"), false);
  });
});
