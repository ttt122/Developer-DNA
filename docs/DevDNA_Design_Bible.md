# DevDNA Design Bible

## 0. Purpose

DevDNA creates a new shared language for GitHub.

GitHub already shows stars, followers, repositories, and contributions. However, those numbers do not clearly explain what kind of developer someone is.

DevDNA reads public GitHub behavior and converts it into a Developer Genome, then into a symbolic Developer DNA type.

The goal is not to copy MBTI. The goal is to make names like `FORGE`, `ORBIT`, and `NOVA` understandable inside developer culture.

## 1. Product Philosophy

### 1.1 What DevDNA Is

DevDNA is a rule-based developer identity system built from public GitHub activity.

It answers one question:

```text
What kind of developer does this GitHub activity reveal?
```

DevDNA describes developer behavior, not personality.

### 1.2 What DevDNA Is Not

DevDNA is not:

- A psychological diagnosis
- A hiring score
- A talent ranking
- A replacement for portfolios
- An AI-generated personality label

DevDNA should never claim that one type is better than another. It should describe strengths, tendencies, growth direction, and collaboration fit.

### 1.3 Why GitHub Needs DevDNA

GitHub exposes activity, but it does not translate activity into developer meaning.

Current GitHub signals:

- Stars
- Followers
- Contributions
- Repositories
- Languages

Missing GitHub signals:

- Implementation style
- Collaboration style
- Design tendency
- Research depth
- Reliability habits
- Growth direction

DevDNA fills this gap by creating a readable layer above raw GitHub activity.

### 1.4 Core Difference

DevDNA is deterministic.

The same GitHub data should produce the same Genome and type result.

Therefore, the MVP does not use AI.

Reasons:

- Zero initial cost
- Explainable results
- Stable outputs
- OSS-friendly implementation
- Easier trust and auditability

## 2. Design Order

DevDNA must be designed in this order:

```text
Philosophy
-> Genome
-> GitHub data mapping
-> Type system
-> Type dictionary
-> Card system
-> MVP code
```

Type names must not be designed first.

The type system exists as a symbolic layer on top of the Genome. If the Genome is accurate and explainable, type names can evolve without breaking the product foundation.

## 3. Developer Genome

The Developer Genome is the core scoring model of DevDNA.

Each Genome dimension is scored from `0` to `100`.

The first version uses 10 dimensions.

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

### 3.1 Execution

Measures the ability to ship code and produce working output.

High signals:

- Frequent commits
- Pull request creation
- Repository activity
- Consistent contribution streaks
- Recent activity

Low signals:

- Few code contributions
- Inactive repositories
- Activity mostly outside implementation

### 3.2 Architecture

Measures system design, structure, and maintainability.

High signals:

- Multi-language or multi-package repositories
- Clear project organization
- README architecture sections
- Releases and versioning
- Config and automation files

Low signals:

- Many unfinished repositories
- No project structure
- No release or versioning habits

### 3.3 Innovation

Measures exploration of new ideas, tools, and technical domains.

High signals:

- Diverse topics
- New repositories across different domains
- Experimental projects
- AI, tooling, infrastructure, or emerging technology topics
- Rapid adoption of new languages or frameworks

Low signals:

- Narrow repeated patterns
- Little evidence of exploration

### 3.4 Community

Measures contribution to other people and shared developer spaces.

High signals:

- Pull requests to external repositories
- Issue comments
- Reviews
- Fork activity
- Followers and public interactions

Low signals:

- Mostly private or isolated repository ownership
- Low external interaction

### 3.5 Leadership

Measures project ownership and ability to guide others.

High signals:

- Popular repositories
- Stars and forks
- Clear README files
- Issue templates
- Contribution guides
- Maintainer-like activity

Low signals:

- No documentation
- No public project guidance
- No signs of ownership beyond code uploads

### 3.6 Optimization

Measures refinement, performance, automation, and technical precision.

High signals:

- CI configuration
- Benchmarks
- Performance-related topics
- Refactoring patterns
- Test coverage indicators
- Low repository abandonment

Low signals:

- No automation
- No tests
- No iterative improvements

### 3.7 Research

Measures depth of investigation and knowledge-building.

High signals:

- Long-form documentation
- Notes, labs, experiments, or learning repositories
- Academic, algorithmic, data, security, or systems topics
- Repositories with references and explanations

Low signals:

- Only finished apps with little explanation
- No research-like artifacts

### 3.8 Reliability

Measures consistency, stability, and project care.

High signals:

- Long contribution streaks
- Maintained repositories
- Releases
- License files
- CI
- Low issue neglect where available

Low signals:

- Many abandoned repositories
- No license
- No releases
- Burst activity followed by long inactivity

### 3.9 Craft

Measures care for developer experience, polish, and presentation.

High signals:

- Strong README quality
- Demos, screenshots, examples, or docs
- Clean repository metadata
- Topics and descriptions
- Profile README quality

Low signals:

- Empty descriptions
- Missing README files
- No usage examples

