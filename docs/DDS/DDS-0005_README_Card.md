# DDS-0005: README Card

## Status

Standard.

## Purpose

DDS-0005 defines the embeddable DevDNA card standard.

The detailed source specification is [`../README_Card_Specification_v1.0.md`](../README_Card_Specification_v1.0.md).

## Role

The README card is the primary public artifact for DevDNA adoption.

A compatible card MUST communicate the developer's DevDNA result inside a GitHub README without requiring the reader to open a separate page.

## Required Card Content

A standard DevDNA README card MUST show:

- DevDNA brand
- Type name
- Type title
- At least 3 Genome scores
- Link or URL to the full profile or analysis

A card SHOULD show:

- Evolution marker, when history exists
- Generated date
- Version metadata

A card MAY show:

- Genome radar
- Top percent
- Developer level
- Compatibility information

## SVG Requirements

README cards SHOULD be served as SVG for GitHub compatibility.

An SVG card MUST include:

- `role="img"`
- Accessible `<title>`
- Accessible `<desc>`
- Fixed `viewBox`
- Text-based Genome values
- Version metadata in the SVG source

The MVP card MUST be static. Animation MAY be added in future versions if readability and GitHub compatibility are preserved.

## Theme Requirements

Compatible renderers SHOULD support these themes:

```text
default
dark
cyber
minimal
github
```

Themes MUST preserve text readability and color contrast.

## Embed Requirements

Compatible renderers SHOULD support Markdown embed:

```md
[![DevDNA](https://example.com/card/octocat.svg)](https://example.com/octocat)
```

Compatible renderers MAY support HTML embed and PNG output.

## Percentile and Level

Percentile values MUST NOT be fabricated.

If population data is unavailable, percentile components MUST be hidden.

Developer level labels MUST describe signal maturity, not human value.

## Compliance

An implementation MAY be called `DDS-Card-Compatible` if it:

1. Renders a card with required content.
2. Supports SVG output.
3. Includes accessibility metadata.
4. Uses valid DevDNA type and Genome data.
5. Does not display unsupported percentile or rank claims.

