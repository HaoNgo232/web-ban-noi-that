import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/types/user.types";
import { UserRole, UserStatus } from "@/types/user.types";
// Simple date formatter (no date-fns dependency)
function formatDate(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

function formatDateTime(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

interface ProfileInfoProps {
    readonly user: User;
}

const roleLabels: Record<UserRole, string> = {
    ADMIN: "Quản trị viên",
    CUSTOMER: "Khách hàng",
    STAFF: "Nhân viên",
};

const statusLabels: Record<UserStatus, string> = {
    ACTIVE: "Hoạt động",
    INACTIVE: "Không hoạt động",
    BANNED: "Bị cấm",
};

export function ProfileInfo({ user }: ProfileInfoProps) {
    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin tài khoản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Avatar and Name */}
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-xl font-semibold">{fullName}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </div>

                <Separator />

                {/* Role and Status */}
                <div className="flex items-center gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Vai trò</p>
                        <Badge variant="secondary">{roleLabels[user.role]}</Badge>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Trạng thái</p>
                        <Badge
                            variant={user.status === UserStatus.ACTIVE ? "default" : "outline"}
                        >
                            {statusLabels[user.status]}
                        </Badge>
                    </div>
                </div>

                <Separator />

                {/* Contact Info */}
                <div className="space-y-3">
                    <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email}</p>
                    </div>
                    {user.phone && (
                        <div>
                            <p className="text-sm text-muted-foreground">Số điện thoại</p>
                            <p className="font-medium">{user.phone}</p>
                        </div>
                    )}
                    {user.address && (
                        <div>
                            <p className="text-sm text-muted-foreground">Địa chỉ</p>
                            <p className="font-medium">{user.address}</p>
                        </div>
                    )}
                </div>

                <Separator />

                {/* Account Dates */}
                <div className="space-y-3 text-sm">
                    {user.createdAt && (
                        <div>
                            <p className="text-muted-foreground">Ngày tạo tài khoản</p>
                            <p className="font-medium">{formatDate(user.createdAt)}</p>
                        </div>
                    )}
                    {user.lastLoginAt && (
                        <div>
                            <p className="text-muted-foreground">Đăng nhập lần cuối</p>
                            <p className="font-medium">{formatDateTime(user.lastLoginAt)}</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

