# DDS-0006: API

## Status

Standard.

## Purpose

DDS-0006 defines the REST API compatibility requirements for DevDNA services.

The detailed source specification is [`../API_Specification_v1.0.md`](../API_Specification_v1.0.md).

## Required Endpoints

A DDS-compatible API SHOULD expose these endpoints or documented equivalents:

```text
GET /v1/analyze/{username}
GET /v1/card/{username}
GET /v1/type/{type}
GET /v1/compatibility/{type}
GET /v1/history/{username}
GET /v1/genome/{username}
```

## Response Requirements

JSON responses MUST include:

- Stable success/error envelope
- API version
- Generated timestamp
- Relevant algorithm versions
- Machine-readable error codes

Analysis responses MUST include:

- Username
- Genome scores
- Type assignment or insufficient-signal state
- Explanations
- Version information

## Versioning

The API version SHOULD be part of the URL path.

```text
/v1/analyze/{username}
```

Breaking response changes MUST require a new major API version.

## Authentication

MVP public endpoints MAY be unauthenticated.

Endpoints that refresh data, access private data, or manage user history SHOULD require authentication.

Public API responses MUST NOT expose private repository data.

## Rate Limits and Caching

Compatible APIs SHOULD publish rate limit headers:

```text
X-RateLimit-Limit
X-RateLimit-Remaining
X-RateLimit-Reset
Retry-After
```

Card endpoints MUST be cacheable.

Type dictionary and compatibility endpoints SHOULD be long-cacheable because they are versioned standard data.

## OpenAPI

Compatible APIs SHOULD provide an OpenAPI 3.1 document.

Suggested endpoint:

```text
GET /v1/openapi.json
```

## Compliance

An implementation MAY be called `DDS-API-Compatible` if it:

1. Provides versioned API responses.
2. Supports the required endpoint set or documented equivalents.
3. Includes stable error responses.
4. Includes algorithm version metadata.
5. Supports caching behavior for cards and standard reference data.

