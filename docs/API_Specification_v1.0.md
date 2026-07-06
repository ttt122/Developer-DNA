# DevDNA REST API Specification v1.0

## 0. Status

This document defines the official DevDNA REST API Specification v1.0.

It depends on:

- `Signal Engine Specification v1.0`
- `Genome Scoring Specification v0.1.0`
- `DevDNA Type System v1.0`
- `README Card Specification v1.0`

No implementation code is included in this specification.

## 1. API Philosophy

The API separates DevDNA clients from DevDNA scoring internals.

Frontends, README cards, CLIs, bots, browser extensions, and future platform integrations should all be able to consume the same stable API contract.

The API must be:

- Deterministic
- Cacheable
- Versioned
- Explainable
- Friendly to public OSS usage

Base URL placeholder:

```text
https://api.devdna.example.com/v1
```

## 2. Versioning

The API version is part of the path.

```text
/v1/analyze/{username}
```

Responses must include algorithm versions:

```json
{
  "apiVersion": "1.0",
  "signalEngineVersion": "1.0",
  "genomeScoringVersion": "0.1.0",
  "typeSystemVersion": "1.0"
}
```

Breaking response changes require `/v2`.

## 3. Authentication

MVP endpoints are public and unauthenticated.

Authentication may be added later for:

- Manual refresh
- Higher rate limits
- Private history management
- GitHub App installation
- Team analysis

Public endpoints must never require access to private repositories.

## 4. Rate Limit

Suggested MVP public limits:

| Scope | Limit |
| --- | ---: |
| IP address | 60 requests / hour |
| Username analysis refresh | 5 refreshes / hour |
| Card SVG | 600 requests / hour |
| Type dictionary | 1000 requests / hour |

Headers:

```text
X-RateLimit-Limit
X-RateLimit-Remaining
X-RateLimit-Reset
Retry-After
```

## 5. Caching

Recommended cache rules:

| Endpoint | Cache |
| --- | --- |
| `GET /analyze/{username}` | 1 hour, unless `refresh=true` |
| `GET /genome/{username}` | 1 hour |
| `GET /card/{username}` | 24 hours |
| `GET /type/{type}` | 7 days |
| `GET /compatibility/{type}` | 7 days |
| `GET /history/{username}` | 1 hour |

Headers:

```text
Cache-Control
ETag
Last-Modified
```

Cards should be CDN-cacheable.

## 6. Common Response Envelope

JSON endpoints should use this shape:

```json
{
  "ok": true,
  "data": {},
  "meta": {
    "apiVersion": "1.0",
    "generatedAt": "2026-07-06T00:00:00Z",
    "cache": {
      "hit": false,
      "ttlSeconds": 3600
    }
  }
}
```

Error shape:

```json
{
  "ok": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "GitHub user was not found.",
    "details": {}
  },
  "meta": {
    "apiVersion": "1.0",
    "generatedAt": "2026-07-06T00:00:00Z"
  }
}
```

## 7. Error Codes

| HTTP | Code | Meaning |
| ---: | --- | --- |
| 400 | `INVALID_USERNAME` | Username format is invalid. |
| 400 | `INVALID_TYPE` | Type name is invalid. |
| 404 | `USER_NOT_FOUND` | GitHub user does not exist or is unavailable. |
| 404 | `TYPE_NOT_FOUND` | DevDNA type does not exist. |
| 409 | `INSUFFICIENT_SIGNAL` | Not enough public data to assign a type. |
| 429 | `RATE_LIMITED` | Rate limit exceeded. |
| 502 | `GITHUB_API_ERROR` | GitHub API failed. |
| 503 | `ANALYSIS_UNAVAILABLE` | Analysis service unavailable. |

## 8. Endpoints

## 8.1 GET /analyze/{username}

Runs or retrieves the full DevDNA analysis for a GitHub username.

```text
GET /v1/analyze/octocat
```

Query parameters:

| Parameter | Type | Default | Notes |
| --- | --- | --- | --- |
| refresh | boolean | `false` | Re-fetch GitHub data if allowed by rate limit. |
| includeSignals | boolean | `false` | Include full behavior signal output. |
| includeRaw | boolean | `false` | Include selected raw values, never private data. |

Response example:

