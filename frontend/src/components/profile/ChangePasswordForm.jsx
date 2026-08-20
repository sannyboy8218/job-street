import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Lock } from "lucide-react";

import { changePassword } from "@/services/auth.service";
import { changePasswordSchema } from "@/validations/password.schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function getErrorMessage(error) {
  const data = error.response?.data;

  if (data?.errors?.length) {
    return data.errors.map((issue) => issue.message).join(" ");
  }

  return data?.message || "Failed to update password.";
}

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      reset();
      toast.success("Password updated.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="pt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Lock size={22} />
              Change password
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              You will stay signed in after the password is updated.
            </p>
          </div>

          <div>
            <Label htmlFor="currentPassword">Current password</Label>
            <div className="relative mt-2">
              <Input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                autoComplete="current-password"
                className="pr-11"
                {...register("currentPassword")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-700"
                aria-label={
                  showCurrent ? "Hide current password" : "Show current password"
                }
                onClick={() => setShowCurrent((visible) => !visible)}
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.currentPassword ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.currentPassword.message}
              </p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="newPassword">New password</Label>
            <div className="relative mt-2">
              <Input
                id="newPassword"
                type={showNew ? "text" : "password"}
                autoComplete="new-password"
                className="pr-11"
                {...register("newPassword")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-700"
                aria-label={
                  showNew ? "Hide new password" : "Show new password"
                }
                onClick={() => setShowNew((visible) => !visible)}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="mt-2"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>

          <div className="flex justify-end border-t pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-40 bg-blue-600 text-white hover:bg-blue-700"
            >
              {isSubmitting ? "Updating..." : "Update password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
