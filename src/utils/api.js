const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.message || `Request failed (${response.status}).`);
    error.status = response.status;
    window.dispatchEvent(new CustomEvent("api-error", { detail: error.message }));
    throw error;
  }
  window.dispatchEvent(new Event("api-success"));
  return result;
}

export async function persistCollection(collection, records) {
  return apiRequest(`/admin/data/${collection}`, {
    method: "PUT",
    body: { records },
  });
}
