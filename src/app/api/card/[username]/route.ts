import { analyzeGitHubUser } from "@/api/analyze";
import { errorJson } from "@/api/responses";
import { GitHubApiError } from "@/github/client";
import { renderReadmeCard } from "@/cards/renderReadmeCard";
import { z } from "zod";

const usernameSchema = z
  .string()
  .min(1)
  .max(39)
  .regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/);

function normalizeUsername(value: string): string {
  return value.replace(/\.svg$/i, "");
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ username: string }> },
) {
  const params = await context.params;
  const username = normalizeUsername(params.username);
  const parsed = usernameSchema.safeParse(username);

  if (!parsed.success) {
    return errorJson(400, "INVALID_USERNAME", "GitHub username is invalid.");
  }

  try {
    const analysis = await analyzeGitHubUser(parsed.data);
    const generatedAt = new Date().toISOString();
    const svg = renderReadmeCard({
      username: analysis.username,
      type: analysis.type,
      genome: analysis.genome,
      generatedAt,
    });

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    if (error instanceof GitHubApiError && error.status === 404) {
      return errorJson(404, "USER_NOT_FOUND", "GitHub user was not found.");
    }

    if (error instanceof GitHubApiError) {
      return errorJson(502, "GITHUB_API_ERROR", "GitHub API request failed.", {
        status: error.status,
      });
    }

    return errorJson(503, "CARD_UNAVAILABLE", "Card generation failed.");
  }
}

