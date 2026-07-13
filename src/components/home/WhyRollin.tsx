
import { ShieldCheck, Truck, Wrench, Headphones, CreditCard, Building2 } from "lucide-react"

import Container from "@/components/shared/Container"

const items = [
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    description: "Sourced from authorised distributors with verifiable serials and full manufacturer warranty.",
  },
  {
    icon: Truck,
    title: "Fast Nationwide Delivery",
    description: "Same-day in Lagos, 24–72 hours across Nigeria, with insured logistics partners.",
  },
  {
    icon: Wrench,
    title: "Reliable After-Sales",
    description: "In-house service centre handles warranty claims, repairs and replacements end-to-end.",
  },
  {
    icon: Headphones,
    title: "Technical Consultation",
    description: "Talk to engineers who actually use the gear before you spend on it.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Card, bank transfer and corporate invoicing with PCI-compliant checkout.",
  },
  {
    icon: Building2,
    title: "Procurement Expertise",
    description: "Tender support, framework agreements and dedicated account managers.",
  },
]


export default function WhyRollin() {
  return (
    <section className="bg-muted/30 py-16">
      <Container>
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Why Rollin</p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Built for people who can&apos;t afford downtime.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-xl border bg-white p-5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-3 font-heading text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-base leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}