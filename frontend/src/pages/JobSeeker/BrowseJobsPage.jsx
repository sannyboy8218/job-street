import { useEffect, useState } from "react";

import { getJobs } from "@/services/publicJob.service";
import JobCard from "@/components/jobs/JobCard";
import SearchBar from "@/components/employer/SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EMPTY_FILTERS = {
  search: "",
  location: "",
  employmentType: "ALL",
};

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("ALL");
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getJobs({
          search: appliedFilters.search,
          location: appliedFilters.location,
          employmentType:
            appliedFilters.employmentType === "ALL"
              ? undefined
              : appliedFilters.employmentType,
        });

        setJobs(data);
      } catch (loadError) {
        setError(
          loadError.response?.data?.message || "Failed to load jobs."
        );
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [appliedFilters]);

  const handleSearch = (event) => {
    event.preventDefault();

    setAppliedFilters({
      search: search.trim(),
      location: location.trim(),
      employmentType,
    });
  };

  const handleClear = () => {
    setSearch("");
    setLocation("");
    setEmploymentType("ALL");
    setAppliedFilters(EMPTY_FILTERS);
  };

  const hasFilters =
    appliedFilters.search ||
    appliedFilters.location ||
    appliedFilters.employmentType !== "ALL";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Browse Jobs</h1>
        <p className="mt-2 text-slate-500">
          Find your next career opportunity.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-[1fr_12rem_12rem_auto]"
      >
        <SearchBar value={search} onChange={setSearch} />

        <Input
          placeholder="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />

        <Select value={employmentType} onValueChange={setEmploymentType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All types</SelectItem>
            <SelectItem value="FULL_TIME">Full Time</SelectItem>
            <SelectItem value="PART_TIME">Part Time</SelectItem>
            <SelectItem value="CONTRACT">Contract</SelectItem>
            <SelectItem value="INTERNSHIP">Internship</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Search
          </Button>
          {hasFilters ? (
            <Button type="button" variant="outline" onClick={handleClear}>
              Clear
            </Button>
          ) : null}
        </div>
      </form>

      {loading ? (
        <div className="flex h-72 items-center justify-center text-slate-500">
          Loading jobs...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      ) : jobs.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
          {hasFilters
            ? "No jobs match your search. Try different filters."
            : "No open jobs right now. Check back soon."}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