```json
{
  "ok": true,
  "data": {
    "username": "octocat",
    "type": {
      "name": "FORGE",
      "title": "The System Crafter",
      "confidence": 91,
      "boundary": {
        "isBoundary": false,
        "nearType": "VECTOR",
        "distanceGap": 12.4
      }
    },
    "genome": {
      "execution": 92,
      "architecture": 84,
      "innovation": 67,
      "community": 42,
      "leadership": 58,
      "optimization": 73,
      "research": 49,
      "reliability": 80,
      "craft": 76,
      "openness": 61
    },
    "topSignals": [
      {
        "id": "S08",
        "name": "Commit Volume",
        "score": 86
      },
      {
        "id": "S10",
        "name": "Active Day Density",
        "score": 82
      }
    ],
    "explanations": [
      "Execution is high because commit volume, pull request activity, and active days are strong.",
      "Architecture is high because repository structure, releases, and configuration signals are visible."
    ],
    "versions": {
      "signalEngine": "1.0",
      "genomeScoring": "0.1.0",
      "typeSystem": "1.0"
    }
  },
  "meta": {
    "apiVersion": "1.0",
    "generatedAt": "2026-07-06T00:00:00Z"
  }
}
```

## 8.2 GET /card/{username}

Returns a README card.

Recommended concrete formats:

```text
GET /v1/card/octocat.svg
GET /v1/card/octocat.png
```

Alias:

```text
GET /v1/card/octocat
```

Query parameters:

| Parameter | Values | Default |
| --- | --- | --- |
| format | `svg`, `png`, `json` | inferred from extension |
| theme | `default`, `dark`, `cyber`, `minimal`, `github` | `default` |
| size | `compact`, `standard`, `wide`, `social-wide`, `social-square` | `standard` |
| show | comma-separated components | `type,genome,evolution` |
| refresh | `true`, `false` | `false` |

SVG response:

```text
Content-Type: image/svg+xml
Cache-Control: public, max-age=86400
```

JSON metadata response:

```json
{
  "ok": true,
  "data": {
    "username": "octocat",
    "cardUrl": "https://api.devdna.example.com/v1/card/octocat.svg?theme=github",
    "profileUrl": "https://devdna.example.com/octocat",
    "markdown": "[![DevDNA](https://api.devdna.example.com/v1/card/octocat.svg?theme=github)](https://devdna.example.com/octocat)",
    "html": "<a href=\"https://devdna.example.com/octocat\"><img src=\"https://api.devdna.example.com/v1/card/octocat.svg?theme=github\" alt=\"DevDNA card for octocat\" width=\"640\" height=\"320\" /></a>"
  },
  "meta": {
    "apiVersion": "1.0",
    "generatedAt": "2026-07-06T00:00:00Z"
  }
}
```

## 8.3 GET /type/{type}

Returns the Developer Dictionary entry for a type.

```text
GET /v1/type/FORGE
```

Response example:

```json
{
  "ok": true,
  "data": {
    "name": "FORGE",
    "title": "The System Crafter",
    "concept": "Turns plans into working systems.",
    "oneLine": "A high-output developer who shapes code into usable software.",
    "strengths": ["Shipping", "System assembly", "MVP delivery"],
    "blindSpots": ["Public storytelling", "Long review cycles"],
    "teamRole": "Converts goals into functioning code and stabilizes the first working version.",
    "recommendedOSS": ["CLIs", "Frameworks", "Developer tools"],
    "recommendedLanguages": ["TypeScript", "Go", "Rust", "Python", "Kotlin"],
    "growthDirection": "Add Community and Craft to make shipped work easier for others to adopt.",
    "genomeProfile": {
      "execution": 5,
      "architecture": 4,
      "innovation": 3,
      "community": 1,
      "leadership": 3,
      "optimization": 4,
      "research": 2,
      "reliability": 4,
      "craft": 2,
      "openness": 2
    }
  },
  "meta": {
    "apiVersion": "1.0",
    "typeSystemVersion": "1.0"
  }
}
```

## 8.4 GET /compatibility/{type}

Returns compatibility ratings for one type against all other types.

```text
GET /v1/compatibility/FORGE
```

Optional pair query:

```text
GET /v1/compatibility/FORGE?with=ORBIT
```

Response example:

```json
{
  "ok": true,
  "data": {
    "type": "FORGE",
    "compatibility": [
      {
        "with": "ORBIT",
        "rating": 5,
        "label": "Exceptional fit",
        "reason": "FORGE brings implementation velocity while ORBIT brings review flow and contributor motion."
      },
      {
        "with": "VOID",
        "rating": 2,
        "label": "Friction likely",
        "reason": "Both may lack enough public coordination unless roles are explicit."
      }
    ]
  },
  "meta": {
    "apiVersion": "1.0",
    "typeSystemVersion": "1.0"
  }
}
```

