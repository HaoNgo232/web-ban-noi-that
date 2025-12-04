import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { useProfile, useUpdateProfile } from "./hooks/useProfile";
import { ProfileInfo } from "./components/ProfileInfo";
import { ProfileForm } from "./components/ProfileForm";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { EmptyState } from "@/components/common/EmptyState";
import type { UpdateUserDto } from "@/types/user.types";

export function ProfilePage() {
    const { user: authUser } = useCurrentUser();
    const { data: user, isLoading, error } = useProfile();
    const updateProfile = useUpdateProfile();

    if (!authUser) {
        return (
            <EmptyState
                title="Chưa đăng nhập"
                description="Vui lòng đăng nhập để xem hồ sơ của bạn."
            />
        );
    }

    if (isLoading) {
        return (
            <div className="container py-8 flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error || !user) {
        return (
            <EmptyState
                title="Không thể tải thông tin"
                description="Có lỗi xảy ra khi tải thông tin hồ sơ. Vui lòng thử lại sau."
            />
        );
    }

    const handleSubmit = async (data: UpdateUserDto) => {
        if (!user.id) return;
        await updateProfile.mutateAsync({ id: user.id, data });
    };

    return (
        <div className="container py-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">Hồ sơ của tôi</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <ProfileInfo user={user} />
                </div>
                <div>
                    <ProfileForm
                        user={user}
                        onSubmit={handleSubmit}
                        isLoading={updateProfile.isPending}
                    />
                </div>
            </div>
        </div>
    );
}

