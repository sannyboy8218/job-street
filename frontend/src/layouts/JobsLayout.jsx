import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ROLES } from "@/constants/roles";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";

export default function JobsLayout() {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Loading...
      </div>
    );
  }

  if (isAuthenticated && user?.role === ROLES.JOB_SEEKER) {
    return <DashboardLayout />;
  }

  return <MainLayout />;
}
