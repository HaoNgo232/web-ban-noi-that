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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet, Building2 } from "lucide-react";

const paymentSchema = z.object({
    method: z.enum(["cod", "bank", "card"]).refine(
        (val) => val !== undefined,
        {
            message: "Vui lòng chọn phương thức thanh toán",
        },
    ),
    cardNumber: z.string().optional(),
    cardHolder: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
    readonly onSubmit: (data: PaymentFormData) => void;
    readonly defaultValues?: Partial<PaymentFormData>;
}

export function PaymentForm({ onSubmit, defaultValues }: PaymentFormProps) {
    const form = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            method: defaultValues?.method || "cod",
            cardNumber: defaultValues?.cardNumber || "",
            cardHolder: defaultValues?.cardHolder || "",
            expiryDate: defaultValues?.expiryDate || "",
            cvv: defaultValues?.cvv || "",
        },
    });

    const selectedMethod = form.watch("method");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Phương thức thanh toán</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="method"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="grid grid-cols-1 gap-4"
                                        >
                                            <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                                                <RadioGroupItem value="cod" id="cod" />
                                                <Label
                                                    htmlFor="cod"
                                                    className="flex-1 cursor-pointer font-normal"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Wallet className="h-5 w-5" />
                                                        <div>
                                                            <div className="font-medium">
                                                                Thanh toán khi nhận hàng (COD)
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                Thanh toán bằng tiền mặt khi nhận hàng
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Label>
                                            </div>

                                            <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                                                <RadioGroupItem value="bank" id="bank" />
                                                <Label
                                                    htmlFor="bank"
                                                    className="flex-1 cursor-pointer font-normal"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="h-5 w-5" />
                                                        <div>
                                                            <div className="font-medium">
                                                                Chuyển khoản ngân hàng
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                Chuyển khoản qua tài khoản ngân hàng
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Label>
                                            </div>

                                            <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
                                                <RadioGroupItem value="card" id="card" />
                                                <Label
                                                    htmlFor="card"
                                                    className="flex-1 cursor-pointer font-normal"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="h-5 w-5" />
                                                        <div>
                                                            <div className="font-medium">Thẻ tín dụng</div>
                                                            <div className="text-sm text-muted-foreground">
                                                                Thanh toán bằng thẻ tín dụng/ghi nợ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {selectedMethod === "card" && (
                            <div className="space-y-4 border-t pt-4">
                                <FormField
                                    control={form.control}
                                    name="cardNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Số thẻ</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength={19}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cardHolder"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tên chủ thẻ</FormLabel>
                                            <FormControl>
                                                <Input placeholder="NGUYEN VAN A" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="expiryDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ngày hết hạn</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="MM/YY" maxLength={5} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cvv"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CVV</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="123"
                                                        maxLength={3}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

