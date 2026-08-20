import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  buildPublicJobFilter,
  escapeRegex,
} from "./publicJobQuery.js";

describe("escapeRegex", () => {
  it("escapes special characters so they are treated as text", () => {
    assert.equal(escapeRegex("C++ (dev)"), "C\\+\\+ \\(dev\\)");
  });
});

describe("buildPublicJobFilter", () => {
  it("always limits results to open jobs", () => {
    assert.deepEqual(buildPublicJobFilter(), { status: "OPEN" });
  });

  it("searches title, company, and description", () => {
    const filter = buildPublicJobFilter({ search: "engineer" });

    assert.equal(filter.status, "OPEN");
    assert.equal(filter.$or.length, 3);
    assert.equal(filter.$or[0].title.flags, "i");
  });

  it("adds location and employment type when provided", () => {
    const filter = buildPublicJobFilter({
      location: "Manila",
      employmentType: "FULL_TIME",
    });

    assert.equal(filter.employmentType, "FULL_TIME");
    assert.equal(filter.location instanceof RegExp, true);
  });
});
