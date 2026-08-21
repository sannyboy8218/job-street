import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyApplications } from "@/services/application.service";
import ApplicationStatusBadge from "@/components/jobs/ApplicationStatusBadge";
import JobClosedNotice from "@/components/jobs/JobClosedNotice";
import { formatDate, formatDateTime } from "@/utils/date";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await getMyApplications();
        setApplications(data);
      } catch (loadError) {
        setError(
          loadError.response?.data?.message ||
            "Failed to load your applications."
        );
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center text-slate-500 dark:text-slate-400">
        Loading applications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Applications</h1>
        <p className="mt-2 text-slate-500">
          Track the jobs you have applied to.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500">You have not applied to any jobs yet.</p>
          <Link
            to="/jobs"
            className="mt-4 inline-block font-semibold text-blue-600 hover:underline"
          >
            Browse jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => {
            const job = application.job;
            const isClosed = job?.status === "CLOSED";

            return (
              <div
                key={application._id}
                className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {job?.title || "Job no longer available"}
                    </h2>
                    <p className="mt-1 text-slate-500">{job?.company}</p>
                    <p className="mt-2 text-sm text-slate-400">
                      Applied on {formatDate(application.createdAt)}
                    </p>
                    {application.lastViewedAt ? (
                      <p className="mt-1 text-sm text-slate-400">
                        Last viewed {formatDateTime(application.lastViewedAt)}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm text-slate-400">
                        You have not opened this posting since you applied.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <ApplicationStatusBadge status={application.status} />
                    {job?._id ? (
                      <Link
                        to={`/jobs/${job._id}`}
                        className="text-sm font-semibold text-blue-600 hover:underline"
                      >
                        View job
                      </Link>
                    ) : null}
                  </div>
                </div>

                {isClosed ? <JobClosedNotice /> : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
