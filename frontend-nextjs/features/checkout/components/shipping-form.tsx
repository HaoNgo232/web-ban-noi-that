"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { Address } from "@/lib/types"

const shippingSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  address: z.string().min(5, "Vui lòng nhập địa chỉ"),
  city: z.string().min(2, "Vui lòng nhập thành phố"),
  district: z.string().min(2, "Vui lòng nhập quận/huyện"),
  ward: z.string().min(2, "Vui lòng nhập phường/xã"),
})

interface ShippingFormProps {
  onSubmit: (address: Address) => void
}

export function ShippingForm({ onSubmit }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>({
    resolver: zodResolver(shippingSchema),
  })

  const handleFormSubmit = (data: Address) => {
    onSubmit(data)
    toast.success("Đã lưu địa chỉ giao hàng")
  }

  return (
    <Card className="p-6">
      <h2 className="font-semibold text-lg text-foreground mb-6">Thông tin giao hàng</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Họ và tên *</Label>
            <Input id="fullName" placeholder="Nguyễn Văn A" {...register("fullName")} />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại *</Label>
            <Input id="phone" type="tel" placeholder="0912345678" {...register("phone")} />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Địa chỉ *</Label>
          <Input id="address" placeholder="123 Đường ABC" {...register("address")} />
          {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Thành phố *</Label>
            <Input id="city" placeholder="Hà Nội" {...register("city")} />
            {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="district">Quận/Huyện *</Label>
            <Input id="district" placeholder="Hoàn Kiếm" {...register("district")} />
            {errors.district && <p className="text-sm text-destructive">{errors.district.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ward">Phường/Xã *</Label>
            <Input id="ward" placeholder="Hàng Bạc" {...register("ward")} />
            {errors.ward && <p className="text-sm text-destructive">{errors.ward.message}</p>}
          </div>
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          Lưu địa chỉ
        </Button>
      </form>
    </Card>
  )
}