## 8.5 GET /history/{username}

Returns monthly DevDNA history for a username.

```text
GET /v1/history/octocat
```

Query parameters:

| Parameter | Type | Default |
| --- | --- | --- |
| from | `YYYY-MM` | first available |
| to | `YYYY-MM` | latest |
| includeGenome | boolean | `true` |

Response example:

```json
{
  "ok": true,
  "data": {
    "username": "octocat",
    "history": [
      {
        "month": "2026-01",
        "type": "FORGE",
        "code": "XAYG",
        "genome": {
          "execution": 88,
          "architecture": 80,
          "innovation": 61,
          "community": 38,
          "leadership": 54,
          "optimization": 70,
          "research": 44,
          "reliability": 76,
          "craft": 68,
          "openness": 55
        },
        "versions": {
          "signalEngine": "1.0",
          "genomeScoring": "0.1.0",
          "typeSystem": "1.0"
        }
      }
    ]
  },
  "meta": {
    "apiVersion": "1.0"
  }
}
```

## 8.6 GET /genome/{username}

Returns Genome scores without full type dictionary details.

```text
GET /v1/genome/octocat
```

Query parameters:

| Parameter | Type | Default |
| --- | --- | --- |
| includeSignals | boolean | `false` |
| refresh | boolean | `false` |

Response example:

```json
{
  "ok": true,
  "data": {
    "username": "octocat",
    "genome": {
      "execution": {
        "score": 92,
        "confidence": 94,
        "topSignals": ["S08", "S10", "S12"]
      },
      "architecture": {
        "score": 84,
        "confidence": 88,
        "topSignals": ["S04", "S07", "S27"]
      }
    },
    "versions": {
      "signalEngine": "1.0",
      "genomeScoring": "0.1.0"
    }
  },
  "meta": {
    "apiVersion": "1.0",
    "generatedAt": "2026-07-06T00:00:00Z"
  }
}
```

## 9. JSON Schema Considerations

OpenAPI-compatible schemas should be created from these entities:

```text
AnalyzeResponse
GenomeResponse
GenomeScore
SignalScore
TypeDictionaryEntry
CompatibilityEntry
HistorySnapshot
CardMetadata
ApiError
ApiMeta
VersionInfo
```

## 9.1 Core Schema Shape

```json
{
  "GenomeScores": {
    "type": "object",
    "required": [
      "execution",
      "architecture",
      "innovation",
      "community",
      "leadership",
      "optimization",
      "research",
      "reliability",
      "craft",
      "openness"
    ],
    "properties": {
      "execution": { "type": "integer", "minimum": 0, "maximum": 100 },
      "architecture": { "type": "integer", "minimum": 0, "maximum": 100 },
      "innovation": { "type": "integer", "minimum": 0, "maximum": 100 },
      "community": { "type": "integer", "minimum": 0, "maximum": 100 },
      "leadership": { "type": "integer", "minimum": 0, "maximum": 100 },
      "optimization": { "type": "integer", "minimum": 0, "maximum": 100 },
      "research": { "type": "integer", "minimum": 0, "maximum": 100 },
      "reliability": { "type": "integer", "minimum": 0, "maximum": 100 },
      "craft": { "type": "integer", "minimum": 0, "maximum": 100 },
      "openness": { "type": "integer", "minimum": 0, "maximum": 100 }
    }
  }
}
```

## 10. OpenAPI Compatibility

The API should later publish:

```text
GET /v1/openapi.json
```

OpenAPI requirements:

- `openapi: 3.1.0`
- All endpoints documented
- Shared schemas for common response envelope
- Error responses documented
- Rate limit headers documented
- SVG and PNG content types documented

## 11. Security and Privacy

Rules:

- Only public GitHub data is used in MVP.
- Do not expose GitHub API tokens.
- Do not store private repository data.
- Do not imply hiring suitability.
- Do not expose raw API payloads by default.
- `includeRaw=true` must return selected derived public values only.

## 12. Non-Negotiables

- API responses must include algorithm versions.
- Type assignment must depend on Genome scores, not raw GitHub data.
- Card endpoints must be cacheable.
- Error responses must be stable and machine-readable.
- Public endpoints must work without authentication in MVP.
- OpenAPI generation must remain possible from the specification.

