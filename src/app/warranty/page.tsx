import type { Metadata } from "next"
import { ShieldCheck, Wrench, Clock, AlertTriangle, FileText, Phone } from "lucide-react"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Warranty Information — Rollin Technology",
  description: "Warranty coverage, claim procedures, and support for products purchased from Rollin Technology in Nigeria.",
}

function InfoCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#F0FDF4] text-primary">
          <Icon className="size-5" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

export default function WarrantyPage() {
  return (
    <div className="bg-white">
      <div className="bg-[#F0FDF4] py-14">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Warranty Information</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Everything you need to know about warranty coverage, how to file a claim, and what to expect when you purchase from Rollin Technology.
          </p>
        </Container>
      </div>

      <Container>
        <div className="mx-auto max-w-4xl py-12">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard icon={ShieldCheck} title="Manufacturer Warranty">
              <p>
                All new products carry the full manufacturer warranty applicable in Nigeria. Coverage periods vary by brand and product category, typically ranging from 12 to 36 months for electronics, solar equipment, and appliances.
              </p>
              <p className="mt-2">
                We act as your intermediary with authorised service centres. You do not need to contact the manufacturer directly — we handle the entire claim process end-to-end.
              </p>
            </InfoCard>

            <InfoCard icon={Clock} title="Warranty Periods">
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>New products:</strong> Full manufacturer warranty (12–36 months)</li>
                <li><strong>Open-box items:</strong> 90 days from delivery or remaining manufacturer warranty, whichever is longer</li>
                <li><strong>Used / pre-owned items:</strong> 7-day functionality warranty only</li>
              </ul>
              <p className="mt-2">
                Warranty periods begin on the date of delivery, not the date of purchase.
              </p>
            </InfoCard>

            <InfoCard icon={Wrench} title="How to Claim">
              <ol className="list-decimal pl-4 space-y-1">
                <li>Contact our support team via email or phone within the warranty period.</li>
                <li>Provide your order number, proof of purchase, and a clear description of the fault.</li>
                <li>Include photos or video of the issue if applicable.</li>
                <li>Our technical team will assess the claim and may request the item for inspection.</li>
                <li>We aim to resolve claims within 5–10 business days of receiving the item.</li>
              </ol>
            </InfoCard>

            <InfoCard icon={AlertTriangle} title="What Is Not Covered">
              <ul className="list-disc pl-4 space-y-1">
                <li>Physical damage from drops, liquid ingress, or misuse</li>
                <li>Unauthorised repair or modification by third parties</li>
                <li>Damage from power surges or incompatible voltage</li>
                <li>Normal wear and tear (battery degradation, hinge loosening, cosmetic fading)</li>
                <li>Software issues, viruses, or data loss</li>
                <li>Loss or theft after delivery</li>
                <li>Products with removed or altered serial numbers</li>
              </ul>
            </InfoCard>
          </div>

          <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#F0FDF4] text-primary">
                <FileText className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Important Notes</h3>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong>Manufacturer warranty only:</strong> For new products, Rollin Technology does not provide a separate warranty beyond what the manufacturer offers. Our value lies in managing the claim on your behalf, so you deal with one point of contact instead of navigating brand service centres yourself.
              </p>
              <p>
                <strong>Original packaging:</strong> While not strictly required, keeping the original packaging and accessories can speed up the return and inspection process. Missing items may result in a reduced remedy or rejection of the claim.
              </p>
              <p>
                <strong>Used item limitation:</strong> Used and pre-owned items are sold with a 7-day functionality warranty only. This is a limited warranty designed to cover immediate failure of core components. Cosmetic issues, battery capacity, and gradual performance degradation are expected for used items and are not covered. Remedy is limited to replacement with an equivalent unit or store credit.
              </p>
              <p>
                <strong>Extended warranties:</strong> Third-party extended warranty plans, if available, are governed by the terms of the third-party provider. Rollin Technology is not responsible for the administration or fulfilment of these plans.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl border bg-[#F0FDF4] p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white text-primary">
                <Phone className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Need Help With a Warranty Claim?</h3>
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>
                Our support team is available to assist you with warranty claims, technical questions, and returns.
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Email: <a href="mailto:support@rollin.ng" className="text-primary underline">support@rollin.ng</a></li>
                <li>Phone: +234 814 846 4823</li>
                <li>In-person: Block 505, Kodesho Street, Ikeja, Lagos</li>
              </ul>
              <p className="mt-2">
                For the full legal warranty terms, please review our <a href="/warranty-policy" className="text-primary underline">Warranty Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
