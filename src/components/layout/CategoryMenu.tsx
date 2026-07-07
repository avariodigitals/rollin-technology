
"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, ChevronDown } from "lucide-react"

interface CategoryMenuProps {
  categories: { name: string; slug: string }[]
}


export default function CategoryMenu({ categories }: CategoryMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-[214px] h-[36px] items-center justify-between bg-black/10 hover:bg-black/20 text-white text-sm font-semibold px-3 rounded-md transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Menu className="h-4 w-4 stroke-[2.5]" />
          <span>Shop By Department</span>
        </div>
        <ChevronDown className={`h-3.5 w-3.5 opacity-80 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-[calc(100%+4px)] z-50 max-h-96 w-[260px] overflow-y-auto rounded-lg border bg-white py-2 text-foreground shadow-lg">
            {categories.length === 0 ? (
              <p className="px-4 py-2 text-sm text-muted-foreground">No categories yet</p>
            ) : (
              categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm transition hover:bg-muted hover:text-primary"
                >
                  {category.name}
                </Link>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}