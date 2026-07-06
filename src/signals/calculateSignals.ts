import type { GitHubAnalysisInput } from "@/github/types";
import { SIGNAL_DEFINITIONS } from "@/signals/constants";
import {
  booleanNorm,
  clampScore,
  countNorm,
  ratioNorm,
  weightedAverage,
} from "@/signals/normalize";
import type { SignalId, SignalScore, SignalScores } from "@/signals/types";

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const TWO_YEARS_MS = 2 * ONE_YEAR_MS;

const EMERGING_TOPICS = new Set([
  "ai",
  "llm",
  "agent",
  "wasm",
  "webassembly",
  "rust",
  "blockchain",
  "crypto",
  "edge",
  "workers",
  "serverless",
  "vector",
  "rag",
  "robotics",
  "gpu",
  "compiler",
]);

const RESEARCH_TOPICS = new Set([
  "algorithm",
  "algorithms",
  "data",
  "database",
  "security",
  "cryptography",
  "compiler",
  "systems",
  "distributed",
  "machine-learning",
  "ai",
  "math",
  "paper",
  "notes",
  "research",
  "lab",
]);

function eligibleRepos(input: GitHubAnalysisInput) {
  return input.repositories.filter((repo) => !repo.archived && !repo.fork);
}

function recentlyUpdated(dateValue: string | null, now = new Date()): boolean {
  if (!dateValue) {
    return false;
  }

  return now.getTime() - new Date(dateValue).getTime() <= ONE_YEAR_MS;
}

function abandoned(dateValue: string | null, now = new Date()): boolean {
  if (!dateValue) {
    return true;
  }

  return now.getTime() - new Date(dateValue).getTime() > TWO_YEARS_MS;
}

function ratio(count: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return count / total;
}

function uniqueTopics(input: GitHubAnalysisInput): Set<string> {
  return new Set(
    input.repositories.flatMap((repo) =>
      repo.topics.map((topic) => topic.toLowerCase()),
    ),
  );
}

function uniqueLanguages(input: GitHubAnalysisInput): Set<string> {
  const languages = new Set<string>();

  for (const repo of input.repositories) {
    if (repo.language) {
      languages.add(repo.language);
    }

    for (const language of Object.keys(repo.languages)) {
      languages.add(language);
    }
  }

  return languages;
}

function makeSignal(
  id: SignalId,
  score: number,
  rawInputs: SignalScore["rawInputs"],
  confidence = 100,
): SignalScore {
  const definition = SIGNAL_DEFINITIONS[id];

  return {
    id,
    name: definition.name,
    score: clampScore(score),
    confidence: clampScore(confidence),
    rawInputs,
    explanation: `${definition.name} is ${score >= 70 ? "strong" : score >= 40 ? "moderate" : "limited"} based on public GitHub signals.`,
  };
}

function readmeQuality(input: GitHubAnalysisInput): number {
  const repos = eligibleRepos(input);

  if (!repos.length) {
    return 0;
  }

  const scores = repos.map((repo) =>
    weightedAverage([
      { score: booleanNorm(repo.fileSignals.readme), weight: 0.3 },
      { score: booleanNorm(repo.fileSignals.readmeLength >= 400), weight: 0.2 },
      { score: booleanNorm(repo.fileSignals.readmeHasHeadings), weight: 0.2 },
      { score: booleanNorm(repo.fileSignals.readmeHasCode), weight: 0.2 },
      { score: booleanNorm(repo.fileSignals.readmeHasRichMetadata), weight: 0.1 },
    ]),
  );

  return weightedAverage(scores.map((score) => ({ score, weight: 1 })));
}

function repoCompletion(input: GitHubAnalysisInput): number {
  const repos = eligibleRepos(input);

  if (!repos.length) {
    return 0;
  }

  const scores = repos.map((repo) =>
    weightedAverage([
      { score: booleanNorm(repo.fileSignals.readme), weight: 1 },
      { score: booleanNorm(Boolean(repo.description)), weight: 1 },
      { score: booleanNorm(repo.fileSignals.license), weight: 1 },
      { score: booleanNorm(Boolean(repo.language)), weight: 1 },
      {
        score: booleanNorm(
          repo.releaseCount > 0 ||
            repo.fileSignals.packageManifest ||
            repo.fileSignals.readmeHasCode,
        ),
        weight: 1,
      },
    ]),
  );

  return weightedAverage(scores.map((score) => ({ score, weight: 1 })));
}

