import { Check, Clock, Truck, X, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type OrderStatus = "delivered" | "processing" | "shipped" | "cancelled"
export type ProductBadgeType = "best-seller" | "new" | "hot"

const orderStatusConfig: Record<
  OrderStatus,
  { label: string; icon: LucideIcon; className: string }
> = {
  delivered: {
    label: "Delivered",
    icon: Check,
    className: "bg-[var(--status-success-bg)] text-[var(--status-success)]",
  },
  processing: {
    label: "Processing",
    icon: Clock,
    className: "bg-[var(--status-warning-bg)] text-[var(--status-warning)]",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    className: "bg-[var(--status-info-bg)] text-[var(--status-info)]",
  },
  cancelled: {
    label: "Cancelled",
    icon: X,
    className: "bg-[var(--status-danger-bg)] text-[var(--status-danger)]",
  },
}

/** Used on My Orders (order list) and the account Dashboard's Recent Orders panel. */
export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = orderStatusConfig[status]
  const Icon = config.icon
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        config.className
      )}
    >
      <Icon className="size-3" />
      {config.label}
    </span>
  )
}

const productBadgeConfig: Record<ProductBadgeType, { label: string }> = {
  "best-seller": { label: "Best Seller" },
  new: { label: "New" },
  hot: { label: "Hot" },
}

/**
 * Product card corner badge. Figma uses the same gold treatment for all
 * three variants (Best Seller / New / Hot) — kept as one style rather than
 * inventing per-type colors that aren't in the design.
 */
export function ProductBadge({ type }: { type: ProductBadgeType }) {
  return (
    <span className="absolute top-3 left-3 z-10 rounded-md bg-[var(--rollin-gold)] px-2 py-1 text-[11px] font-bold tracking-wide text-[#24303A] uppercase">
      {productBadgeConfig[type].label}
    </span>
  )
}
