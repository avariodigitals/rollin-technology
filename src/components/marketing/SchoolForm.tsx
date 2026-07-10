
"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


export function SchoolForm() {
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
          <label className="text-xs font-medium text-muted-foreground">School Name</label>
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
          <label className="text-xs font-medium text-muted-foreground">Number of Students</label>
          <Input type="number" min={1} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Devices Needed</label>
          <Input type="number" min={1} placeholder="e.g. 30" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">What do you need?</label>
          <Textarea placeholder="e.g. Computer lab of 30 desktops, campus Wi-Fi coverage..." rows={4} required />
        </div>
      </div>

      <Button type="submit" className="h-12 w-full rounded-lg">
        Submit request
      </Button>
    </form>
  )
}