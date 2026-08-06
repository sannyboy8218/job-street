import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import applicationRoutes from "./routes/application.routes.js";

import errorHandler from "./middleware/errorHandler.js";

console.log("FRONTEND_URL =", process.env.FRONTEND_URL);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/applications", applicationRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;