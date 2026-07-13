import Image from "next/image"
import Link from "next/link"

import Container from "@/components/shared/Container"

export default function BulkProcurement() {
  return (
    <section className="bg-[#0B1220] py-16 text-white">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-wide text-[var(--rollin-gold)] uppercase">
              Buying for a Business or Organisation?
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold">Procurement made simple with Rollin</h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              Request a formal quotation, upload your procurement list, or speak with a dedicated account manager.
            </p>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              From a 10-person startup to a 5,000-seat ministry, Rollin handles sourcing, configuration, deployment and support. Net-30 invoicing available for verified accounts.
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

          <div className="relative h-64 w-full overflow-hidden rounded-xl sm:h-80">
            <Image
              src="https://central.rollin.ng/wp-content/uploads/2026/07/server_rollin.png"
              alt="Business technology and server procurement"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}