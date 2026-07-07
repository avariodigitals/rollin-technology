/**
 * WooCommerce returns pre-formatted price strings (e.g. "₦1,985,000") for
 * price/regularPrice/salePrice. Cart/Checkout need real math (line totals,
 * subtotal, VAT) that those formatted strings can't provide directly, so
 * this parses them back to numbers and re-formats totals the same way.
 * NOT verified against a real WooCommerce currency-settings export — if
 * live formatting differs (decimals, different grouping), adjust
 * `formatNaira` accordingly.
 */
export function parseNairaAmount(value: string | undefined | null): number {
  if (!value) return 0
  const numeric = value.replace(/[^0-9.]/g, "")
  return Number.parseFloat(numeric) || 0
}

export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString("en-NG")}`
}
