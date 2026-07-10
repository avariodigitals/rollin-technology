
"use client"

import { useState } from "react"
import { ChevronDown, Laptop } from "lucide-react"

import { OrderStatusBadge, type OrderStatus } from "@/components/shared/StatusBadge"
import { formatNaira } from "@/lib/currency"
import { cn } from "@/lib/utils"

export interface OrderLineItem {
  name: string
  quantity: number
  total: number
}

export interface OrderSummaryData {
  id: string
  date: string
  track?: string
  status: OrderStatus
  total: number
  items?: OrderLineItem[]
}


export function OrderCard({ order }: { order: OrderSummaryData }) {
  const [expanded, setExpanded] = useState(false)
  const hasItems = (order.items?.length ?? 0) > 0

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Laptop className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{order.id}</p>
            <p className="text-xs text-muted-foreground">
              {order.date}
              {order.track && <> · Track: {order.track}</>}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <OrderStatusBadge status={order.status} />
          <span className="text-sm font-semibold text-foreground">{formatNaira(order.total)}</span>
          <button
            type="button"
            disabled={!hasItems}
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            {expanded ? "Hide details" : "View details"}
            <ChevronDown className={cn("size-3.5 transition-transform", expanded && "rotate-180")} />
          </button>
        </div>
      </div>

      {hasItems && expanded && (
        <div className="mt-4 space-y-3 border-t pt-4">
          {order.items!.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <span className="font-semibold text-foreground">{formatNaira(item.total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}