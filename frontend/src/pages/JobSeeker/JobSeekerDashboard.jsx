import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, CircleCheck, Clock } from "lucide-react";

import { getMyApplications } from "@/services/application.service";
import PageHeader from "@/components/common/PageHeader";
import ApplicationStatusBadge from "@/components/jobs/ApplicationStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function JobSeekerDashboard() {
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
            "Failed to load dashboard."
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
        Loading dashboard...
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

  const pendingCount = applications.filter(
    (application) => application.status === "PENDING"
  ).length;
  const recentApplications = applications.slice(0, 5);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Job Seeker Dashboard"
        description="See your applications and continue your job search."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Applications</p>
              <h2 className="mt-2 text-3xl font-bold">{applications.length}</h2>
            </div>
            <FileText className="text-blue-600" size={36} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Pending</p>
              <h2 className="mt-2 text-3xl font-bold">{pendingCount}</h2>
            </div>
            <Clock className="text-amber-600" size={36} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">In progress</p>
              <h2 className="mt-2 text-3xl font-bold">
                {applications.length - pendingCount}
              </h2>
            </div>
            <CircleCheck className="text-green-600" size={36} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent applications</CardTitle>
          <Link to="/jobs">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Browse jobs
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentApplications.length === 0 ? (
            <p className="py-8 text-center text-slate-500 dark:text-slate-400">
              You have not applied to any jobs yet.
            </p>
          ) : (
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div
                  key={application._id}
                  className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700"
                >
                  <div>
                    <h3 className="font-semibold">
                      {application.job?.title || "Job no longer available"}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {application.job?.company}
                    </p>
                  </div>
                  <ApplicationStatusBadge status={application.status} />
                </div>
              ))}
            </div>
          )}

          {applications.length > 0 ? (
            <div className="mt-6">
              <Link
                to="/jobseeker/applications"
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                View all applications
              </Link>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
