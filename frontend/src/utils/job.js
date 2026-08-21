export const EMPLOYMENT_TYPE_LABELS = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
};

export function getEmploymentTypeLabel(type) {
  if (!type) {
    return "";
  }

  return EMPLOYMENT_TYPE_LABELS[type] || type.replaceAll("_", " ");
}
