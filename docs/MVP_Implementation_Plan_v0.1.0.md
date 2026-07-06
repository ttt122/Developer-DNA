# DevDNA MVP Implementation Plan v0.1.0

## 1. Goal

Build a working DevDNA MVP that analyzes a public GitHub username and returns:

- Behavior Signals
- Genome scores
- DevDNA type
- README SVG card

The MVP must remain rule-based and must not use AI for judgment.

## 2. Specification Sources

Implementation must follow:

- `docs/DevDNA_Design_Bible.md`
- `docs/Genome_Scoring_v0.1.0.md`
- `docs/Signal_Engine_v1.0.md`
- `docs/Type_System_v1.0.md`
- `docs/README_Card_Specification_v1.0.md`
- `docs/API_Specification_v1.0.md`
- `docs/DDS/README.md`

## 3. Directory Structure

Initial structure:

```text
src/
  app/
    api/
      analyze/[username]/route.ts
      card/[username]/route.ts
    page.tsx
    layout.tsx
    globals.css
  github/
    client.ts
    fetchUserProfile.ts
    fetchRepositories.ts
    fetchContributions.ts
  signals/
    constants.ts
    calculateSignals.ts
    normalize.ts
    types.ts
  genome/
    calculateGenome.ts
    constants.ts
    types.ts
  types/
    calculateType.ts
    definitions.ts
    types.ts
  cards/
    renderReadmeCard.tsx
  api/
    responses.ts
  components/
    AnalyzeForm.tsx
    GenomeBars.tsx
    ResultPanel.tsx
  lib/
    dates.ts
    numbers.ts
```

## 4. Required Libraries

Core:

```text
next
react
react-dom
typescript
tailwindcss
eslint
```

MVP utility dependencies:

```text
zod
lucide-react
```

Notes:

- `zod` validates route params and API response boundaries.
- `lucide-react` provides UI icons.
- No database dependency is required for MVP.
- No OAuth dependency is required for MVP.
- No AI SDK dependency is allowed for scoring.

## 5. Implementation Order

1. Scaffold Next.js app with TypeScript, Tailwind CSS, App Router, and pnpm.
2. Add base project structure under `src/`.
3. Implement shared types for GitHub raw data, signals, Genome, and type results.
4. Implement normalization helpers.
5. Implement GitHub REST/GraphQL fetchers.
6. Implement Signal Engine v1.0 subset required for MVP.
7. Implement Genome scoring from signals.
8. Implement Type System v1.0 assignment.
9. Implement `GET /api/analyze/[username]`.
10. Implement `GET /api/card/[username]` returning SVG.
11. Implement homepage with username input and result display.
12. Run build and basic route verification.

## 6. MVP Scope

Included:

- GitHub username input
- Public GitHub data fetch
- Signal calculation
- Genome calculation
- Type assignment
- README SVG card generation
- Public API route handlers

Excluded:

- Monthly Evolution
- Compatibility UI
- OAuth
- Database
- History
- Login
- Animation

## 7. Commit Plan

Each implementation commit should remain small:

1. Project scaffold
2. Domain types and constants
3. GitHub data fetchers
4. Signal Engine
5. Genome calculation
6. Type assignment
7. Analyze API
8. README card API
9. Frontend UI
10. Verification fixes

