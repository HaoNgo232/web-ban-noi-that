"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Banknote, Building2 } from "lucide-react"

interface PaymentMethodProps {
  selectedMethod: string
  onSelect: (method: string) => void
}

const paymentMethods = [
  {
    id: "cod",
    name: "Thanh toán khi nhận hàng",
    description: "Thanh toán bằng tiền mặt khi nhận hàng",
    icon: Banknote,
  },
  {
    id: "bank-transfer",
    name: "Chuyển khoản ngân hàng",
    description: "Chuyển khoản qua ngân hàng hoặc ví điện tử",
    icon: Building2,
  },
  {
    id: "credit-card",
    name: "Thẻ tín dụng/ghi nợ",
    description: "Thanh toán bằng thẻ Visa, Mastercard",
    icon: CreditCard,
  },
]

export function PaymentMethod({ selectedMethod, onSelect }: PaymentMethodProps) {
  return (
    <Card className="p-6">
      <h2 className="font-semibold text-lg text-foreground mb-6">Phương thức thanh toán</h2>

      <RadioGroup value={selectedMethod} onValueChange={onSelect}>
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            return (
              <div
                key={method.id}
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                  selectedMethod === method.id ? "border-primary bg-primary/5" : "border-border hover:border-border/60"
                }`}
                onClick={() => onSelect(method.id)}
              >
                <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                <Icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <Label htmlFor={method.id} className="font-medium text-foreground cursor-pointer">
                    {method.name}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </RadioGroup>
    </Card>
  )
}
