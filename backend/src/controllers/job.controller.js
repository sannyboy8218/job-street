import * as jobService from "../services/job.service.js";
import { createJobSchema } from "../validations/job.validation.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createJob = asyncHandler(async (req, res) => {
  const validatedData = createJobSchema.parse(req.body);

  const job = await jobService.createJob({
    ...validatedData,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Job created successfully.",
    data: job,
  });
});

export const getEmployerJobs = asyncHandler(async (req, res) => {
  const jobs = await jobService.getJobsByEmployer(req.user.id);

  res.status(200).json({
    success: true,
    data: jobs,
  });
});

export const getJob = asyncHandler(async (req, res) => {
  const job = await jobService.getJobById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

export const updateJob = asyncHandler(async (req, res) => {
  const validatedData = createJobSchema.parse(req.body);

  const job = await jobService.updateJob(
    req.params.id,
    validatedData
  );

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Job updated successfully.",
    data: job,
  });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await jobService.deleteJob(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Job deleted successfully.",
  });
});

/**
 * Public APIs
 */

export const getPublicJobs = asyncHandler(async (req, res) => {
  const jobs = await jobService.getPublicJobs();

  res.status(200).json({
    success: true,
    data: jobs,
  });
});

export const getPublicJob = asyncHandler(async (req, res) => {
  const job = await jobService.getPublicJob(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});