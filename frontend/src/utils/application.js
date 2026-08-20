export const APPLICATION_STATUS_LABELS = {
  PENDING: "Pending",
  REVIEWED: "Reviewed",
  INTERVIEW: "Interview",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export const APPLICATION_STATUSES = Object.keys(APPLICATION_STATUS_LABELS);

export function getApplicationStatusLabel(status) {
  return APPLICATION_STATUS_LABELS[status] || status || "Unknown";
}
