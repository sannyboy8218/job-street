import { Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import LandingPage from "@/pages/Landing/LandingPage";
import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import EmployerDashboard from "@/pages/Employer/EmployerDashboard";
import JobSeekerDashboard from "@/pages/JobSeeker/JobSeekerDashboard";

import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "@/constants/roles";
import EmployerJobsPage from "@/pages/Employer/EmployerJobsPage";
import CreateJobPage from "@/pages/Employer/CreateJobPage";
import EditJobPage from "@/pages/Employer/EditJobPage";
import ApplicantsPage from "@/pages/Employer/ApplicantsPage";
import EmployerReportsPage from "@/pages/Employer/EmployerReportsPage";

import BrowseJobsPage from "@/pages/JobSeeker/BrowseJobsPage";
import JobDetailsPage from "@/pages/JobSeeker/JobDetailsPage";
import MyApplicationsPage from "@/pages/JobSeeker/MyApplicationsPage";
import JobsLayout from "@/layouts/JobsLayout";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import ProfilePage from "@/pages/Profile/ProfilePage";

export default function AppRoutes() {
  return (
    <Routes>
  {/* Public Pages */}
  <Route element={<MainLayout />}>
    <Route path="/" element={<LandingPage />} />
  </Route>

  {/* Authentication */}
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>

  {/* Employer Routes */}
  <Route
    element={
      <ProtectedRoute allowedRoles={[ROLES.EMPLOYER]}>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route
      path="/employer/dashboard"
      element={<EmployerDashboard />}
    />

    <Route
      path="/employer/jobs"
      element={<EmployerJobsPage />}
    />

    <Route
      path="/employer/jobs/create"
      element={<CreateJobPage />}
    />

    <Route
      path="/employer/jobs/:id/edit"
      element={<EditJobPage />}
    />

    <Route
      path="/employer/jobs/:jobId/applicants"
      element={<ApplicantsPage />}
    />

    <Route
      path="/employer/reports"
      element={<EmployerReportsPage />}
    />

    <Route
      path="/employer/profile"
      element={<ProfilePage />}
    />
  </Route>

  {/* Job Seeker Routes */}
  <Route
    element={
      <ProtectedRoute allowedRoles={[ROLES.JOB_SEEKER]}>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route
      path="/jobseeker/dashboard"
      element={<JobSeekerDashboard />}
    />
    <Route
      path="/jobseeker/applications"
      element={<MyApplicationsPage />}
    />
    <Route
      path="/jobseeker/profile"
      element={<ProfilePage />}
    />
  </Route>

  <Route element={<JobsLayout />}>
    <Route path="/jobs" element={<BrowseJobsPage />} />
    <Route path="/jobs/:id" element={<JobDetailsPage />} />
  </Route>

  <Route element={<MainLayout />}>
    <Route path="*" element={<NotFoundPage />} />
  </Route>

</Routes>
  );
}