// TARGET PATH IN REPO: src/components/marketing/CorporateForm.tsx (new file)
"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function CorporateForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="rounded-xl border bg-white p-6 text-center">
        <p className="font-heading text-lg font-semibold text-foreground">Request received</p>
        <p className="mt-1 text-sm text-muted-foreground">
          An account manager will reach out within one business day.
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
          <label className="text-xs font-medium text-muted-foreground">Company Name</label>
          <Input required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Work Email</label>
          <Input type="email" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Phone</label>
          <Input type="tel" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Company Size</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1–10 employees</SelectItem>
              <SelectItem value="11-50">11–50 employees</SelectItem>
              <SelectItem value="51-200">51–200 employees</SelectItem>
              <SelectItem value="200+">200+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Industry</label>
          <Input placeholder="e.g. Finance, Retail, NGO" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">What do you need?</label>
          <Textarea placeholder="e.g. Laptop fleet refresh for 40 staff, networking upgrade..." rows={4} required />
        </div>
      </div>

      <Button type="submit" className="h-12 w-full rounded-lg">
        Submit request
      </Button>
    </form>
  )
}