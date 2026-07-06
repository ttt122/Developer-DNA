# DDS-0002: Genome

## Status

Standard.

## Purpose

DDS-0002 defines the official DevDNA Genome dimensions and minimum scoring requirements.

The detailed source specification is [`../Genome_Scoring_v0.1.0.md`](../Genome_Scoring_v0.1.0.md).

## Official Genome Dimensions

A DevDNA-compatible analysis implementation MUST produce these 10 Genome dimensions:

```text
Execution
Architecture
Innovation
Community
Leadership
Optimization
Research
Reliability
Craft
Openness
```

No dimension MAY be removed in a compatible v1 implementation.

Additional dimensions MAY be calculated internally, but public DevDNA type assignment MUST remain based on the official dimensions unless a new DDS version defines otherwise.

## Score Range

Each Genome score MUST be an integer from `0` to `100`.

```text
0   = no visible public signal
50  = moderate visible signal
100 = very strong visible signal for the active scoring version
```

## Versioning

Genome outputs MUST include the scoring version.

Example:

```json
{
  "genomeScoringVersion": "0.1.0",
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
  }
}
```

## Scoring Requirements

A compatible Genome scorer:

- MUST calculate scores from behavior signals or equivalent public activity signals.
- MUST normalize raw counts before combining them.
- MUST preserve enough intermediate data to explain the final score.
- SHOULD use logarithmic normalization for public count-based signals.
- SHOULD use ratio normalization for coverage signals.
- MUST NOT assign default personality points unrelated to observed activity.

## Confidence

Genome outputs SHOULD include confidence values when signal availability is incomplete.

Missing data MUST NOT be silently converted into negative judgment. It SHOULD either reduce confidence or be marked unavailable.

## Compliance

An implementation MAY be called `DDS-Genome-Compatible` if it:

1. Produces all 10 official Genome scores.
2. Uses a documented scoring version.
3. Keeps scores in the `0..100` range.
4. Provides explainable reasons or source signals for each score.

