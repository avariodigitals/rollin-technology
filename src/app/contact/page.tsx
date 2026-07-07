
import { Phone, Mail, MessageCircle } from "lucide-react"

import Container from "@/components/shared/Container"
import { ContactChannelCard } from "@/components/marketing/ContactChannelCard"
import { ContactForm } from "@/components/marketing/ContactForm"


export default function ContactPage() {
  return (
    <Container>
      <div className="py-10">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">Get in touch</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Let&apos;s talk.</h1>
        <p className="mt-2 max-w-lg text-muted-foreground">
          For sales, support or corporate procurement — choose what works for you.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            <ContactChannelCard icon={Phone} title="+234 800 000 0000" subtext="Mon–Sat, 8am–7pm WAT" />
            <ContactChannelCard icon={Mail} title="hello@rollin.ng" subtext="Replies within 4 hours" />
            <ContactChannelCard icon={MessageCircle} title="WhatsApp Quick Order" subtext="Fastest response" />

            <div className="mt-4 overflow-hidden rounded-xl border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15852.167373045044!2d3.3691251500000003!3d6.641726299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1783377780154!5m2!1sen!2sng"
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