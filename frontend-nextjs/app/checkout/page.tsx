import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutContent } from "@/features/checkout/components/checkout-content"

export const metadata = {
  title: "Thanh toán - Habitat",
  description: "Hoàn tất đơn hàng của bạn",
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-secondary/20">
        <CheckoutContent />
      </main>
      <Footer />
    </>
  )
}
