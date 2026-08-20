import asyncHandler from "../utils/asyncHandler.js";
import { applicationReportQuerySchema } from "../validations/report.validation.js";
import * as reportService from "../services/report.service.js";

function parseReportQuery(req, res) {
  const parsed = applicationReportQuerySchema.safeParse({
    from: req.query.from,
    to: req.query.to,
    status: req.query.status || undefined,
  });

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid report filters.",
    });
    return null;
  }

  return parsed.data;
}

export const getApplicationReport = asyncHandler(async (req, res) => {
  const query = parseReportQuery(req, res);

  if (!query) {
    return;
  }

  const rows = await reportService.getApplicationReport(req.user.id, query);

  res.status(200).json({
    success: true,
    data: rows,
  });
});

export const exportApplicationReport = asyncHandler(async (req, res) => {
  const query = parseReportQuery(req, res);

  if (!query) {
    return;
  }

  const rows = await reportService.getApplicationReport(req.user.id, query);
  const buffer = await reportService.buildApplicationReportWorkbook(rows);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="hirehub-applications-${query.from}-to-${query.to}.xlsx"`
  );

  res.send(Buffer.from(buffer));
});
