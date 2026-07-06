# DDS-0008: Compatibility

## Status

Standard.

## Purpose

DDS-0008 defines how DevDNA type compatibility is represented.

Compatibility helps developers reason about collaboration fit. It MUST NOT be used as a hiring filter or human value ranking.

The detailed compatibility matrix is defined in [`../Type_System_v1.0.md`](../Type_System_v1.0.md).

## Rating Scale

Compatible implementations MUST use a 1 to 5 rating scale:

```text
5 = exceptional fit
4 = strong fit
3 = workable fit
2 = friction likely
1 = high mismatch unless roles are explicit
```

The rating MAY be rendered as stars:

```text
★★★★★
★★★★☆
★★★☆☆
★★☆☆☆
★☆☆☆☆
```

## Compatibility Basis

Compatibility SHOULD compare type patterns through:

- Complementary strengths
- Shared reliability expectations
- Execution and communication balance
- Exploration and stability balance
- Repeated blind spots

Compatibility MUST NOT compare personal worth.

## Explanation Requirement

Every compatibility result SHOULD include a short reason.

Example:

```text
FORGE x ORBIT = 5
FORGE brings implementation velocity.
ORBIT brings review flow and contributor motion.
Together they turn work into shared project progress.
```

## Matrix Stability

The official 16-type compatibility matrix SHOULD remain stable inside Type System v1.x.

Changes that alter many pair ratings SHOULD require a new Type System version.

## Pair and Team Use

Pair compatibility MAY be shown on:

- Profile pages
- Pair cards
- Team builder tools
- Discord bots
- CLI output

Team compatibility MAY aggregate type distribution, but it MUST explain that team fit depends on context and roles.

## Compliance

An implementation MAY be called `DDS-Compatibility-Compatible` if it:

1. Uses the official 1 to 5 rating scale.
2. Provides compatibility explanations.
3. Uses official type names.
4. Avoids hiring or human-worth claims.
5. Declares the Type System version used for the matrix.

