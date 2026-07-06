# DDS-0004: Type System

## Status

Standard.

## Purpose

DDS-0004 defines the official DevDNA public type system.

The detailed source specification is [`../Type_System_v1.0.md`](../Type_System_v1.0.md).

## Official Types

A DevDNA-compatible v1 implementation MUST use these 16 public type names:

```text
FORGE
ORBIT
NOVA
PULSE
ECHO
VECTOR
CORE
CIPHER
PRISM
QUANT
APEX
FLUX
VOID
ATLAS
NEXUS
ZENITH
```

Type names MUST remain uppercase.

An implementation MUST NOT rename official types while claiming v1 compatibility.

## Type Assignment

Public type assignment MUST be based on official Genome scores, not raw GitHub data.

Compatible implementations SHOULD use the Type System v1.0 archetype-distance method or an equivalent documented method that produces the same semantics.

Type assignment output SHOULD include:

- Type name
- Type title
- Type confidence
- Boundary state
- Near type, when applicable
- Explanation
- Type system version

## Insufficient Signal

If public activity is not enough to produce a meaningful type, the implementation MUST return or display `INSUFFICIENT SIGNAL` or an equivalent non-type state.

It MUST NOT invent a type from weak data.

## Dictionary Requirements

Each type dictionary entry MUST define:

- Type name
- Title
- Concept
- One-line description
- Genome pattern
- Strengths
- Blind spots
- Team role
- Recommended OSS areas
- Recommended development style
- Recommended languages
- Growth direction

## Language Rules

Type documentation MUST describe public development behavior.

It MUST NOT describe personality, human worth, or hiring suitability.

It SHOULD avoid generic category names as official type labels.

## Compliance

An implementation MAY be called `DDS-Type-Compatible` if it:

1. Uses the official 16 types.
2. Assigns types from Genome scores.
3. Supports insufficient-signal behavior.
4. Provides dictionary information consistent with Type System v1.0.

