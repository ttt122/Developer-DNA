# Genome Scoring Specification v0.1.0

## 0. Purpose

This document defines how DevDNA calculates the 10 Developer Genome scores from public GitHub data.

This is a pre-implementation specification. It does not define Developer DNA types. Type assignment happens after Genome scoring.

The primary goal of v0.1.0 is not mathematical perfection. The primary goal is explainable results that feel reasonable when compared with visible GitHub behavior.

## 1. Principles

### 1.1 Genome First

DevDNA must calculate Genome scores before assigning any public type name.

```text
GitHub public data
-> normalized signals
-> 10 Genome scores
-> type assignment
```

### 1.2 Public Data Only

v0.1.0 uses only public GitHub data available through GitHub REST API, GitHub GraphQL API, or public repository file metadata.

Private repositories, private contributions, and AI interpretation are excluded.

### 1.3 Rule-Based and Deterministic

The same input data and scoring version must produce the same Genome scores.

Every score must be explainable through visible signals.

### 1.4 MVP Simplicity

Each Genome score is a weighted average of normalized signals.

```text
Genome score = round(sum(normalized_signal * weight))
```

Weights for each Genome dimension must add up to `1.00`.

### 1.5 Score Range

Each Genome dimension is scored from `0` to `100`.

```text
0   = no visible public signal
50  = moderate visible signal
100 = very strong visible signal for v0.1.0 references
```

Scores are not moral judgments. They describe visible GitHub behavior.

## 2. Normalization

Raw GitHub counts must not be used directly. A user with very high raw counts should not destroy the usefulness of the scoring range.

v0.1.0 uses logarithmic normalization for count-based signals.

```text
norm(value, reference) =
  min(100, log10(value + 1) / log10(reference + 1) * 100)
```

For ratio-based signals:

```text
ratio_norm(value) =
  min(100, max(0, value * 100))
```

For boolean signals:

```text
true  = 100
false = 0
```

For repository quality signals, calculate the ratio across eligible public non-fork repositories unless otherwise specified.

Example:

```text
readme_ratio = repositories_with_readme / eligible_repositories
readme_score = ratio_norm(readme_ratio)
```

## 3. Time Window

v0.1.0 uses a 12-month window for activity and contribution signals.

Repository metadata signals use current public repository state.

Recommended windows:

| Signal Type | Window |
| --- | --- |
| Commits | Last 12 months |
| Pull requests | Last 12 months |
| Reviews | Last 12 months |
| Issues and comments | Last 12 months |
| Active days | Last 12 months |
| Repository metadata | Current state |
| Stars and forks | Current state |
| Followers and following | Current state |

Monthly Evolution should store the calculated score snapshot and `scoring_version`.

## 4. Reference Values

Reference values are calibration constants for v0.1.0.

They are intentionally simple and must be revisited after testing real GitHub accounts.

| Signal | Reference |
| --- | ---: |
| Public repositories | 50 |
| Owned non-fork repositories | 30 |
| Recently updated repositories | 12 |
| Commits per year | 1000 |
| Pull requests per year | 100 |
| External pull requests per year | 40 |
| Reviews per year | 80 |
| Issues opened per year | 80 |
| Issue comments per year | 160 |
| Active days per year | 250 |
| Longest streak days | 90 |
| Stars received | 1000 |
| Forks received | 200 |
| Followers | 500 |
| Following | 300 |
| Languages used | 8 |
| Repository topics | 30 |
| Releases | 20 |
| CI-enabled repositories | 20 |
| Test-detected repositories | 20 |
| Documentation repositories | 15 |

## 5. Shared Signal Definitions

### 5.1 Eligible Repository

An eligible repository is:

- Public
- Not archived
- Not a fork, unless the signal explicitly measures fork or external contribution behavior

### 5.2 Recently Updated Repository

A recently updated repository is an eligible repository with `pushedAt` or `updatedAt` inside the last 12 months.

