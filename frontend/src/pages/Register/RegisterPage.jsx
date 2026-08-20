import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BriefcaseBusiness, Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/common/LoadingButton";
import LoginBrandPanel from "@/components/auth/LoginBrandPanel";

import { useAuth } from "@/context/AuthContext";
import { ROLES, getDashboardPath } from "@/constants/roles";
import { registerSchema } from "@/validations/register.schema";
import * as authService from "@/services/auth.service";

import hirehubLogo from "@/assets/hirehub-icon.png";

function getErrorMessage(error) {
  const data = error.response?.data;

  if (data?.errors?.length) {
    return data.errors.map((issue) => issue.message).join(" ");
  }

  return data?.message || "Registration failed. Please try again.";
}

export default function RegisterPage() {
  const { login, isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ROLES.JOB_SEEKER,
    },
  });

  const selectedRole = watch("role");

  useEffect(() => {
    if (loading || !isAuthenticated || !user) {
      return;
    }

    navigate(getDashboardPath(user.role), { replace: true });
  }, [loading, isAuthenticated, user, navigate]);

  const onSubmit = async (data) => {
    setApiError("");

    const { confirmPassword: _confirmPassword, ...payload } = data;

    try {
      await authService.register(payload);

      const loggedInUser = await login({
        email: payload.email,
        password: payload.password,
      });

      toast.success("Account created successfully");
      navigate(getDashboardPath(loggedInUser.role), { replace: true });
    } catch (error) {
      setApiError(getErrorMessage(error));
    }
  };

  if (loading || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <LoginBrandPanel />

      <div className="flex min-h-screen items-center justify-center overflow-y-auto bg-slate-50 px-4 py-10 sm:px-6">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <img
              src={hirehubLogo}
              alt=""
              className="h-10 w-10 object-contain"
            />
            <p className="text-xl font-bold tracking-tight text-slate-900">
              HireHub
            </p>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Join HireHub as a job seeker or an employer.
          </p>

          {apiError ? (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {apiError}
            </div>
          ) : null}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 space-y-5"
          >
            <fieldset>
              <legend className="text-sm font-medium">Account type</legend>

              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setValue("role", ROLES.JOB_SEEKER, { shouldValidate: true })
                  }
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    selectedRole === ROLES.JOB_SEEKER
                      ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="flex items-center gap-2 font-semibold text-slate-900">
                    <UserRound size={18} aria-hidden="true" />
                    Job seeker
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    Find and apply for jobs
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setValue("role", ROLES.EMPLOYER, { shouldValidate: true })
                  }
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    selectedRole === ROLES.EMPLOYER
                      ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="flex items-center gap-2 font-semibold text-slate-900">
                    <BriefcaseBusiness size={18} aria-hidden="true" />
                    Employer
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    Post jobs and hire talent
                  </span>
                </button>
              </div>

              <input type="hidden" {...register("role")} />

              {errors.role ? (
                <p className="mt-2 text-sm text-red-600">
                  {errors.role.message}
                </p>
              ) : null}
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  placeholder="Jane"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={
                    errors.firstName ? "firstName-error" : undefined
                  }
                  className="mt-2 h-11 rounded-xl"
                  {...register("firstName")}
                />
                {errors.firstName ? (
                  <p id="firstName-error" className="mt-2 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  placeholder="Doe"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={
                    errors.lastName ? "lastName-error" : undefined
                  }
                  className="mt-2 h-11 rounded-xl"
                  {...register("lastName")}
                />
                {errors.lastName ? (
                  <p id="lastName-error" className="mt-2 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="h-11 rounded-xl pl-11"
                  {...register("email")}
                />
              </div>
              {errors.email ? (
                <p id="email-error" className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock size={18} aria-hidden="true" />
                </span>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className="h-11 rounded-xl pr-11 pl-11"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={18} aria-hidden="true" />
                  ) : (
                    <Eye size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password ? (
                <p id="password-error" className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                className="mt-2 h-11 rounded-xl"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <p
                  id="confirmPassword-error"
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.confirmPassword.message}
                </p>
              ) : null}
            </div>

            <LoadingButton
              type="submit"
              loading={isSubmitting}
              className="h-11 w-full rounded-xl bg-blue-600 text-base text-white hover:bg-blue-700"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </LoadingButton>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
