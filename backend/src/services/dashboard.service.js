import Job from "../models/job.model.js";

export const getEmployerDashboard = async (employerId) => {
  const jobs = await Job.find({
    employer: employerId,
  })
    .sort({ createdAt: -1 })
    .limit(5);

  const totalJobs = await Job.countDocuments({
    employer: employerId,
  });

  const activeJobs = await Job.countDocuments({
    employer: employerId,
    status: "OPEN",
  });

  const closedJobs = await Job.countDocuments({
    employer: employerId,
    status: "CLOSED",
  });

  return {
    totalJobs,
    activeJobs,
    closedJobs,
    recentJobs: jobs,
  };
};