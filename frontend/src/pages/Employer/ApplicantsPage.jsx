import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getApplicantsByJob } from "@/services/application.service";

export default function ApplicantsPage() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplicants();
  }, []);applications.length === 0

  const loadApplicants = async () => {
    try {
      const data = await getApplicantsByJob(jobId);
      setApplications(data);
    } catch (error) {
      console.error("Failed to load applicants:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center">
        <p className="text-gray-500">
          Loading applicants...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Applicants
        </h1>

        <p className="text-slate-500">
          Review candidates who applied to this job.
        </p>
      </div>

      {/* Empty State */}

{applications.length === 0 ? (
  <div className="rounded-xl border bg-white p-8 text-center">
    No applicants yet.
  </div>
) : (
  <div className="space-y-5">
    {applications.map((application) => (
      <div
        key={application._id}
        className="rounded-xl border bg-white p-6 shadow-sm"
      >
        {/* Applicant Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {application.applicant.name}
            </h2>

            <p className="text-slate-500">
              {application.applicant.email}
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {application.status}
          </span>
        </div>

        {/* Cover Letter */}
        <div className="mt-6">
          <h3 className="font-semibold">
            Cover Letter
          </h3>

          <p className="mt-2 whitespace-pre-wrap text-slate-600">
            {application.coverLetter || "No cover letter submitted."}
          </p>
        </div>

        {/* Resume */}
        <div className="mt-6">
          <h3 className="font-semibold">
            Resume
          </h3>

          {application.resume ? (
            <a
              href={application.resume}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Resume
            </a>
          ) : (
            <p className="text-slate-500">
              No resume uploaded.
            </p>
          )}
        </div>

        {/* Applied Date */}
        <div className="mt-6 text-sm text-slate-500">
                  Applied on{" "}
                  {new Date(application.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

      {/* Applicants will be rendered in Step 6 */}

    </div>
  );
}