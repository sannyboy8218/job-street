import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { UserRound } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { ROLES } from "@/constants/roles";
import { updateProfile } from "@/services/auth.service";
import { profileSchema } from "@/validations/profile.schema";

import PageHeader from "@/components/common/PageHeader";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import ProfilePhotoCard from "@/components/profile/ProfilePhotoCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function getErrorMessage(error) {
  const data = error.response?.data;

  if (data?.errors?.length) {
    return data.errors.map((issue) => issue.message).join(" ");
  }

  return data?.message || "Failed to save profile.";
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const isEmployer = user?.role === ROLES.EMPLOYER;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      bio: "",
      location: "",
      resumeUrl: "",
      companyName: "",
      companyWebsite: "",
      companyDescription: "",
    },
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    reset({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      bio: user.bio || "",
      location: user.location || "",
      resumeUrl: user.resumeUrl || "",
      companyName: user.companyName || "",
      companyWebsite: user.companyWebsite || "",
      companyDescription: user.companyDescription || "",
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const updated = await updateProfile(data);
      updateUser(updated);
      toast.success("Profile saved.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profile"
        description={
          isEmployer
            ? "Update your contact details and company information."
            : "Update your contact details and resume link."
        }
      />

      <Card className="border-0 shadow-lg">
        <CardContent className="pt-8">
          <ProfilePhotoCard />
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <UserRound size={22} />
                {isEmployer ? "Employer details" : "Your details"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Email cannot be changed here.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  className="mt-2"
                  {...register("firstName")}
                />
                {errors.firstName ? (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  className="mt-2"
                  {...register("lastName")}
                />
                {errors.lastName ? (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                className="mt-2 bg-slate-50 dark:bg-slate-800"
                value={user?.email || ""}
                disabled
                readOnly
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  className="mt-2"
                  placeholder="09xx xxx xxxx"
                  {...register("phone")}
                />
                {errors.phone ? (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
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

            {isEmployer ? (
              <>
                <div className="border-t pt-8">
                  <h2 className="text-xl font-semibold">Company</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This name can be used when you post a new job.
                  </p>
                </div>

                <div>
                  <Label htmlFor="companyName">Company name</Label>
                  <Input
                    id="companyName"
                    className="mt-2"
                    placeholder="ABC Technologies"
                    {...register("companyName")}
                  />
                  {errors.companyName ? (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.companyName.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Label htmlFor="companyWebsite">Website</Label>
                  <Input
                    id="companyWebsite"
                    className="mt-2"
                    placeholder="https://..."
                    {...register("companyWebsite")}
                  />
                  {errors.companyWebsite ? (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.companyWebsite.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Label htmlFor="companyDescription">About the company</Label>
                  <Textarea
                    id="companyDescription"
                    className="mt-2"
                    rows={6}
                    placeholder="What does your company do?"
                    {...register("companyDescription")}
                  />
                  {errors.companyDescription ? (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.companyDescription.message}
                    </p>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="bio">About you</Label>
                  <Textarea
                    id="bio"
                    className="mt-2"
                    rows={5}
                    placeholder="A short summary of your experience."
                    {...register("bio")}
                  />
                  {errors.bio ? (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.bio.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Label htmlFor="resumeUrl">Resume link</Label>
                  <Input
                    id="resumeUrl"
                    className="mt-2"
                    placeholder="https://..."
                    {...register("resumeUrl")}
                  />
                  {errors.resumeUrl ? (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.resumeUrl.message}
                    </p>
                  ) : null}
                </div>
              </>
            )}

            <div className="flex justify-end border-t pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-40 bg-blue-600 text-white hover:bg-blue-700"
              >
                {isSubmitting ? "Saving..." : "Save profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <ChangePasswordForm />
    </div>
  );
}
