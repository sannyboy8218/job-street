import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness } from "lucide-react";

import { jobSchema } from "@/validations/job.schema";
// import { createJob } from "@/services/job.service";

import Breadcrumb from "@/components/common/Breadcrumb";
import PageHeader from "@/components/common/PageHeader";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createJob } from "@/services/job.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateJobPage() {
  const navigate = useNavigate();

  const {
  register,
  handleSubmit,
  setValue,
  watch,
  reset,
  formState: {
    errors,
    isSubmitting,
  },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      employmentType: "",
      salary: "",
      description: "",
      requirements: "",
    },
  });

  const employmentType = watch("employmentType");

const onSubmit = async (data) => {
  try {
    await createJob(data);

    toast.success("Job published successfully!");

    reset();

    navigate("/employer/jobs");
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to publish job."
    );
  }
};

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">

        <Breadcrumb
          items={[
            {
              label: "Dashboard",
              path: "/employer/dashboard",
            },
            {
              label: "My Jobs",
              path: "/employer/jobs",
            },
            {
              label: "Create Job",
            },
          ]}
        />

        <PageHeader
          title="Create New Job"
          description="Publish a new job opportunity for potential candidates."
        />

        <Card className="shadow-lg border-0">
          <CardContent className="pt-8">

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {/* Job Information */}

              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BriefcaseBusiness size={22} />
                  Job Information
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Fill in the basic information about this position.
                </p>
              </div>

              {/* Job Title */}

              <div>
                <Label>Job Title</Label>

                <Input
                  placeholder="Software Engineer"
                  {...register("title")}
                />

                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Company + Location */}

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <Label>Company</Label>

                  <Input
                    placeholder="ABC Technologies"
                    {...register("company")}
                  />

                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Location</Label>

                  <Input
                    placeholder="Manila"
                    {...register("location")}
                  />

                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>

              </div>

              {/* Employment Type + Salary */}

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <Label>Employment Type</Label>

                  <Select
                    value={employmentType}
                    onValueChange={(value) =>
                      setValue("employmentType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Employment Type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="FULL_TIME">
                        Full Time
                      </SelectItem>

                      <SelectItem value="PART_TIME">
                        Part Time
                      </SelectItem>

                      <SelectItem value="CONTRACT">
                        Contract
                      </SelectItem>

                      <SelectItem value="INTERNSHIP">
                        Internship
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {errors.employmentType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.employmentType.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Salary</Label>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      ₱
                    </span>

                    <Input
                      type="number"
                      className="pl-8"
                      placeholder="30000"
                      {...register("salary")}
                    />
                  </div>

                  {errors.salary && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.salary.message}
                    </p>
                  )}
                </div>

              </div>

              {/* Job Details */}

              <div className="border-t pt-8">

                <h2 className="text-xl font-semibold">
                  Job Details
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Tell applicants about the role and the qualifications you're looking for.
                </p>

              </div>

              {/* Description */}

              <div>
                <Label>Job Description</Label>

                <Textarea
                  rows={8}
                  placeholder="Describe the responsibilities of this position..."
                  {...register("description")}
                />

                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Requirements */}

              <div>
                <Label>Requirements</Label>

                <Textarea
                  rows={8}
                  placeholder="List the required skills, education and experience..."
                  {...register("requirements")}
                />

                {errors.requirements && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.requirements.message}
                  </p>
                )}
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 border-t pt-6">

              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => reset()}
              >
                Clear Form
              </Button> 

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-40"
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Publishing...
                    </>
                  ) : (
                    "Publish Job"
                  )}
                </Button>

              </div>

            </form>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}