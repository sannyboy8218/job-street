import { BriefcaseBusiness } from "lucide-react";

export default function EmptyJobs() {
  return (
    <div className="text-center py-20">

      <BriefcaseBusiness
        className="mx-auto mb-4 text-gray-400"
        size={70}
      />

      <h2 className="text-2xl font-bold">
        No Jobs Yet
      </h2>

      <p className="text-gray-500 mt-2">
        Create your first job posting.
      </p>

    </div>
  );
}