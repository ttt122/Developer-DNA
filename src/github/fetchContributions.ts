import { githubGraphql } from "@/github/client";
import type { GitHubContributionSummary } from "@/github/types";

type ContributionCalendarDay = {
  contributionCount: number;
  date: string;
};

type ContributionGraphqlResponse = {
  user: {
    contributionsCollection: {
      totalCommitContributions: number;
      totalPullRequestContributions: number;
      totalIssueContributions: number;
      totalPullRequestReviewContributions: number;
      contributionCalendar: {
        weeks: Array<{
          contributionDays: ContributionCalendarDay[];
        }>;
      };
    };
  } | null;
};

function emptyContributionSummary(): GitHubContributionSummary {
  return {
    commitsLastYear: 0,
    pullRequestsLastYear: 0,
    externalPullRequestsLastYear: 0,
    issuesLastYear: 0,
    externalIssuesLastYear: 0,
    issueCommentsLastYear: 0,
    reviewsLastYear: 0,
    activeDaysLastYear: 0,
    activeWeeksLastYear: 0,
    longestStreakDays: 0,
  };
}

function longestStreak(days: ContributionCalendarDay[]): number {
  let current = 0;
  let longest = 0;

  for (const day of days) {
    if (day.contributionCount > 0) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 0;
    }
  }

  return longest;
}

export async function fetchContributions(
  username: string,
): Promise<GitHubContributionSummary> {
  const to = new Date();
  const from = new Date(to);
  from.setFullYear(to.getFullYear() - 1);

  const data = await githubGraphql<ContributionGraphqlResponse>(
    `
      query DevDnaContributions($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
            totalPullRequestReviewContributions
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `,
    {
      login: username,
      from: from.toISOString(),
      to: to.toISOString(),
    },
  );

  if (!data?.user) {
    return emptyContributionSummary();
  }

  const collection = data.user.contributionsCollection;
  const weeks = collection.contributionCalendar.weeks;
  const days = weeks.flatMap((week) => week.contributionDays);

  return {
    commitsLastYear: collection.totalCommitContributions,
    pullRequestsLastYear: collection.totalPullRequestContributions,
    externalPullRequestsLastYear: 0,
    issuesLastYear: collection.totalIssueContributions,
    externalIssuesLastYear: 0,
    issueCommentsLastYear: 0,
    reviewsLastYear: collection.totalPullRequestReviewContributions,
    activeDaysLastYear: days.filter((day) => day.contributionCount > 0).length,
    activeWeeksLastYear: weeks.filter((week) =>
      week.contributionDays.some((day) => day.contributionCount > 0),
    ).length,
    longestStreakDays: longestStreak(days),
  };
}

