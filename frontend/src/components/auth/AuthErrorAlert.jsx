export default function AuthErrorAlert({ children }) {
  return (
    <div
      role="alert"
      className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-2 motion-safe:duration-300 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
    >
      {children}
    </div>
  );
}
