import api from "@/services/api";

export const getApplicationReport = async (filters) => {
  const params = {
    from: filters.from,
    to: filters.to,
  };

  if (filters.status && filters.status !== "ALL") {
    params.status = filters.status;
  }

  const { data } = await api.get("/reports/applications", { params });
  return data.data;
};

export const downloadApplicationReport = async (filters) => {
  const params = {
    from: filters.from,
    to: filters.to,
  };

  if (filters.status && filters.status !== "ALL") {
    params.status = filters.status;
  }

  try {
    const response = await api.get("/reports/applications/export", {
      params,
      responseType: "blob",
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `hirehub-applications-${filters.from}-to-${filters.to}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    if (error.response?.data instanceof Blob) {
      try {
        const parsed = JSON.parse(await error.response.data.text());
        error.response.data = parsed;
      } catch {
        // Keep the original error if the body is not JSON.
      }
    }

    throw error;
  }
};
