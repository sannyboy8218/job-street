import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  BriefcaseBusiness,
  MapPin,
  PhilippinePeso,
  Clock,
} from "lucide-react";

import { getJob } from "@/services/publicJob.service";
import {
  applyToJob,
  getMyApplications,
} from "@/services/application.service";
import { useAuth } from "@/context/AuthContext";
import { ROLES } from "@/constants/roles";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ApplicationStatusBadge from "@/components/jobs/ApplicationStatusBadge";

export default function JobDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();

  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeOverride, setResumeOverride] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [existingApplication, setExistingApplication] = useState(null);

  const resume = resumeOverride ?? user?.resumeUrl ?? "";

  const isJobSeeker =
    isAuthenticated && user?.role === ROLES.JOB_SEEKER;

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await getJob(id);
        setJob(data);
      } catch (error) {
        setLoadError(
          error.response?.data?.message || "Failed to load this job."
        );
      }
    };

    loadJob();
  }, [id]);

  useEffect(() => {
    if (!isJobSeeker) {
      return;
    }

    const loadExistingApplication = async () => {
      try {
        const applications = await getMyApplications();
        const match = applications.find(
          (application) =>
            application.job?._id === id || application.job === id
        );
        setExistingApplication(match || null);
      } catch {
        setExistingApplication(null);
      }
    };

    loadExistingApplication();
  }, [id, isJobSeeker]);

  const handleApply = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);

      const response = await applyToJob({
        jobId: job._id,
        coverLetter,
        resume,
      });

      setExistingApplication(response.data);
      setCoverLetter("");
      setResumeOverride(null);
      toast.success("Application submitted!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to apply."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loadError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {loadError}
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex h-72 items-center justify-center text-slate-500">
        Loading job...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="mt-2 flex items-center gap-2 text-slate-600">
              <BriefcaseBusiness size={18} />
              {job.company}
            </p>
          </div>
          <Badge>{job.employmentType}</Badge>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            {job.location}
          </div>
          <div className="flex items-center gap-2">
            <PhilippinePeso size={18} />
            ₱{Number(job.salary).toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            {new Date(job.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Job Description</h2>
        <p className="leading-7 whitespace-pre-wrap text-slate-600">
          {job.description}
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Requirements</h2>
        <p className="leading-7 whitespace-pre-wrap text-slate-600">
          {job.requirements}
        </p>
      </div>

      <div className="space-y-5 rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Apply for this job</h2>

        {!isAuthenticated ? (
          <p className="text-slate-600">
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign in
            </Link>{" "}
            as a job seeker to apply, or{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              create an account
            </Link>
            .
          </p>
        ) : user?.role !== ROLES.JOB_SEEKER ? (
          <p className="text-slate-600">
            Employer accounts cannot apply to jobs. Use a job seeker account
            instead.
          </p>
        ) : existingApplication ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-slate-600">You have already applied.</p>
            <ApplicationStatusBadge status={existingApplication.status} />
            <Link
              to="/jobseeker/applications"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              View my applications
            </Link>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <Label htmlFor="coverLetter">Cover letter</Label>
              <textarea
                id="coverLetter"
                className="mt-2 w-full rounded-lg border p-3"
                rows={6}
                placeholder="Tell the employer why you are a good fit."
                value={coverLetter}
                onChange={(event) => setCoverLetter(event.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="resume">Resume link</Label>
              <input
                id="resume"
                className="mt-2 w-full rounded-lg border p-3"
                placeholder="https://..."
                value={resume}
                onChange={(event) => setResumeOverride(event.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {submitting ? "Submitting..." : "Apply now"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
