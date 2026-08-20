export const APPLICATION_STATUS_LABELS = {
  PENDING: "Pending",
  REVIEWED: "Reviewed",
  INTERVIEW: "Interview",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export function getApplicationStatusLabel(status) {
  return APPLICATION_STATUS_LABELS[status] || status || "Unknown";
}

export function getApplicantDisplayName(user) {
  if (!user) {
    return "A job seeker";
  }

  const fullName = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return fullName || "A job seeker";
}

export function buildApplicationReceivedMessage(applicantName, jobTitle) {
  return `${applicantName} applied for ${jobTitle}.`;
}

export function buildStatusUpdatedMessage(jobTitle, status) {
  return `Your application for ${jobTitle} was updated to ${getApplicationStatusLabel(status)}.`;
}
