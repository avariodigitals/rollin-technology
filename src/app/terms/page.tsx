import type { Metadata } from "next"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Terms and Conditions — Rollin Technology",
  description: "Terms and conditions governing the use of Rollin Technology's website and services in Nigeria.",
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

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="bg-[#F0FDF4] py-14">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Terms and Conditions</h1>
          <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        </Container>
      </div>

      <Container>
        <div className="mx-auto max-w-3xl py-12">
          <PolicySection title="1. Introduction">
            <p>
              These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the Rollin Technology website (the &ldquo;Site&rdquo;), including any content, functionality, products, and services offered. By using the Site, placing an order, or creating an account, you agree to be bound by these Terms. If you do not agree, you must not use the Site.
            </p>
            <p>
              Rollin Technology is a trading name of Rollin Technology Limited, a company incorporated in Nigeria with its registered office at Block 505, Kodesho Street, Ikeja, Lagos, Nigeria.
            </p>
          </PolicySection>

          <PolicySection title="2. Eligibility">
            <p>
              You must be at least 18 years old to use the Site and make purchases. By placing an order, you represent that you are legally capable of entering into binding contracts under Nigerian law. If you are using the Site on behalf of a business or organisation, you represent that you have authority to bind that entity to these Terms.
            </p>
          </PolicySection>

          <PolicySection title="3. Account Registration">
            <p>
              To access certain features, you may need to create an account. You agree to provide accurate, current, and complete information during registration and to keep it updated. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorised use or breach of security.
            </p>
          </PolicySection>

          <PolicySection title="4. Product Information and Pricing">
            <p>
              We make reasonable efforts to ensure that product descriptions, images, and prices are accurate. However, errors may occur. In the event of a pricing error, we reserve the right to cancel or refuse any orders placed at the incorrect price. All prices are listed in Nigerian Naira (NGN) and are inclusive of applicable VAT unless otherwise stated.
            </p>
            <p>
              Product specifications are provided by manufacturers and may be subject to change without notice. We do not warrant that product descriptions or other content on the Site are accurate, complete, reliable, current, or error-free.
            </p>
          </PolicySection>

          <PolicySection title="5. Orders and Acceptance">
            <p>
              All orders are subject to acceptance and availability. After you place an order, you will receive an order confirmation email. This email does not constitute acceptance of your order; it is merely confirmation that we have received it. A contract is formed only when we dispatch the product(s) and send you a shipping confirmation.
            </p>
            <p>
              We reserve the right to refuse or cancel any order for reasons including, but not limited to, product unavailability, errors in pricing or description, suspected fraud, or inability to obtain authorisation for payment.
            </p>
          </PolicySection>

          <PolicySection title="6. Payment">
            <p>
              Payment may be made by debit card, credit card, bank transfer, or pay-on-delivery (where available for verified Lagos addresses). By providing payment information, you represent that you are authorised to use the designated payment method.
            </p>
            <p>
              All payments are processed through secure third-party payment gateways. We do not store your full card details on our servers. You agree to pay all charges incurred by you or on your account at the prices in effect when such charges are incurred.
            </p>
          </PolicySection>

          <PolicySection title="7. Delivery">
            <p>
              Delivery timelines are estimates and commence from the date of shipping confirmation. We offer same-day delivery within selected areas of Lagos and 2–5 business days nationwide, depending on the destination and courier availability. Delivery dates are not guaranteed and may be affected by factors beyond our control.
            </p>
            <p>
              Risk of loss and title for items purchased pass to you upon delivery to the address specified in your order. You are responsible for inspecting the package upon receipt and reporting any visible damage or discrepancy immediately.
            </p>
          </PolicySection>

          <PolicySection title="8. Returns and Refunds">
            <p>
              Returns and refunds are governed by our separate Refund Policy, which is incorporated into these Terms by reference. Please review the Refund Policy for detailed conditions, timeframes, and exclusions.
            </p>
          </PolicySection>

          <PolicySection title="9. Warranty">
            <p>
              Product warranty terms are governed by our separate Warranty Policy, which is incorporated into these Terms by reference. New products carry manufacturer warranties where applicable. Used or open-box items carry limited warranty as specified in the Warranty Policy. Please review the Warranty Policy for full details.
            </p>
          </PolicySection>

          <PolicySection title="10. Intellectual Property">
            <p>
              All content on the Site, including text, graphics, logos, images, and software, is the property of Rollin Technology or its licensors and is protected by Nigerian and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any Site content without our prior written consent.
            </p>
          </PolicySection>

          <PolicySection title="11. User Conduct">
            <p>
              You agree not to use the Site for any unlawful purpose or in any way that could damage, disable, overburden, or impair the Site. You may not use automated means (including spiders, robots, or data mining techniques) to access, monitor, or copy any part of the Site without our express permission.
            </p>
            <p>
              You must not submit any content that is false, defamatory, obscene, infringing, or otherwise objectionable. We reserve the right to remove any user-generated content and suspend or terminate accounts that violate these rules.
            </p>
          </PolicySection>

          <PolicySection title="12. Limitation of Liability">
            <p>
              To the fullest extent permitted by Nigerian law, Rollin Technology shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Site or purchase of products, even if advised of the possibility of such damages.
            </p>
            <p>
              Our total liability to you for any claim arising under these Terms shall not exceed the amount paid by you for the specific product or service giving rise to the claim.
            </p>
            <p>
              Nothing in these Terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under applicable law.
            </p>
          </PolicySection>

          <PolicySection title="13. Indemnity">
            <p>
              You agree to indemnify, defend, and hold harmless Rollin Technology and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including legal fees) arising out of or in connection with your breach of these Terms, your misuse of the Site, or your violation of any law or third-party rights.
            </p>
          </PolicySection>

          <PolicySection title="14. Governing Law and Dispute Resolution">
            <p>
              These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute arising out of or in connection with these Terms shall first be attempted to be resolved through good-faith negotiation.
            </p>
            <p>
              If negotiation fails, the dispute shall be resolved through mediation in Lagos, Nigeria, in accordance with the Arbitration and Mediation Act, 2023. If mediation is unsuccessful, the parties agree to submit the dispute to binding arbitration in Lagos under the same Act. Each party shall bear its own costs, and the language of the proceedings shall be English.
            </p>
          </PolicySection>

          <PolicySection title="15. Force Majeure">
            <p>
              We shall not be liable for any failure or delay in performing our obligations under these Terms where such failure or delay results from circumstances beyond our reasonable control, including but not limited to acts of God, strikes, lockouts, accidents, war, fire, epidemic, pandemic, failure of telecommunications networks, or governmental action.
            </p>
          </PolicySection>

          <PolicySection title="16. Severability">
            <p>
              If any provision of these Terms is found by a court or tribunal of competent jurisdiction to be invalid, unlawful, or unenforceable, that provision shall be deemed severable from the remaining provisions, which shall continue in full force and effect.
            </p>
          </PolicySection>

          <PolicySection title="17. Waiver">
            <p>
              No waiver by us of any breach of these Terms shall be construed as a waiver of any subsequent breach of the same or any other provision. Our failure to enforce any right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>
          </PolicySection>

          <PolicySection title="18. Entire Agreement">
            <p>
              These Terms, together with the Privacy Policy, Refund Policy, and Warranty Policy, constitute the entire agreement between you and Rollin Technology regarding your use of the Site and supersede all prior agreements, understandings, and representations.
            </p>
          </PolicySection>

          <PolicySection title="19. Changes to These Terms">
            <p>
              We may revise these Terms from time to time. The most current version will always be posted on this page. Your continued use of the Site after any changes constitutes acceptance of the revised Terms. We encourage you to review this page periodically.
            </p>
          </PolicySection>

          <PolicySection title="20. Contact Us">
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email: <a href="mailto:sales@rollin.ng" className="text-primary underline">sales@rollin.ng</a></li>
              <li>Phone: +234 814 846 4823</li>
              <li>Address: Block 505, Kodesho Street, Ikeja, Lagos, Nigeria</li>
            </ul>
          </PolicySection>
        </div>
      </Container>
    </div>
  )
}
