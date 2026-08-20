import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="rounded-2xl border bg-white px-6 py-16 text-center shadow-sm">
      <p className="text-sm font-semibold text-blue-600">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-slate-500">
        That page does not exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="font-semibold text-blue-600 hover:underline"
        >
          Go home
        </Link>
        <Link
          to="/jobs"
          className="font-semibold text-blue-600 hover:underline"
        >
          Browse jobs
        </Link>
      </div>
    </div>
  );
}
