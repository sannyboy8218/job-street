import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/common/LoadingButton";
import LoginBrandPanel from "@/components/auth/LoginBrandPanel";

import { useAuth } from "@/context/AuthContext";
import { getDashboardPath } from "@/constants/roles";
import { loginSchema } from "@/validations/login.schema";

import hirehubLogo from "@/assets/hirehub-icon.png";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function LoginPage() {
  const { login, isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (loading || !isAuthenticated || !user) {
      return;
    }

    navigate(getDashboardPath(user.role), { replace: true });
  }, [loading, isAuthenticated, user, navigate]);

  const onSubmit = async (data) => {
    setApiError("");

    try {
      const loggedInUser = await login(data);

      toast.success("Signed in successfully");
      navigate(getDashboardPath(loggedInUser.role), { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid email or password";

      setApiError(message);
    }
  };

  if (loading || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <LoginBrandPanel />

      <div className="relative flex items-center justify-center bg-slate-50 px-4 py-10 sm:px-6 dark:bg-slate-950">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <img
              src={hirehubLogo}
              alt=""
              className="h-10 w-10 object-contain"
            />
            <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              HireHub
            </p>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
            Sign in
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-400">
            Enter your email and password to access HireHub.
          </p>

          {apiError ? (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
            >
              {apiError}
            </div>
          ) : null}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 space-y-5"
          >
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
                  autoComplete="current-password"
                  placeholder="Enter your password"
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

            <LoadingButton
              type="submit"
              loading={isSubmitting}
              className="h-11 w-full rounded-xl bg-blue-600 text-base text-white hover:bg-blue-700"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </LoadingButton>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
