import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileSpreadsheet } from "lucide-react";

import {
  downloadApplicationReport,
  getApplicationReport,
} from "@/services/report.service";
import {
  APPLICATION_STATUSES,
  getApplicationStatusLabel,
} from "@/utils/application";
import ApplicationStatusBadge from "@/components/jobs/ApplicationStatusBadge";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function defaultRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 29);

  return {
    from: toDateInputValue(from),
    to: toDateInputValue(to),
  };
}

export default function EmployerReportsPage() {
  const defaults = defaultRange();
  const [from, setFrom] = useState(defaults.from);
  const [to, setTo] = useState(defaults.to);
  const [status, setStatus] = useState("ALL");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  const loadReport = async (filters = { from, to, status }) => {
    try {
      setLoading(true);
      setError("");
      const data = await getApplicationReport(filters);
      setRows(data);
    } catch (loadError) {
      setError(
        loadError.response?.data?.message || "Failed to load report."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const range = defaultRange();
    const loadInitial = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getApplicationReport({
          ...range,
          status: "ALL",
        });
        setRows(data);
      } catch (loadError) {
        setError(
          loadError.response?.data?.message || "Failed to load report."
        );
      } finally {
        setLoading(false);
      }
    };

    loadInitial();
  }, []);

  const handleGenerate = (event) => {
    event.preventDefault();

    if (from > to) {
      toast.error("From date must be on or before the To date.");
      return;
    }

    loadReport({ from, to, status });
  };

  const handleExport = async () => {
    if (from > to) {
      toast.error("From date must be on or before the To date.");
      return;
    }

    try {
      setExporting(true);
      await downloadApplicationReport({ from, to, status });
      toast.success("Excel file downloaded.");
    } catch (exportError) {
      toast.error(
        exportError.response?.data?.message || "Failed to download Excel."
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Export applications by the date they were submitted."
      />

      <form
        onSubmit={handleGenerate}
        className="grid gap-4 rounded-xl border bg-white p-4 md:grid-cols-[repeat(4,minmax(0,1fr))_auto] dark:border-slate-700 dark:bg-slate-900"
      >
        <div>
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            type="date"
            className="mt-2"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            type="date"
            className="mt-2"
            value={to}
            onChange={(event) => setTo(event.target.value)}
          />
        </div>

        <div>
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              {APPLICATION_STATUSES.map((item) => (
                <SelectItem key={item} value={item}>
                  {getApplicationStatusLabel(item)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end gap-2 md:col-span-2">
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Generate
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={exporting || loading}
            onClick={handleExport}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            {exporting ? "Downloading..." : "Download Excel"}
          </Button>
        </div>
      </form>

      {loading ? (
        <div className="flex h-72 items-center justify-center text-slate-500">
          Loading report...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          No applications in this date range.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white dark:border-slate-700 dark:bg-slate-900">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3 font-medium">Applicant</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Job</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date applied</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.email}-${row.jobTitle}-${index}`} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{row.applicantName}</td>
                  <td className="px-4 py-3 text-slate-600">{row.email}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {row.jobTitle}
                    {row.company ? ` · ${row.company}` : ""}
                  </td>
                  <td className="px-4 py-3">
                    <ApplicationStatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.appliedOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
