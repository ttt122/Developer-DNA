import { errorJson, okJson } from "@/api/responses";
import { analyzeGitHubUser } from "@/api/analyze";
import { GitHubApiError } from "@/github/client";
import { z } from "zod";

const usernameSchema = z
  .string()
  .min(1)
  .max(39)
  .regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/);

export async function GET(
  _request: Request,
  context: { params: Promise<{ username: string }> },
) {
  const params = await context.params;
  const parsed = usernameSchema.safeParse(params.username);

  if (!parsed.success) {
    return errorJson(400, "INVALID_USERNAME", "GitHub username is invalid.");
  }

  try {
    const analysis = await analyzeGitHubUser(parsed.data);
    return okJson(analysis);
  } catch (error) {
    if (error instanceof GitHubApiError && error.status === 404) {
      return errorJson(404, "USER_NOT_FOUND", "GitHub user was not found.");
    }

    if (error instanceof GitHubApiError) {
      return errorJson(502, "GITHUB_API_ERROR", "GitHub API request failed.", {
        status: error.status,
      });
    }

    return errorJson(503, "ANALYSIS_UNAVAILABLE", "Analysis failed.");
  }
}

