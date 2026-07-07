import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AddressCardProps {
  label: string
  name: string
  address: string
  phone: string
  isDefault?: boolean
  onSetDefault?: () => void
  onDelete?: () => void
}

export function AddressCard({ label, name, address, phone, isDefault, onSetDefault, onDelete }: AddressCardProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border bg-white p-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{label}</p>
          {isDefault && (
            <Badge variant="secondary" className="text-[10px]">
              Default
            </Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{address}</p>
        <p className="text-sm text-muted-foreground">{phone}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {!isDefault && onSetDefault && (
          <Button variant="outline" size="sm" onClick={onSetDefault}>
            Set Default
          </Button>
        )}
        {onDelete && (
          <button
            type="button"
            aria-label="Delete address"
            onClick={onDelete}
            className="flex size-8 items-center justify-center text-destructive/70 transition hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
