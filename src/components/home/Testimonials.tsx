
import Container from "@/components/shared/Container"

const testimonials = [
  {
    quote:
      "Rollin equipped our 40-person Lagos office in under a week. The procurement team was responsive and pricing transparent.",
    name: "Adaeze Okonkwo",
    company: "Finsight Capital",
  },
  {
    quote:
      "We've sourced laptops, projectors and solar from Rollin for three years. Quality and after-sales support are consistently excellent.",
    name: "Tunde Bakare",
    company: "Greenfield Schools",
  },
  {
    quote:
      "Bulk pricing was fair and delivery to Abuja was on time. They genuinely understand corporate procurement.",
    name: "Hauwa Mohammed",
    company: "ReachOut NGO",
  },
]

/** FIX — replaces the 3 "Customer Testimonial" placeholder boxes with real copy from Figma. */
export default function Testimonials() {
  return (
    <section className="bg-muted/30 py-16">
      <Container>
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">What clients say</p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Trusted by procurement teams nationwide.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border bg-white p-5">
              <p className="text-sm text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 border-t pt-3">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}