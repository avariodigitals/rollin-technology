
export interface PriceBracket {
  key: string
  label: string
  min?: number
  max?: number
}


export const PRICE_BRACKETS: PriceBracket[] = [
  { key: "under-200k", label: "Under ₦200,000", max: 200000 },
  { key: "200k-500k", label: "₦200,000 – ₦500,000", min: 200000, max: 500000 },
  { key: "500k-1m", label: "₦500,000 – ₦1M", min: 500000, max: 1000000 },
  { key: "above-1m", label: "Above ₦1M", min: 1000000 },
]