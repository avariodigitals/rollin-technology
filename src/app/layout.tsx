
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rollin Technologies",
  description: "Technology You Can Trust",
};

/**
 * FIX — Navigation & Footer Consistency (per backend update): Navbar and
 * Footer previously lived only inside HomePage (src/app/page.tsx), which
 * is why every other route — About, Contact, Cart, Checkout, Compare,
 * Product Detail, Sign In, Register, Account pages, Blog, Procurement —
 * was rendering with NO site chrome at all. This was never a per-page
 * bug to patch individually; the root layout simply never included them.
 * Moving Navbar/Footer here means every route gets them automatically.
 *
 * IMPORTANT: HomePage's own manual <Navbar/>/<Footer/> must be removed
 * (see home-page.tsx in this same delivery) or it will render both sets
 * stacked on top of each other.
 */
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}