import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";
import ForbiddenError from "../errors/ForbiddenError.js";

/**
 * Apply for a job
 */
export const applyToJob = async (
  applicantId,
  jobId,
  coverLetter,
  resume
) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new NotFoundError("Job not found.");
  }

  const existingApplication = await Application.findOne({
    applicant: applicantId,
    job: jobId,
  });

  if (existingApplication) {
    throw new BadRequestError(
      "You have already applied for this job."
    );
  }

  const application = await Application.create({
    applicant: applicantId,
    job: jobId,
    coverLetter,
    resume,
  });

  return application;
};

/**
 * Employer views applicants for one job
 */
export const getApplicantsByJob = async (
  employerId,
  jobId
) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new NotFoundError("Job not found.");
  }

  if (job.createdBy.toString() !== employerId) {
    throw new ForbiddenError(
      "You are not allowed to view these applicants."
    );
  }

  const applications = await Application.find({
    job: jobId,
  })
    .populate("applicant", "name email")
    .sort({
      createdAt: -1,
    });

  return applications;
};



