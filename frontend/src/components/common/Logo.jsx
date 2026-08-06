import hirehubIcon from "@/assets/hirehub-icon.png";
import { useAuth } from "@/context/AuthContext";
import { ROLES } from "@/constants/roles";

export default function Logo() {
  const { user } = useAuth();

  const portal =
    user?.role === ROLES.EMPLOYER
      ? "Employer Portal"
      : "Job Seeker Portal";

  return (
    <div className="flex items-center gap-4">
      {/* Icon */}
      <img
        src={hirehubIcon}
        alt="HireHub"
        className="h-20 w-20 object-contain"
      />

      {/* Text */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          HireHub
        </h1>

        <p className="text-sm font-medium text-slate-500">
          {portal}
        </p>
      </div>
    </div>
  );
}