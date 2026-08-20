import { Link, Outlet } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { getDashboardPath } from "@/constants/roles";
import hirehubLogo from "@/assets/hirehub-icon.png";

export default function MainLayout() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={hirehubLogo}
              alt=""
              className="h-9 w-9 object-contain"
            />
            <span className="text-lg font-bold tracking-tight text-slate-900">
              HireHub
            </span>
          </Link>

          <nav className="flex items-center gap-3 text-sm font-medium">
            <Link
              to="/jobs"
              className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100"
            >
              Browse jobs
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardPath(user?.role)}
                  className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                >
                  Create account
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
