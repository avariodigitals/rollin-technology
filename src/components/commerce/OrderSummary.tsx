import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface OrderSummaryLine {
  label: string
  value: string
  muted?: boolean
}

interface OrderSummaryProps {
  lines: OrderSummaryLine[]
  total: string
  
  ctaLabel?: string
  onCtaClick?: () => void
  secondaryAction?: {
    label: string
    onClick?: () => void
  }
  trustLine?: string
  className?: string
}


export function OrderSummary({
  lines,
  total,
  ctaLabel,
  onCtaClick,
  secondaryAction,
  trustLine = "Secure payments · genuine warranty",
  className,
}: OrderSummaryProps) {
  return (
    <aside
      className={cn(
        "h-fit rounded-xl border bg-white p-5 shadow-[var(--shadow-card)]",
        className
      )}
    >
      <h3 className="font-heading text-base font-semibold text-foreground">
        Order summary
      </h3>

      <dl className="mt-4 space-y-2.5 text-sm">
        {lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between">
            <dt className="text-muted-foreground">{line.label}</dt>
            <dd className={cn("font-medium", line.muted && "text-muted-foreground")}>
              {line.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 flex items-center justify-between border-t pt-3">
        <span className="font-heading font-semibold text-foreground">Total</span>
        <span className="font-heading text-lg font-bold text-foreground">{total}</span>
      </div>

      {ctaLabel && (
        <Button onClick={onCtaClick} className="mt-4 h-12 w-full rounded-lg text-sm">
          {ctaLabel}
        </Button>
      )}

      {secondaryAction && (
        <button
          type="button"
          onClick={secondaryAction.onClick}
          className="mt-2 w-full rounded-lg border border-primary/30 bg-primary/5 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/10"
        >
          {secondaryAction.label}
        </button>
      )}

      {trustLine && (
        <p className="mt-3 text-center text-xs text-muted-foreground">{trustLine}</p>
      )}
    </aside>
  )
}
