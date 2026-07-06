# DevDNA MVP v0.1.0

## Purpose

DevDNA MVP v0.1.0 is the first working implementation of the DevDNA specifications.

It proves the core flow:

```text
GitHub username
-> public GitHub data
-> Behavior Signals
-> Genome scores
-> Type assignment
-> README SVG card
```

## Implemented Features

- Next.js App Router application
- GitHub username input UI
- GitHub public profile fetch
- GitHub public repository fetch
- README, license, release, topic, language, and file-signal checks
- Optional GitHub GraphQL contribution fetch through `GITHUB_TOKEN`
- Signal Engine calculations
- Genome scoring
- Type assignment
- Analyze API route
- README SVG card API route
- Basic result panel with Genome bars
- Copyable README card markdown

## API Routes

```text
GET /api/analyze/{username}
GET /api/card/{username}.svg
```

## Not Implemented Yet

- Monthly Evolution
- Compatibility
- OAuth
- Database
- User accounts
- History snapshots
- Login
- Card themes
- PNG social cards
- Animated cards
- GitHub App installation
- CLI
- Tests and fixtures

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js Route Handlers
- GitHub REST API
- GitHub GraphQL API when `GITHUB_TOKEN` is available
- pnpm

## Limitations

- Without `GITHUB_TOKEN`, contribution data is limited.
- External PR, issue comment, and review signals are not fully covered yet.
- Only the first 30 repositories receive deeper file analysis in MVP.
- No persistent cache or database exists yet.
- Type assignment is deterministic but not yet calibrated against a large user sample.
- README card has one default static SVG theme.
- Percentile, Developer Level, Monthly Evolution, and Compatibility are intentionally excluded.

## Next Improvement Candidates

1. Add tests and fixture accounts for Signal, Genome, and Type calculations.
2. Improve GitHub GraphQL coverage for external PRs, issue comments, and reviews.
3. Add card themes from `README Card Specification v1.0`.
4. Add OpenAPI schema for API routes.
5. Add Vercel deployment configuration and production URL examples.
6. Add GitHub Actions for lint/build checks.
7. Add repository issue templates and PR template.
8. Add Monthly Evolution storage design after MVP validation.

