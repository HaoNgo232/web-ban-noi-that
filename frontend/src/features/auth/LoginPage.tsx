import { useNavigate } from "react-router";
import { useAuthStore } from "./store/auth.store";
import { authApi } from "@/api/auth.api";
import { LoginForm, type LoginFormData } from "./components/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { getErrorMessage } from "@/lib/api-error";

export function LoginPage() {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const response = await authApi.login(data);

            setAuth(
                {
                    id: response.user.id,
                    email: response.user.email,
                    firstName: response.user.firstName,
                    lastName: response.user.lastName,
                    role: response.user.role,
                },
                response.accessToken,
                response.refreshToken,
            );

            toast.success("Đăng nhập thành công!");
            navigate("/");
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(
                error,
                "Đăng nhập thất bại. Vui lòng thử lại.",
            );
            toast.error(errorMessage);
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Đăng nhập</CardTitle>
                    <CardDescription>
                        Nhập thông tin đăng nhập để tiếp tục
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
                </CardContent>
            </Card>
        </div>
    );
}

