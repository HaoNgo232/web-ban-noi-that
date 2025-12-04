import { useNavigate } from "react-router";
import { authApi } from "@/api/auth.api";
import { RegisterForm, type RegisterFormData } from "./components/RegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { getErrorMessage } from "@/lib/api-error";

export function RegisterPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        try {
            await authApi.register({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone || undefined,
            });

            toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
            navigate("/login");
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(
                error,
                "Đăng ký thất bại. Vui lòng thử lại.",
            );
            toast.error(errorMessage);
            console.error("Register error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Đăng ký</CardTitle>
                    <CardDescription>
                        Tạo tài khoản mới để bắt đầu mua sắm
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
                </CardContent>
            </Card>
        </div>
    );
}

