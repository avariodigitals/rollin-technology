"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RadioGroup } from "@/components/ui/radio-group"
import { SelectableCard } from "@/components/shared/SelectableCard"
import { Button } from "@/components/ui/button"
import { useCheckoutStore } from "@/lib/store/checkoutStore"

export function ShippingStep({ onContinue }: { onContinue: () => void }) {
  const { shipping, setShipping, deliveryMethod, setDeliveryMethod } = useCheckoutStore()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-lg font-semibold text-foreground">Shipping details</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <Input type="email" value={shipping.email} onChange={(e) => setShipping({ email: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Phone</label>
            <Input type="tel" value={shipping.phone} onChange={(e) => setShipping({ phone: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">First name</label>
            <Input value={shipping.firstName} onChange={(e) => setShipping({ firstName: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Last name</label>
            <Input value={shipping.lastName} onChange={(e) => setShipping({ lastName: e.target.value })} />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">Street address</label>
            <Input value={shipping.street} onChange={(e) => setShipping({ street: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">City</label>
            <Input value={shipping.city} onChange={(e) => setShipping({ city: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">State</label>
            {/* Full state list not sourced from Figma — showing the states visible/implied (Lagos default). Expand once a real list is confirmed. */}
            <Select value={shipping.state} onValueChange={(value) => setShipping({ state: value })}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Abuja">Abuja</SelectItem>
                <SelectItem value="Rivers">Rivers</SelectItem>
                <SelectItem value="Ogun">Ogun</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">Delivery notes (optional)</label>
            <Textarea value={shipping.notes} onChange={(e) => setShipping({ notes: e.target.value })} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-heading text-sm font-semibold text-foreground">Delivery method</h3>
        <RadioGroup
          value={deliveryMethod}
          onValueChange={(value) => setDeliveryMethod(value as typeof deliveryMethod)}
          className="mt-3 grid gap-3 sm:grid-cols-3"
        >
          <SelectableCard value="standard" title="Standard" description="2–5 business days" meta="Free" />
          <SelectableCard value="express" title="Express" description="Same-day · Lagos" meta="₦7,500" />
          <SelectableCard value="pickup" title="Store pickup" description="Lagos showroom" meta="Free" />
        </RadioGroup>
      </div>

      <Button onClick={onContinue} className="h-12 w-full rounded-lg sm:w-auto">
        Continue
      </Button>
    </div>
  )
}
