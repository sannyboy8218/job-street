import Job from "../models/job.model.js";
import Application from "../models/application.model.js";
import { attachApplicantCounts } from "./job.service.js";

export const getEmployerDashboard = async (employerId) => {
  const ownerFilter = { createdBy: employerId };

  const recentJobs = await attachApplicantCounts(
    await Job.find(ownerFilter).sort({ createdAt: -1 }).limit(5)
  );

  const [totalJobs, activeJobs, closedJobs] = await Promise.all([
    Job.countDocuments(ownerFilter),
    Job.countDocuments({ ...ownerFilter, status: "OPEN" }),
    Job.countDocuments({ ...ownerFilter, status: "CLOSED" }),
  ]);

  const jobIds = await Job.find(ownerFilter).distinct("_id");
  const totalApplicants = await Application.countDocuments({
    job: { $in: jobIds },
  });

  return {
    totalJobs,
    activeJobs,
    closedJobs,
    totalApplicants,
    recentJobs,
  };
};
