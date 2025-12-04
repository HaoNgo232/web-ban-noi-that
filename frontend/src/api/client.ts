import axios from "axios";
import { useAuthStore } from "@/features/auth/store/auth.store";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Send cookies and auth headers for CORS
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = useAuthStore.getState().refreshToken;

      // Try to refresh token if available
      if (refreshToken) {
        try {
          const response = await axios.post<{
            accessToken: string;
            refreshToken: string;
          }>(`${API_URL}/auth/refresh`, {
            refreshToken,
          });

          // Use the new refresh token from response if provided, otherwise keep the old one
          const newRefreshToken = response.data.refreshToken || refreshToken;
          useAuthStore
            .getState()
            .setTokens(response.data.accessToken, newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed, logout user
          console.error("Token refresh failed:", refreshError);
          useAuthStore.getState().logout();
          globalThis.location.href = "/login";
          // Throw the original 401 error to preserve error context
          throw error;
        }
      } else {
        // No refresh token available, logout user immediately
        useAuthStore.getState().logout();
        globalThis.location.href = "/login";
        // Throw to stop the error chain (redirect will navigate away)
        throw error;
      }
    }

    throw error;
  },
);
