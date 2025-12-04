import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "@/features/auth/store/auth.store";

interface ProtectedRouteProps {
    readonly children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login with return URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}