### 5.3 External Contribution

An external contribution is activity in a repository not owned by the analyzed user or organization.

### 5.4 README Quality

README quality is intentionally simple in v0.1.0.

Signals:

- README exists
- README has at least 400 characters
- README includes headings
- README includes code blocks or usage examples
- README includes links, images, badges, or demo references

Suggested score:

```text
readme_quality_score =
  readme_exists * 0.30
+ readme_min_length * 0.20
+ readme_has_headings * 0.20
+ readme_has_usage_or_code * 0.20
+ readme_has_rich_metadata * 0.10
```

Each sub-signal is boolean.

### 5.5 Structure Quality

Structure quality checks whether repositories show project organization.

Signals:

- Has source directory or recognizable app/package structure
- Has config files
- Has package or build manifest
- Has docs, examples, or tests directory
- Has releases or tags

## 6. Genome Dimensions

## 6.1 Execution

### Meaning

Execution measures the ability to ship code and produce working output.

### High-Score Behavior

- Frequent commits
- Frequent pull requests
- Many active days
- Multiple recently updated repositories
- Consistent implementation activity

### Low-Score Behavior

- Few visible code contributions
- Long inactivity
- Repositories rarely updated
- Activity mostly outside implementation

### GitHub Data Used

- Commit count in last 12 months
- Pull request count in last 12 months
- Active days in last 12 months
- Recently updated repository count
- Public repository count

### Initial Formula

```text
Execution =
  norm(commits_per_year, 1000) * 0.35
+ norm(pull_requests_per_year, 100) * 0.25
+ norm(active_days_per_year, 250) * 0.20
+ norm(recently_updated_repositories, 12) * 0.10
+ norm(public_repositories, 50) * 0.10
```

### Notes

Execution should not reward empty repository creation. Repository count has a small weight for this reason.

## 6.2 Architecture

### Meaning

Architecture measures system design, structure, and maintainability.

### High-Score Behavior

- Repositories have clear structure
- Multiple languages or packages are used meaningfully
- Releases or versioning exist
- Config, automation, and documentation files exist
- Projects look maintainable rather than only experimental

### Low-Score Behavior

- Many unstructured repositories
- No releases or versioning habits
- Little evidence of project organization
- No config, manifest, or documentation structure

### GitHub Data Used

- Language diversity
- Repository structure quality
- Release count
- Config or manifest files
- Documentation folder or wiki presence

### Initial Formula

```text
Architecture =
  norm(languages_used, 8) * 0.20
+ structure_quality_score * 0.30
+ norm(releases_count, 20) * 0.20
+ config_or_manifest_ratio * 100 * 0.15
+ docs_or_wiki_ratio * 100 * 0.15
```

### Notes

Language diversity alone is not architecture. It must be balanced with structure, releases, and documentation.

## 6.3 Innovation

### Meaning

Innovation measures exploration of new ideas, tools, and technical domains.

### High-Score Behavior

- Repositories cover diverse topics
- Projects span different domains
- Experimental or prototype repositories exist
- Emerging technology topics appear
- New tools, languages, or frameworks are adopted

### Low-Score Behavior

- Very narrow project patterns
- Repeated similar repositories with little exploration
- Few topics or metadata signals

### GitHub Data Used

- Unique repository topics
- Language diversity
- New repositories created in last 12 months
- Emerging technology topic matches
- Domain diversity from topics and repository descriptions

### Initial Formula

```text
Innovation =
  norm(unique_topics, 30) * 0.30
+ norm(languages_used, 8) * 0.20
+ norm(new_repositories_per_year, 10) * 0.15
+ emerging_topic_score * 0.20
+ domain_diversity_score * 0.15
```

### Notes

Innovation should not require hype keywords. Emerging topic matching must be transparent and versioned.

Suggested MVP emerging topic list:

```text
ai, llm, agent, wasm, webassembly, rust, blockchain, crypto,
edge, workers, serverless, vector, rag, robotics, gpu, compiler
```

