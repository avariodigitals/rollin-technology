
"use client"

import { useState, FormEvent } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { submitToSales } from "@/lib/formSubmit"

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get("contactName") as string
    const company = data.get("companyName") as string
    const email = data.get("email") as string
    const phone = data.get("phone") as string
    const size = data.get("companySize") as string
    const industry = data.get("industry") as string
    const needs = data.get("needs") as string

    submitToSales({
      subject: `Corporate account request: ${company}`,
      body: `Contact Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nCompany Size: ${size}\nIndustry: ${industry}\n\nNeeds:\n${needs}`,
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
          <label className="text-xs font-medium text-muted-foreground">Company Name</label>
          <Input name="companyName" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Work Email</label>
          <Input name="email" type="email" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Phone</label>
          <Input name="phone" type="tel" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Company Size</label>
          <Select name="companySize">
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
          <Input name="industry" placeholder="e.g. Finance, Retail, NGO" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">What do you need?</label>
          <Textarea name="needs" placeholder="e.g. Laptop fleet refresh for 40 staff, networking upgrade..." rows={4} required />
        </div>
      </div>

      <Button type="submit" className="h-12 w-full rounded-lg">
        Submit request
      </Button>
    </form>
  )
}