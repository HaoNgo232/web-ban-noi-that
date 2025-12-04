import { apiClient } from "./client";
import type { LoginDto, AuthResponse } from "@/types/auth.types";

/**
 * Class for handling authentication API requests.
 */
class AuthApi {
  /**
   * Login with email and password
   * @param credentials {LoginDto}
   * @returns {Promise<AuthResponse>}
   */
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  }

  /**
   * Register new user
   * @param userData User registration data
   * @returns {Promise<AuthResponse>}
   */
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      userData,
    );
    return response.data;
  }

  /**
   * Refresh access token
   * @param refreshToken Refresh token string
   * @returns {Promise<AuthResponse>}
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  }
}

export const authApi = new AuthApi();