## 6.4 Community

### Meaning

Community measures contribution to other people and shared developer spaces.

### High-Score Behavior

- Pull requests to external repositories
- Code reviews
- Issue comments
- Public discussion
- Fork-based contribution
- Meaningful following and interaction signals

### Low-Score Behavior

- Mostly isolated repository ownership
- Few external contributions
- Little issue or review activity

### GitHub Data Used

- External pull requests
- Reviews
- Issue comments
- Issues opened in external repositories
- Following
- Fork activity

### Initial Formula

```text
Community =
  norm(external_pull_requests_per_year, 40) * 0.30
+ norm(reviews_per_year, 80) * 0.25
+ norm(issue_comments_per_year, 160) * 0.20
+ norm(external_issues_per_year, 40) * 0.10
+ norm(following, 300) * 0.05
+ fork_activity_score * 0.10
```

### Notes

Followers alone should not drive Community. Community is about interaction, not popularity.

## 6.5 Leadership

### Meaning

Leadership measures project ownership and the ability to guide other developers.

### High-Score Behavior

- Repositories receive stars and forks
- READMEs explain project purpose clearly
- Issue templates or contribution guides exist
- Reviews and maintainer-like activity are visible
- Projects appear usable by others

### Low-Score Behavior

- No documentation for others
- No public project guidance
- Little maintainer or review activity
- Projects are code drops rather than guided projects

### GitHub Data Used

- Stars received
- Forks received
- README quality
- Contribution guide or issue template presence
- Reviews
- Release count

### Initial Formula

```text
Leadership =
  norm(stars_received, 1000) * 0.25
+ norm(forks_received, 200) * 0.20
+ readme_quality_score * 0.20
+ maintainer_guidance_score * 0.15
+ norm(reviews_per_year, 80) * 0.10
+ norm(releases_count, 20) * 0.10
```

### Notes

Leadership must not become a pure popularity score. Documentation and project guidance carry significant weight.

## 6.6 Optimization

### Meaning

Optimization measures refinement, automation, performance care, and technical precision.

### High-Score Behavior

- CI configuration exists
- Tests are present
- Benchmarks or performance topics appear
- Repositories show iterative improvement
- Tooling and automation are used

### Low-Score Behavior

- No CI
- No tests
- No evidence of refinement
- Repositories are abandoned after first commit

### GitHub Data Used

- CI-enabled repository ratio
- Test-detected repository ratio
- Benchmark or performance topic matches
- Recently updated repositories
- Commit frequency in maintained repositories
- Dependency or automation config files

### Initial Formula

```text
Optimization =
  ci_enabled_ratio * 100 * 0.25
+ test_detected_ratio * 100 * 0.25
+ performance_topic_score * 0.15
+ maintained_repository_ratio * 100 * 0.15
+ automation_config_ratio * 100 * 0.10
+ norm(commits_per_year, 1000) * 0.10
```

### Notes

Optimization should not require large scale. Small projects with tests, CI, and automation can score well.

## 6.7 Research

### Meaning

Research measures depth of investigation and knowledge-building.

### High-Score Behavior

- Long-form documentation
- Learning notes, labs, experiments, or papers
- Algorithm, data, security, systems, or academic topics
- Repositories include references or explanations
- Issues are used to investigate problems

### Low-Score Behavior

- Only finished apps with little explanation
- No notes, references, or research artifacts
- Minimal documentation

### GitHub Data Used

- Documentation repositories
- README quality
- Research topic matches
- Issue count
- Long-form markdown files
- Repository descriptions and topics

### Initial Formula

```text
Research =
  norm(documentation_repositories, 15) * 0.25
+ readme_quality_score * 0.20
+ research_topic_score * 0.20
+ norm(issues_opened_per_year, 80) * 0.10
+ longform_markdown_score * 0.15
+ domain_diversity_score * 0.10
```

### Notes

