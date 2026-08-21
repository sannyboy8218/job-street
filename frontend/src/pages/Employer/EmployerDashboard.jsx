import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BriefcaseBusiness,
  CircleCheck,
  CircleX,
  Plus,
} from "lucide-react";

import { getEmployerDashboard } from "@/services/dashboard.service";

import PageHeader from "@/components/common/PageHeader";
import JobStatusBadge from "@/components/employer/JobStatusBadge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function EmployerDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getEmployerDashboard();
        setDashboard(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
        Could not load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <PageHeader
        title="Employer Dashboard"
        description="Monitor your hiring activity and manage your jobs."
      />

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Jobs</p>
              <h2 className="mt-2 text-3xl font-bold">
                {dashboard.totalJobs}
              </h2>
            </div>

            <BriefcaseBusiness
              className="text-blue-600"
              size={36}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Active Jobs</p>
              <h2 className="mt-2 text-3xl font-bold">
                {dashboard.activeJobs}
              </h2>
            </div>

            <CircleCheck
              className="text-green-600"
              size={36}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Closed Jobs</p>
              <h2 className="mt-2 text-3xl font-bold">
                {dashboard.closedJobs}
              </h2>
            </div>

            <CircleX
              className="text-red-600"
              size={36}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Applicants</p>
              <h2 className="mt-2 text-3xl font-bold">
                {dashboard.totalApplicants}
              </h2>
            </div>

            <BriefcaseBusiness
              className="text-purple-600"
              size={36}
            />
          </CardContent>
        </Card>

      </div>

      {/* Recent Jobs */}

      <Card>

        <CardHeader className="flex flex-row items-center justify-between">

          <CardTitle>
            Recent Jobs
          </CardTitle>

          <Button
            onClick={() => navigate("/employer/jobs/create")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Job
          </Button>

        </CardHeader>

        <CardContent>

          {dashboard.recentJobs.length === 0 ? (

            <div className="py-10 text-center text-slate-500 dark:text-slate-400">
              No jobs found.
            </div>

          ) : (

            <div className="space-y-4">

              {dashboard.recentJobs.map((job) => (

                <div
                  key={job._id}
                  className="flex items-center justify-between rounded-lg border p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >

                  <div>
                    <h3 className="font-semibold">
                      {job.title}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {job.company}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Need {job.positionsNeeded || 1} · {job.applicantCount || 0} applying
                    </p>
                  </div>

                  <div className="flex items-center gap-4">

                    <JobStatusBadge
                      status={job.status}
                    />

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/employer/jobs/${job._id}/edit`)
                      }
                    >
                      Edit
                    </Button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </CardContent>

      </Card>

      {/* Quick Actions */}

      <Card>

        <CardHeader>
          <CardTitle>
            Quick Actions
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="flex flex-wrap gap-4">

            <Button
              onClick={() =>
                navigate("/employer/jobs/create")
              }
            >
              Create Job
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                navigate("/employer/jobs")
              }
            >
              View My Jobs
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                navigate("/employer/jobs")
              }
            >
              Applicants
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}