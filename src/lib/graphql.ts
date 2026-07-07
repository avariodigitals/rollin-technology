// TARGET PATH IN REPO: src/lib/graphql.ts (replaces existing)
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API!;

/**
 * FIX (TS2345): authStore's `authToken` is typed `string | null` (Zustand
 * store default), but this function only accepted `string | undefined`.
 * Every call site passing `authToken` straight from the store (Dashboard,
 * Orders, Addresses) hit "Type 'string | null' is not assignable to type
 * 'string | undefined'". Widened the param type here instead of coercing
 * at every call site.
 */
export async function fetchGraphQL(
  query: string,
  variables: Record<string, unknown> = {},
  authToken?: string | null
) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: authToken ? 0 : 60 },
  });

  const json = await response.json();

  if (json.errors) {
    console.error("GraphQL errors:", json.errors);
  }

  return json.data;
}