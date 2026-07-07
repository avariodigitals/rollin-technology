import { Check } from "lucide-react"

import { RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface SelectableCardProps {
  value: string
  title: string
  description?: string
  meta?: string
  icon?: React.ReactNode
  disabled?: boolean
}


export function SelectableCard({
  value,
  title,
  description,
  meta,
  icon,
  disabled,
}: SelectableCardProps) {
  return (
    <label
      className={cn(
        "group/selectable-card relative flex cursor-pointer flex-col gap-1 rounded-xl border border-border bg-white p-4 transition-colors",
        "has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-1 has-[[data-state=checked]]:ring-primary",
        "hover:border-primary/50",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <RadioGroupItem value={value} disabled={disabled} className="sr-only" />
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          {icon}
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
        <Check className="hidden size-4 text-primary group-has-[[data-state=checked]]/selectable-card:block" />
      </div>
      {description && (
        <span className="text-xs text-muted-foreground">{description}</span>
      )}
      {meta && (
        <span className="mt-1 text-xs font-semibold text-foreground">{meta}</span>
      )}
    </label>
  )
}
