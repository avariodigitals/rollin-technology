// TARGET PATH IN REPO: src/lib/graphql.ts — REPLACE THE ENTIRE FILE
import { useAuthStore } from "@/lib/store/authStore";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API!;

async function rawFetch(query: string, variables: Record<string, unknown>, authToken?: string | null) {
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
  authToken?: string | null
) {
  let json = await rawFetch(query, variables, authToken);

  if (json.errors && authToken) {
    const { refreshToken, user } = useAuthStore.getState();
    if (refreshToken) {
      const refreshResult = await rawFetch(REFRESH_MUTATION, { jwtRefreshToken: refreshToken });
      const newToken = refreshResult?.data?.refreshJwtAuthToken?.authToken;

      if (newToken && user) {
        useAuthStore.getState().setSession({ authToken: newToken, refreshToken, user });
        json = await rawFetch(query, variables, newToken);
      }
    }
  }

  if (json.errors) {
    console.error("GraphQL errors:", json.errors);
  }

  return json.data;
}