import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProfileContent } from "@/features/user/components/profile-content"

export const metadata = {
  title: "Tài khoản - Habitat",
  description: "Quản lý tài khoản của bạn",
}

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ProfileContent />
      </main>
      <Footer />
    </>
  )
}
