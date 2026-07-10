// TARGET PATH IN REPO: src/app/about/page.tsx — REPLACE THE ENTIRE FILE
import Link from "next/link"
import { ShieldCheck, Users, Award, Truck, Building2, Wrench, Headphones, PackageCheck } from "lucide-react"

import Container from "@/components/shared/Container"
import { StatBlock } from "@/components/marketing/StatBlock"
import { PrincipleCard } from "@/components/marketing/PrincipleCard"

export default function AboutPage() {
  return (
    <div>
      <section className="bg-[#F0FDF4] py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">Family owned</p>
            <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Technology you can trust, sold the way it should be.
            </h1>
            <p className="mt-4 text-muted-foreground">
              We started Rollin because buying technology in Nigeria was too often unreliable —
              overpriced, unclear on warranty, and hard to reach for support. We built the opposite.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            <StatBlock value="5,000+" label="Customers served" />
            <StatBlock value="36" label="Corporate clients" />
            <StatBlock value="98%" label="On-time delivery" />
            <StatBlock value="4.9" label="Customer rating" />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-center font-heading text-2xl font-bold text-foreground">
            Four principles. Every interaction.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PrincipleCard
              icon={ShieldCheck}
              title="Authenticity first"
              description="Genuine products, verified serials, and full manufacturer warranty on everything we sell."
            />
            <PrincipleCard
              icon={Users}
              title="Customer obsession"
              description="Real people, fast responses, and honest guidance — before and after you buy."
            />
            <PrincipleCard
              icon={Award}
              title="Quality always"
              description="Every device is tested and inspected before it leaves our warehouse."
            />
            <PrincipleCard
              icon={PackageCheck}
              title="Quiet competence"
              description="We handle the logistics and paperwork so you don't have to think about it."
            />
          </div>
        </Container>
      </section>

      <section className="bg-muted/30 py-16">
        <Container>
          <h2 className="text-center font-heading text-2xl font-bold text-foreground">
            More than a store. A procurement partner.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PrincipleCard
              icon={Truck}
              title="Nationwide delivery"
              description="Same-day in Lagos, 2–5 days nationwide, with insured logistics partners."
            />
            <PrincipleCard
              icon={Building2}
              title="Corporate procurement"
              description="Tender support, framework agreements, and dedicated account managers."
            />
            <PrincipleCard
              icon={Wrench}
              title="Deployment & Installation"
              description="On-site setup, networking, and imaging for offices, schools, and NGOs."
            />
            <PrincipleCard
              icon={Headphones}
              title="Aftersales support"
              description="In-house service centre handles warranty claims, repairs and replacements end-to-end."
            />
          </div>
        </Container>
      </section>

      <section className="bg-[#0B1220] py-14 text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[var(--rollin-gold)] uppercase">Compliance</p>
              <h2 className="mt-2 font-heading text-2xl font-bold">Authorised. Accountable. Audited.</h2>
              <p className="mt-3 text-sm text-white/70">
                We operate as a registered, accountable business — not an anonymous storefront.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <span className="rounded-lg border border-white/15 bg-white/5 px-4 py-3">Registered business</span>
              <span className="rounded-lg border border-white/15 bg-white/5 px-4 py-3">Verified bank partner</span>
              <span className="rounded-lg border border-white/15 bg-white/5 px-4 py-3">Insured logistics</span>
              <span className="rounded-lg border border-white/15 bg-white/5 px-4 py-3">
                Manufacturer-authorised reseller
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-primary py-14 text-center text-white">
        <Container>
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">Ready to work with us?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/85">
            Whether you&apos;re placing a solo order or equipping a hundred-seat office, we&apos;re ready when you are.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/2348148464823"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
            >
              Chat on WhatsApp
            </a>
            {/* FIX — was a disabled PlaceholderLink; /procurement has existed for many rounds now */}
            <Link
              href="/procurement"
              className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Request a quote
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}