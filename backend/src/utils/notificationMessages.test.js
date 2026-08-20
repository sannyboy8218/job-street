import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  buildApplicationReceivedMessage,
  buildStatusUpdatedMessage,
  getApplicantDisplayName,
} from "./notificationMessages.js";

describe("notificationMessages", () => {
  it("names the applicant in a new-application message", () => {
    assert.equal(
      buildApplicationReceivedMessage("Ada Lovelace", "Frontend Developer"),
      "Ada Lovelace applied for Frontend Developer."
    );
  });

  it("uses a readable status label for the job seeker", () => {
    assert.equal(
      buildStatusUpdatedMessage("Frontend Developer", "INTERVIEW"),
      "Your application for Frontend Developer was updated to Interview."
    );
  });

  it("falls back when the applicant name is missing", () => {
    assert.equal(getApplicantDisplayName(null), "A job seeker");
    assert.equal(getApplicantDisplayName({}), "A job seeker");
  });
});
