import { NextRequest, NextResponse } from "next/server"
import { GET_SHOP_PRODUCTS } from "@/lib/queries"
import { mapProduct } from "@/lib/products/mapProduct"

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API!

async function fetchProducts(variables: Record<string, unknown>) {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_SHOP_PRODUCTS, variables }),
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`GraphQL fetch failed: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors) {
    const messages = json.errors.map((e: any) => e.message).join("; ")
    console.warn("GraphQL errors:", messages)
    if (!json.data) {
      throw new Error(`GraphQL query failed: ${messages}`)
    }
  }

  return json.data
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const first = parseInt(searchParams.get("first") ?? "16", 10)
  const after = searchParams.get("after") ?? null
  const categoryIn = searchParams.getAll("category")
  const productBrandIn = searchParams.getAll("brand")
  const minPrice = searchParams.get("minPrice")
    ? parseFloat(searchParams.get("minPrice")!)
    : null
  const maxPrice = searchParams.get("maxPrice")
    ? parseFloat(searchParams.get("maxPrice")!)
    : null
  const stockStatus = searchParams.get("inStock") === "1" ? ["IN_STOCK"] : null
  const search = searchParams.get("search") ?? null

  const variables: Record<string, unknown> = {
    first,
    after,
    categoryIn: categoryIn.length > 0 ? categoryIn : null,
    productBrandIn: productBrandIn.length > 0 ? productBrandIn : null,
    minPrice,
    maxPrice,
    stockStatus,
    search,
  }

  try {
    const data = await fetchProducts(variables)
    const products = (data?.products?.nodes ?? []).map(mapProduct)
    const pageInfo = data?.products?.pageInfo

    return NextResponse.json({ products, pageInfo })
  } catch (error) {
    console.error("API products error:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
