import type { LucideIcon } from "lucide-react"

interface PrincipleCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function PrincipleCard({ icon: Icon, title, description }: PrincipleCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-3 font-heading text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
