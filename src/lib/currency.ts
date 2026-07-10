
export function parseNairaAmount(value: string | undefined | null): number {
  if (!value) return 0
  const numeric = value.replace(/[^0-9.]/g, "")
  return Number.parseFloat(numeric) || 0
}

export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString("en-NG")}`
}
