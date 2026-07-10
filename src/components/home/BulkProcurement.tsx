
import Link from "next/link"
import { Boxes, Building2, Landmark, GraduationCap, HeartHandshake, UserCheck } from "lucide-react"

import Container from "@/components/shared/Container"

const items = [
  { icon: Boxes, label: "Bulk ordering" },
  { icon: Building2, label: "Corporate accounts" },
  { icon: Landmark, label: "Government procurement" },
  { icon: GraduationCap, label: "School procurement" },
  { icon: HeartHandshake, label: "NGO procurement" },
  { icon: UserCheck, label: "Dedicated account management" },
]


export default function BulkProcurement() {
  return (
    <section className="bg-[#0B1220] py-16 text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[var(--rollin-gold)] uppercase">
              Business &amp; Bulk Procurement
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold">Technology procurement for businesses.</h2>
            <p className="mt-4 text-sm text-white/70">
              From a 10-person startup to a 5,000-seat ministry, Rollin handles sourcing,
              configuration, deployment and support. Net-30 invoicing available for verified
              accounts.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/procurement"
                className="rounded-lg bg-[var(--rollin-gold)] px-6 py-3 text-sm font-semibold text-[#24303A] transition hover:brightness-95"
              >
                Request a Quote
              </Link>
              <Link
                href="/procurement"
                className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {items.map((item) => (
              <div key={item.label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <span className="flex size-8 items-center justify-center rounded-md bg-primary/20 text-primary">
                  <item.icon className="size-4" />
                </span>
                <p className="mt-3 text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}