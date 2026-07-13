import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/shared/ComingSoonPage"

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Rollin Technology team. Explore career opportunities in technology retail, logistics, and customer success in Lagos, Nigeria.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return (
    <ComingSoonPage
      title="Careers at Rollin"
      description="We're not listing open roles yet. Check back soon, or reach out to sales@rollin.ng."
    />
  )
}