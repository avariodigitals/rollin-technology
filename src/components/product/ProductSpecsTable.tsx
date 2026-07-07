interface ProductSpecsTableProps {
  attributes: { name: string; options: string[] }[]
}


export function ProductSpecsTable({ attributes }: ProductSpecsTableProps) {
  if (attributes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Detailed specifications for this product haven&apos;t been added yet.
      </p>
    )
  }

  // Figma shows a 2-column layout; split the flat attribute list in half.
  const midpoint = Math.ceil(attributes.length / 2)
  const columns = [attributes.slice(0, midpoint), attributes.slice(midpoint)]

  return (
    <div className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
      {columns.map((column, columnIndex) => (
        <dl key={columnIndex} className="divide-y">
          {column.map((attribute) => (
            <div key={attribute.name} className="flex items-center justify-between py-3 text-sm">
              <dt className="text-muted-foreground">{attribute.name}</dt>
              <dd className="font-medium text-foreground">{attribute.options.join(", ")}</dd>
            </div>
          ))}
        </dl>
      ))}
    </div>
  )
}
