# DevDNA README Card Specification v1.0

## 0. Status

This document defines the official DevDNA README Card Specification v1.0.

It depends on:

- `DevDNA Design Bible`
- `Genome Scoring Specification v0.1.0`
- `Signal Engine Specification v1.0`
- `DevDNA Type System v1.0`

No implementation code is included in this specification.

## 1. Card Philosophy

The README card is DevDNA's primary cultural surface.

GitHub profile culture spreads through artifacts that are easy to paste, easy to understand, and visually rewarding. Snake, stats cards, activity graphs, trophies, and badges became common because they fit naturally inside README files.

DevDNA should become the identity layer in that culture.

```text
README
-> Snake
-> Stats
-> Activity Graph
-> DevDNA
```

The card must do three things:

1. Make the developer type instantly visible.
2. Explain the result through Genome scores.
3. Make sharing and copying feel natural.

The card is not decorative afterthought. It is one of the main products.

## 2. Card Layout

## 2.1 Standard Card Sizes

| Variant | Size | Use |
| --- | ---: | --- |
| Compact | `420 x 180` | README sidebar, small profile sections. |
| Standard | `640 x 320` | Default GitHub README card. |
| Wide | `900 x 360` | Team pages, project pages, docs pages. |
| Social Square | `1200 x 1200` | X, Discord, LinkedIn previews. |
| Social Wide | `1200 x 630` | Open Graph and link previews. |

Default MVP size:

```text
640 x 320
```

## 2.2 Spacing

Standard layout:

| Area | Value |
| --- | ---: |
| Outer padding | `24px` |
| Inner section gap | `16px` |
| Component gap | `10px` |
| Border radius | `8px` |
| Stroke width | `1px` |

Compact layout:

| Area | Value |
| --- | ---: |
| Outer padding | `16px` |
| Inner section gap | `10px` |
| Component gap | `8px` |

## 2.3 Layout Structure

Standard card structure:

```text
Header
  Logo
  Version / Generated Date

Main
  Type Name
  Type Title
  One-line identity copy

Genome
  Top 4 Genome bars
  Optional mini radar

Footer
  Top %
  Developer Level
  Evolution marker
  devdna.io/{username}
```

## 2.4 Color Requirements

Cards must work on GitHub light and dark backgrounds.

Minimum contrast:

- Main text: WCAG AA contrast against card background
- Secondary text: at least `4.5:1`
- Genome bar fill: visible on both light and dark themes

The type name must be the strongest visual element.

## 2.5 Responsive Behavior

SVG cards are fixed-size assets, but their internal layouts must be variant-aware.

Rules:

- Compact cards show top 3 Genome bars only.
- Standard cards show top 4 Genome bars.
- Wide cards may show all 10 Genome values or radar plus bars.
- Social cards prioritize type name, title, and share copy over dense data.

## 3. Card Components

## 3.1 Logo

Required text:

```text
DevDNA
```

Optional symbol:

```text
DNA mark / geometric mark / minimal helix-inspired mark
```

The logo must remain readable at compact size.

## 3.2 Type Name

Example:

```text
FORGE
```

Rules:

- Uppercase
- Largest text on card
- Never abbreviated
- Must link visually to the type's theme color

## 3.3 Title

Example:

```text
The System Crafter
```

Rules:

- English title from Type System
- Smaller than type name
- Must fit in one line in standard card
- May wrap in social square cards

## 3.4 Genome Radar

Radar is optional in MVP.

When present:

- Use all 10 Genome dimensions
- Keep labels short
- Use low-opacity grid lines
- Do not make radar the dominant visual element

Recommended use:

- Wide card
- Full profile page
- Social square card

## 3.5 Genome Bars

Genome bars are required for MVP.

Default:

- Show top 4 Genome dimensions
- Use score from `0..100`
- Label and numeric score required

Example:

```text
Execution     92
Architecture 84
Reliability  78
Optimization 73
```

## 3.6 Evolution

Evolution marker is optional for first-time users and required after history exists.

Examples:

```text
FORGE
FORGE+
FORGE>
FORGE*
```

Display rules:

- `TYPE+` means strengthened same type.
- `TYPE>` means moving toward another type.
- `TYPE*` means boundary or transition.

## 3.7 Compatibility

Compatibility is not required on the personal README card.

It may appear on:

- Pair cards
- Team cards
- Social share cards

Example:

```text
FORGE x ORBIT
Compatibility 96%
```

## 3.8 Top Percent

Top percent is optional in MVP.

If shown, it must be based on a public, versioned population calculation.

Rules:

- Do not show fake percentile values.
- If percentile data is unavailable, hide this component.
- Prefer `Top 8% in Execution` over vague global ranking.

## 3.9 Developer Level

Developer Level is optional.

If used, it must reflect visible GitHub signal maturity, not human value.

Recommended labels:

```text
Signal I
Signal II
Signal III
Signal IV
Signal V
```

Avoid gamified labels that imply superiority.

## 3.10 Version

The card must include version metadata in the SVG source.

Visible version is optional.

Required metadata:

```text
card_spec_version
signal_engine_version
genome_scoring_version
type_system_version
generated_at
```

## 3.11 Generated Date

Generated date should be visible in detailed cards and hidden in compact cards.

Format:

```text
Generated 2026-07-06
```

## 4. SVG Specification

## 4.1 SVG Structure

Required root:

```text
<svg role="img" aria-labelledby="title desc" viewBox="0 0 640 320">
```

Required accessibility nodes:

```text
<title id="title">DevDNA card for {username}: {type}</title>
<desc id="desc">{type}, {title}, top Genome scores: ...</desc>
```

