

import { Building2, Landmark, GraduationCap, HeartHandshake, Boxes, UserCheck } from "lucide-react"

import Container from "@/components/shared/Container"
import { PrincipleCard } from "@/components/marketing/PrincipleCard"
import { ProcurementForm } from "@/components/marketing/ProcurementForm"


export default function ProcurementPage() {
  return (
    <div>
      <section className="bg-[#0B1220] py-16 text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-wide text-[var(--rollin-gold)] uppercase">
              Business &amp; Bulk Procurement
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              Technology procurement for businesses.
            </h1>
            <p className="mt-4 text-white/70">
              From a 10-person startup to a 5,000-seat ministry, Rollin handles sourcing,
              configuration, deployment and support — with Net-30 invoicing available for
              verified accounts.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PrincipleCard
              icon={Boxes}
              title="Bulk ordering"
              description="Volume pricing on laptops, networking gear and accessories for teams of any size."
            />
            <PrincipleCard
              icon={Building2}
              title="Corporate accounts"
              description="Dedicated account managers and Net-30 invoicing for verified businesses."
            />
            <PrincipleCard
              icon={Landmark}
              title="Government procurement"
              description="Tender support and framework agreements for public sector organisations."
            />
            <PrincipleCard
              icon={GraduationCap}
              title="School procurement"
              description="Device fleets and classroom technology for schools and universities."
            />
            <PrincipleCard
              icon={HeartHandshake}
              title="NGO procurement"
              description="Preferential terms and delivery support for registered NGOs."
            />
            <PrincipleCard
              icon={UserCheck}
              title="Dedicated account management"
              description="A single point of contact from quote through delivery and after-sales."
            />
          </div>
        </Container>
      </section>

      <section className="bg-muted/30 py-16">
        <Container>
          <div className="mx-auto max-w-xl">
            <h2 className="text-center font-heading text-2xl font-bold text-foreground">
              Request a quote
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Tell us what you need and a procurement specialist will follow up within one
              business day.
            </p>
            <div className="mt-8">
              <ProcurementForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}