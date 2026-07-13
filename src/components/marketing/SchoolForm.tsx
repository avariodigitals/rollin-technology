
"use client"

import { useState, FormEvent } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { submitToSales } from "@/lib/formSubmit"

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get("contactName") as string
    const school = data.get("schoolName") as string
    const email = data.get("email") as string
    const phone = data.get("phone") as string
    const students = data.get("students") as string
    const devices = data.get("devices") as string
    const needs = data.get("needs") as string

    submitToSales({
      subject: `School procurement request: ${school}`,
      body: `Contact Name: ${name}\nSchool: ${school}\nEmail: ${email}\nPhone: ${phone}\nStudents: ${students}\nDevices Needed: ${devices}\n\nRequirements:\n${needs}`,
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
          <label className="text-xs font-medium text-muted-foreground">School Name</label>
          <Input name="schoolName" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Email</label>
          <Input name="email" type="email" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Phone</label>
          <Input name="phone" type="tel" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Number of Students</label>
          <Input name="students" type="number" min={1} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Devices Needed</label>
          <Input name="devices" type="number" min={1} placeholder="e.g. 30" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">What do you need?</label>
          <Textarea name="needs" placeholder="e.g. Computer lab of 30 desktops, campus Wi-Fi coverage..." rows={4} required />
        </div>
      </div>

      <Button type="submit" className="h-12 w-full rounded-lg">
        Submit request
      </Button>
    </form>
  )
}