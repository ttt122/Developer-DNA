const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

type RequestOptions = {
  accept?: string;
  revalidate?: number;
};

export class GitHubApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "GitHubApiError";
  }
}

function githubHeaders(accept?: string): HeadersInit {
  const headers: HeadersInit = {
    Accept: accept ?? "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export async function githubRest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    headers: githubHeaders(options.accept),
    next: { revalidate: options.revalidate ?? 3600 },
  });

  if (!response.ok) {
    throw new GitHubApiError(
      `GitHub REST request failed for ${path}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}

export async function githubRestOptional<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T | null> {
  try {
    return await githubRest<T>(path, options);
  } catch {
    return null;
  }
}

export async function githubGraphql<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T | null> {
  if (!process.env.GITHUB_TOKEN) {
    return null;
  }

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: githubHeaders("application/vnd.github+json"),
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new GitHubApiError("GitHub GraphQL request failed", response.status);
  }

  const payload = (await response.json()) as { data?: T; errors?: unknown[] };

  if (payload.errors?.length) {
    return null;
  }

  return payload.data ?? null;
}

