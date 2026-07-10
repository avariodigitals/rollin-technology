
"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"


export function SortSelect({ currentSort }: { currentSort?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "featured") {
      params.delete("sort")
    } else {
      params.set("sort", value)
    }
    params.delete("after") // changing sort resets pagination
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Select defaultValue={currentSort ?? "featured"} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Sort: Featured</SelectItem>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
      </SelectContent>
    </Select>
  )
}