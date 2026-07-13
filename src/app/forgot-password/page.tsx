import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/shared/ComingSoonPage"

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Rollin Technology account password. Contact support if you need assistance.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForgotPasswordPage() {
  return (
    <ComingSoonPage
      title="Forgot password"
      description="Password reset isn't available yet. Contact sales@rollin.ng and we'll help you regain access."
    />
  )
}