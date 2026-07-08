
"use client"

import { useEffect, useState } from "react"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Container from "@/components/shared/Container"

const faqs = [
  {
    id: "shipping",
    question: "How long does delivery take?",
    answer: "Same-day delivery within Lagos, and 2–5 days nationwide across Nigeria.",
  },
  {
    id: "warranty",
    question: "Is warranty included?",
    answer:
      "Every product ships with full manufacturer warranty, with claims handled end-to-end through Rollin's in-house service centre.",
  },
  {
    id: "payments",
    question: "What payment methods are accepted?",
    answer: "Card payment, bank transfer, and pay on delivery for verified addresses in Lagos.",
  },
  {
    id: "returns",
    question: "Can I return a product?",
    answer: "Eligible items can be returned — full policy details coming soon.",
  },
  {
    id: "procurement",
    question: "Do you support corporate or bulk procurement?",
    answer:
      "Yes — Rollin supports corporate accounts, government and school procurement, and bulk ordering with dedicated account management.",
  },
]


function getInitialHashItem(): string | undefined {
  if (typeof window === "undefined") return undefined
  const hash = window.location.hash.replace("#", "")
  return faqs.some((f) => f.id === hash) ? hash : undefined
}

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | undefined>(getInitialHashItem)

  useEffect(() => {
    if (openItem) {
      document.getElementById(openItem)?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [openItem])

  return (
    <Container>
      <div className="py-10">
        <h1 className="font-heading text-3xl font-bold text-foreground">Frequently Asked Questions</h1>
        <p className="mt-2 text-muted-foreground">
          Shipping, warranty, payments, returns, and procurement — answered.
        </p>

        <div className="mt-8 max-w-2xl rounded-xl border bg-white px-5">
          <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} id={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Container>
  )
}