Required metadata:

```text
<metadata>
  {
    "cardSpecVersion": "1.0",
    "username": "octocat",
    "type": "FORGE",
    "generatedAt": "2026-07-06T00:00:00Z"
  }
</metadata>
```

## 4.2 Font

GitHub README SVG rendering has font limitations.

Default font stack:

```text
Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Fallback:

```text
Arial, sans-serif
```

Rules:

- Do not depend on remote fonts inside SVG.
- Text must remain readable with system fallback fonts.
- Avoid negative letter spacing.

## 4.3 Gradient

Gradients are allowed but must be restrained.

Rules:

- Type accent gradient may be used for bars or small highlights.
- Background gradients must remain subtle.
- Avoid one-note purple/blue dominance across all themes.
- Minimal and GitHub themes should avoid gradients.

## 4.4 Animation

MVP cards should be static.

Future animated SVG rules:

- Animation must not affect readability.
- Animation must be disabled or minimal for GitHub README compatibility.
- Do not rely on JavaScript.
- Respect `prefers-reduced-motion` where possible.

## 4.5 Accessibility

Requirements:

- `<title>` and `<desc>` must exist.
- Text contrast must be sufficient.
- Important information must be text, not only color.
- Genome values must include numeric scores.
- Social images must include alt text guidance in embed docs.

## 5. Theme System

Theme is selected by query parameter:

```text
?theme=default
```

## 5.1 Default

Purpose:

- Primary DevDNA identity
- Works in most READMEs

Style:

- Clean dark-neutral background
- Bright but controlled type accent
- Clear bars

## 5.2 Dark

Purpose:

- Dark GitHub profiles and developer dashboards

Style:

- Near-black background
- Soft border
- High-contrast text
- Muted secondary text

## 5.3 Cyber

Purpose:

- Strong social sharing and high-energy profiles

Style:

- Dark base
- Neon accents
- Thin glow allowed
- Must remain readable

## 5.4 Minimal

Purpose:

- Professional READMEs, company profiles, low-visual-noise pages

Style:

- White or transparent background
- No gradient
- Simple border
- Monochrome bars with one accent

## 5.5 GitHub

Purpose:

- Native GitHub visual compatibility

Style:

- Uses GitHub-like neutrals
- Compatible with GitHub light and dark contexts
- No heavy decoration

## 6. Embed Specification

## 6.1 Markdown Embed

Default README embed:

```md
[![DevDNA](https://devdna.example.com/card/octocat.svg)](https://devdna.example.com/octocat)
```

With theme:

```md
[![DevDNA](https://devdna.example.com/card/octocat.svg?theme=github)](https://devdna.example.com/octocat)
```

## 6.2 HTML Embed

```html
<a href="https://devdna.example.com/octocat">
  <img
    src="https://devdna.example.com/card/octocat.svg?theme=github"
    alt="DevDNA card for octocat"
    width="640"
    height="320"
  />
</a>
```

## 6.3 SVG URL

```text
GET /card/{username}.svg
```

Supported query parameters:

| Parameter | Values | Default |
| --- | --- | --- |
| theme | `default`, `dark`, `cyber`, `minimal`, `github` | `default` |
| size | `compact`, `standard`, `wide` | `standard` |
| show | comma-separated components | `type,genome,evolution` |
| refresh | `true`, `false` | `false` |

## 6.4 PNG URL

```text
GET /card/{username}.png
```

PNG is required for social platforms and optional for README.

Recommended sizes:

```text
1200x630
1200x1200
```

## 7. Social Card

Social cards are optimized for sharing, not dense analysis.

## 7.1 X

Recommended:

```text
1200 x 630
```

Content:

- DevDNA logo
- Type name
- Title
- Top 2 Genome dimensions
- Share copy

Example copy:

```text
My Developer DNA is FORGE.
What's yours?
```

## 7.2 LinkedIn

Recommended:

```text
1200 x 627
```

Style:

- Professional
- Less neon
- More explanation

Content:

- Type
- Title
- Top Genome strengths
- Generated date

## 7.3 Discord

Recommended:

```text
1200 x 630
```

Style:

- High contrast
- Clear preview at small size

Content:

- Type name
- Title
- Top 3 Genome bars

## 8. Card Variants

| Variant | Required Components |
| --- | --- |
| Compact | Logo, Type Name, Title, top 3 Genome bars |
| Standard | Logo, Type Name, Title, top 4 Genome bars, Evolution, generated date |
| Wide | Logo, Type Name, Title, radar, all Genome bars, metadata |
| Social | Logo, Type Name, Title, top strengths, share copy |
| Pair | Two types, compatibility score, reason |
| Team | Team aggregate type distribution, compatibility summary |

## 9. Future

## 9.1 Animated SVG

Future animated cards may show:

- Bar fill animation
- Evolution transition
- Subtle radar reveal

Animation must remain optional.

## 9.2 Interactive Card

Interactive cards are not supported inside GitHub README.

Future interactive versions should exist on DevDNA profile pages, not as README embeds.

## 9.3 Live Update

Cards should update through server-side regeneration and cache invalidation.

Suggested refresh model:

- Default cache: 24 hours
- Manual refresh: authenticated or rate-limited endpoint
- Monthly snapshot: stored permanently for evolution history

## 10. Non-Negotiables

- The README card must be useful without opening the full profile.
- Type name and title must be immediately visible.
- Genome bars must explain why the type appears.
- SVG must be accessible.
- Percentile and level must not be fabricated.
- Card output must be cacheable.
- MVP card must be static SVG.