Research is not the same as inactivity. It must be supported by documentation, topic, or investigation signals.

Suggested MVP research topic list:

```text
algorithm, algorithms, data, database, security, cryptography,
compiler, systems, distributed, machine-learning, ai, math,
paper, notes, research, lab
```

## 6.8 Reliability

### Meaning

Reliability measures consistency, stability, and project care.

### High-Score Behavior

- Many active days
- Long contribution streaks
- Repositories are maintained over time
- Releases, licenses, CI, and tests exist
- Low abandonment ratio

### Low-Score Behavior

- Burst activity followed by long inactivity
- Many abandoned repositories
- No license
- No releases
- No maintenance signals

### GitHub Data Used

- Active days
- Longest streak
- Maintained repository ratio
- Releases
- License ratio
- CI-enabled ratio
- Archived or abandoned repository ratio

### Initial Formula

```text
Reliability =
  norm(active_days_per_year, 250) * 0.25
+ norm(longest_streak_days, 90) * 0.15
+ maintained_repository_ratio * 100 * 0.20
+ norm(releases_count, 20) * 0.15
+ license_ratio * 100 * 0.10
+ ci_enabled_ratio * 100 * 0.10
- abandoned_repository_ratio * 100 * 0.05
```

Final score is clamped to `0..100`.

### Notes

Reliability should support Monthly Evolution. Store enough monthly activity data to detect stable, growing, burst, and dormant patterns later.

## 6.9 Craft

### Meaning

Craft measures care for developer experience, polish, and presentation.

### High-Score Behavior

- Strong README files
- Clear repository descriptions
- Topics are set
- Examples, screenshots, badges, or demos exist
- Profile README is polished

### Low-Score Behavior

- Missing README files
- Empty descriptions
- No usage examples
- No repository metadata

### GitHub Data Used

- README quality
- Repository description ratio
- Topic coverage ratio
- Demo, screenshot, image, or badge signals
- Profile README presence and quality
- Docs or examples directories

### Initial Formula

```text
Craft =
  readme_quality_score * 0.30
+ description_ratio * 100 * 0.15
+ topic_coverage_ratio * 100 * 0.15
+ demo_or_screenshot_score * 0.15
+ profile_readme_score * 0.15
+ docs_or_examples_ratio * 100 * 0.10
```

### Notes

Craft is about clarity and presentation, not visual decoration alone.

## 6.10 Openness

### Meaning

Openness measures public sharing behavior and open-source posture.

### High-Score Behavior

- Public repositories are shared
- Licenses exist
- External contributions are visible
- Forks and reusable tools exist
- Projects are structured for others to use

### Low-Score Behavior

- Few public repositories
- No license
- No external contribution signals
- Public projects are not reusable

### GitHub Data Used

- Public repository count
- License ratio
- External pull requests
- Forks received
- Stars received
- Repository topics and descriptions
- Public package or reusable tool indicators

### Initial Formula

```text
Openness =
  norm(public_repositories, 50) * 0.20
+ license_ratio * 100 * 0.20
+ norm(external_pull_requests_per_year, 40) * 0.20
+ norm(forks_received, 200) * 0.15
+ norm(stars_received, 1000) * 0.10
+ reusability_metadata_score * 0.15
```

### Notes

Openness should not punish users for having private work. It only describes visible public sharing.

## 7. Genome and GitHub Data Mapping Table

