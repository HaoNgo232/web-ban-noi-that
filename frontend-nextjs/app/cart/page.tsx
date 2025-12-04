import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartContent } from "@/features/cart/components/cart-content"

export const metadata = {
  title: "Giỏ hàng - Habitat",
  description: "Xem giỏ hàng của bạn",
}

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <CartContent />
      </main>
      <Footer />
    </>
  )
}
