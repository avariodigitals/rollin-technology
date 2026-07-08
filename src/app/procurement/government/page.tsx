// TARGET PATH IN REPO: src/app/procurement/government/page.tsx (new)
import { Landmark, FileCheck, Scale, Clock } from "lucide-react"

import Container from "@/components/shared/Container"
import { PrincipleCard } from "@/components/marketing/PrincipleCard"
import { GovernmentForm } from "@/components/marketing/GovernmentForm"

export default function GovernmentProcurementPage() {
  return (
    <div>
      <section className="bg-[#0B1220] py-16 text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-wide text-[var(--rollin-gold)] uppercase">
              Government Procurement
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              Technology for public sector organisations.
            </h1>
            <p className="mt-4 text-white/70">
              Tender support, framework agreements, and compliant documentation for ministries,
              agencies, and public institutions — from a single laptop order to a multi-seat rollout.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PrincipleCard icon={Landmark} title="Framework agreements" description="Pre-negotiated terms for repeat procurement without re-tendering each time." />
            <PrincipleCard icon={FileCheck} title="Tender documentation" description="Compliant quotations, specs sheets, and supporting paperwork on request." />
            <PrincipleCard icon={Scale} title="Transparent, auditable pricing" description="Itemised quotes built for public procurement review processes." />
            <PrincipleCard icon={Clock} title="Delivery against deadlines" description="Budget-cycle-aware delivery scheduling for time-bound allocations." />
          </div>
        </Container>
      </section>

      <section className="bg-muted/30 py-16">
        <Container>
          <div className="mx-auto max-w-xl">
            <h2 className="text-center font-heading text-2xl font-bold text-foreground">
              Request a government quote
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Include your tender or reference number if you have one — a procurement specialist
              will follow up within one business day.
            </p>
            <div className="mt-8">
              <GovernmentForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}