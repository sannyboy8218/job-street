import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";
import ForbiddenError from "../errors/ForbiddenError.js";

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

  if (job.status !== "OPEN") {
    throw new BadRequestError(
      "This job is no longer accepting applications."
    );
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

export const getApplicantsByJob = async (employerId, jobId) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new NotFoundError("Job not found.");
  }

  if (job.createdBy.toString() !== String(employerId)) {
    throw new ForbiddenError(
      "You are not allowed to view these applicants."
    );
  }

  const applications = await Application.find({
    job: jobId,
  })
    .populate("applicant", "firstName lastName email phone resumeUrl")
    .sort({
      createdAt: -1,
    });

  return applications;
};

export const getMyApplications = async (applicantId) => {
  return await Application.find({
    applicant: applicantId,
  })
    .populate("job")
    .sort({
      createdAt: -1,
    });
};

export const updateApplicationStatus = async (
  employerId,
  applicationId,
  status
) => {
  const application = await Application.findById(applicationId).populate("job");

  if (!application) {
    throw new NotFoundError("Application not found.");
  }

  if (!application.job) {
    throw new NotFoundError("Job not found.");
  }

  if (application.job.createdBy.toString() !== String(employerId)) {
    throw new ForbiddenError(
      "You are not allowed to update this application."
    );
  }

  application.status = status;
  await application.save();

  await application.populate("applicant", "firstName lastName email phone resumeUrl");

  return application;
};
