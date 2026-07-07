"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="rounded-xl border bg-white p-6 text-center">
        <p className="font-heading text-lg font-semibold text-foreground">Message sent</p>
        <p className="mt-1 text-sm text-muted-foreground">We&apos;ll get back to you within 4 hours.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="space-y-4 rounded-xl border bg-white p-5"
    >
      <h3 className="font-heading text-base font-semibold text-foreground">Send us a message</h3>
      <Input placeholder="Full name" required />
      <Input type="email" placeholder="Email" required />
      <Input placeholder="Subject" required />
      <Textarea placeholder="How can we help?" rows={4} required />
      <Button type="submit" className="h-11 w-full rounded-lg">
        Send message
      </Button>
    </form>
  )
}
