
"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


export function ProcurementForm() {
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="space-y-4 rounded-xl border bg-white p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Name</label>
          <Input required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Company</label>
          <Input required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Email</label>
          <Input type="email" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Phone</label>
          <Input type="tel" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Quantity</label>
          <Input type="number" min={1} required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Budget (optional)</label>
          <Input placeholder="e.g. ₦5,000,000" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Expected delivery date</label>
          <Input type="date" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Products needed</label>
          <Textarea
            placeholder="e.g. 40x business laptops, networking for 2 floors..."
            rows={4}
            required
          />
        </div>
      </div>

      <Button type="submit" className="h-12 w-full rounded-lg">
        Submit request
      </Button>
    </form>
  )
}