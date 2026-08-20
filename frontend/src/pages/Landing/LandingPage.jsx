import { Link } from "react-router-dom";
import { BriefcaseBusiness, Building2, Search } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { getDashboardPath } from "@/constants/roles";
import hirehubLogo from "@/assets/hirehub-icon.png";

const primaryButtonClass =
  "inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-base font-semibold text-blue-700 hover:bg-blue-50";

const secondaryButtonClass =
  "inline-flex h-11 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 text-base font-semibold text-white hover:bg-white/20";

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();
  const dashboardPath = getDashboardPath(user?.role);

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-6 py-14 text-white sm:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <img
            src={hirehubLogo}
            alt=""
            className="mx-auto mb-6 h-16 w-16 drop-shadow-lg"
          />
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            HireHub
          </h1>
          <p className="mt-4 text-lg text-blue-100 sm:text-xl">
            Find jobs. Hire talent. Grow careers.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/jobs" className={primaryButtonClass}>
              Browse jobs
            </Link>

            {isAuthenticated ? (
              <Link to={dashboardPath} className={secondaryButtonClass}>
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className={secondaryButtonClass}>
                  Create account
                </Link>
                <Link
                  to="/login"
                  className="px-3 text-sm font-semibold text-blue-100 hover:underline"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <Search className="text-blue-600" size={28} />
          <h2 className="mt-4 text-2xl font-bold">For job seekers</h2>
          <p className="mt-2 text-slate-500">
            Browse open roles, apply with a cover letter, and track your
            application status.
          </p>
          <Link
            to={isAuthenticated ? "/jobs" : "/register"}
            className="mt-6 inline-block font-semibold text-blue-600 hover:underline"
          >
            {isAuthenticated ? "Browse jobs" : "Create a job seeker account"}
          </Link>
        </div>

        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <Building2 className="text-blue-600" size={28} />
          <h2 className="mt-4 text-2xl font-bold">For employers</h2>
          <p className="mt-2 text-slate-500">
            Post jobs, review applicants, and update hiring status in one
            place.
          </p>
          <Link
            to={isAuthenticated ? dashboardPath : "/register"}
            className="mt-6 inline-block font-semibold text-blue-600 hover:underline"
          >
            {isAuthenticated ? "Go to dashboard" : "Create an employer account"}
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-8 text-center shadow-sm">
        <BriefcaseBusiness className="mx-auto text-blue-600" size={32} />
        <h2 className="mt-4 text-2xl font-bold">Ready to get started?</h2>
        <p className="mt-2 text-slate-500">
          Open roles are listed publicly. Create an account when you want to
          apply or hire.
        </p>
        <Link
          to="/jobs"
          className="mt-6 inline-block font-semibold text-blue-600 hover:underline"
        >
          See open jobs
        </Link>
      </section>
    </div>
  );
}
