import type { Metadata } from "next"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Refund Policy — Rollin Technology",
  description: "Rollin Technology's refund, return, and cancellation policy for customers in Nigeria.",
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

export default function RefundPolicyPage() {
  return (
    <div className="bg-white">
      <div className="bg-[#F0FDF4] py-14">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Refund Policy</h1>
          <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        </Container>
      </div>

      <Container>
        <div className="mx-auto max-w-3xl py-12">
          <PolicySection title="1. Overview">
            <p>
              At Rollin Technology, we want you to be satisfied with your purchase. This Refund Policy sets out the conditions under which you may return products, request refunds, or cancel orders. It applies to all purchases made through our website, mobile platforms, or over the phone with our sales team.
            </p>
            <p>
              This policy is designed to comply with the Consumer Protection Council Act and other applicable consumer protection laws in Nigeria, while also reflecting the practical realities of technology retail.
            </p>
          </PolicySection>

          <PolicySection title="2. Order Cancellation">
            <p>
              You may cancel an order without penalty before the product has been shipped. To cancel, contact our customer support team immediately via phone or email. If the product has already been dispatched, the cancellation will be treated as a return under the conditions below.
            </p>
            <p>
              For custom-built, configured, or specially ordered items (e.g., bulk corporate orders, custom solar installations), cancellation may be subject to a restocking or preparation fee of up to 20% of the order value, depending on the stage of fulfilment.
            </p>
          </PolicySection>

          <PolicySection title="3. Return Window">
            <p>
              You may return eligible products within <strong>7 days</strong> of delivery, provided the return conditions below are met. For the return to be accepted, you must notify us within the 7-day window and receive a Return Merchandise Authorisation (RMA) number before sending the item back.
            </p>
            <p>
              The 7-day return window applies to most products. However, certain categories (see &ldquo;Non-Returnable Items&rdquo; below) are excluded from this policy.
            </p>
          </PolicySection>

          <PolicySection title="4. Return Conditions">
            <p>
              To be eligible for a return, the product must meet all of the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The product is in its original, unopened, and unused condition, with all original packaging, manuals, accessories, and tags intact.</li>
              <li>The product shows no signs of physical damage, wear, tampering, or unauthorised repair or modification.</li>
              <li>You provide a valid proof of purchase (order confirmation, receipt, or invoice).</li>
              <li>The return is initiated within the 7-day return window.</li>
              <li>You have obtained an RMA number from our support team prior to returning the item.</li>
            </ul>
            <p>
              Products that do not meet these conditions may be rejected and returned to you at your cost, or may be eligible for a partial refund or store credit only, at our discretion.
            </p>
          </PolicySection>

          <PolicySection title="5. Non-Returnable Items">
            <p>
              For hygiene, security, and operational reasons, the following categories are <strong>not eligible</strong> for return or refund unless they are defective upon arrival:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Software, digital downloads, activation codes, and license keys.</li>
              <li>Consumables such as ink cartridges, toner, batteries, and cables that have been opened or used.</li>
              <li>Custom-ordered, configured, or built-to-specification items (e.g., custom solar installations, server racks, bulk procurement orders).</li>
              <li>Items marked as &ldquo;final sale&rdquo;, &ldquo;clearance&rdquo;, or &ldquo;open-box/used&rdquo; at the point of purchase.</li>
              <li>Gift cards and store credits.</li>
              <li>Products damaged due to misuse, negligence, accident, or unauthorised repair by the customer or a third party.</li>
            </ul>
          </PolicySection>

          <PolicySection title="6. Defective or Damaged Products">
            <p>
              If a product arrives defective, damaged, or significantly different from the description, you must report it to us within <strong>48 hours</strong> of delivery. Contact our support team with photographs of the damage and your order details. We will arrange a replacement, exchange, or full refund at our discretion, including covering the return shipping costs.
            </p>
            <p>
              For products that develop a fault after the initial 48-hour period but within the applicable warranty period, the issue will be handled under our Warranty Policy rather than this Refund Policy.
            </p>
          </PolicySection>

          <PolicySection title="7. Refund Methods and Timeline">
            <p>
              Once we receive and inspect the returned product, we will notify you of the approval or rejection of your refund. Approved refunds will be processed within <strong>7 to 14 business days</strong> from the date of approval.
            </p>
            <p>
              Refunds will be issued via the original payment method where possible:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Card payments:</strong> refunded to the same card used for purchase. Processing time depends on your bank and may take 5–10 business days after we issue the refund.</li>
              <li><strong>Bank transfers:</strong> refunded to the originating bank account. Please allow 3–7 business days for the transfer to reflect.</li>
              <li><strong>Pay on delivery:</strong> refunded via bank transfer to an account provided by you.</li>
            </ul>
            <p>
              If the original payment method is unavailable, we may issue the refund as store credit or offer a direct bank transfer at your request.
            </p>
          </PolicySection>

          <PolicySection title="8. Return Shipping Costs">
            <p>
              For returns due to a defect, damage, or error on our part, we will cover the return shipping cost and arrange pickup where possible. For returns due to a change of mind or ordering error, the customer is responsible for the return shipping cost, unless the product was originally delivered with free shipping.
            </p>
            <p>
              Returns must be sent to our designated returns address in Lagos. We do not accept liability for items lost in transit during return shipping unless we have arranged the courier ourselves.
            </p>
          </PolicySection>

          <PolicySection title="9. Partial Refunds and Store Credit">
            <p>
              In certain circumstances, we may offer a partial refund or store credit instead of a full refund:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Products returned in a condition that is not fully resaleable (e.g., damaged packaging, missing accessories).</li>
              <li>Products returned after the 7-day window but within 14 days, subject to restocking fees.</li>
              <li>Used or open-box items that are returned for non-defect reasons.</li>
            </ul>
            <p>
              Store credit is valid for 12 months from the date of issue and can be used for any future purchase on the Site.
            </p>
          </PolicySection>

          <PolicySection title="10. Warranty vs. Refund">
            <p>
              This Refund Policy covers returns and refunds within the 7-day return window. After this period, product defects and malfunctions are handled under our Warranty Policy, not this Refund Policy. Please refer to the Warranty Policy for coverage periods, claim procedures, and exclusions.
            </p>
          </PolicySection>

          <PolicySection title="11. Fraudulent Returns">
            <p>
              We reserve the right to refuse returns and ban customers from future purchases if we detect patterns of fraudulent, abusive, or manipulative return behaviour, including but not limited to serial returning, returning products with swapped components, or attempting to exploit policy loopholes.
            </p>
          </PolicySection>

          <PolicySection title="12. Changes to This Policy">
            <p>
              We may update this Refund Policy from time to time. Any changes will be posted on this page with an updated revision date. The policy in effect at the time of your purchase will apply to that order.
            </p>
          </PolicySection>

          <PolicySection title="13. Contact Us">
            <p>
              To initiate a return, request a refund, or ask questions about this policy, please contact us:
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
