import asyncHandler from "../utils/asyncHandler.js";
import * as applicationService from "../services/application.service.js";

export const applyToJob = asyncHandler(async (req, res) => {
  const application = await applicationService.applyToJob(
    req.user.id,
    req.body.jobId,
    req.body.coverLetter,
    req.body.resume
  );

  res.status(201).json({
    success: true,
    message: "Application submitted successfully.",
    data: application,
  });
});

export const getApplicantsByJob = asyncHandler(async (req, res) => {
  const applications = await applicationService.getApplicantsByJob(
    req.user.id,
    req.params.jobId
  );

  res.status(200).json({
    success: true,
    data: applications,
  });
});

export const getMyApplications = asyncHandler(async (req, res) => {
  const applications =
    await applicationService.getMyApplications(
      req.user.id
    );

  res.status(200).json({
    success: true,
    data: applications,
  });
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await applicationService.updateApplicationStatus(
    req.user.id,
    req.params.id,
    req.body.status
  );

  res.status(200).json({
    success: true,
    message: "Application status updated.",
    data: application,
  });
});

export const markApplicationViewed = asyncHandler(async (req, res) => {
  await applicationService.markApplicationViewed(
    req.user.id,
    req.params.jobId
  );

  res.status(204).send();
});