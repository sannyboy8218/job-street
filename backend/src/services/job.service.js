import Job from "../models/job.model.js";
import Application from "../models/application.model.js";
import ForbiddenError from "../errors/ForbiddenError.js";
import { buildPublicJobFilter } from "../utils/publicJobQuery.js";

const PUBLIC_JOB_LIMIT = 100;

const assertJobOwner = (job, employerId) => {
  if (job.createdBy.toString() !== String(employerId)) {
    throw new ForbiddenError(
      "You are not allowed to manage this job."
    );
  }
};

export async function attachApplicantCounts(jobs) {
  const list = jobs.map((job) =>
    job.toObject ? job.toObject() : { ...job }
  );

  if (list.length === 0) {
    return list;
  }

  const counts = await Application.aggregate([
    {
      $match: {
        job: { $in: list.map((job) => job._id) },
      },
    },
    {
      $group: {
        _id: "$job",
        count: { $sum: 1 },
      },
    },
  ]);

  const countByJob = Object.fromEntries(
    counts.map((row) => [String(row._id), row.count])
  );

  return list.map((job) => ({
    ...job,
    positionsNeeded: job.positionsNeeded || 1,
    applicantCount: countByJob[String(job._id)] || 0,
  }));
}

export const createJob = async (jobData) => {
  const job = await Job.create(jobData);

  return job;
};

export const getJobsByEmployer = async (employerId) => {
  const jobs = await Job.find({
    createdBy: employerId,
  }).sort({
    createdAt: -1,
  });

  return attachApplicantCounts(jobs);
};

export const getJobById = async (jobId, employerId) => {
  const job = await Job.findById(jobId);

  if (!job) {
    return null;
  }

  assertJobOwner(job, employerId);

  return job;
};

export const updateJob = async (jobId, employerId, updateData) => {
  const job = await Job.findById(jobId);

  if (!job) {
    return null;
  }

  assertJobOwner(job, employerId);

  Object.assign(job, updateData);
  await job.save();

  return job;
};

export const getPublicJobs = async (filters = {}) => {
  return await Job.find(buildPublicJobFilter(filters))
    .sort({
      createdAt: -1,
    })
    .limit(PUBLIC_JOB_LIMIT);
};

export const getPublicJob = async (jobId) => {
  return await Job.findById(jobId);
};

export const deleteJob = async (jobId, employerId) => {
  const job = await Job.findById(jobId);

  if (!job) {
    return null;
  }

  assertJobOwner(job, employerId);

  await Application.deleteMany({ job: jobId });
  await job.deleteOne();

  return job;
};
