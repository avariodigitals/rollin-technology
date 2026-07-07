import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const steps = [
  { step: 1, label: "Shipping" },
  { step: 2, label: "Payment" },
  { step: 3, label: "Review" },
] as const

export function CheckoutStepper({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-3">
      {steps.map((s, index) => {
        const isComplete = currentStep > s.step
        const isActive = currentStep === s.step

        return (
          <div key={s.step} className="flex flex-1 items-center gap-3">
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium",
                isActive && "border-primary bg-primary/5 text-primary",
                isComplete && "border-primary bg-primary text-primary-foreground",
                !isActive && !isComplete && "border-border text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full text-xs",
                  isComplete
                    ? "bg-primary-foreground text-primary"
                    : isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {isComplete ? <Check className="size-3" /> : s.step}
              </span>
              {s.label}
            </div>
            {index < steps.length - 1 && (
              <div className={cn("h-px flex-1", isComplete ? "bg-primary" : "bg-border")} />
            )}
          </div>
        )
      })}
    </div>
  )
}
