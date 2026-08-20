export const ROLES = {
  EMPLOYER: "EMPLOYER",
  JOB_SEEKER: "JOB_SEEKER",
};

export function getDashboardPath(role) {
  return role === ROLES.EMPLOYER
    ? "/employer/dashboard"
    : "/jobseeker/dashboard";
}

export function getProfilePath(role) {
  return role === ROLES.EMPLOYER
    ? "/employer/profile"
    : "/jobseeker/profile";
}

export function getRoleLabel(role) {
  if (role === ROLES.EMPLOYER) {
    return "Employer";
  }

  if (role === ROLES.JOB_SEEKER) {
    return "Job seeker";
  }

  return "User";
}