import { githubRest, githubRestOptional } from "@/github/client";
import type {
  GitHubRepository,
  GitHubRepositoryWithSignals,
  RepositoryFileSignals,
} from "@/github/types";

type GitHubRepositoryResponse = {
  name: string;
  full_name: string;
  owner: { login: string };
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  is_template: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  language: string | null;
  topics?: string[];
  license: { key: string } | null;
  default_branch: string;
};

type GitHubContentItem = {
  name: string;
  path: string;
  type: "file" | "dir" | string;
  size?: number;
  download_url?: string | null;
};

type GitHubRelease = {
  id: number;
};

async function fetchAllRepositories(
  username: string,
): Promise<GitHubRepositoryResponse[]> {
  const repos: GitHubRepositoryResponse[] = [];

  for (let page = 1; page <= 4; page += 1) {
    const chunk = await githubRest<GitHubRepositoryResponse[]>(
      `/users/${encodeURIComponent(
        username,
      )}/repos?per_page=100&page=${page}&sort=updated&type=owner`,
    );

    repos.push(...chunk);

    if (chunk.length < 100) {
      break;
    }
  }

  return repos;
}

function mapRepository(repo: GitHubRepositoryResponse): GitHubRepository {
  return {
    name: repo.name,
    fullName: repo.full_name,
    owner: repo.owner.login,
    htmlUrl: repo.html_url,
    description: repo.description,
    fork: repo.fork,
    archived: repo.archived,
    isTemplate: repo.is_template,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
    stargazersCount: repo.stargazers_count,
    forksCount: repo.forks_count,
    watchersCount: repo.watchers_count,
    openIssuesCount: repo.open_issues_count,
    language: repo.language,
    topics: repo.topics ?? [],
    licenseKey: repo.license?.key ?? null,
    defaultBranch: repo.default_branch,
  };
}

async function fetchReadme(owner: string, repo: string): Promise<string | null> {
  const readme = await githubRestOptional<{ download_url: string | null }>(
    `/repos/${owner}/${repo}/readme`,
  );

  if (!readme?.download_url) {
    return null;
  }

  const response = await fetch(readme.download_url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return response.text();
}

function contentHas(
  items: GitHubContentItem[] | null,
  predicate: (item: GitHubContentItem) => boolean,
): boolean {
  return items?.some(predicate) ?? false;
}

async function fetchFileSignals(
  repo: GitHubRepository,
): Promise<RepositoryFileSignals> {
  const [root, githubDir, readme] = await Promise.all([
    githubRestOptional<GitHubContentItem[]>(
      `/repos/${repo.owner}/${repo.name}/contents`,
    ),
    githubRestOptional<GitHubContentItem[]>(
      `/repos/${repo.owner}/${repo.name}/contents/.github`,
    ),
    fetchReadme(repo.owner, repo.name),
  ]);

  const lowerNames = (root ?? []).map((item) => item.name.toLowerCase());
  const githubNames = (githubDir ?? []).map((item) => item.name.toLowerCase());

  return {
    readme: Boolean(readme),
    readmeLength: readme?.length ?? 0,
    readmeHasHeadings: /^#{1,6}\s+/m.test(readme ?? ""),
    readmeHasCode: /```|    |\busage\b|\binstall\b/i.test(readme ?? ""),
    readmeHasRichMetadata: /!\[|https?:\/\/|\[[^\]]+\]\(|badge/i.test(
      readme ?? "",
    ),
    license: Boolean(repo.licenseKey) || lowerNames.some((name) => name.startsWith("license")),
    docsDirectory: contentHas(root, (item) => item.type === "dir" && item.name.toLowerCase() === "docs"),
    examplesDirectory: contentHas(root, (item) => item.type === "dir" && ["example", "examples"].includes(item.name.toLowerCase())),
    testsDirectory: contentHas(root, (item) => item.type === "dir" && ["test", "tests", "__tests__"].includes(item.name.toLowerCase())),
    ciConfig:
      githubNames.includes("workflows") ||
      lowerNames.includes(".travis.yml") ||
      lowerNames.includes("circle.yml"),
    packageManifest: lowerNames.some((name) =>
      [
        "package.json",
        "pyproject.toml",
        "cargo.toml",
        "go.mod",
        "pom.xml",
        "build.gradle",
      ].includes(name),
    ),
    configFiles: lowerNames.some((name) =>
      [
        "tsconfig.json",
        "eslint.config.mjs",
        "next.config.ts",
        "dockerfile",
        "docker-compose.yml",
        "makefile",
      ].includes(name),
    ),
    contributingGuide:
      lowerNames.includes("contributing.md") ||
      githubNames.includes("issue_template") ||
      githubNames.includes("pull_request_template.md"),
  };
}

export async function fetchRepositories(
  username: string,
): Promise<GitHubRepositoryWithSignals[]> {
  const repos = (await fetchAllRepositories(username)).map(mapRepository);
  const selectedRepos = repos.slice(0, 30);

  return Promise.all(
    selectedRepos.map(async (repo) => {
      const [languages, releases, fileSignals] = await Promise.all([
        githubRestOptional<Record<string, number>>(
          `/repos/${repo.owner}/${repo.name}/languages`,
        ),
        githubRestOptional<GitHubRelease[]>(
          `/repos/${repo.owner}/${repo.name}/releases?per_page=100`,
        ),
        fetchFileSignals(repo),
      ]);

      return {
        ...repo,
        fileSignals,
        languages: languages ?? {},
        releaseCount: releases?.length ?? 0,
      };
    }),
  );
}

