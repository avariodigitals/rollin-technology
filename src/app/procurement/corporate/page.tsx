
import { Building2, Users, Shield, FileText } from "lucide-react"

import Container from "@/components/shared/Container"
import { PrincipleCard } from "@/components/marketing/PrincipleCard"
import { CorporateForm } from "@/components/marketing/CorporateForm"

export default function CorporateAccountsPage() {
  return (
    <div>
      <section className="bg-[#0B1220] py-16 text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-wide text-[var(--rollin-gold)] uppercase">
              Corporate Accounts
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              Technology procurement for growing businesses.
            </h1>
            <p className="mt-4 text-white/70">
              From onboarding new hires to refreshing an entire office fleet, get dedicated
              account management, Net-30 invoicing, and volume pricing built for how your
              business actually operates.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PrincipleCard icon={Building2} title="Dedicated account manager" description="One point of contact for every order, question, and renewal." />
            <PrincipleCard icon={Users} title="Employee onboarding kits" description="Standardised device bundles ready to ship on day one." />
            <PrincipleCard icon={FileText} title="Net-30 invoicing" description="Verified business accounts can order now, pay on terms." />
            <PrincipleCard icon={Shield} title="Asset warranty tracking" description="Centralised warranty records across your whole fleet." />
          </div>
        </Container>
      </section>

      <section className="bg-muted/30 py-16">
        <Container>
          <div className="mx-auto max-w-xl">
            <h2 className="text-center font-heading text-2xl font-bold text-foreground">
              Set up a corporate account
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Tell us about your business and a dedicated account manager will follow up within
              one business day.
            </p>
            <div className="mt-8">
              <CorporateForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}