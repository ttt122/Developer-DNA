# DDS-0007: Evolution

## Status

Standard.

## Purpose

DDS-0007 defines how DevDNA results evolve over time.

Evolution turns DevDNA from a one-time result into a visible developer growth timeline.

## Monthly Snapshot

A compatible implementation SHOULD store or expose monthly snapshots when history is supported.

Each snapshot MUST include:

- Username or stable subject ID
- Month
- Genome scores
- Public type or insufficient-signal state
- Internal code, if supported
- Algorithm versions
- Generated timestamp

Recommended shape:

```json
{
  "month": "2026-07",
  "type": "FORGE",
  "code": "XAYG",
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
  "versions": {
    "signalEngine": "1.0",
    "genomeScoring": "0.1.0",
    "typeSystem": "1.0"
  }
}
```

## Evolution Markers

Compatible implementations SHOULD use these markers:

| Marker | Meaning |
| --- | --- |
| `TYPE` | Stable current type. |
| `TYPE+` | Same type with stronger defining Genome scores. |
| `TYPE*` | Boundary or transitional result. |
| `TYPE>` | Moving toward another type. |

## Stability Rules

Evolution logic SHOULD avoid monthly noise.

If two type candidates are close, an implementation SHOULD preserve the previous type until the new type wins for at least two consecutive snapshots.

The Type System v1.0 boundary rule defines a close result as a distance gap below `5%`.

## Version Preservation

Historical snapshots MUST preserve the versions used to generate them.

An implementation MUST NOT silently recalculate old history with new rules unless it clearly labels the recalculated result.

## Compatibility

Evolution is optional for MVP analysis but required for products that display growth timeline or monthly history.

An implementation MAY be called `DDS-Evolution-Compatible` if it:

1. Stores or exposes versioned monthly snapshots.
2. Uses standard evolution markers.
3. Preserves historical algorithm versions.
4. Avoids unstable flipping through boundary handling.

