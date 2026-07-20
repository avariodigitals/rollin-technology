
import { useAuthStore } from "@/lib/store/authStore";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API!;

async function rawFetch(
  query: string,
  variables: Record<string, unknown>,
  authToken?: string | null,
  signal?: AbortSignal,
  revalidate: number = 300
) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const fetchOptions: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  };

  if (signal) {
    fetchOptions.signal = signal;
  } else {
    (fetchOptions as any).next = { revalidate };
  }

  const response = await fetch(GRAPHQL_ENDPOINT, fetchOptions);

  if (!response.ok) {
    console.error(`GraphQL fetch failed: ${response.status} ${response.statusText} at ${GRAPHQL_ENDPOINT}`)
  }

  return response.json();
}

const REFRESH_MUTATION = `
mutation RefreshToken($jwtRefreshToken: String!) {
  refreshJwtAuthToken(input: { jwtRefreshToken: $jwtRefreshToken }) {
    authToken
  }
}
`;


export async function fetchGraphQL(
  query: string,
  variables: Record<string, unknown> = {},
  authToken?: string | null,
  signal?: AbortSignal,
  revalidate: number = 300
) {
  let json = await rawFetch(query, variables, authToken, signal, revalidate);

  if (json.errors && authToken) {
    const { refreshToken, user } = useAuthStore.getState();
    if (refreshToken) {
      const refreshResult = await rawFetch(REFRESH_MUTATION, { jwtRefreshToken: refreshToken });
      const newToken = refreshResult?.data?.refreshJwtAuthToken?.authToken;

      if (newToken && user) {
        useAuthStore.getState().setSession({ authToken: newToken, refreshToken, user });
        json = await rawFetch(query, variables, newToken, signal);
      }
    }
  }

  if (json.errors) {
    const messages = json.errors.map((e: any) => e.message).join("; ");
    console.warn("GraphQL errors:", messages);
    if (!json.data) {
      throw new Error(`GraphQL query failed: ${messages}`);
    }
  }

  return json.data;
}