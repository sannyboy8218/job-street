import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  getApplicantsByJob,
  updateApplicationStatus,
} from "@/services/application.service";
import { getJob, updateJob } from "@/services/job.service";
import { getUserDisplayName } from "@/utils/user";
import UserAvatar from "@/components/common/UserAvatar";
import {
  APPLICATION_STATUSES,
  getApplicationStatusLabel,
} from "@/utils/application";
import ApplicationStatusBadge from "@/components/jobs/ApplicationStatusBadge";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Label } from "@/components/ui/label";

function toJobUpdatePayload(job, status) {
  return {
    title: job.title,
    company: job.company,
    location: job.location,
    employmentType: job.employmentType,
    salary: Number(job.salary),
    description: job.description,
    requirements: job.requirements,
    status,
  };
}

export default function ApplicantsPage() {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [showClosePrompt, setShowClosePrompt] = useState(false);
  const [closingJob, setClosingJob] = useState(false);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const [applicants, jobResponse] = await Promise.all([
          getApplicantsByJob(jobId),
          getJob(jobId),
        ]);
        setApplications(applicants);
        setJob(jobResponse.data);
      } catch (loadError) {
        setError(
          loadError.response?.data?.message ||
            "Failed to load applicants."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [jobId]);

  const handleStatusChange = async (applicationId, status) => {
    setUpdatingId(applicationId);

    try {
      const updated = await updateApplicationStatus(applicationId, status);

      setApplications((current) =>
        current.map((application) =>
          application._id === applicationId
            ? { ...application, ...updated }
            : application
        )
      );

      toast.success("Application status updated.");

      if (status === "ACCEPTED" && job?.status === "OPEN") {
        setShowClosePrompt(true);
      }
    } catch (updateError) {
      toast.error(
        updateError.response?.data?.message ||
          "Failed to update status."
      );
    } finally {
      setUpdatingId("");
    }
  };

  const handleCloseJob = async () => {
    if (!job) {
      return;
    }

    try {
      setClosingJob(true);
      const response = await updateJob(
        job._id,
        toJobUpdatePayload(job, "CLOSED")
      );
      setJob(response.data);
      setShowClosePrompt(false);
      toast.success("Job closed. It will no longer accept applications.");
    } catch (closeError) {
      toast.error(
        closeError.response?.data?.message || "Failed to close this job."
      );
    } finally {
      setClosingJob(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center">
        <p className="text-slate-500">Loading applicants...</p>
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
        <h1 className="text-3xl font-bold">Applicants</h1>
        <p className="text-slate-500">
          {job
            ? `Review candidates for ${job.title}.`
            : "Review candidates and update their application status."}
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          No applicants yet.
        </div>
      ) : (
        <div className="space-y-5">
          {applications.map((application) => {
            const resumeLink =
              application.resume || application.applicant?.resumeUrl;
            const isAccepted = application.status === "ACCEPTED";

            return (
              <div
                key={application._id}
                className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <UserAvatar user={application.applicant} size="md" />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {getUserDisplayName(application.applicant)}
                      </h2>
                      <p className="text-slate-500">
                        {application.applicant?.email}
                      </p>
                      {application.applicant?.phone ? (
                        <p className="text-slate-500">
                          {application.applicant.phone}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <ApplicationStatusBadge status={application.status} />

                    <div>
                      <Label
                        htmlFor={`status-${application._id}`}
                        className="sr-only"
                      >
                        Application status
                      </Label>
                      <select
                        id={`status-${application._id}`}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        value={application.status}
                        disabled={updatingId === application._id}
                        onChange={(event) =>
                          handleStatusChange(
                            application._id,
                            event.target.value
                          )
                        }
                      >
                        {APPLICATION_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {getApplicationStatusLabel(status)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {isAccepted ? (
                  <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900 dark:border-green-900 dark:bg-green-950/40 dark:text-green-200">
                    <p className="font-semibold">Accepted — next step</p>
                    <p className="mt-1">
                      Contact this applicant by email
                      {application.applicant?.phone
                        ? ` or phone (${application.applicant.phone})`
                        : ""}
                      .
                    </p>
                  </div>
                ) : null}

                <div className="mt-6">
                  <h3 className="font-semibold">Cover Letter</h3>
                  <p className="mt-2 whitespace-pre-wrap text-slate-600">
                    {application.coverLetter || "No cover letter submitted."}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold">Resume</h3>
                  {resumeLink ? (
                    <a
                      href={resumeLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    <p className="text-slate-500">No resume submitted.</p>
                  )}
                </div>

                <div className="mt-6 text-sm text-slate-500">
                  Applied on{" "}
                  {new Date(application.createdAt).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={showClosePrompt}
        title="Close this job?"
        description="You accepted an applicant. Close this posting so no one else can apply? You can leave it open if you still need more people."
        confirmLabel="Close job"
        cancelLabel="Keep job open"
        confirming={closingJob}
        onConfirm={handleCloseJob}
        onCancel={() => {
          if (!closingJob) {
            setShowClosePrompt(false);
          }
        }}
      />
    </div>
  );
}
