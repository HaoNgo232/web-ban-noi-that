import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutSuccess } from "@/features/checkout/components/checkout-success"

export const metadata = {
  title: "Đặt hàng thành công - Habitat",
  description: "Đơn hàng của bạn đã được đặt thành công",
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <CheckoutSuccess />
      </main>
      <Footer />
    </>
  )
}
