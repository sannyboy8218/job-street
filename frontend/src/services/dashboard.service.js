import api from "./api";

export const getEmployerDashboard = async () => {
  const { data } = await api.get("/dashboard/employer");
  return data.data;
};