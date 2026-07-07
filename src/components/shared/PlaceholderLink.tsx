import { cn } from "@/lib/utils"

interface PlaceholderLinkProps {
  label: string
  icon?: React.ReactNode
  className?: string
}


export function PlaceholderLink({ label, icon, className }: PlaceholderLinkProps) {
  return (
    <button
      type="button"
      disabled
      title="Coming soon"
      className={cn(
        "inline-flex items-center gap-2 border-0 bg-transparent p-0 text-left [font:inherit] cursor-not-allowed text-muted-foreground/50 transition-colors",
        className
      )}
    >
      {icon}
      {label}
    </button>
  )
}
