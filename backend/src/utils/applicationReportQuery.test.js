import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { buildApplicationReportFilter } from "./applicationReportQuery.js";

describe("buildApplicationReportFilter", () => {
  it("filters by the employer's jobs and inclusive applied dates", () => {
    const filter = buildApplicationReportFilter({
      jobIds: ["job-1"],
      from: "2026-08-01",
      to: "2026-08-31",
    });

    assert.deepEqual(filter.job, { $in: ["job-1"] });
    assert.equal(
      filter.createdAt.$gte.getTime(),
      new Date("2026-08-01T00:00:00.000").getTime()
    );
    assert.equal(
      filter.createdAt.$lte.getTime(),
      new Date("2026-08-31T23:59:59.999").getTime()
    );
    assert.equal(filter.status, undefined);
  });

  it("adds status when provided", () => {
    const filter = buildApplicationReportFilter({
      jobIds: ["job-1"],
      from: "2026-08-01",
      to: "2026-08-31",
      status: "ACCEPTED",
    });

    assert.equal(filter.status, "ACCEPTED");
  });
});
