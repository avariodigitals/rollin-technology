"use client"

import { useState, FormEvent } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { submitToSales } from "@/lib/formSubmit"

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get("name") as string
    const email = data.get("email") as string
    const subject = data.get("subject") as string
    const message = data.get("message") as string

    submitToSales({
      subject: `Contact form: ${subject}`,
      body: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    setSubmitted(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border bg-white p-5"
    >
      <h3 className="font-heading text-base font-semibold text-foreground">Send us a message</h3>
      <Input name="name" placeholder="Full name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="subject" placeholder="Subject" required />
      <Textarea name="message" placeholder="How can we help?" rows={4} required />
      <Button type="submit" className="h-11 w-full rounded-lg">
        Send message
      </Button>
    </form>
  )
}
