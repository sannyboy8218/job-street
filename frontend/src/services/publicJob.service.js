import api from "@/services/api";

export const getJobs = async (filters = {}) => {
  const params = {};

  if (filters.search) {
    params.search = filters.search;
  }

  if (filters.location) {
    params.location = filters.location;
  }

  if (filters.employmentType) {
    params.employmentType = filters.employmentType;
  }

  const { data } = await api.get("/jobs/public", { params });
  return data.data;
};

export const getJob = async (id) => {
  const { data } = await api.get(`/jobs/public/${id}`);
  return data.data;
};
