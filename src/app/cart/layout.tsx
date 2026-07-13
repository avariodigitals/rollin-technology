import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your cart items and proceed to checkout. Genuine products with warranty and nationwide delivery from Rollin Technology.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
