
import { ShieldCheck, Truck, BadgeCheck, CreditCard } from "lucide-react"

import Container from "@/components/shared/Container"

const items = [
  { icon: ShieldCheck, label: "Genuine Products" },
  { icon: Truck, label: "Nationwide Delivery" },
  { icon: BadgeCheck, label: "Warranty Support" },
  { icon: CreditCard, label: "Secure Payments" },
]


export default function TrustBar() {
  return (
    <section className="border-y bg-white py-6">
      <Container>
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-2">
              <item.icon className="size-4 text-primary" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}