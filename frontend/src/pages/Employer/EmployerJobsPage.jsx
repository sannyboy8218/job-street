import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getEmployerJobs } from "@/services/job.service";

import JobCard from "@/components/employer/JobCard";
import EmptyJobs from "@/components/employer/EmptyJobs";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

export default function EmployerJobsPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getEmployerJobs();
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    navigate(`/employer/jobs/${job._id}/edit`);
  };

  const handleDelete = (job) => {
    console.log("Delete", job);
  };

  // ✅ NEW
  const handleApplicants = (job) => {
    navigate(`/employer/jobs/${job._id}/applicants`);
  };

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center">
        <p className="text-lg text-gray-500">
          Loading jobs...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            My Jobs
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all of your published job postings.
          </p>
        </div>

        <Button
          onClick={() => navigate("/employer/jobs/create")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>

      </div>

      {/* Jobs */}

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
            />
          ))}
        </div>
      )}

    </div>
  );
}