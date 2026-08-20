export function parseInclusiveDateRange(from, to) {
  return {
    start: new Date(`${from}T00:00:00.000`),
    end: new Date(`${to}T23:59:59.999`),
  };
}

export function buildApplicationReportFilter({
  jobIds,
  from,
  to,
  status,
} = {}) {
  const { start, end } = parseInclusiveDateRange(from, to);

  const filter = {
    job: { $in: jobIds },
    createdAt: {
      $gte: start,
      $lte: end,
    },
  };

  if (status) {
    filter.status = status;
  }

  return filter;
}
