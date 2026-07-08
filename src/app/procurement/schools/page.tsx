// TARGET PATH IN REPO: src/app/procurement/schools/page.tsx (new)
import { GraduationCap, Laptop, Wifi, LifeBuoy } from "lucide-react"

import Container from "@/components/shared/Container"
import { PrincipleCard } from "@/components/marketing/PrincipleCard"
import { SchoolForm } from "@/components/marketing/SchoolForm"

export default function SchoolProcurementPage() {
  return (
    <div>
      <section className="bg-[#0B1220] py-16 text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-wide text-[var(--rollin-gold)] uppercase">
              School Procurement
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              Classroom technology that survives a school term.
            </h1>
            <p className="mt-4 text-white/70">
              Device fleets, computer labs, and campus networking — sized to your student
              population and budget, with education-friendly payment terms.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PrincipleCard icon={GraduationCap} title="Education pricing" description="Volume discounts scaled to student and staff device counts." />
            <PrincipleCard icon={Laptop} title="Computer lab setup" description="Full lab builds from desktops to networking to imaging." />
            <PrincipleCard icon={Wifi} title="Campus networking" description="Wi-Fi coverage sized for classrooms, halls, and dormitories." />
            <PrincipleCard icon={LifeBuoy} title="Term-time support" description="Fast turnaround repairs so downtime doesn't cost class time." />
          </div>
        </Container>
      </section>

      <section className="bg-muted/30 py-16">
        <Container>
          <div className="mx-auto max-w-xl">
            <h2 className="text-center font-heading text-2xl font-bold text-foreground">
              Request a school quote
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Tell us about your school and a procurement specialist will follow up within one
              business day.
            </p>
            <div className="mt-8">
              <SchoolForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}