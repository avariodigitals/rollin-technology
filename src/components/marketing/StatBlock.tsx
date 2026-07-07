interface StatBlockProps {
  value: string
  label: string
}

export function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div className="text-center">
      <p className="font-heading text-3xl font-bold text-primary sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
