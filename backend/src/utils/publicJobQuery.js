export function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildPublicJobFilter({
  search,
  location,
  employmentType,
} = {}) {
  const filter = {
    status: "OPEN",
  };

  if (search) {
    const pattern = new RegExp(escapeRegex(search), "i");
    filter.$or = [
      { title: pattern },
      { company: pattern },
      { description: pattern },
    ];
  }

  if (location) {
    filter.location = new RegExp(escapeRegex(location), "i");
  }

  if (employmentType) {
    filter.employmentType = employmentType;
  }

  return filter;
}
