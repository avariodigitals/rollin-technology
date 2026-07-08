// TARGET PATH IN REPO: src/app/(account)/account/page.tsx — REPLACE THE ENTIRE FILE
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Package, Wallet, Heart, MapPin } from "lucide-react"

import { DashboardStat } from "@/components/account/DashboardStat"
import { OrderStatusBadge, type OrderStatus } from "@/components/shared/StatusBadge"
import { formatNaira } from "@/lib/currency"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_CUSTOMER_STATS, GET_CUSTOMER_ORDERS } from "@/lib/queries"
import { useAuthStore } from "@/lib/store/authStore"
import { useWishlistStore } from "@/lib/store/wishlistStore"

interface OrderSummary {
  id: string
  date: string
  itemCount: number
  status: OrderStatus
  total: number
}

interface RawOrderNode {
  id: string
  date: string
  status: string
  total: string
  lineItems?: { nodes: unknown[] }
}

function mapOrderStatus(raw: string): OrderStatus {
  const normalized = raw.toLowerCase()
  if (normalized.includes("cancel")) return "cancelled"
  if (normalized.includes("complete") || normalized.includes("deliver")) return "delivered"
  if (normalized.includes("ship")) return "shipped"
  return "processing"
}

/**
 * FIX — was calling GET_CURRENT_CUSTOMER (which includes billing/
 * shipping/firstName/lastName, none of which this page actually uses)
 * and crashing on the untested field. Switched to GET_CUSTOMER_STATS —
 * only id/orderCount/totalSpent, which is all this page ever needed.
 */
export default function AccountDashboardPage() {
  const authToken = useAuthStore((s) => s.authToken)
  const wishlistItems = useWishlistStore((s) => s.items)
  const [orderCount, setOrderCount] = useState<number | null>(null)
  const [totalSpent, setTotalSpent] = useState<string | null>(null)
  const [recentOrders, setRecentOrders] = useState<OrderSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authToken) return

    async function load() {
      const [statsData, ordersData] = await Promise.all([
        fetchGraphQL(GET_CUSTOMER_STATS, {}, authToken),
        fetchGraphQL(GET_CUSTOMER_ORDERS, {}, authToken),
      ])

      setOrderCount(statsData?.customer?.orderCount ?? 0)
      setTotalSpent(formatNaira(Number(statsData?.customer?.totalSpent) || 0))

      const orders: OrderSummary[] = ((ordersData?.customer?.orders?.nodes ?? []) as RawOrderNode[])
        .slice(0, 5)
        .map((order) => ({
          id: order.id,
          date: new Date(order.date).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          itemCount: order.lineItems?.nodes?.length ?? 0,
          status: mapOrderStatus(order.status),
          total: Number(order.total) || 0,
        }))

      setRecentOrders(orders)
      setLoading(false)
    }

    load()
  }, [authToken])

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">My Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStat icon={Package} label="Total Orders" value={orderCount === null ? "—" : String(orderCount)} />
        <DashboardStat icon={Wallet} label="Total Spent" value={totalSpent ?? "—"} />
        <DashboardStat icon={Heart} label="Wishlist Items" value={String(wishlistItems.length)} />
        <DashboardStat icon={MapPin} label="Saved Addresses" value="—" />
      </div>

      <div className="rounded-xl border bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold text-foreground">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>

        {loading ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Loading...</p>
        ) : recentOrders.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <div className="divide-y">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.date} · {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <OrderStatusBadge status={order.status} />
                  <span className="text-sm font-semibold text-foreground">{formatNaira(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}