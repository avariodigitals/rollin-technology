import { Truck, RotateCcw, ShieldCheck } from "lucide-react"

/**
 * DESIGN NOTE: "Shipping & Returns" tab content isn't shown in the
 * supplied Figma (the tab exists; its panel content is cut off / not
 * included in the screenshot).
 *
 * SOURCING (per code review request to verify): the delivery line is
 * copied verbatim from the Product Detail page's own bullet list
 * ("Same-day delivery within Lagos · 2–5 days nationwide" — visible in
 * the HP EliteBook Figma frame). The warranty line paraphrases the About
 * page's "Reliable After-Sales" copy ("In-house service centre handles
 * warranty claims, repairs and replacements end-to-end" — visible in the
 * About Us Figma frame), not invented. The returns line intentionally
 * avoids committing to a specific policy (day count, conditions) since no
 * source for that exists anywhere in the supplied materials.
 */
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
