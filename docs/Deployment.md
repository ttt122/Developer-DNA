# Deployment Guide

DevDNA MVP is a Next.js application. The recommended deployment target is Vercel.

Cloudflare Pages is possible, but may require additional Next.js adapter work depending on runtime needs. GitHub Pages is not suitable for the full MVP because the app uses dynamic API routes.

## Recommended: Vercel

Vercel is the simplest deployment path for the MVP because it supports:

- Next.js App Router
- Route Handlers
- Server-side GitHub API calls
- Environment variables
- CDN caching for SVG cards

### Steps

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js framework preset.
4. Set the package manager to `pnpm`.
5. Add environment variable:

```text
GITHUB_TOKEN=...
```

`GITHUB_TOKEN` is optional, but recommended.

6. Deploy.

### Vercel Commands

Optional local Vercel workflow:

```bash
pnpm install
vercel link
vercel env add GITHUB_TOKEN
vercel deploy
```

Production:

```bash
vercel deploy --prod
```

## Environment Variables

| Name | Required | Purpose |
| --- | --- | --- |
| `GITHUB_TOKEN` | No | Enables GitHub GraphQL contribution data and higher rate limits. |

## Production README Card URL

After deployment, README card URLs should use the production domain:

```md
[![DevDNA](https://your-devdna-domain.com/api/card/octocat.svg)](https://your-devdna-domain.com)
```

## Cloudflare Pages

Cloudflare Pages can host the frontend, but the MVP depends on Next.js Route Handlers.

Use Cloudflare only if the project is adapted for a compatible Next.js runtime, such as:

- OpenNext
- Cloudflare Workers adapter
- A separate API service

Cloudflare deployment should be revisited after the MVP stabilizes.

## GitHub Pages

GitHub Pages is not recommended for the MVP.

Reason:

- GitHub Pages only serves static files.
- DevDNA needs server-side API routes to call GitHub and generate SVG cards dynamically.

GitHub Pages may be useful later for static documentation only.

## Caching

Recommended cache policy:

| Route | Cache |
| --- | --- |
| `/api/card/{username}.svg` | 24 hours |
| `/api/analyze/{username}` | 1 hour |

The current MVP sets cache headers for SVG cards.

## Pre-Deployment Checks

Run:

```bash
pnpm lint
pnpm build
```

Both must pass before deployment.

