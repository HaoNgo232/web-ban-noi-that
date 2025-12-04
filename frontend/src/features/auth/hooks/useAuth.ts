import { useAuthStore } from "../store/auth.store";

/**
 * Hook to access authentication state and actions
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuth = useAuthStore((state) => state.setAuth);
  const setTokens = useAuthStore((state) => state.setTokens);
  const logout = useAuthStore((state) => state.logout);

  return {
    user,
    isAuthenticated,
    setAuth,
    setTokens,
    logout,
  };
}

/**
 * Hook to get current authenticated user
 */
export function useCurrentUser() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return {
    user,
    isAuthenticated,
  };
}
