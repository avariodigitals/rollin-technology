import Image from "next/image"

interface BrandCardProps {
  name: string
  count?: number
  logoSrc?: string
}


export default function BrandCard({ name, count, logoSrc }: BrandCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl border bg-gray-50 p-6 text-center transition hover:bg-white hover:shadow-[var(--shadow-card-hover)]">
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt={name}
          width={96}
          height={32}
          className="h-8 w-auto object-contain"
        />
      ) : (
        <h3 className="font-bold text-gray-800">{name}</h3>
      )}
      {count !== undefined && (
        <p className="text-xs text-gray-400">
          {count} {count === 1 ? "Item" : "Items"}
        </p>
      )}
    </div>
  )
}
