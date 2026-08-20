import { useAuth } from "@/context/AuthContext";
import { ROLES } from "@/constants/roles";
import { getUserDisplayName } from "@/utils/user";

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
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-20 items-center px-8">
        <div>
          <h1 className="text-2xl font-bold">
            {greeting}, {firstName}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
