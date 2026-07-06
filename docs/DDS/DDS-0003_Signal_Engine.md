# DDS-0003: Signal Engine

## Status

Standard.

## Purpose

DDS-0003 defines the standard behavior signal layer between raw platform data and Genome scores.

The detailed source specification is [`../Signal_Engine_v1.0.md`](../Signal_Engine_v1.0.md).

## Required Data Flow

A DevDNA-compatible analysis implementation MUST use this conceptual flow:

```text
Platform API
-> Raw Data
-> Signal Engine
-> Behavior Signals
-> Genome
-> Type Assignment
```

Raw platform data MUST NOT map directly to a public DevDNA type.

## Signal Requirements

Each behavior signal MUST have:

- Stable ID
- Name
- Version
- Meaning
- Raw inputs
- Calculation rule
- Normalization rule
- `0..100` score
- Confidence or missing-data behavior
- Explanation

## Minimum GitHub Signal Coverage

A GitHub-compatible v1 implementation SHOULD support signals covering:

- Repository volume and diversity
- Commit volume and consistency
- Active days and streaks
- Pull requests
- External contributions
- Reviews
- Issues and comments
- Stars and forks
- README and documentation
- Licenses
- Releases
- CI and tests
- Topics and languages
- Maintenance and abandonment

The reference signal list is defined in `Signal Engine v1.0` as `S01` through `S36`.

## Signal IDs

Signal IDs MUST remain stable inside a major Signal Engine version.

An implementation:

- MUST NOT change the meaning of an existing signal ID.
- SHOULD add new signals using new IDs.
- MAY deprecate a signal if output remains explainable.
- MUST declare a new major version for breaking semantic changes.

## Normalization

Signal scores MUST be normalized to `0..100`.

Count-based public activity SHOULD use logarithmic normalization.

Ratio-based coverage SHOULD use percentage normalization.

Boolean file-presence signals MAY use `0` or `100`.

## Platform Extensibility

Signal Engine exists so future platforms can be added without rewriting the Type System.

Future adapters MAY include:

- GitLab
- VS Code
- LeetCode
- Stack Overflow
- npm
- PyPI
- crates.io

Platform adapters MUST emit compatible behavior signals or clearly label new platform-specific signals.

## Compliance

An implementation MAY be called `DDS-Signal-Compatible` if it:

1. Uses a raw-data to signal layer.
2. Produces versioned `0..100` behavior signals.
3. Preserves signal explanations.
4. Maps signals into the official Genome dimensions.

