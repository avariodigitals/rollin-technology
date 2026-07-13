// TARGET PATH IN REPO: src/components/shared/WhatsAppCTA.tsx (replaces existing)
import Container from "@/components/shared/Container";


export default function WhatsAppCTA() {
  return (
    <section className="bg-primary py-16 text-white">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold tracking-wide text-[var(--rollin-gold)] uppercase">Live support</p>
          <h2 className="mt-2 font-heading text-3xl font-bold">Need help choosing the right product?</h2>
          <p className="mt-3 text-base text-white/85">
            Speak directly with our technology specialists — typically reply in under 2 minutes
            during business hours.
          </p>
          <a
            href="https://wa.me/2348148464823"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
          >
            Chat on WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}