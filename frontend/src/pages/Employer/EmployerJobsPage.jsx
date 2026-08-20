import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import {
  deleteJob,
  getEmployerJobs,
  updateJob,
} from "@/services/job.service";

import JobCard from "@/components/employer/JobCard";
import EmptyJobs from "@/components/employer/EmptyJobs";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";

function toUpdatePayload(job, status) {
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

export default function EmployerJobsPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await getEmployerJobs();
        setJobs(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load jobs."
        );
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const handleEdit = (job) => {
    navigate(`/employer/jobs/${job._id}/edit`);
  };

  const handleDelete = (job) => {
    setJobToDelete(job);
  };

  const closeDeleteDialog = () => {
    if (deleting) {
      return;
    }

    setJobToDelete(null);
  };

  const confirmDelete = async () => {
    if (!jobToDelete) {
      return;
    }

    try {
      setDeleting(true);
      await deleteJob(jobToDelete._id);
      toast.success("Job deleted.");
      setJobs((current) =>
        current.filter((item) => item._id !== jobToDelete._id)
      );
      setJobToDelete(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete job."
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleStatus = async (job) => {
    const nextStatus = job.status === "OPEN" ? "CLOSED" : "OPEN";

    try {
      const response = await updateJob(
        job._id,
        toUpdatePayload(job, nextStatus)
      );

      setJobs((current) =>
        current.map((item) =>
          item._id === job._id ? response.data : item
        )
      );

      toast.success(
        nextStatus === "CLOSED" ? "Job closed." : "Job reopened."
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update job status."
      );
    }
  };

  const handleApplicants = (job) => {
    navigate(`/employer/jobs/${job._id}/applicants`);
  };

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center">
        <p className="text-lg text-slate-500">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Jobs</h1>
          <p className="mt-2 text-slate-500">
            Manage all of your published job postings.
          </p>
        </div>

        <Button onClick={() => navigate("/employer/jobs/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <EmptyJobs />
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onApplicants={handleApplicants}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(jobToDelete)}
        title="Delete this job?"
        description={
          jobToDelete
            ? `“${jobToDelete.title}” will be removed. Applications for this job will also be deleted. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete job"
        cancelLabel="Cancel"
        destructive
        confirming={deleting}
        onConfirm={confirmDelete}
        onCancel={closeDeleteDialog}
      />
    </div>
  );
}