### 3.10 Openness

Measures public sharing behavior and open-source posture.

High signals:

- Public repositories
- External contributions
- Licenses
- Forks
- Public packages or reusable tools

Low signals:

- Mostly closed personal projects
- No license
- No public collaboration signals

## 4. GitHub Data Mapping

GitHub data must map into Genome dimensions through visible rules.

The mapping should use normalized values, not raw counts alone. A user with 10 meaningful repositories should not automatically lose to a user with 200 empty repositories.

### 4.1 Data Categories

DevDNA reads these public categories:

- Repository
- Contribution
- Activity
- Quality
- Social
- Metadata

### 4.2 Repository Signals

| Signal | Genome Impact |
| --- | --- |
| Public repository count | Execution, Openness |
| Recently updated repositories | Execution, Reliability |
| Star count | Leadership, Openness |
| Fork count | Leadership, Community, Openness |
| Repository topics | Innovation, Craft |
| Language diversity | Innovation, Architecture |
| Repository descriptions | Craft |
| Archived repositories | Reliability penalty |

### 4.3 Contribution Signals

| Signal | Genome Impact |
| --- | --- |
| Commit count | Execution |
| Pull request count | Execution, Community |
| External pull requests | Community, Openness |
| Review count | Community, Leadership |
| Issue count | Community, Research |
| Issue comments | Community |

### 4.4 Activity Signals

| Signal | Genome Impact |
| --- | --- |
| Active days | Execution, Reliability |
| Contribution streak | Reliability |
| Monthly consistency | Reliability |
| Recent activity | Execution |
| Activity spread across repos | Architecture, Openness |

### 4.5 Quality Signals

| Signal | Genome Impact |
| --- | --- |
| README exists | Craft, Leadership |
| README length and structure | Craft, Research, Leadership |
| License exists | Openness, Reliability |
| Releases exist | Architecture, Reliability |
| CI files exist | Optimization, Reliability |
| Tests detected | Optimization, Reliability |
| Wiki or docs folder | Research, Leadership, Craft |

### 4.6 Social Signals

| Signal | Genome Impact |
| --- | --- |
| Followers | Leadership, Openness |
| Following | Community, Openness |
| Stars received | Leadership |
| Stars given, if available | Community, Openness |

## 5. Scoring Rule

Each Genome score is calculated in three layers:

```text
Base score
+ weighted GitHub signals
- penalties
= raw Genome score
-> normalized 0 to 100 score
```

### 5.1 Base Score

Every dimension starts from `0`.

DevDNA should not give default personality points. A score must come from observable public GitHub behavior.

### 5.2 Normalization

Raw GitHub counts must be normalized.

Recommended MVP normalization:

```text
normalized = min(100, log10(value + 1) / log10(reference + 1) * 100)
```

This prevents extreme accounts from making the scoring useless.

Reference values should be versioned in the scoring spec.

The first public scoring specification is maintained in:

[Genome Scoring Specification v0.1.0](Genome_Scoring_v0.1.0.md)

### 5.3 Suggested MVP Reference Values

| Signal | Reference |
| --- | ---: |
| Public repositories | 50 |
| Commits per year | 1000 |
| Pull requests per year | 100 |
| Reviews per year | 80 |
| Issues per year | 80 |
| Followers | 500 |
| Stars received | 1000 |
| Forks received | 200 |
| Active days per year | 250 |

These are not final. They are calibration constants and must be adjusted after testing real GitHub accounts.

### 5.4 Example Dimension Formula

Example for `Execution`:

```text
Execution =
  commits_per_year * 0.35
+ pull_requests_per_year * 0.25
+ active_days_per_year * 0.20
+ recently_updated_repositories * 0.10
+ repository_count * 0.10
```

Example for `Community`:

```text
Community =
  external_pull_requests * 0.30
+ reviews * 0.25
+ issue_comments * 0.20
+ followers * 0.10
+ following * 0.05
+ forks_given_or_external_activity * 0.10
```

## 6. Genome Code

DevDNA has a public type and an internal DNA code.

Example:

```text
Public Type: FORGE
Internal Code: FXRN
```

The internal code summarizes dominant Genome traits.

MVP code rule:

- First letter: strongest dimension
- Second letter: second strongest dimension
- Third letter: weakest dimension
- Fourth letter: consistency marker

Example dimension letters:

| Dimension | Letter |
| --- | --- |
| Execution | X |
| Architecture | A |
| Innovation | N |
| Community | C |
| Leadership | L |
| Optimization | O |
| Research | R |
| Reliability | Y |
| Craft | F |
| Openness | P |

Consistency marker:

| Marker | Meaning |
| --- | --- |
| S | Stable |
| B | Burst |
| G | Growing |
| D | Dormant |

## 7. Type System

Types are created after the Genome rules exist.

The type is a readable cultural symbol for a Genome pattern.

### 7.1 Type Rule

A type must satisfy all of these:

