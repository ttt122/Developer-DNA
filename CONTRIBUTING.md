# Contributing to DevDNA

Thanks for helping build DevDNA.

DevDNA is a specification-first OSS project. The goal is to create a shared developer language from public development activity.

## Before You Start

Read the core documents:

- [README.md](README.md)
- [DevDNA Standard / DDS](docs/DDS/README.md)
- [Signal Engine v1.0](docs/Signal_Engine_v1.0.md)
- [Genome Scoring v0.1.0](docs/Genome_Scoring_v0.1.0.md)
- [Type System v1.0](docs/Type_System_v1.0.md)

## Development Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

`GITHUB_TOKEN` is optional, but recommended for better contribution data.

## Checks

Run before opening a pull request:

```bash
pnpm lint
pnpm build
```

## Contribution Guidelines

- Keep changes small and focused.
- Do not change scoring semantics without updating the relevant specification.
- Do not add AI-based type judgment to the MVP scoring path.
- Do not use private GitHub data unless a future specification explicitly allows it with user consent.
- Preserve deterministic, explainable results.
- Add or update documentation when behavior changes.

## Areas That Need Help

- GitHub API data coverage
- Signal calculation accuracy
- README card themes
- Accessibility
- API response schemas
- Tests and fixtures
- Documentation improvements

## Pull Request Checklist

- The change has a clear purpose.
- `pnpm lint` passes.
- `pnpm build` passes.
- Public behavior changes are documented.
- Specification changes reference the relevant DDS file.

