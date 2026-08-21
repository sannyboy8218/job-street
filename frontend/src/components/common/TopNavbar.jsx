import { Link } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { ROLES, getProfilePath, getRoleLabel } from "@/constants/roles";
import { getUserDisplayName } from "@/utils/user";
import NotificationBell from "@/components/common/NotificationBell";
import ThemeToggle from "@/components/common/ThemeToggle";
import UserAvatar from "@/components/common/UserAvatar";

export default function TopNavbar() {
  const { user } = useAuth();
  const displayName = getUserDisplayName(user);
  const firstName = user?.firstName || displayName.split(" ")[0];

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
        ? "Good afternoon"
        : "Good evening";

  const subtitle =
    user?.role === ROLES.EMPLOYER
      ? "Ready to hire your next employee?"
      : "Ready to find your next opportunity?";

  return (
    <header className="sticky top-0 z-20 h-20 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-full items-center justify-between gap-4 px-6 lg:px-8">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
            {greeting}, {firstName}
          </h1>
          <p className="hidden truncate text-sm text-slate-500 sm:block dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <NotificationBell />
          <Link
            to={getProfilePath(user?.role)}
            className="ml-1 flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <UserAvatar user={user} size="sm" />
            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {displayName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {getRoleLabel(user?.role)}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
