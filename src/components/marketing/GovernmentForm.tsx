
"use client"

import { useState, FormEvent } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { submitToSales } from "@/lib/formSubmit"

export function GovernmentForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="rounded-xl border bg-white p-6 text-center">
        <p className="font-heading text-lg font-semibold text-foreground">Request received</p>
        <p className="mt-1 text-sm text-muted-foreground">
          A procurement specialist will reach out within one business day.
        </p>
      </div>
    )
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get("contactName") as string
    const agency = data.get("agency") as string
    const email = data.get("email") as string
    const phone = data.get("phone") as string
    const tender = data.get("tender") as string
    const budget = data.get("budget") as string
    const needs = data.get("needs") as string

    submitToSales({
      subject: `Government procurement request: ${agency}`,
      body: `Contact Name: ${name}\nMinistry / Agency: ${agency}\nEmail: ${email}\nPhone: ${phone}\nTender / Reference: ${tender}\nBudget Cycle: ${budget}\n\nProducts / Scope Needed:\n${needs}`,
    })

    setSubmitted(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border bg-white p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Contact Name</label>
          <Input name="contactName" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Ministry / Agency</label>
          <Input name="agency" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Official Email</label>
          <Input name="email" type="email" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Phone</label>
          <Input name="phone" type="tel" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Tender / Reference Number (optional)</label>
          <Input name="tender" placeholder="e.g. RFQ-2026-0142" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Budget Cycle / Deadline</label>
          <Input name="budget" placeholder="e.g. Q3 2026 fiscal allocation" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Products / Scope Needed</label>
          <Textarea name="needs" placeholder="e.g. 50 desktops for regional office rollout..." rows={4} required />
        </div>
      </div>

      <Button type="submit" className="h-12 w-full rounded-lg">
        Submit request
      </Button>
    </form>
  )
}