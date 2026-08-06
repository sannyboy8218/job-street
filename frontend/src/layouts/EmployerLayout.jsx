import { Outlet } from "react-router-dom";

import Sidebar from "@/components/common/Sidebar";
import TopNavbar from "@/components/common/TopNavbar";

export default function EmployerLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* Fixed Sidebar */}
      <aside className="w-72 shrink-0">
        <Sidebar />
      </aside>

      {/* Main Area */}
      <div className="flex flex-1 flex-col">

        {/* Fixed Navbar */}
        <TopNavbar />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}