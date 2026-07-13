import type { Metadata } from "next"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Warranty Policy — Rollin Technology",
  description: "Warranty terms for new and used products sold by Rollin Technology in Nigeria.",
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-heading text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  )
}

export default function WarrantyPolicyPage() {
  return (
    <div className="bg-white">
      <div className="bg-[#F0FDF4] py-14">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Warranty Policy</h1>
          <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        </Container>
      </div>

      <Container>
        <div className="mx-auto max-w-3xl py-12">
          <PolicySection title="1. Overview">
            <p>
              This Warranty Policy explains the warranty coverage for products purchased from Rollin Technology. Coverage varies depending on whether a product is new, open-box, or used/pre-owned. By purchasing from us, you acknowledge and accept the warranty terms applicable to the specific product category, as stated on the product page and your order confirmation.
            </p>
          </PolicySection>

          <PolicySection title="2. New Products">
            <p>
              New products sold by Rollin Technology carry the full manufacturer warranty applicable in Nigeria, where available. Manufacturer warranty periods and terms vary by brand and product category. Typical coverage ranges from 12 months to 36 months for electronics, solar equipment, and appliances.
            </p>
            <p>
              Our role is to facilitate warranty claims on your behalf. We maintain direct relationships with authorised distributors and service centres in Nigeria to ensure claims are handled efficiently. We do not provide a separate warranty beyond the manufacturer warranty for new products.
            </p>
            <p>
              To initiate a warranty claim for a new product, contact our support team with your proof of purchase and a description of the fault. We will coordinate inspection, repair, or replacement through the manufacturer’s authorised service network.
            </p>
          </PolicySection>

          <PolicySection title="3. Open-Box Products">
            <p>
              Open-box products are items that have been returned unused, used for display, or had their packaging opened for inspection. These products are tested by our technicians before resale and are sold at a discount.
            </p>
            <p>
              Open-box products carry the remaining balance of the manufacturer warranty, if transferable, or a Rollin Technology warranty of <strong>90 days</strong> from the date of delivery, whichever is longer. The warranty coverage is limited to functional defects and does not cover cosmetic imperfections, packaging damage, or missing accessories unless explicitly stated at the time of purchase.
            </p>
          </PolicySection>

          <PolicySection title="4. Used / Pre-Owned Products">
            <p>
              Used and pre-owned products are sold on an &ldquo;as-is&rdquo; basis with limited warranty protection. Due to the inherent risks of second-hand electronics, we apply a restricted warranty designed to protect the buyer against immediate functional failure while limiting our exposure to latent defects.
            </p>
            <p className="font-medium text-foreground">
              Used/pre-owned products carry a <strong>7-day functionality warranty</strong> from the date of delivery.
            </p>
            <p>This limited warranty covers only the following:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Failure to power on or boot to the manufacturer’s default state.</li>
              <li>Critical hardware failure of the core system (e.g., motherboard, CPU, inverter board, solar charge controller) that renders the product unusable for its intended purpose.</li>
              <li>Failure of the primary battery to hold a charge (for laptops and power stations), provided the battery is not user-replaceable and the product was advertised as having a working battery.</li>
            </ul>
            <p>This limited warranty <strong>does not</strong> cover:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cosmetic wear, scratches, dents, screen discolouration, or minor pixel defects that do not affect functionality.</li>
              <li>Reduced battery health or capacity below the level advertised at the time of sale.</li>
              <li>Software issues, viruses, malware, or data loss.</li>
              <li>Damage caused by power surges, incorrect voltage, misuse, negligence, liquid ingress, or unauthorised repair or modification.</li>
              <li>Peripheral or accessory failures (e.g., chargers, cables, keyboards, mice, remote controls) unless explicitly included in the warranty description.</li>
              <li>Gradual performance degradation or noise that is typical for the age of the device.</li>
            </ul>
            <p>
              Remedy for used items under the 7-day warranty is limited to a <strong>replacement with an equivalent unit</strong> or <strong>store credit</strong> at our discretion. No cash refunds are provided for used/pre-owned items after the 48-hour defect-reporting window (which is handled under the Refund Policy).
            </p>
            <p>
              We strongly encourage customers to inspect and test used products thoroughly upon receipt. The 7-day warranty period begins on the delivery date and expires at midnight of the 7th day, regardless of whether the product has been used.
            </p>
          </PolicySection>

          <PolicySection title="5. Warranty Claim Procedure">
            <p>
              To make a warranty claim, follow these steps:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Contact our support team via email or phone within the applicable warranty period.</li>
              <li>Provide your order number, proof of purchase, and a clear description of the defect or failure. Include photographs or video where possible.</li>
              <li>Our technical team will assess the claim remotely and may request that the item be brought to or collected by our service centre for physical inspection.</li>
              <li>We aim to resolve claims within 5–10 business days from the date of receipt of the item at our service centre. Resolution may be repair, replacement, or store credit, depending on the nature of the fault and product availability.</li>
            </ol>
            <p>
              Items must be returned in the condition they were received, with all accessories, manuals, and original packaging where applicable. Failure to return these may void the warranty or result in a reduced remedy.
            </p>
          </PolicySection>

          <PolicySection title="6. Exclusions (All Product Categories)">
            <p>
              The following exclusions apply to all warranty claims, regardless of product condition:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Damage caused by misuse, abuse, negligence, accident, fire, liquid, or unauthorised modification or repair.</li>
              <li>Damage caused by power surges, electrical faults, or use with incompatible voltage or accessories.</li>
              <li>Normal wear and tear, including gradual battery degradation, cosmetic fading, and hinge loosening.</li>
              <li>Software or data issues, including operating system corruption, virus infection, or third-party software incompatibility.</li>
              <li>Loss or theft of the product after delivery.</li>
              <li>Products where the serial number has been removed, altered, or defaced.</li>
              <li>Products purchased from unauthorised resellers or individuals (not through Rollin Technology).</li>
            </ul>
          </PolicySection>

          <PolicySection title="7. No Implied Warranties">
            <p>
              To the maximum extent permitted by Nigerian law, Rollin Technology disclaims all implied warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Our liability is limited to the remedies expressly stated in this policy. We do not guarantee uninterrupted or error-free operation of any product.
            </p>
          </PolicySection>

          <PolicySection title="8. Third-Party and Extended Warranties">
            <p>
              Extended warranty plans, if offered by third-party providers, are governed by the terms of the third-party provider. Rollin Technology is not responsible for the administration or fulfilment of third-party warranties. Please review the terms of any extended warranty plan before purchase.
            </p>
          </PolicySection>

          <PolicySection title="9. Changes to This Policy">
            <p>
              We may update this Warranty Policy from time to time. Any changes will be posted on this page with an updated revision date. The policy in effect at the time of your purchase will apply to that order.
            </p>
          </PolicySection>

          <PolicySection title="10. Contact Us">
            <p>
              For warranty claims, technical support, or questions about this policy, please contact us:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email: <a href="mailto:support@rollin.ng" className="text-primary underline">support@rollin.ng</a></li>
              <li>Phone: +234 814 846 4823</li>
              <li>Address: Block 505, Kodesho Street, Ikeja, Lagos, Nigeria</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              For unresolved disputes, you may also contact the Consumer Protection Council (CPC) or the relevant state consumer protection agency in Nigeria.
            </p>
          </PolicySection>
        </div>
      </Container>
    </div>
  )
}
