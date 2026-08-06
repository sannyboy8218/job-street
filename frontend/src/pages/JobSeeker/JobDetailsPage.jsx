import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getJob } from "@/services/publicJob.service";
import { toast } from "sonner";

import { applyToJob } from "@/services/application.service";
import {
  BriefcaseBusiness,
  MapPin,
  PhilippinePeso,
  Clock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function JobDetailsPage() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
const [coverLetter, setCoverLetter] = useState("");
    const [resume, setResume] = useState("");
    const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const data = await getJob(id);
      setJob(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  const handleApply = async () => {
  try {
    setLoading(true);

    await applyToJob({
      jobId: job._id,
      coverLetter,
      resume,
    });

    toast.success("Application submitted!");

    setCoverLetter("");
    setResume("");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to apply."
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {job.title}
            </h1>

            <p className="mt-2 flex items-center gap-2 text-slate-600">
              <BriefcaseBusiness size={18} />
              {job.company}
            </p>
          </div>

          <Badge>
            {job.employmentType}
          </Badge>
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
        <h2 className="mb-4 text-xl font-semibold">
          Job Description
        </h2>

        <p className="leading-7 text-slate-600">
          {job.description}
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Requirements
        </h2>

        <p className="leading-7 text-slate-600">
          {job.requirements}
        </p>
      </div>

<div className="rounded-2xl border bg-white p-8 shadow-sm space-y-5">
  <h2 className="text-xl font-semibold">
    Apply for this Job
  </h2>

  <textarea
    className="w-full rounded-lg border p-3"
    rows={6}
    placeholder="Cover Letter"
    value={coverLetter}
    onChange={(e) =>
      setCoverLetter(e.target.value)
    }
  />

  <input
    className="w-full rounded-lg border p-3"
    placeholder="Resume Link"
    value={resume}
    onChange={(e) =>
      setResume(e.target.value)
    }
  />

  <Button
    onClick={handleApply}
    disabled={loading}
  >
    {loading
      ? "Submitting..."
      : "Apply Now"}
  </Button>
</div>
    </div>
  );
}