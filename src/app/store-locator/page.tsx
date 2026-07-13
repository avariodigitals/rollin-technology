import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/shared/ComingSoonPage"

export const metadata: Metadata = {
  title: "Store Locator",
  description: "Find Rollin Technology store locations and pickup points across Nigeria. Visit us in Ikeja, Lagos or contact us for delivery.",
  alternates: {
    canonical: "/store-locator",
  },
};

export default function StoreLocatorPage() {
  return (
    <ComingSoonPage
      title="Store Locator"
      description="Our store locations are coming soon. In the meantime, reach us on WhatsApp or call +234 814 846 4823."
    />
  )
}