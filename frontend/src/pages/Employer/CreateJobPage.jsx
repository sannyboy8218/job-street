import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import { createJob } from "@/services/job.service";
import Breadcrumb from "@/components/common/Breadcrumb";
import PageHeader from "@/components/common/PageHeader";
import JobForm from "@/components/employer/JobForm";

export default function CreateJobPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      await createJob({
        title: data.title,
        company: data.company,
        location: data.location,
        employmentType: data.employmentType,
        salary: data.salary,
        description: data.description,
        requirements: data.requirements,
      });

      toast.success("Job published successfully!");
      navigate("/employer/jobs");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to publish job."
      );
    }
  };

  return (
    <div className="space-y-2">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/employer/dashboard" },
          { label: "My Jobs", path: "/employer/jobs" },
          { label: "Create Job" },
        ]}
      />

      <PageHeader
        title="Create New Job"
        description="Publish a new job opportunity for potential candidates."
      />

      <JobForm
        defaultValues={{
          company: user?.companyName || "",
        }}
        onSubmit={onSubmit}
        onCancel={() => navigate("/employer/jobs")}
        submitLabel="Publish Job"
        submittingLabel="Publishing..."
        cancelLabel="Cancel"
      />
    </div>
  );
}
