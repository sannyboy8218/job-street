import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness } from "lucide-react";

import { jobSchema } from "@/validations/job.schema";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultFormValues = {
  title: "",
  company: "",
  location: "",
  employmentType: "",
  salary: "",
  description: "",
  requirements: "",
  status: "OPEN",
};

export default function JobForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel,
  submittingLabel,
  cancelLabel = "Cancel",
  showStatus = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      ...defaultFormValues,
      ...defaultValues,
    },
  });

  const employmentType = watch("employmentType");
  const status = watch("status");

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="pt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <BriefcaseBusiness size={22} />
              Job Information
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the basic information about this position.
            </p>
          </div>

          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              className="mt-2"
              placeholder="Software Engineer"
              {...register("title")}
            />
            {errors.title ? (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            ) : null}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                className="mt-2"
                placeholder="ABC Technologies"
                {...register("company")}
              />
              {errors.company ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.company.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                className="mt-2"
                placeholder="Manila"
                {...register("location")}
              />
              {errors.location ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.location.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>Employment Type</Label>
              <Select
                value={employmentType}
                onValueChange={(value) =>
                  setValue("employmentType", value, { shouldValidate: true })
                }
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select Employment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FULL_TIME">Full Time</SelectItem>
                  <SelectItem value="PART_TIME">Part Time</SelectItem>
                  <SelectItem value="CONTRACT">Contract</SelectItem>
                  <SelectItem value="INTERNSHIP">Internship</SelectItem>
                </SelectContent>
              </Select>
              {errors.employmentType ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.employmentType.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor="salary">Salary</Label>
              <div className="relative mt-2">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 dark:text-slate-400">
                  ₱
                </span>
                <Input
                  id="salary"
                  type="number"
                  className="pl-8"
                  placeholder="30000"
                  {...register("salary")}
                />
              </div>
              {errors.salary ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.salary.message}
                </p>
              ) : null}
            </div>
          </div>

          {showStatus ? (
            <div>
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(value) =>
                  setValue("status", value, { shouldValidate: true })
                }
              >
                <SelectTrigger className="mt-2 w-full max-w-xs">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>
              {errors.status ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.status.message}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold">Job Details</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell applicants about the role and the qualifications you are
              looking for.
            </p>
          </div>

          <div>
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              className="mt-2"
              rows={8}
              placeholder="Describe the responsibilities of this position..."
              {...register("description")}
            />
            {errors.description ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              className="mt-2"
              rows={8}
              placeholder="List the required skills, education and experience..."
              {...register("requirements")}
            />
            {errors.requirements ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.requirements.message}
              </p>
            ) : null}
          </div>

          <div className="flex justify-end gap-3 border-t pt-6">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-40 bg-blue-600 text-white hover:bg-blue-700"
            >
              {isSubmitting ? submittingLabel : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
