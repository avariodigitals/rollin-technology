"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

interface MobileFilterDrawerProps {
  children: React.ReactNode
  activeCount?: number
  formId?: string
}

export function MobileFilterDrawer({ children, activeCount, formId }: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Bottom sticky button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white p-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          <Filter className="size-4" />
          Filters
          {activeCount != null && activeCount > 0 && (
            <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Drawer overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="text-base font-semibold">Filters</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg text-foreground"
                aria-label="Close filters"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto p-4">{children}</div>

            {/* Footer button */}
            <div className="border-t p-3">
              <button
                type="submit"
                form={formId}
                className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
