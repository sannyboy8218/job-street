import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  canChangeApplicationStatus,
  getAllowedApplicationStatuses,
} from "./applicationStatus.js";

describe("application status flow", () => {
  it("does not allow Reviewed to go back to Pending", () => {
    assert.equal(canChangeApplicationStatus("REVIEWED", "PENDING"), false);
  });

  it("does not allow Accepted to change to Rejected or Reviewed", () => {
    assert.equal(canChangeApplicationStatus("ACCEPTED", "REJECTED"), false);
    assert.equal(canChangeApplicationStatus("ACCEPTED", "REVIEWED"), false);
  });

  it("allows Pending to move to Reviewed", () => {
    assert.equal(canChangeApplicationStatus("REVIEWED", "REVIEWED"), true);
    assert.equal(canChangeApplicationStatus("PENDING", "REVIEWED"), true);
  });

  it("lists only forward statuses plus the current one", () => {
    assert.deepEqual(getAllowedApplicationStatuses("INTERVIEW"), [
      "INTERVIEW",
      "ACCEPTED",
      "REJECTED",
    ]);
  });
});
