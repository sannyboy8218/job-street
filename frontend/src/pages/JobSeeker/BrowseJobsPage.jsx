import { useEffect, useState } from "react";

import { getJobs } from "@/services/publicJob.service";
import JobCard from "@/components/jobs/JobCard";
export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Browse Jobs
        </h1>

        <p className="text-slate-500">
          Find your next career opportunity.
        </p>
      </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {jobs.map((job) => (
        <JobCard
        key={job._id}
        job={job}
        />
    ))}
    </div>
    </div>
  );
}