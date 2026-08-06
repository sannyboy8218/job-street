import asyncHandler from "../utils/asyncHandler.js";
import * as dashboardService from "../services/dashboard.service.js";

export const getEmployerDashboard = asyncHandler(async (req, res) => {
  const dashboard = await dashboardService.getEmployerDashboard(
    req.user.id
  );

  res.status(200).json({
    success: true,
    data: dashboard,
  });
});