import hirehubIcon from "@/assets/hirehub-icon.png";
import { useAuth } from "@/context/AuthContext";
import { ROLES } from "@/constants/roles";

export default function Logo({ compact = false }) {
  const { user } = useAuth();

  const portal =
    user?.role === ROLES.EMPLOYER
      ? "Employer Portal"
      : "Job Seeker Portal";

  return (
    <div className="flex items-center gap-3">
      <img
        src={hirehubIcon}
        alt="HireHub"
        className={
          compact
            ? "h-10 w-10 object-contain"
            : "h-20 w-20 object-contain"
        }
      />

      <div>
        <h1
          className={
            compact
              ? "text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50"
              : "text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50"
          }
        >
          HireHub
        </h1>

        <p className="text-sm font-medium text-slate-500">
          {portal}
        </p>
      </div>
    </div>
  );
}
