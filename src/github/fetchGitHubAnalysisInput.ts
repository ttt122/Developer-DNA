import { fetchContributions } from "@/github/fetchContributions";
import { fetchRepositories } from "@/github/fetchRepositories";
import { fetchUserProfile } from "@/github/fetchUserProfile";
import type { GitHubAnalysisInput } from "@/github/types";

export async function fetchGitHubAnalysisInput(
  username: string,
): Promise<GitHubAnalysisInput> {
  const [profile, repositories, contributions] = await Promise.all([
    fetchUserProfile(username),
    fetchRepositories(username),
    fetchContributions(username),
  ]);

  return {
    profile,
    repositories,
    contributions,
  };
}

