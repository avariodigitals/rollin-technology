// TARGET PATH IN REPO: src/app/(account)/account/addresses/page.tsx — REPLACE
"use client"

import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"

import { fetchGraphQL } from "@/lib/graphql"
import { GET_CUSTOMER_ADDRESSES } from "@/lib/queries"
import { useAuthStore } from "@/lib/store/authStore"
import { EmptyState } from "@/components/shared/EmptyState"

interface AddressData {
  address1?: string | null
  city?: string | null
  state?: string | null
  phone?: string | null
}

/** Shipping added back in now that it tested clean on its own. */
export default function AddressesPage() {
  const authToken = useAuthStore((s) => s.authToken)
  const [billing, setBilling] = useState<AddressData | null>(null)
  const [shipping, setShipping] = useState<AddressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authToken) return
    fetchGraphQL(GET_CUSTOMER_ADDRESSES, {}, authToken).then((data) => {
      setBilling(data?.customer?.billing ?? null)
      setShipping(data?.customer?.shipping ?? null)
      setLoading(false)
    })
  }, [authToken])

  const hasAddress = (addr: AddressData | null) => !!(addr && (addr.address1 || addr.city || addr.state))

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">My Addresses</h1>

      <div className="rounded-xl border bg-white p-5">
        {loading ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Loading...</p>
        ) : !hasAddress(billing) && !hasAddress(shipping) ? (
          <EmptyState
            title="No addresses saved"
            description="Add a shipping address at checkout — it will be saved to your account."
          />
        ) : (
          <div className="space-y-3">
            {[
              { label: "Billing Address", data: billing },
              { label: "Shipping Address", data: shipping },
            ]
              .filter((entry) => hasAddress(entry.data))
              .map(({ label, data }) => (
                <div key={label} className="flex items-start gap-3 rounded-lg border p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-sm text-muted-foreground">{data?.address1}</p>
                    <p className="text-sm text-muted-foreground">
                      {[data?.city, data?.state].filter(Boolean).join(", ")}
                    </p>
                    {data?.phone && <p className="text-sm text-muted-foreground">{data.phone}</p>}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}