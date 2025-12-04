import { useSearchParams, Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function OrderConfirmationPage() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId") || "N/A";

    return (
        <div className="container py-12">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle className="text-2xl">Đặt hàng thành công!</CardTitle>
                        <CardDescription>
                            Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-muted rounded-lg p-4">
                            <p className="text-sm text-muted-foreground mb-1">
                                Mã đơn hàng
                            </p>
                            <p className="text-lg font-bold">{orderId}</p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-semibold">Bước tiếp theo:</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span>
                                        Chúng tôi sẽ gửi email xác nhận đơn hàng đến địa chỉ email
                                        của bạn
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span>
                                        Đơn hàng sẽ được xử lý trong vòng 1-2 ngày làm việc
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span>
                                        Bạn sẽ nhận được thông báo khi đơn hàng được giao đi
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button asChild variant="outline" className="flex-1">
                                <Link to="/products">Tiếp tục mua sắm</Link>
                            </Button>
                            <Button asChild className="flex-1">
                                <Link to="/">Về trang chủ</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

