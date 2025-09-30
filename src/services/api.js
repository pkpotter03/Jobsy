import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // VERY IMPORTANT to send cookies
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't retry refresh token requests to avoid infinite loops
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/auth/refresh-token')) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh-token"); // this will set new access token cookie
        return api(originalRequest); // retry failed request
      } catch (err) {
        console.error("Refresh token failed:", err);
        window.location.href = "/login"; // logout if refresh also fails
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
