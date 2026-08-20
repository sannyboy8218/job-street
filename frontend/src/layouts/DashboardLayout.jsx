import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "@/components/common/TopNavbar";

export default function DashboardLayout() {
  const location = useLocation();

  const showGreeting =
    location.pathname === "/employer/dashboard" ||
    location.pathname === "/jobseeker/dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {showGreeting ? <TopNavbar /> : null}

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
