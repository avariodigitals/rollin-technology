import type { LucideIcon } from "lucide-react"

interface ContactChannelCardProps {
  icon: LucideIcon
  title: string
  subtext: string
}

export function ContactChannelCard({ icon: Icon, title, subtext }: ContactChannelCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-white p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </div>
    </div>
  )
}
