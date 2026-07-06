# DDS-0001: Philosophy

## Status

Standard.

## Purpose

DDS-0001 defines the philosophy that every DevDNA-compatible implementation MUST follow.

DevDNA exists to create a shared developer language from public development activity.

It is not a personality test, a hiring score, or a popularity contest.

## Core Definition

A DevDNA implementation MUST describe visible developer behavior, not private identity or personality.

DevDNA-compatible systems MUST follow this flow:

```text
Public development activity
-> Behavior interpretation
-> Genome
-> Type
-> Shareable artifact
```

## Principles

### Public Activity

DevDNA-compatible implementations MUST use public data by default.

Private repository data MAY be supported in future implementations only with explicit user consent, and private data MUST NOT be exposed in public cards or public API responses.

### Determinism

DevDNA analysis SHOULD be deterministic for the same input data and same specification versions.

If non-deterministic analysis is added in the future, the implementation MUST clearly label it as non-standard or experimental.

### Explainability

Every user-facing type result MUST be explainable through Genome scores and behavior signals.

An implementation MUST NOT output a type without enough supporting information to explain the result.

### Non-Ranking

DevDNA types MUST NOT imply human value, seniority, hiring suitability, or overall developer quality.

Scores describe visible public activity patterns.

### Culture First

DevDNA-compatible artifacts SHOULD be easy to share in developer-native spaces:

- GitHub README
- OSS project pages
- Team profiles
- CLI output
- Community bots

## Compatibility Conditions

An implementation is philosophically compatible when it:

- MUST use DevDNA to describe developer behavior.
- MUST NOT market DevDNA as a psychological diagnosis.
- MUST NOT claim one type is universally better than another.
- SHOULD prioritize readable explanations over opaque precision.
- MAY provide additional educational context if it does not alter official type meanings.