export function calculateSignals(input: GitHubAnalysisInput): SignalScores {
  const now = new Date();
  const repos = input.repositories;
  const eligible = eligibleRepos(input);
  const eligibleCount = eligible.length;
  const topics = uniqueTopics(input);
  const languages = uniqueLanguages(input);
  const updatedRepos = eligible.filter((repo) =>
    recentlyUpdated(repo.pushedAt ?? repo.updatedAt, now),
  );
  const abandonedRepos = repos.filter((repo) =>
    abandoned(repo.pushedAt ?? repo.updatedAt, now),
  );
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazersCount, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forksCount, 0);
  const totalWatchers = repos.reduce((sum, repo) => sum + repo.watchersCount, 0);
  const releaseCount = repos.reduce((sum, repo) => sum + repo.releaseCount, 0);
  const docsRepos = eligible.filter(
    (repo) =>
      repo.fileSignals.readme ||
      repo.fileSignals.docsDirectory ||
      repo.fileSignals.examplesDirectory,
  );
  const licensedRepos = eligible.filter((repo) => repo.fileSignals.license);
  const ciRepos = eligible.filter((repo) => repo.fileSignals.ciConfig);
  const testRepos = eligible.filter((repo) => repo.fileSignals.testsDirectory);
  const packageRepos = eligible.filter((repo) => repo.fileSignals.packageManifest);
  const configRepos = eligible.filter((repo) => repo.fileSignals.configFiles);
  const topicMatches = (source: Set<string>, matcher: Set<string>) =>
    [...source].filter((topic) => matcher.has(topic)).length;
  const emergingMatches = topicMatches(topics, EMERGING_TOPICS);
  const researchMatches = topicMatches(topics, RESEARCH_TOPICS);
  const readmeScore = readmeQuality(input);
  const completionScore = repoCompletion(input);
  const contributionConfidence = input.contributions.activeDaysLastYear > 0 ? 100 : 50;

  return {
    S01: makeSignal("S01", countNorm(input.profile.publicRepos, 50), {
      publicRepositories: input.profile.publicRepos,
    }),
    S02: makeSignal(
      "S02",
      weightedAverage([
        { score: countNorm(topics.size, 30), weight: 0.5 },
        { score: countNorm(languages.size, 8), weight: 0.3 },
        { score: countNorm(input.profile.publicRepos, 50), weight: 0.2 },
      ]),
      { uniqueTopics: topics.size, languages: languages.size },
    ),
    S03: makeSignal("S03", ratioNorm(ratio(updatedRepos.length, eligibleCount)), {
      recentlyUpdatedRepositories: updatedRepos.length,
      eligibleRepositories: eligibleCount,
    }),
    S04: makeSignal("S04", completionScore, {
      eligibleRepositories: eligibleCount,
    }),
    S05: makeSignal("S05", countNorm(languages.size, 8), {
      languages: languages.size,
    }),
    S06: makeSignal(
      "S06",
      ratioNorm(
        ratio(
          Math.max(...Object.values(Object.fromEntries([...languages].map((language) => [language, repos.filter((repo) => repo.language === language).length]))), 0),
          Math.max(eligibleCount, 1),
        ),
      ),
      { languages: languages.size },
    ),
    S07: makeSignal(
      "S07",
      weightedAverage([
        {
          score: ratioNorm(
            ratio(
              eligible.filter((repo) => Object.keys(repo.languages).length >= 2)
                .length,
              eligibleCount,
            ),
          ),
          weight: 0.6,
        },
        { score: countNorm(languages.size, 8), weight: 0.4 },
      ]),
      { multiLanguageRepositories: eligible.filter((repo) => Object.keys(repo.languages).length >= 2).length },
    ),
    S08: makeSignal(
      "S08",
      countNorm(input.contributions.commitsLastYear, 1000),
      { commitsLastYear: input.contributions.commitsLastYear },
      contributionConfidence,
    ),
    S09: makeSignal(
      "S09",
      ratioNorm(input.contributions.activeWeeksLastYear / 52),
      { activeWeeksLastYear: input.contributions.activeWeeksLastYear },
      contributionConfidence,
    ),
    S10: makeSignal(
      "S10",
      countNorm(input.contributions.activeDaysLastYear, 250),
      { activeDaysLastYear: input.contributions.activeDaysLastYear },
      contributionConfidence,
    ),
    S11: makeSignal(
      "S11",
      countNorm(input.contributions.longestStreakDays, 90),
      { longestStreakDays: input.contributions.longestStreakDays },
      contributionConfidence,
    ),
    S12: makeSignal(
      "S12",
      countNorm(input.contributions.pullRequestsLastYear, 100),
      { pullRequestsLastYear: input.contributions.pullRequestsLastYear },
      contributionConfidence,
    ),
    S13: makeSignal(
      "S13",
      countNorm(input.contributions.pullRequestsLastYear, 100),
      { pullRequestsLastYear: input.contributions.pullRequestsLastYear },
      70,
    ),
    S14: makeSignal(
      "S14",
      weightedAverage([
        { score: countNorm(updatedRepos.length, 12), weight: 0.5 },
        { score: countNorm(input.contributions.commitsLastYear, 1000), weight: 0.5 },
      ]),
      { updatedRepositories: updatedRepos.length },
    ),
    S15: makeSignal(
      "S15",
      countNorm(input.contributions.externalPullRequestsLastYear, 40),
      { externalPullRequestsLastYear: input.contributions.externalPullRequestsLastYear },
      contributionConfidence,
    ),
    S16: makeSignal(
      "S16",
      countNorm(input.contributions.reviewsLastYear, 80),
      { reviewsLastYear: input.contributions.reviewsLastYear },
      contributionConfidence,
    ),
    S17: makeSignal(
      "S17",
      countNorm(input.contributions.issuesLastYear, 80),
      { issuesLastYear: input.contributions.issuesLastYear },
      contributionConfidence,
    ),
    S18: makeSignal(
      "S18",
      countNorm(input.contributions.issueCommentsLastYear, 160),
      { issueCommentsLastYear: input.contributions.issueCommentsLastYear },
      50,
    ),
    S19: makeSignal(
      "S19",
      weightedAverage([
        { score: countNorm(input.contributions.issueCommentsLastYear, 160), weight: 0.8 },
        { score: countNorm(input.profile.following, 300), weight: 0.2 },
      ]),
      { issueCommentsLastYear: input.contributions.issueCommentsLastYear, following: input.profile.following },
    ),
    S20: makeSignal(
      "S20",
      weightedAverage([
        { score: countNorm(input.contributions.externalPullRequestsLastYear, 40), weight: 0.4 },
        { score: countNorm(input.contributions.externalIssuesLastYear, 40), weight: 0.2 },
        { score: countNorm(input.contributions.reviewsLastYear, 80), weight: 0.2 },
        { score: countNorm(repos.filter((repo) => repo.fork).length, 20), weight: 0.2 },
      ]),
      { forkedRepositories: repos.filter((repo) => repo.fork).length },
    ),
    S21: makeSignal(
      "S21",
      weightedAverage([
        { score: countNorm(totalStars, 1000), weight: 0.6 },
        { score: countNorm(totalForks, 200), weight: 0.35 },
        { score: countNorm(totalWatchers, 500), weight: 0.05 },
      ]),
      { stars: totalStars, forks: totalForks, watchers: totalWatchers },
    ),
    S22: makeSignal(
      "S22",
      weightedAverage([
        { score: ratioNorm(ratio(eligible.filter((repo) => repo.fileSignals.contributingGuide).length, eligibleCount)), weight: 0.3 },
        { score: countNorm(releaseCount, 20), weight: 0.3 },
        { score: readmeScore, weight: 0.4 },
      ]),
      { releases: releaseCount },
    ),
    S23: makeSignal("S23", ratioNorm(ratio(docsRepos.length, eligibleCount)), {
      documentedRepositories: docsRepos.length,
    }),
    S24: makeSignal(
      "S24",
      weightedAverage([
        { score: readmeScore, weight: 0.7 },
        { score: ratioNorm(ratio(docsRepos.length, eligibleCount)), weight: 0.3 },
      ]),
      { readmeQuality: readmeScore },
    ),
    S25: makeSignal("S25", readmeScore, { readmeQuality: readmeScore }),
    S26: makeSignal(
      "S26",
      weightedAverage([
        { score: ratioNorm(ratio(eligible.filter((repo) => Boolean(repo.description)).length, eligibleCount)), weight: 0.4 },
        { score: ratioNorm(ratio(eligible.filter((repo) => repo.topics.length > 0).length, eligibleCount)), weight: 0.4 },
        { score: ratioNorm(ratio(eligible.filter((repo) => repo.htmlUrl.length > 0).length, eligibleCount)), weight: 0.2 },
      ]),
      { repositoriesWithTopics: eligible.filter((repo) => repo.topics.length > 0).length },
    ),
    S27: makeSignal(
      "S27",
      weightedAverage([
        { score: countNorm(releaseCount, 20), weight: 0.6 },
        { score: ratioNorm(ratio(eligible.filter((repo) => repo.releaseCount > 0).length, eligibleCount)), weight: 0.4 },
      ]),
      { releases: releaseCount },
    ),
    S28: makeSignal("S28", ratioNorm(ratio(licensedRepos.length, eligibleCount)), {
      licensedRepositories: licensedRepos.length,
    }),
    S29: makeSignal("S29", ratioNorm(ratio(ciRepos.length, eligibleCount)), {
      ciRepositories: ciRepos.length,
    }),
    S30: makeSignal("S30", ratioNorm(ratio(testRepos.length, eligibleCount)), {
      testRepositories: testRepos.length,
    }),
    S31: makeSignal(
      "S31",
      weightedAverage([
        { score: ratioNorm(ratio(ciRepos.length, eligibleCount)), weight: 0.35 },
        { score: ratioNorm(ratio(packageRepos.length, eligibleCount)), weight: 0.35 },
        { score: ratioNorm(ratio(configRepos.length, eligibleCount)), weight: 0.3 },
      ]),
      { packageRepositories: packageRepos.length, configRepositories: configRepos.length },
    ),
    S32: makeSignal(
      "S32",
      countNorm(
        [...topics].filter((topic) =>
          ["performance", "benchmark", "profiling", "optimization"].includes(topic),
        ).length,
        4,
      ),
      { performanceTopics: [...topics].filter((topic) => ["performance", "benchmark", "profiling", "optimization"].includes(topic)).length },
    ),
    S33: makeSignal(
      "S33",
      weightedAverage([
        { score: countNorm(researchMatches, 10), weight: 0.5 },
        { score: readmeScore, weight: 0.3 },
        { score: countNorm(input.contributions.issuesLastYear, 80), weight: 0.2 },
      ]),
      { researchTopicMatches: researchMatches },
    ),
    S34: makeSignal(
      "S34",
      weightedAverage([
        {
          score: countNorm(
            repos.filter((repo) => recentlyUpdated(repo.createdAt, now)).length,
            10,
          ),
          weight: 0.3,
        },
        { score: countNorm(emergingMatches, 10), weight: 0.4 },
        { score: countNorm(topics.size, 30), weight: 0.3 },
      ]),
      { emergingTopicMatches: emergingMatches },
    ),
    S35: makeSignal(
      "S35",
      clampScore(
        weightedAverage([
          { score: ratioNorm(ratio(updatedRepos.length, eligibleCount)), weight: 0.6 },
          { score: countNorm(releaseCount, 20), weight: 0.2 },
          { score: countNorm(input.contributions.activeDaysLastYear, 250), weight: 0.2 },
        ]) - ratioNorm(ratio(abandonedRepos.length, Math.max(repos.length, 1))) * 0.25,
      ),
      { abandonedRepositories: abandonedRepos.length, updatedRepositories: updatedRepos.length },
    ),
    S36: makeSignal(
      "S36",
      weightedAverage([
        { score: ratioNorm(ratio(licensedRepos.length, eligibleCount)), weight: 0.25 },
        { score: ratioNorm(ratio(eligible.filter((repo) => repo.fileSignals.examplesDirectory).length, eligibleCount)), weight: 0.2 },
        { score: ratioNorm(ratio(packageRepos.length, eligibleCount)), weight: 0.2 },
        { score: ratioNorm(ratio(docsRepos.length, eligibleCount)), weight: 0.2 },
        { score: ratioNorm(ratio(eligible.filter((repo) => repo.isTemplate).length, eligibleCount)), weight: 0.15 },
      ]),
      { reusableRepositories: packageRepos.length },
    ),
  };
}

