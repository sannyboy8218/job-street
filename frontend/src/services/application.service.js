import api from "@/services/api";

export const applyToJob = async (data) => {
  const response = await api.post("/applications", data);
  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/me");
  return response.data.data;
};
export const getApplicantsByJob = async (jobId) => {
  const response = await api.get(
    `/applications/job/${jobId}`
  );

  return response.data.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.patch(
    `/applications/${applicationId}/status`,
    { status }
  );

  return response.data.data;
};

export const markJobViewed = async (jobId) => {
  await api.post(`/applications/viewed/${jobId}`);
};