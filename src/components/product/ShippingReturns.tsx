import { Truck, RotateCcw, ShieldCheck } from "lucide-react"


export function ShippingReturns() {
  const items = [
    {
      icon: Truck,
      title: "Delivery",
      description: "Same-day delivery within Lagos · 2–5 days nationwide.",
    },
    {
      icon: RotateCcw,
      title: "Returns",
      description: "Eligible items can be returned — full policy details coming soon.",
    },
    {
      icon: ShieldCheck,
      title: "Warranty",
      description: "Warranty claims handled end-to-end through Rollin's in-house service centre.",
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="flex flex-col gap-2">
          <item.icon className="size-5 text-primary" />
          <p className="font-heading text-sm font-semibold text-foreground">{item.title}</p>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
