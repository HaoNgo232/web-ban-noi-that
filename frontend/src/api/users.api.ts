import { apiClient } from "./client";
import type { User, UpdateUserDto } from "@/types/user.types";

export const usersApi = {
  /**
   * Get user by ID
   * @param id User ID
   * @returns {Promise<User>}
   */
  async getUser(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  /**
   * Update user profile
   * @param id User ID
   * @param data UpdateUserDto
   * @returns {Promise<User>}
   */
  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${id}`, data);
    return response.data;
  },
};
