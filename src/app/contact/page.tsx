import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa6"

import Container from "@/components/shared/Container"
import { ContactChannelCard } from "@/components/marketing/ContactChannelCard"
import { ContactForm } from "@/components/marketing/ContactForm"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rollin Technology for sales, support, and corporate procurement. Phone, email, WhatsApp, and in-person at Ikeja, Lagos.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <Container>
      <div className="py-10">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">Get in touch</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Let&apos;s talk.</h1>
        <p className="mt-2 max-w-lg text-muted-foreground">
          For sales, support or corporate procurement — choose what works for you.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            <ContactChannelCard icon={Phone} title="+234 800 000 0000" subtext="Mon–Sat, 8am–7pm WAT" />
            <ContactChannelCard icon={Mail} title="sales@rollin.ng" subtext="Replies within 4 hours" />
            <ContactChannelCard icon={FaWhatsapp} title="WhatsApp Quick Order" subtext="Fastest response" />

            <div className="mt-4 overflow-hidden rounded-xl border">
              <iframe
                src="https://maps.google.com/maps?q=Block+505+Kodesho+Street+Ikeja+Lagos&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="256"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Rollin location map"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </Container>
  )
}