| GitHub Data | Execution | Architecture | Innovation | Community | Leadership | Optimization | Research | Reliability | Craft | Openness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Public repository count | Yes |  |  |  |  |  |  |  |  | Yes |
| Owned non-fork repositories |  | Yes |  |  | Yes | Yes | Yes | Yes | Yes | Yes |
| Recently updated repositories | Yes |  |  |  |  | Yes |  | Yes |  |  |
| New repositories per year |  |  | Yes |  |  |  |  |  |  |  |
| Commit count | Yes |  |  |  |  | Yes |  |  |  |  |
| Pull request count | Yes |  |  | Yes |  |  |  |  |  |  |
| External pull requests |  |  |  | Yes |  |  |  |  |  | Yes |
| Reviews |  |  |  | Yes | Yes |  |  |  |  |  |
| Issues opened |  |  |  | Yes |  |  | Yes |  |  |  |
| Issue comments |  |  |  | Yes |  |  |  |  |  |  |
| Active days | Yes |  |  |  |  |  |  | Yes |  |  |
| Longest streak |  |  |  |  |  |  |  | Yes |  |  |
| Stars received |  |  |  |  | Yes |  |  |  |  | Yes |
| Forks received |  |  |  |  | Yes |  |  |  |  | Yes |
| Followers |  |  |  |  | Optional |  |  |  |  | Optional |
| Following |  |  |  | Yes |  |  |  |  |  | Optional |
| Languages used |  | Yes | Yes |  |  |  |  |  |  |  |
| Repository topics |  |  | Yes |  |  | Optional | Yes |  | Yes | Yes |
| README quality |  |  |  |  | Yes |  | Yes |  | Yes |  |
| Repository descriptions |  |  | Optional |  |  |  |  |  | Yes | Yes |
| License presence |  |  |  |  |  |  |  | Yes |  | Yes |
| Releases |  | Yes |  |  | Yes |  |  | Yes |  |  |
| CI files |  |  |  |  |  | Yes |  | Yes |  |  |
| Test files |  |  |  |  |  | Yes |  |  |  |  |
| Docs, wiki, examples |  | Yes |  |  | Yes |  | Yes |  | Yes |  |
| Profile README |  |  |  |  |  |  |  |  | Yes |  |
| Archived repositories |  |  |  |  |  |  |  | Penalty |  |  |
| Abandoned repositories |  |  |  |  |  | Penalty |  | Penalty |  |  |

## 8. Implementation Notes for Later

Implementation should keep these concepts separate:

- Data collection
- Signal extraction
- Signal normalization
- Genome scoring
- Explanation generation
- Type assignment

Scoring output should include raw signals, normalized signals, Genome scores, and explanation reasons.

Suggested output shape:

```json
{
  "scoringVersion": "0.1.0",
  "username": "octocat",
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
  "signals": {
    "commitsPerYear": 820,
    "pullRequestsPerYear": 74,
    "activeDaysPerYear": 191
  },
  "explanations": [
    "Execution is high because commits, pull requests, and active days are all strong.",
    "Community is moderate because external pull requests and reviews are limited."
  ]
}
```

## 9. Versioning

This specification is versioned as:

```text
Genome Scoring v0.1.0
```

Any future change to formulas, references, topic lists, or signal definitions must create a new scoring version.

## 10. Suggested Implementation File Structure

Implementation should start after this specification is accepted.

Suggested MVP structure:

```text
src/
  github/
    client.ts
    fetchUserProfile.ts
    fetchRepositories.ts
    fetchContributions.ts
  scoring/
    constants.ts
    normalize.ts
    signals.ts
    genome.ts
    explanations.ts
    versions/
      v0.1.0.ts
  types/
    github.ts
    genome.ts
    scoring.ts
  api/
    analyze.ts
    card.ts
  cards/
    renderSvgCard.ts
  data/
    emergingTopics.v0.1.0.json
    researchTopics.v0.1.0.json
tests/
  scoring/
    normalize.test.ts
    genome.v0.1.0.test.ts
    fixtures/
      forge-like.json
      orbit-like.json
      low-activity.json
docs/
  DevDNA_Design_Bible.md
  Genome_Scoring_v0.1.0.md
```

Implementation order:

1. GitHub data type definitions
2. Normalization helpers
3. Signal extraction
4. Genome scoring v0.1.0
5. Explanation generation
6. API response shape
7. SVG README card
8. Type assignment

Type assignment should remain last because it depends on stable Genome scores.
