export const APPLICATION_STATUS_FLOW = {
  PENDING: ["REVIEWED", "INTERVIEW", "ACCEPTED", "REJECTED"],
  REVIEWED: ["INTERVIEW", "ACCEPTED", "REJECTED"],
  INTERVIEW: ["ACCEPTED", "REJECTED"],
  ACCEPTED: [],
  REJECTED: [],
};

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

export function getAllowedApplicationStatuses(currentStatus) {
  const next = APPLICATION_STATUS_FLOW[currentStatus] || [];
  return [currentStatus, ...next];
}

export function isApplicationStatusFinal(status) {
  return status === "ACCEPTED" || status === "REJECTED";
}
