import ExcelJS from "exceljs";

import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import { buildApplicationReportFilter } from "../utils/applicationReportQuery.js";

const STATUS_LABELS = {
  PENDING: "Pending",
  REVIEWED: "Reviewed",
  INTERVIEW: "Interview",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function toReportRow(application) {
  const applicant = application.applicant || {};
  const job = application.job || {};
  const name = [applicant.firstName, applicant.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return {
    applicantName: name || "Unknown",
    email: applicant.email || "",
    phone: applicant.phone || "",
    jobTitle: job.title || "",
    company: job.company || "",
    status: application.status,
    statusLabel: STATUS_LABELS[application.status] || application.status,
    appliedAt: application.createdAt,
    appliedOn: formatDate(application.createdAt),
    resume: application.resume || applicant.resumeUrl || "",
  };
}

export const getApplicationReport = async (employerId, query) => {
  const jobIds = await Job.find({ createdBy: employerId }).distinct("_id");

  const applications = await Application.find(
    buildApplicationReportFilter({
      jobIds,
      from: query.from,
      to: query.to,
      status: query.status,
    })
  )
    .populate("applicant", "firstName lastName email phone resumeUrl")
    .populate("job", "title company")
    .sort({ createdAt: -1 });

  return applications.map(toReportRow);
};

export const buildApplicationReportWorkbook = async (rows) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Applications");

  sheet.columns = [
    { header: "Applicant", key: "applicantName", width: 24 },
    { header: "Email", key: "email", width: 28 },
    { header: "Phone", key: "phone", width: 16 },
    { header: "Job title", key: "jobTitle", width: 28 },
    { header: "Company", key: "company", width: 22 },
    { header: "Status", key: "statusLabel", width: 14 },
    { header: "Date applied", key: "appliedOn", width: 16 },
    { header: "Resume", key: "resume", width: 40 },
  ];

  sheet.getRow(1).font = { bold: true };
  sheet.addRows(rows);

  return workbook.xlsx.writeBuffer();
};
