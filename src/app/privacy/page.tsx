import type { Metadata } from "next"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Privacy Policy — Rollin Technology",
  description: "How Rollin Technology collects, uses, and protects your personal data in compliance with the Nigeria Data Protection Regulation (NDPR).",
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

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <div className="bg-[#F0FDF4] py-14">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        </Container>
      </div>

      <Container>
        <div className="mx-auto max-w-3xl py-12">
          <PolicySection title="1. Introduction">
            <p>
              Rollin Technology (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you visit our website, use our services, or make purchases. We operate in compliance with the Nigeria Data Protection Regulation (NDPR) and the Nigeria Data Protection Act, 2023.
            </p>
          </PolicySection>

          <PolicySection title="2. Data We Collect">
            <p>We collect the following categories of personal data:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Identity data:</strong> name, title, date of birth, and contact details.</li>
              <li><strong>Contact data:</strong> billing and delivery address, email address, phone number.</li>
              <li><strong>Transaction data:</strong> details of products you have purchased, payment information (processed securely by our payment partners), and order history.</li>
              <li><strong>Technical data:</strong> IP address, browser type and version, device identifiers, and location data.</li>
              <li><strong>Usage data:</strong> how you use our website, products, and services.</li>
              <li><strong>Marketing data:</strong> your preferences in receiving marketing communications.</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. How We Collect Your Data">
            <p>
              We collect data directly from you when you register an account, place an order, complete a form, subscribe to our newsletter, or contact our support team. We also collect technical and usage data automatically through cookies and similar tracking technologies.
            </p>
          </PolicySection>

          <PolicySection title="4. Lawful Basis for Processing">
            <p>
              Under the NDPR, we process your personal data on the following lawful bases:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contractual necessity:</strong> to fulfil your orders and provide customer support.</li>
              <li><strong>Consent:</strong> for marketing communications and optional cookies.</li>
              <li><strong>Legal obligation:</strong> to comply with tax, accounting, and regulatory requirements.</li>
              <li><strong>Legitimate interests:</strong> to improve our services, prevent fraud, and secure our platform.</li>
            </ul>
          </PolicySection>

          <PolicySection title="5. How We Use Your Data">
            <ul className="list-disc pl-5 space-y-1">
              <li>To process and deliver your orders, including payment verification and delivery coordination.</li>
              <li>To manage your account and provide customer support.</li>
              <li>To send you order confirmations, shipping updates, and service-related notices.</li>
              <li>To send marketing communications (only with your consent, which you may withdraw at any time).</li>
              <li>To detect, prevent, and investigate fraud, security breaches, or technical issues.</li>
              <li>To comply with applicable Nigerian laws and regulatory requirements.</li>
            </ul>
          </PolicySection>

          <PolicySection title="6. Data Sharing and Disclosure">
            <p>
              We do not sell your personal data. We may share your data with:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Service providers:</strong> payment processors, logistics and delivery partners, cloud hosting providers, and IT support vendors.</li>
              <li><strong>Legal authorities:</strong> when required by Nigerian law, court order, or regulatory obligation.</li>
              <li><strong>Business transfers:</strong> in the event of a merger, acquisition, or sale of assets, subject to confidentiality obligations.</li>
            </ul>
            <p>
              All third-party processors are bound by data protection obligations consistent with the NDPR and are permitted to process your data only for the specified purposes.
            </p>
          </PolicySection>

          <PolicySection title="7. Data Security">
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include encryption in transit, access controls, and regular security assessments. However, no internet-based system can be guaranteed to be 100% secure.
            </p>
          </PolicySection>

          <PolicySection title="8. Data Retention">
            <p>
              We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, including legal, accounting, and reporting requirements. Typically, transaction and account data are retained for a minimum of six (6) years in accordance with Nigerian tax and commercial law.
            </p>
          </PolicySection>

          <PolicySection title="9. Your Data Subject Rights">
            <p>
              Under the NDPR, you have the following rights:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Right of access:</strong> request a copy of the personal data we hold about you.</li>
              <li><strong>Right to rectification:</strong> request correction of inaccurate or incomplete data.</li>
              <li><strong>Right to erasure:</strong> request deletion of your data in certain circumstances (&ldquo;right to be forgotten&rdquo;).</li>
              <li><strong>Right to restrict processing:</strong> request limited use of your data.</li>
              <li><strong>Right to data portability:</strong> receive your data in a structured, machine-readable format.</li>
              <li><strong>Right to object:</strong> object to processing based on legitimate interests or direct marketing.</li>
              <li><strong>Right to withdraw consent:</strong> withdraw consent at any time without affecting lawful processing before withdrawal.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at <a href="mailto:privacy@rollin.ng" className="text-primary underline">privacy@rollin.ng</a>. We will respond within thirty (30) days.
            </p>
          </PolicySection>

          <PolicySection title="10. International Data Transfers">
            <p>
              Some of our service providers may be located outside Nigeria. Where we transfer your personal data internationally, we ensure appropriate safeguards are in place, such as standard contractual clauses or adequacy decisions, to protect your data in compliance with the NDPR.
            </p>
          </PolicySection>

          <PolicySection title="11. Cookies and Tracking">
            <p>
              We use cookies and similar technologies to improve your browsing experience, analyse site traffic, and personalise content. You can manage your cookie preferences through your browser settings. For more details, please see our Cookie Policy.
            </p>
          </PolicySection>

          <PolicySection title="12. Children&rsquo;s Privacy">
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal data from children. If you believe we have collected data from a minor, please contact us immediately so we can delete it.
            </p>
          </PolicySection>

          <PolicySection title="13. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </PolicySection>

          <PolicySection title="14. Contact Us">
            <p>
              If you have any questions, concerns, or complaints about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email: <a href="mailto:privacy@rollin.ng" className="text-primary underline">privacy@rollin.ng</a></li>
              <li>Phone: +234 814 846 4823</li>
              <li>Address: Block 505, Kodesho Street, Ikeja, Lagos, Nigeria</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              You also have the right to lodge a complaint with the Nigeria Data Protection Commission (NDPC) if you believe your data protection rights have been violated.
            </p>
          </PolicySection>
        </div>
      </Container>
    </div>
  )
}
