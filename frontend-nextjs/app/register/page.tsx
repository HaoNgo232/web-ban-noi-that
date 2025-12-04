import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RegisterForm } from "@/features/auth/components/register-form"

export const metadata = {
  title: "Đăng ký - Habitat",
  description: "Tạo tài khoản mới",
}

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-12 px-4">
        <RegisterForm />
      </main>
      <Footer />
    </>
  )
}
