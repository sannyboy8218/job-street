import Job from "../models/job.model.js";

export const createJob = async (jobData) => {
  const job = await Job.create(jobData);

  return job;
};


export const getJobsByEmployer = async (employerId) => {
  return await Job.find({
    createdBy: employerId,
  }).sort({
    createdAt: -1,
  });
};

export const getJobById = async (jobId) => {
  return await Job.findById(jobId);
};

export const updateJob = async (jobId, updateData) => {
  return await Job.findByIdAndUpdate(
    jobId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const getPublicJobs = async () => {
  return await Job.find({
    status: "OPEN",
  })
    .sort({
      createdAt: -1,
    });
};
export const getPublicJob = async (jobId) => {
  return await Job.findOne({
    _id: jobId,
    status: "OPEN",
  });
};
export const deleteJob = async (jobId) => {
  return await Job.findByIdAndDelete(jobId);
};

