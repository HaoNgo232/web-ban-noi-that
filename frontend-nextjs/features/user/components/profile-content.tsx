"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuthStore } from "@/features/auth/store/auth-store"
import { ProfileInfo } from "@/features/user/components/profile-info"
import { ProfileSettings } from "@/features/user/components/profile-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProfileContent() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!user) {
    return null
  }

  return (
    <div className="container px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">Tài khoản của bạn</h1>
        <p className="text-muted-foreground mb-8">Quản lý thông tin và cài đặt tài khoản</p>
      </motion.div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList>
          <TabsTrigger value="info">Thông tin</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <ProfileInfo user={user} />
        </TabsContent>

        <TabsContent value="settings">
          <ProfileSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
