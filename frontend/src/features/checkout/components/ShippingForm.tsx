import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const shippingSchema = z.object({
    firstName: z.string().min(1, "Họ là bắt buộc"),
    lastName: z.string().min(1, "Tên là bắt buộc"),
    phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số"),
    address: z.string().min(1, "Địa chỉ là bắt buộc"),
    city: z.string().min(1, "Thành phố là bắt buộc"),
    postalCode: z.string().min(5, "Mã bưu điện phải có ít nhất 5 ký tự"),
    notes: z.string().optional(),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
    readonly onSubmit: (data: ShippingFormData) => void;
    readonly defaultValues?: Partial<ShippingFormData>;
}

export function ShippingForm({ onSubmit, defaultValues }: ShippingFormProps) {
    const form = useForm<ShippingFormData>({
        resolver: zodResolver(shippingSchema),
        defaultValues: {
            firstName: defaultValues?.firstName || "",
            lastName: defaultValues?.lastName || "",
            phone: defaultValues?.phone || "",
            address: defaultValues?.address || "",
            city: defaultValues?.city || "",
            postalCode: defaultValues?.postalCode || "",
            notes: defaultValues?.notes || "",
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin giao hàng</CardTitle>
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
                                            <Input placeholder="Nhập họ" {...field} />
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
                                            <Input placeholder="Nhập tên" {...field} />
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
                                    <FormLabel>Số điện thoại *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="0123456789"
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
                                    <FormLabel>Địa chỉ *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Số nhà, tên đường" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thành phố *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Thành phố" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mã bưu điện *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="700000" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ghi chú (tùy chọn)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ghi chú cho người giao hàng"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

