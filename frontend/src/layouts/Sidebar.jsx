import { NavLink, useNavigate } from "react-router-dom";
import { ROLES, getProfilePath } from "@/constants/roles";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  PlusCircle,
  FileText,
  UserRound,
  FileSpreadsheet,
  LogOut,
} from "lucide-react";

import Logo from "@/components/common/Logo";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const employerLinks = [
    {
      name: "Dashboard",
      path: "/employer/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Jobs",
      path: "/employer/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Create Job",
      path: "/employer/jobs/create",
      icon: PlusCircle,
    },
    {
      name: "Reports",
      path: "/employer/reports",
      icon: FileSpreadsheet,
    },
    {
      name: "Profile",
      path: getProfilePath(ROLES.EMPLOYER),
      icon: UserRound,
    },
  ];

  const jobSeekerLinks = [
    {
      name: "Dashboard",
      path: "/jobseeker/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Browse Jobs",
      path: "/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "My Applications",
      path: "/jobseeker/applications",
      icon: FileText,
    },
    {
      name: "Profile",
      path: getProfilePath(ROLES.JOB_SEEKER),
      icon: UserRound,
    },
  ];

  const links =
    user?.role === ROLES.EMPLOYER ? employerLinks : jobSeekerLinks;

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-20 items-center border-b border-slate-200 px-6 dark:border-slate-800">
        <Logo compact />
      </div>

      <nav className="flex-1 space-y-2 p-5">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path.endsWith("/dashboard")}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                }`
              }
            >
              <Icon size={20} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-5 dark:border-slate-800">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-950/40"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
