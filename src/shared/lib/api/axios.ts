import axios from "axios";

// Create axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to request headers
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("accessToken");
    // If token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If response status is 401, remove token from localStorage and redirect to login page
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
