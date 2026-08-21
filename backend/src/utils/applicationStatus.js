export const APPLICATION_STATUS_FLOW = {
  PENDING: ["REVIEWED", "INTERVIEW", "ACCEPTED", "REJECTED"],
  REVIEWED: ["INTERVIEW", "ACCEPTED", "REJECTED"],
  INTERVIEW: ["ACCEPTED", "REJECTED"],
  ACCEPTED: [],
  REJECTED: [],
};

export function canChangeApplicationStatus(fromStatus, toStatus) {
  if (!fromStatus || !toStatus) {
    return false;
  }

  if (fromStatus === toStatus) {
    return true;
  }

  return (APPLICATION_STATUS_FLOW[fromStatus] || []).includes(toStatus);
}

export function getAllowedApplicationStatuses(currentStatus) {
  const next = APPLICATION_STATUS_FLOW[currentStatus] || [];
  return [currentStatus, ...next];
}
