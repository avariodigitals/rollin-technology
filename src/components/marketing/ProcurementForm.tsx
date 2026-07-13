
"use client"

import { useState, FormEvent } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { submitToSales } from "@/lib/formSubmit"

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get("name") as string
    const company = data.get("company") as string
    const email = data.get("email") as string
    const phone = data.get("phone") as string
    const quantity = data.get("quantity") as string
    const budget = data.get("budget") as string
    const deliveryDate = data.get("deliveryDate") as string
    const products = data.get("products") as string

    submitToSales({
      subject: `Procurement request: ${company}`,
      body: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nQuantity: ${quantity}\nBudget: ${budget}\nExpected Delivery: ${deliveryDate}\n\nProducts Needed:\n${products}`,
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
          <label className="text-xs font-medium text-muted-foreground">Name</label>
          <Input name="name" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Company</label>
          <Input name="company" required />
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
          <label className="text-xs font-medium text-muted-foreground">Quantity</label>
          <Input name="quantity" type="number" min={1} required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Budget (optional)</label>
          <Input name="budget" placeholder="e.g. ₦5,000,000" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Expected delivery date</label>
          <Input name="deliveryDate" type="date" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Products needed</label>
          <Textarea
            name="products"
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