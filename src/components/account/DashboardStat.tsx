import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface DashboardStatProps {
  icon: LucideIcon
  label: string
  value: string
  iconClassName?: string
}

export function DashboardStat({ icon: Icon, label, value, iconClassName }: DashboardStatProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-white p-4">
      <span className={cn("flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary", iconClassName)}>
        <Icon className="size-5" />
      </span>
      <div>
        <p className="font-heading text-lg font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
