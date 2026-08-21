import { cn } from "@/lib/utils";

export default function AuthFormCard({ className, children }) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-700 dark:bg-slate-900",
        "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-500",
        className
      )}
    >
      {children}
    </div>
  );
}
