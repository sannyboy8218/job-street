import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { ROLES } from "@/constants/roles";

export default function TopNavbar({
  showGreeting = true,
}) {
  const { user } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  const firstName =
    user?.name?.split(" ")[0] || "User";

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const subtitle =
    user?.role === ROLES.EMPLOYER
      ? "Ready to hire your next employee?"
      : "Ready to find your next opportunity?";

  return (
    <header className="sticky top-0 z-20 border-b bg-white">
      <div
        className={`flex h-20 items-center px-8 ${
          showGreeting
            ? "justify-between"
            : "justify-end"
        }`}
      >
        {/* Greeting */}
        {showGreeting && (
          <div>
            <h1 className="text-2xl font-bold">
              {greeting}, {firstName} 👋
            </h1>

            <p className="text-sm text-slate-500">
              {subtitle}
            </p>
          </div>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <div className="relative hidden lg:block">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />

            <Input
              className="w-72 pl-10"
              placeholder="Search jobs..."
            />
          </div>

          {/* Notifications */}
          <button className="rounded-xl border p-3 transition hover:bg-slate-100">
            <Bell size={20} />
          </button>

          {/* User */}
          <button className="flex items-center gap-3 rounded-xl border px-4 py-2 transition hover:bg-slate-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              {initials}
            </div>

            <div className="hidden text-left md:block">
              <p className="font-semibold">
                {user?.name || "User"}
              </p>

              <p className="text-xs uppercase tracking-wide text-slate-500">
                {user?.role || "USER"}
              </p>
            </div>

            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}