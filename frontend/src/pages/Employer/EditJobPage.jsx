import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { getJob, updateJob } from "@/services/job.service";
import Breadcrumb from "@/components/common/Breadcrumb";
import PageHeader from "@/components/common/PageHeader";
import JobForm from "@/components/employer/JobForm";

function toFormValues(job) {
  return {
    title: job.title,
    company: job.company,
    location: job.location,
    employmentType: job.employmentType,
    salary: job.salary,
    description: job.description,
    requirements: job.requirements,
    status: job.status,
  };
}

export default function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJob = async () => {
      try {
        const response = await getJob(id);
        setJob(response.data);
      } catch (loadError) {
        setError(
          loadError.response?.data?.message || "Failed to load this job."
        );
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await updateJob(id, {
        title: data.title,
        company: data.company,
        location: data.location,
        employmentType: data.employmentType,
        salary: Number(data.salary),
        description: data.description,
        requirements: data.requirements,
        status: data.status,
      });

      toast.success("Job updated successfully!");
      navigate("/employer/jobs");
    } catch (updateError) {
      toast.error(
        updateError.response?.data?.message || "Failed to update job."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center text-slate-500">
        Loading job...
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error || "Job not found."}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/employer/dashboard" },
          { label: "My Jobs", path: "/employer/jobs" },
          { label: "Edit Job" },
        ]}
      />

      <PageHeader
        title="Edit Job"
        description="Update this job posting and its visibility."
      />

      <JobForm
        defaultValues={toFormValues(job)}
        onSubmit={onSubmit}
        onCancel={() => navigate("/employer/jobs")}
        submitLabel="Save changes"
        submittingLabel="Saving..."
        showStatus
      />
    </div>
  );
}
