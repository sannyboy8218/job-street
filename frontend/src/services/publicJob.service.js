import api from "@/services/api";

export const getJobs = async () => {
  const { data } = await api.get("/jobs/public");
  return data.data;
};

export const getJob = async (id) => {
  const { data } = await api.get(`/jobs/public/${id}`);
  return data.data;
};