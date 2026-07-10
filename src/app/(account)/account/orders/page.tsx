
"use client"

import { useEffect, useMemo, useState } from "react"

import { OrderCard, type OrderSummaryData } from "@/components/account/OrderCard"
import type { OrderStatus } from "@/components/shared/StatusBadge"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_CUSTOMER_ORDERS } from "@/lib/queries"
import { useAuthStore } from "@/lib/store/authStore"
import { cn } from "@/lib/utils"

interface RawLineItem {
  product?: { node?: { name?: string } }
  quantity: number
  total: string
}

interface RawOrderNode {
  id: string
  date: string
  status: string
  total: string
  lineItems?: { nodes: RawLineItem[] }
}

function mapOrderStatus(raw: string): OrderStatus {
  const normalized = raw.toLowerCase()
  if (normalized.includes("cancel")) return "cancelled"
  if (normalized.includes("complete") || normalized.includes("deliver")) return "delivered"
  if (normalized.includes("ship")) return "shipped"
  return "processing"
}

const tabs: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
]


export default function MyOrdersPage() {
  const authToken = useAuthStore((s) => s.authToken)
  const [orders, setOrders] = useState<OrderSummaryData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all")

  useEffect(() => {
    if (!authToken) return

    fetchGraphQL(GET_CUSTOMER_ORDERS, {}, authToken).then((data) => {
      const nodes = (data?.customer?.orders?.nodes ?? []) as RawOrderNode[]
      const mapped: OrderSummaryData[] = nodes.map((order) => ({
        id: order.id,
        date: new Date(order.date).toLocaleDateString("en-NG", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        status: mapOrderStatus(order.status),
        total: Number(order.total) || 0,
        items: (order.lineItems?.nodes ?? []).map((li) => ({
          name: li.product?.node?.name ?? "Item",
          quantity: li.quantity,
          total: Number(li.total) || 0,
        })),
      }))
      setOrders(mapped)
      setLoading(false)
    })
  }, [authToken])

  const counts = useMemo(() => {
    return tabs.reduce<Record<string, number>>((acc, tab) => {
      acc[tab.value] = tab.value === "all" ? orders.length : orders.filter((o) => o.status === tab.value).length
      return acc
    }, {})
  }, [orders])

  const filteredOrders = activeTab === "all" ? orders : orders.filter((o) => o.status === activeTab)

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">My Orders</h1>

      <div className="flex flex-wrap gap-2 rounded-xl border bg-white p-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition",
              activeTab === tab.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            )}
          >
            {tab.label} ({counts[tab.value] ?? 0})
          </button>
        ))}
      </div>

      {loading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">You haven&apos;t placed any orders yet.</p>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}