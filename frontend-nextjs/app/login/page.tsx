import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LoginForm } from "@/features/auth/components/login-form"

export const metadata = {
  title: "Đăng nhập - Habitat",
  description: "Đăng nhập vào tài khoản của bạn",
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-12 px-4">
        <LoginForm />
      </main>
      <Footer />
    </>
  )
}
