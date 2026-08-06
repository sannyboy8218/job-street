import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "@/components/common/TopNavbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <TopNavbar />

        <main className="flex-1 p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}