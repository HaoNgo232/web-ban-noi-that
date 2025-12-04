"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Calendar } from "lucide-react"
import type { User as UserType } from "@/lib/types"

interface ProfileInfoProps {
  user: UserType
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <h2 className="font-semibold text-lg text-foreground">Thông tin cá nhân</h2>
          <Button variant="outline" size="sm">
            Chỉnh sửa
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Họ và tên</p>
              <p className="font-medium text-foreground">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Ngày tham gia</p>
              <p className="font-medium text-foreground">{formatDate(user.createdAt)}</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
