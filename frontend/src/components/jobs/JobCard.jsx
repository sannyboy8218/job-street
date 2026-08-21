 import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  MapPin,
  PhilippinePeso,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getEmploymentTypeLabel } from "@/utils/job";

export default function JobCard({ job }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {job.title}
          </h2>

          <p className="mt-1 flex items-center gap-2 text-slate-600">
            <BriefcaseBusiness size={16} />
            {job.company}
          </p>
        </div>

        <Badge>{getEmploymentTypeLabel(job.employmentType)}</Badge>
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {job.location}
        </div>

        <div className="flex items-center gap-2">
          <PhilippinePeso size={16} />
          ₱{Number(job.salary).toLocaleString()}
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} />
          Posted{" "}
          {new Date(job.createdAt).toLocaleDateString()}
        </div>
      </div>

      <p className="mt-5 line-clamp-3 text-sm text-slate-500">
        {job.description}
      </p>

      <div className="mt-6">
        <Link to={`/jobs/${job._id}`}>
          <Button className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}