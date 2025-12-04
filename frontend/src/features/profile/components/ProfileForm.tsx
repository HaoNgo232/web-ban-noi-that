import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { User, UpdateUserDto } from "@/types/user.types";

const profileSchema = z.object({
    firstName: z.string().min(1, "Họ là bắt buộc"),
    lastName: z.string().min(1, "Tên là bắt buộc"),
    phone: z.string().optional(),
    address: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
    readonly user: User;
    readonly onSubmit: (data: UpdateUserDto) => Promise<void>;
    readonly isLoading?: boolean;
}

export function ProfileForm({ user, onSubmit, isLoading = false }: ProfileFormProps) {
    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phone: user.phone || "",
            address: user.address || "",
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Chỉnh sửa hồ sơ</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Họ *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nguyễn" disabled={isLoading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Văn A" disabled={isLoading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số điện thoại</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="0123456789"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Địa chỉ</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, thành phố"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Lưu thay đổi
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

