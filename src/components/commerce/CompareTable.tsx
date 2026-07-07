import Image from "next/image"
import { X } from "lucide-react"

import type { ProductDetail } from "@/types/product"

interface CompareTableProps {
  products: ProductDetail[]
  onRemove: (databaseId: number) => void
}

function getAttributeValue(product: ProductDetail, attributeName: string): string {
  const match = product.attributes?.find((attr) => attr.name.toLowerCase() === attributeName.toLowerCase())
  return match?.options.join(", ") ?? "—"
}


export function CompareTable({ products, onRemove }: CompareTableProps) {
  const rows = [
    { label: "Brand", getValue: (p: ProductDetail) => p.brand ?? "—" },
    { label: "Price", getValue: (p: ProductDetail) => (p.onSale && p.salePrice) || p.price || "—" },
    { label: "Processor", getValue: (p: ProductDetail) => getAttributeValue(p, "Processor") },
    { label: "Memory", getValue: (p: ProductDetail) => getAttributeValue(p, "Memory") },
    { label: "Storage", getValue: (p: ProductDetail) => getAttributeValue(p, "Storage") },
    { label: "Warranty", getValue: () => "1-year manufacturer" },
    {
      label: "Availability",
      getValue: (p: ProductDetail) => (p.stockStatus === "OUT_OF_STOCK" ? "Out of stock" : "In stock"),
    },
  ]

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="w-40 p-4 text-left text-xs font-semibold text-muted-foreground uppercase">Product</th>
            {products.map((product) => (
              <th key={product.databaseId} className="p-4 text-left">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={
                          product.image?.sourceUrl ??
                          "https://www.rollin.ng/wp-content/uploads/woocommerce-placeholder.webp"
                        }
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </div>
                    <span className="font-semibold text-foreground">{product.name}</span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${product.name} from comparison`}
                    onClick={() => onRemove(product.databaseId)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="p-4 text-muted-foreground">{row.label}</td>
              {products.map((product) => (
                <td key={product.databaseId} className="p-4 font-medium text-foreground">
                  {row.getValue(product)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