- It maps clearly from Genome scores
- It has a distinct developer image
- It is not a value judgment
- It can be explained in one sentence
- It can appear naturally on a README card

### 7.2 Initial Type Candidates

These names are candidates, not final definitions:

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

### 7.3 Example Mapping

Example only:

```text
Execution: 90
Architecture: 85
Innovation: 50
Community: 20
```

Possible type:

```text
FORGE
The System Crafter
```

Reason:

- High Execution
- High Architecture
- Moderate Innovation
- Low Community

This type should represent a builder who turns systems into working software.

## 8. Type Dictionary Rule

Every type must have a dictionary page.

Required fields:

```text
Type Name
Title
One-line Meaning
Genome Pattern
Core Strengths
Blind Spots
Typical GitHub Signals
Best Roles
Recommended OSS Areas
Recommended Languages
Compatible Types
Tension Types
Evolution Paths
README Card Copy
SNS Share Copy
```

Example structure:

```text
FORGE
The System Crafter

Meaning:
A developer who turns ideas into robust working systems.

Strengths:
- Fast implementation
- System building
- MVP delivery

Blind Spots:
- Community review
- Long discussion cycles
- Public storytelling
```

## 9. Evolution Rule

DevDNA is not fixed.

It evolves monthly.

### 9.1 Monthly Snapshot

Every month, DevDNA stores:

```text
username
month
Genome scores
public type
internal code
top percentile
calculation version
```

### 9.2 Evolution Markers

| Marker | Meaning |
| --- | --- |
| `TYPE` | Normal type |
| `TYPE+` | Strengthened version of same type |
| `TYPE*` | Unstable or transitional type |
| `TYPE>` | Moving toward another type |

Example:

```text
2026-01 FORGE
2026-04 FORGE+
2026-07 VECTOR
2027-01 ORBIT
```

### 9.3 Versioning

Scoring rules must be versioned.

Example:

```text
scoring_version: 0.1.0
```

If formulas change, old monthly snapshots must still identify which formula created them.

## 10. Compatibility Rule

Compatibility compares Genome shapes, not type names alone.

MVP compatibility should combine:

- Complementary strengths
- Shared reliability level
- Community and leadership balance
- Architecture and execution balance
- Difference penalties for extreme mismatch

Example:

```text
FORGE x ORBIT
96%
```

Reason:

```text
FORGE provides implementation velocity and system building.
ORBIT provides collaboration, review, and community reach.
```

## 11. Card Rule

README cards must be compact, readable, and easy to share.

### 11.1 README Card Requirements

The card must show:

- DevDNA brand
- Type name
- Type title
- Top Genome dimensions
- Percentile or rank label
- Link to full profile

### 11.2 MVP README Card

```text
━━━━━━━━━━━━━━━━━━━━

DevDNA

FORGE
The System Crafter

Execution     ██████████ 92
Architecture ████████   84
Innovation   ██████     67
Community    ████       42

Top 3%

━━━━━━━━━━━━━━━━━━━━
```

### 11.3 SVG Rule

The MVP card should be generated as SVG.

Reasons:

- Works in GitHub README
- Easy to cache
- No database required for first version
- Easy to theme

## 12. UI Rule

The first screen should be the product experience, not a marketing landing page.

MVP UI flow:

```text
GitHub username input
-> Analyze
-> Genome result
-> Type result
-> README card
-> Copy markdown
-> Share image
```

UI priorities:

- Fast result
- Strong visual identity
- Clear explanation of why the result was produced
- No vague personality language
- No ranking pressure as the main experience

## 13. API Rule

The API should expose stable, explainable data.

Suggested endpoints:

```text
GET /api/analyze/:username
GET /api/card/:username.svg
GET /api/profile/:username
GET /api/types
GET /api/types/:type
```

Example result shape:

```json
{
  "username": "octocat",
  "type": "FORGE",
  "title": "The System Crafter",
  "code": "XAYG",
  "scoringVersion": "0.1.0",
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
  "explanation": [
    "High commit and pull request activity increased Execution.",
    "Release and documentation signals increased Architecture.",
    "External collaboration signals were moderate, limiting Community."
  ]
}
```

## 14. MVP Scope

MVP includes:

- Username input
- Public GitHub data fetch
- Rule-based Genome calculation
- Type assignment
- Explanation text
- SVG README card
- Copyable README markdown
- Shareable result page

MVP excludes:

- AI judgment
- Private repository analysis
- Team builder
- Browser extension
- VSCode extension
- Paid features

## 15. Success Criteria

DevDNA succeeds when:

- The result feels explainable from GitHub behavior
- Developers want to put the card in their README
- Type names become memorable
- Monthly evolution makes users return
- The rules are transparent enough for OSS contributors to improve

## 16. Non-Negotiables

- Genome comes before types
- Rules come before UI polish
- Public data only for MVP
- No AI in the initial scoring model
- Scoring formulas must be versioned
- Results must be explainable
- Types must not imply human worth
- README card must be a first-class product surface
