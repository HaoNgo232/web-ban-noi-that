import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/api/users.api";
import type { UpdateUserDto } from "@/types/user.types";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api-error";

/**
 * Hook to fetch user profile
 * @param id User ID (optional, defaults to current authenticated user)
 */
export function useProfile(id?: string) {
  const currentUserId = useAuthStore((state) => state.user?.id);
  const userId = id || currentUserId;

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => usersApi.getUser(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to update user profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const currentUserId = useAuthStore((state) => state.user?.id);
  const setAuth = useAuthStore((state) => state.setAuth);
  const currentUser = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      usersApi.updateUser(id, data),
    onSuccess: (updatedUser) => {
      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: ["user", updatedUser.id] });

      // Update auth store if updating current user
      if (currentUserId === updatedUser.id && currentUser) {
        setAuth(
          {
            id: updatedUser.id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            role: updatedUser.role,
          },
          useAuthStore.getState().accessToken!,
          useAuthStore.getState().refreshToken!,
        );
      }

      toast.success("Cập nhật hồ sơ thành công!");
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(
        error,
        "Có lỗi xảy ra khi cập nhật hồ sơ.",
      );
      toast.error(errorMessage);
      console.error("Error updating profile:", error);
    },
  });
}
