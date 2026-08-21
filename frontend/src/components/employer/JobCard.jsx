import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  MapPin,
  Building2,
  BriefcaseBusiness,
  PhilippinePeso,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import JobStatusBadge from "./JobStatusBadge";
import { getEmploymentTypeLabel } from "@/utils/job";

export default function JobCard({
  job,
  onEdit,
  onDelete,
  onApplicants,
  onToggleStatus,
}) {
  return (
    <Card className="transition hover:shadow-lg">
      <CardContent className="p-6">

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-xl font-bold">
              {job.title}
            </h2>

            <div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-slate-400">
              <Building2 size={16} />
              {job.company}
            </div>

            <div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-slate-400">
              <MapPin size={16} />
              {job.location}
            </div>

            <div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-slate-400">
              <BriefcaseBusiness size={16} />
              {getEmploymentTypeLabel(job.employmentType)}
            </div>

            <div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-slate-400">
              <PhilippinePeso size={16} />
              ₱{Number(job.salary).toLocaleString()}
            </div>

            <div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-slate-400">
              <Users size={16} />
              Need {job.positionsNeeded || 1} · {job.applicantCount || 0} applying
            </div>
          </div>

          <JobStatusBadge status={job.status} />

        </div>

        {/* Action Buttons */}

        <div className="mt-6 flex flex-wrap justify-end gap-2">

          <Button
            variant="secondary"
            onClick={() => onApplicants(job)}
          >
            <Users className="mr-2 h-4 w-4" />
            View Applicants
          </Button>

          <Button
            variant="outline"
            onClick={() => onToggleStatus(job)}
          >
            {job.status === "OPEN" ? "Close job" : "Reopen job"}
          </Button>

          <Button
            variant="outline"
            onClick={() => onEdit(job)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button
            variant="destructive"
            onClick={() => onDelete(job)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>

        </div>

      </CardContent>
    </Card>
  );
}