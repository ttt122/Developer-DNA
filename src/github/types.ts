export type GitHubUserProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
  htmlUrl: string;
};

export type GitHubRepository = {
  name: string;
  fullName: string;
  owner: string;
  htmlUrl: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  isTemplate: boolean;
  createdAt: string;
  updatedAt: string;
  pushedAt: string | null;
  stargazersCount: number;
  forksCount: number;
  watchersCount: number;
  openIssuesCount: number;
  language: string | null;
  topics: string[];
  licenseKey: string | null;
  defaultBranch: string;
};

export type RepositoryFileSignals = {
  readme: boolean;
  readmeLength: number;
  readmeHasHeadings: boolean;
  readmeHasCode: boolean;
  readmeHasRichMetadata: boolean;
  license: boolean;
  docsDirectory: boolean;
  examplesDirectory: boolean;
  testsDirectory: boolean;
  ciConfig: boolean;
  packageManifest: boolean;
  configFiles: boolean;
  contributingGuide: boolean;
};

export type GitHubRepositoryWithSignals = GitHubRepository & {
  fileSignals: RepositoryFileSignals;
  languages: Record<string, number>;
  releaseCount: number;
};

export type GitHubContributionSummary = {
  commitsLastYear: number;
  pullRequestsLastYear: number;
  externalPullRequestsLastYear: number;
  issuesLastYear: number;
  externalIssuesLastYear: number;
  issueCommentsLastYear: number;
  reviewsLastYear: number;
  activeDaysLastYear: number;
  activeWeeksLastYear: number;
  longestStreakDays: number;
};

export type GitHubAnalysisInput = {
  profile: GitHubUserProfile;
  repositories: GitHubRepositoryWithSignals[];
  contributions: GitHubContributionSummary;
};

