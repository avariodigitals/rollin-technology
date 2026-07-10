
"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

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
          <label className="text-xs font-medium text-muted-foreground">Contact Name</label>
          <Input required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Ministry / Agency</label>
          <Input required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Official Email</label>
          <Input type="email" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Phone</label>
          <Input type="tel" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Tender / Reference Number (optional)</label>
          <Input placeholder="e.g. RFQ-2026-0142" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Budget Cycle / Deadline</label>
          <Input placeholder="e.g. Q3 2026 fiscal allocation" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Products / Scope Needed</label>
          <Textarea placeholder="e.g. 50 desktops for regional office rollout..." rows={4} required />
        </div>
      </div>

      <Button type="submit" className="h-12 w-full rounded-lg">
        Submit request
      </Button>
    </form>
  )
}