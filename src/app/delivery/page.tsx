import type { Metadata } from "next"
import { Truck, MapPin, Clock, PackageCheck, AlertCircle, Phone } from "lucide-react"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Delivery Information — Rollin Technology",
  description: "Shipping options, delivery timelines, costs, and tracking for orders from Rollin Technology across Nigeria.",
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

export default function DeliveryPage() {
  return (
    <div className="bg-white">
      <div className="bg-[#F0FDF4] py-14">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Delivery Information</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Fast, reliable delivery across Nigeria. Learn about our shipping options, timelines, costs, and how to track your order.
          </p>
        </Container>
      </div>

      <Container>
        <div className="mx-auto max-w-4xl py-12">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard icon={Truck} title="Delivery Options">
              <p className="font-medium text-foreground">Standard Delivery</p>
              <p>Available nationwide. Orders are processed within 24 hours and dispatched through our courier partners.</p>
              <p className="mt-3 font-medium text-foreground">Express Delivery</p>
              <p>Available for select locations in Lagos. Order before 12:00 PM for same-day dispatch. Subject to product availability and courier capacity.</p>
              <p className="mt-3 font-medium text-foreground">Store Pickup</p>
              <p>Collect your order directly from our Ikeja, Lagos location. You will receive a notification when your order is ready for collection.</p>
            </InfoCard>

            <InfoCard icon={Clock} title="Delivery Timelines">
              <p className="font-medium text-foreground">Lagos (selected areas)</p>
              <p>Same-day delivery for orders placed before 12:00 PM. Next-day delivery for orders placed after the cutoff.</p>
              <p className="mt-3 font-medium text-foreground">Lagos (other areas)</p>
              <p>1–2 business days from date of dispatch.</p>
              <p className="mt-3 font-medium text-foreground">South-West Nigeria</p>
              <p>2–3 business days (Ibadan, Abeokuta, Ondo, Osun, Ekiti).</p>
              <p className="mt-3 font-medium text-foreground">South-South & South-East</p>
              <p>3–5 business days (Port Harcourt, Abuja, Enugu, Owerri, Calabar, Uyo).</p>
              <p className="mt-3 font-medium text-foreground">Northern Nigeria</p>
              <p>5–7 business days (Kano, Kaduna, Jos, Sokoto, Maiduguri). Remote areas may take longer.</p>
              <p className="mt-3 text-xs italic">
                Timelines are estimates and commence from the date of shipping confirmation. Delays due to weather, road conditions, or courier issues are outside our control but we will keep you informed.
              </p>
            </InfoCard>

            <InfoCard icon={MapPin} title="Delivery Areas">
              <p>
                We deliver to all 36 states and the Federal Capital Territory. However, some remote or hard-to-reach areas may require additional time or incur extra delivery charges. If your location is outside our standard coverage, we will contact you before dispatch to confirm feasibility and any additional costs.
              </p>
              <p className="mt-2">
                For large or bulky items (solar panels, inverters, server racks), delivery may be restricted to major urban centres or require specialised logistics. We will coordinate this with you directly.
              </p>
            </InfoCard>

            <InfoCard icon={PackageCheck} title="Tracking Your Order">
              <p>
                Once your order is dispatched, you will receive a shipping confirmation email and SMS with your tracking number and courier details. You can track your delivery in real time through the courier’s platform or by contacting our support team.
              </p>
              <p className="mt-2">
                For orders placed while logged into your account, you can also view tracking updates in the <a href="/account/orders" className="text-primary underline">My Orders</a> section of your dashboard.
              </p>
            </InfoCard>
          </div>

          <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#F0FDF4] text-primary">
                <AlertCircle className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Receiving Your Order</h3>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong>Inspection at delivery:</strong> We strongly recommend inspecting your package before accepting it. If the packaging is visibly damaged, torn, or wet, please note this on the delivery waybill before signing and take photographs. Contact us immediately if the contents appear damaged.
              </p>
              <p>
                <strong>Proof of delivery:</strong> A signature or confirmation code may be required. Ensure the recipient&apos;s name and phone number are accurate at checkout. If you are unavailable, the courier may attempt delivery up to two additional times before returning the item to us.
              </p>
              <p>
                <strong>Delivery address changes:</strong> Once an order has been dispatched, address changes may not be possible. If you need to change your delivery address, contact us immediately. Changes may incur additional fees depending on the courier.
              </p>
              <p>
                <strong>Failed delivery:</strong> If delivery fails due to an incorrect address, unavailability, or refusal to accept, the item will be returned to our warehouse. You may be responsible for re-delivery charges or the order may be subject to our standard refund policy.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#F0FDF4] text-primary">
                <AlertCircle className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Delivery Costs</h3>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong>Free delivery:</strong> Orders above ₦100,000 within Lagos qualify for free standard delivery. Orders above ₦250,000 nationwide qualify for free standard delivery.
              </p>
              <p>
                <strong>Standard delivery fees:</strong> For orders below the free delivery threshold, a flat delivery fee is calculated at checkout based on your location and the weight/dimensions of the items. Typical fees range from ₦2,000 to ₦8,000 for standard parcels.
              </p>
              <p>
                <strong>Bulk and heavy items:</strong> Solar panels, inverters, batteries, and large appliances may incur additional handling or freight charges due to weight and size. These charges are displayed clearly at checkout before payment.
              </p>
              <p>
                <strong>Express delivery:</strong> Express or same-day delivery, where available, incurs an additional surcharge calculated at checkout based on distance and urgency.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl border bg-[#F0FDF4] p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white text-primary">
                <Phone className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Delivery Support</h3>
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>
                If your delivery is delayed, your tracking information is not updating, or you have any other delivery-related concerns, our support team is here to help.
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Email: <a href="mailto:support@rollin.ng" className="text-primary underline">support@rollin.ng</a></li>
                <li>Phone: +234 814 846 4823</li>
                <li>WhatsApp: <a href="https://wa.me/2348148464823" target="_blank" rel="noopener noreferrer" className="text-primary underline">+234 814 846 4823</a></li>
              </ul>
              <p className="mt-2">
                For full terms, please review our <a href="/terms" className="text-primary underline">Terms and Conditions</a> and <a href="/refund" className="text-primary underline">Refund Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
