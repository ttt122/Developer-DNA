# DevDNA Standard

DevDNA Standard is the public specification set for implementing DevDNA-compatible tools.

Its purpose is to make DevDNA more than one application. A README card renderer, CLI, GitHub App, VS Code extension, Discord bot, or alternative analysis service can be called DevDNA-compatible only when it follows the DDS requirements.

```text
DDS = DevDNA Standard
```

The standard exists to support one goal:

```text
Create a shared developer language from public development activity.
```

## Normative Language

The keywords `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, and `MAY` are normative.

- `MUST` means required for DevDNA compatibility.
- `SHOULD` means strongly recommended, with valid exceptions allowed.
- `MAY` means optional.

## Standard Documents

| DDS | Name | Role |
| --- | --- | --- |
| [DDS-0001](DDS-0001_Philosophy.md) | Philosophy | Defines DevDNA's purpose, boundaries, and cultural principles. |
| [DDS-0002](DDS-0002_Genome.md) | Genome | Defines the official Genome dimensions and scoring requirements. |
| [DDS-0003](DDS-0003_Signal_Engine.md) | Signal Engine | Defines how raw platform data becomes behavior signals. |
| [DDS-0004](DDS-0004_Type_System.md) | Type System | Defines public type assignment and dictionary requirements. |
| [DDS-0005](DDS-0005_README_Card.md) | README Card | Defines embeddable card requirements. |
| [DDS-0006](DDS-0006_API.md) | API | Defines REST API compatibility requirements. |
| [DDS-0007](DDS-0007_Evolution.md) | Evolution | Defines monthly snapshots and type evolution behavior. |
| [DDS-0008](DDS-0008_Compatibility.md) | Compatibility | Defines type compatibility rules and explanation requirements. |

## Source Specifications

DDS documents summarize and standardize the detailed project specifications:

- [`../DevDNA_Design_Bible.md`](../DevDNA_Design_Bible.md)
- [`../Genome_Scoring_v0.1.0.md`](../Genome_Scoring_v0.1.0.md)
- [`../Signal_Engine_v1.0.md`](../Signal_Engine_v1.0.md)
- [`../Type_System_v1.0.md`](../Type_System_v1.0.md)
- [`../README_Card_Specification_v1.0.md`](../README_Card_Specification_v1.0.md)
- [`../API_Specification_v1.0.md`](../API_Specification_v1.0.md)

## DevDNA-Compatible Requirements

An implementation MAY describe itself as `DevDNA-compatible` only if it:

1. Uses public development activity as input.
2. Calculates or consumes the official DevDNA Genome dimensions.
3. Uses versioned rules for signals, Genome scoring, type assignment, cards, and API output.
4. Preserves explainability for user-facing results.
5. Does not use DevDNA types as hiring judgments, personality labels, or human worth rankings.

An implementation MUST NOT claim official compatibility if it changes type meanings, Genome dimensions, or scoring semantics without declaring a separate standard version.

## Compliance Levels

| Level | Meaning |
| --- | --- |
| `DDS-Aware` | References DevDNA types or cards but does not implement scoring. |
| `DDS-Card-Compatible` | Renders cards according to DDS-0005 using valid DevDNA analysis data. |
| `DDS-API-Compatible` | Exposes endpoints compatible with DDS-0006. |
| `DDS-Analysis-Compatible` | Implements DDS-0002, DDS-0003, and DDS-0004 with versioned outputs. |
| `DDS-Full-Compatible` | Implements or consumes all DDS documents required for the product surface. |

## Versioning

Each DDS document is versioned by its document number and content status.

Breaking changes SHOULD create a new major specification or a new DDS document. Additive clarifications MAY update the existing DDS document if they do not change compatibility behavior.

