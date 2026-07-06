import { githubRest } from "@/github/client";
import type { GitHubUserProfile } from "@/github/types";

type GitHubUserResponse = {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
};

export async function fetchUserProfile(
  username: string,
): Promise<GitHubUserProfile> {
  const user = await githubRest<GitHubUserResponse>(
    `/users/${encodeURIComponent(username)}`,
  );

  return {
    login: user.login,
    name: user.name,
    bio: user.bio,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    createdAt: user.created_at,
    htmlUrl: user.html_url,
  };
}

