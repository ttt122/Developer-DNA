# DevDNA

DevDNA analyzes public GitHub activity and turns it into a rule-based Developer DNA profile.

It converts GitHub public data into:

- Behavior Signals
- Genome scores
- Developer DNA type
- README SVG card

DevDNA is not a personality test, hiring score, or AI-generated label. It is a deterministic developer identity layer built from public GitHub behavior.

```text
GitHub API
-> Raw Data
-> Signal Engine
-> Behavior Signals
-> Genome
-> Type Assignment
-> README Card
```

## MVP Status

Current version:

```text
DevDNA MVP v0.1.0
```

Implemented:

- GitHub username input
- Public GitHub profile and repository analysis
- Signal Engine v1.0 subset
- Genome scoring v0.1.0
- Type System v1.0 assignment
- Analyze API
- README SVG card API
- Basic Next.js UI

Not included yet:

- OAuth
- Database
- Monthly Evolution
- Compatibility UI
- History
- Login
- Animated cards

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Next.js Route Handlers
- GitHub REST API
- GitHub GraphQL API when `GITHUB_TOKEN` is configured
- pnpm

## Getting Started

Clone the repository:

```bash
git clone https://github.com/ttt122/Developer-DNA.git
cd Developer-DNA
```

Install dependencies:

```bash
pnpm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

If port `3000` is already in use, Next.js will choose another local port.

## GitHub Token

`GITHUB_TOKEN` is optional but recommended.

Without a token, DevDNA can still use public GitHub REST API data, but contribution details are limited. With a token, DevDNA can also use GitHub GraphQL contribution data, improving Execution and Reliability scoring.

Create a fine-grained or classic GitHub token with public read access, then add it to `.env.local`:

```bash
GITHUB_TOKEN=github_pat_your_token_here
```

Do not commit `.env.local`.

## API

### Analyze User

```text
GET /api/analyze/{username}
```

Example:

```bash
curl http://localhost:3000/api/analyze/octocat
```

Returns:

- Profile summary
- Type result
- Genome scores
- Genome confidence
- Top signals
- Signal scores
- Explanation text
- Algorithm versions

### README Card

```text
GET /api/card/{username}.svg
```

Example:

```text
http://localhost:3000/api/card/octocat.svg
```

Returns:

```text
image/svg+xml
```

## README Card Embed

For local development:

```md
[![DevDNA](http://localhost:3000/api/card/octocat.svg)](http://localhost:3000)
```

For production, replace the domain with your deployed URL:

```md
[![DevDNA](https://your-devdna-domain.com/api/card/octocat.svg)](https://your-devdna-domain.com)
```

The SVG card is static and cacheable. It displays the type name, type title, top Genome scores, generated date, and DevDNA version.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm build
pnpm start
```

## Specifications

Core specifications:

- [Design Bible](docs/DevDNA_Design_Bible.md)
- [Genome Scoring v0.1.0](docs/Genome_Scoring_v0.1.0.md)
- [Signal Engine v1.0](docs/Signal_Engine_v1.0.md)
- [Type System v1.0](docs/Type_System_v1.0.md)
- [README Card Specification v1.0](docs/README_Card_Specification_v1.0.md)
- [REST API Specification v1.0](docs/API_Specification_v1.0.md)
- [DevDNA Standard / DDS](docs/DDS/README.md)

MVP and operations:

- [MVP v0.1.0](docs/MVP_v0.1.0.md)
- [MVP Implementation Plan](docs/MVP_Implementation_Plan_v0.1.0.md)
- [Deployment Guide](docs/Deployment.md)

## Roadmap

### Phase 1: MVP

- Public GitHub username analysis
- Rule-based Signal Engine
- Genome scoring
- Type assignment
- README SVG card

### Phase 2: Accuracy

- Better external PR detection
- Better review and issue comment signals
- Better README and repository file analysis
- More robust GitHub GraphQL usage

### Phase 3: Sharing

- Card themes
- PNG social cards
- Copyable card snippets
- Public profile page

### Phase 4: Growth

- Monthly Evolution
- Timeline
- History snapshots
- Type transitions

### Phase 5: Ecosystem

- Compatibility
- Team analysis
- GitHub App
- CLI
- VS Code extension
- Discord bot

## Contributing

Contributions are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md).

The project is specification-first. Changes to scoring, signals, type definitions, cards, or API behavior should reference the relevant DDS document.

## License

MIT License. See [LICENSE](LICENSE).

