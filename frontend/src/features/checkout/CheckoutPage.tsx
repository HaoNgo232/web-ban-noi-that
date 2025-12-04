import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "@/features/cart/hooks/useCart";
import { ShippingForm, type ShippingFormData } from "./components/ShippingForm";
import { PaymentForm, type PaymentFormData } from "./components/PaymentForm";
import { OrderSummary } from "./components/OrderSummary";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export function CheckoutPage() {
    const navigate = useNavigate();
    const { isEmpty, clearCart } = useCart();
    const [shippingData, setShippingData] = useState<ShippingFormData | null>(
        null,
    );
    const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (isEmpty) {
        return (
            <div className="container py-12">
                <EmptyState
                    title="Giỏ hàng trống"
                    description="Bạn cần thêm sản phẩm vào giỏ hàng trước khi thanh toán"
                    icon={<ShoppingCart className="h-12 w-12 text-muted-foreground" />}
                    action={{
                        label: "Tiếp tục mua sắm",
                        to: "/products",
                    }}
                />
            </div>
        );
    }

    const handleShippingSubmit = (data: ShippingFormData) => {
        setShippingData(data);
        toast.success("Thông tin giao hàng đã được lưu");
    };

    const handlePaymentSubmit = (data: PaymentFormData) => {
        setPaymentData(data);
        toast.success("Phương thức thanh toán đã được chọn");
    };

    const handlePlaceOrder = async () => {
        if (!shippingData || !paymentData) {
            toast.error("Vui lòng điền đầy đủ thông tin giao hàng và thanh toán");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Generate order ID
            const orderId = `ORD-${Date.now()}`;

            // Clear cart
            clearCart();

            toast.success("Đặt hàng thành công!");

            // Navigate to confirmation page with order ID
            navigate(`/checkout/confirmation?orderId=${orderId}`);
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
            console.error("Order placement error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const canPlaceOrder = shippingData && paymentData;

    return (
        <div className="container py-8">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                    Thanh toán
                </h1>
                <p className="text-muted-foreground">
                    Vui lòng điền thông tin giao hàng và chọn phương thức thanh toán
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Forms */}
                <div className="lg:col-span-2 space-y-6">
                    <ShippingForm onSubmit={handleShippingSubmit} />
                    <PaymentForm onSubmit={handlePaymentSubmit} />

                    <div className="flex justify-end">
                        <Button
                            size="lg"
                            onClick={handlePlaceOrder}
                            disabled={!canPlaceOrder || isSubmitting}
                            className="w-full sm:w-auto sm:min-w-[200px]"
                        >
                            {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
                        </Button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}

