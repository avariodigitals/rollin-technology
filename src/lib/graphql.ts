import { useAuthStore } from "@/lib/store/authStore";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API!;

interface GraphQLError {
  message: string;
  extensions?: Record<string, unknown>;
}

interface GraphQLRawResult {
  data?: Record<string, unknown> | null;
  errors?: GraphQLError[];
}

async function rawFetch(
  query: string,
  variables: Record<string, unknown>,
  authToken?: string | null,
  signal?: AbortSignal,
  revalidate: number = 300
): Promise<GraphQLRawResult> {
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
    (fetchOptions as { next?: { revalidate: number } }).next = { revalidate };
  }

  const response = await fetch(GRAPHQL_ENDPOINT, fetchOptions);

  const text = await response.text();

  if (!response.ok) {
    console.error(`GraphQL fetch failed: ${response.status} ${response.statusText} at ${GRAPHQL_ENDPOINT}`);
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error(
      `GraphQL Parsing Failure (Status ${response.status}): Expected JSON but received HTML/Text. Snippet:`, 
      text.slice(0, 500)
    );
    throw new Error(`Upstream GraphQL server returned an invalid non-JSON response (${response.status}).`);
  }
}

const REFRESH_MUTATION = `
mutation RefreshToken($jwtRefreshToken: String!) {
  refreshJwtAuthToken(input: { jwtRefreshToken: $jwtRefreshToken }) {
    authToken
  }
}
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchGraphQL<T = any>(
  query: string,
  variables: Record<string, unknown> = {},
  authToken?: string | null,
  signal?: AbortSignal,
  revalidate: number = 300
): Promise<T> {
  let json = await rawFetch(query, variables, authToken, signal, revalidate);

  if (json.errors && authToken) {
    const { refreshToken, user } = useAuthStore.getState();
    if (refreshToken) {
      const refreshResult = await rawFetch(REFRESH_MUTATION, { jwtRefreshToken: refreshToken });
      const refreshData = refreshResult?.data as Record<string, Record<string, string>> | undefined;
      const newToken = refreshData?.refreshJwtAuthToken?.authToken;

      if (newToken && user) {
        useAuthStore.getState().setSession({ authToken: newToken, refreshToken, user });
        json = await rawFetch(query, variables, newToken, signal);
      }
    }
  }

  if (json.errors) {
    const messages = json.errors.map((e: GraphQLError) => e.message).join("; ");
    console.warn("GraphQL errors:", messages);
    if (!json.data) {
      throw new Error(`GraphQL query failed: ${messages}`);
    }
  }

  return json.data as T;
}