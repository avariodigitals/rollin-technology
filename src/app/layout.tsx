
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import JsonLd from "@/components/seo/JsonLd";
import { BASE_URL, DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, ORGANIZATION_JSON_LD } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Rollin Technology — Genuine Tech, Nationwide Delivery",
    template: "%s | Rollin Technology",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: "Rollin Technology" }],
  creator: "Rollin Technology",
  publisher: "Rollin Technology",
  applicationName: "Rollin Technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "Rollin Technology",
    title: "Rollin Technology — Genuine Tech, Nationwide Delivery",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/hero-image.svg",
        width: 1200,
        height: 630,
        alt: "Rollin Technology — Technology You Can Trust",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rollin Technology — Genuine Tech, Nationwide Delivery",
    description: DEFAULT_DESCRIPTION,
    images: ["/hero-image.svg"],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <body>
        <GoogleAnalytics />
        <JsonLd data={ORGANIZATION_JSON_LD} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}