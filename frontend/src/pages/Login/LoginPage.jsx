import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

import hirehubLogo from "@/assets/hirehub-icon.png";
import { useAuth } from "@/context/AuthContext";
import { ROLES } from "@/constants/roles";

const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const user = await login(data);

      if (user.role === ROLES.EMPLOYER) {
        navigate("/employer/dashboard");
      } else {
        navigate("/jobseeker/dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed."
      );
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">

        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-20">

          <img
            src={hirehubLogo}
            alt="HireHub"
            className="w-28 mb-8 drop-shadow-lg"
          />

          <h1 className="text-6xl font-black tracking-tight">
            HireHub
          </h1>

          <p className="mt-5 text-2xl text-blue-100">
            Find Jobs.
            <br />
            Hire Talent.
            <br />
            Grow Careers.
          </p>

          <div className="mt-14 space-y-6">

            <div className="flex items-center gap-4">
              <CheckCircle size={26} />
              <span className="text-lg">
                Thousands of job opportunities
              </span>
            </div>

            <div className="flex items-center gap-4">
              <CheckCircle size={26} />
              <span className="text-lg">
                Verified employers
              </span>
            </div>

            <div className="flex items-center gap-4">
              <CheckCircle size={26} />
              <span className="text-lg">
                Fast & secure applications
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex items-center justify-center bg-slate-50 px-6 py-10">

        <Card className="w-full max-w-md rounded-3xl border-0 shadow-2xl">

          <CardContent className="p-10">

            {/* Mobile Logo */}

            <div className="lg:hidden text-center mb-10">

              <img
                src={hirehubLogo}
                alt="HireHub"
                className="mx-auto w-20"
              />

              <h1 className="mt-4 text-4xl font-black">
                HireHub
              </h1>

            </div>

            <h2 className="text-4xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to continue your journey.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 space-y-6"
            >

              <div>

                <Label>Email Address</Label>

                <div className="relative mt-2">

                  <Mail
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <Input
                    className="pl-11 h-12 rounded-xl"
                    placeholder="you@example.com"
                    {...register("email")}
                  />

                </div>

                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}

              </div>

              <div>

                <Label>Password</Label>

                <div className="relative mt-2">

                  <Lock
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <Input
                    type="password"
                    className="pl-11 h-12 rounded-xl"
                    placeholder="••••••••"
                    {...register("password")}
                  />

                </div>

                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}

              </div>

              <div className="text-right">

                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>

              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl text-base"
              >
                Sign In

                <ArrowRight
                  className="ml-2"
                  size={18}
                />
              </Button>

            </form>

            <div className="mt-8 text-center text-sm text-slate-500">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:underline"
              >
                Create one
              </Link>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}