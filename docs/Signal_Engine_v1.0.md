# DevDNA Signal Engine Specification v1.0

## 0. Status

This document defines the official DevDNA Signal Engine v1.0.

It depends on:

- `DevDNA Design Bible`
- `Genome Scoring Specification v0.1.0`
- `DevDNA Type System v1.0`

This document defines the middle layer between GitHub raw data and Genome scores.

No implementation code is included in this specification.

## 1. What the Signal Engine Is

The Signal Engine converts raw platform data into Developer Behavior Signals.

GitHub API data is not directly used for type assignment. It must first be transformed into normalized behavior signals that describe visible developer behavior.

The Signal Engine has three responsibilities:

1. Read normalized raw GitHub data.
2. Calculate behavior signals on a `0..100` scale.
3. Map those signals into the 10 DevDNA Genome dimensions.

Data flow:

```text
GitHub API
-> Raw Data
-> Signal Engine
-> Behavior Signals
-> Genome
-> Type Assignment
```

The Signal Engine must be deterministic. The same raw data and the same Signal Engine version must produce the same signal values.

## 2. GitHub Raw Data

Signal Engine v1.0 uses only public GitHub data.

Private repositories, private contribution details, and AI interpretation are excluded.

## 2.1 User Data

| Raw Data | Source | Notes |
| --- | --- | --- |
| Username | REST / GraphQL | Public login. |
| Display name | REST / GraphQL | Optional display metadata. |
| Bio | REST / GraphQL | Optional profile context. |
| Followers | REST / GraphQL | Public social signal. |
| Following | REST / GraphQL | Public social signal. |
| Public repository count | REST / GraphQL | Includes public repositories. |
| Account created date | REST / GraphQL | Used only for optional account age normalization. |

## 2.2 Repository Data

| Raw Data | Source | Notes |
| --- | --- | --- |
| Repository name | REST / GraphQL | Public repository identity. |
| Owner | REST / GraphQL | Used to distinguish owned vs external activity. |
| Is fork | REST / GraphQL | Used for OSS participation and owned repository filtering. |
| Is archived | REST / GraphQL | Used for abandonment and reliability signals. |
| Is template | REST / GraphQL | Used for reusability signals. |
| Created date | REST / GraphQL | Used for new repository and experiment signals. |
| Updated date | REST / GraphQL | Used for maintenance signals. |
| Pushed date | REST / GraphQL | Used for active project signals. |
| Description | REST / GraphQL | Used for Craft and domain signals. |
| Topics | REST / GraphQL | Used for Innovation, Research, Craft, Openness. |
| Primary language | REST / GraphQL | Used for language diversity. |
| Language breakdown | GraphQL | Used for cross-language and specialization signals. |
| Stars | REST / GraphQL | Used for public adoption. |
| Forks | REST / GraphQL | Used for reuse and OSS posture. |
| Watchers | REST / GraphQL | Optional public interest signal. |
| Open issues | REST / GraphQL | Used carefully; not always a negative signal. |
| Default branch | REST / GraphQL | Used for file lookups. |

## 2.3 Contribution Data

| Raw Data | Source | Notes |
| --- | --- | --- |
| Commits | GraphQL | Last 12 months for MVP. |
| Active days | GraphQL | Contribution calendar. |
| Contribution streak | Derived | Derived from contribution calendar. |
| Pull requests | GraphQL | Owned and external PRs. |
| Pull request merged state | GraphQL | Optional delivery quality signal. |
| Reviews | GraphQL | Review activity. |
| Issues opened | GraphQL | Investigation and community signal. |
| Issue comments | GraphQL | Support and discussion signal. |
| Repository contribution spread | Derived | Number of repositories with contribution activity. |

## 2.4 Repository File and Metadata Data

| Raw Data | Source | Notes |
| --- | --- | --- |
| README | REST content API | Presence and quality. |
| LICENSE | REST / file lookup | License and openness. |
| Releases | REST / GraphQL | Release discipline. |
| Tags | REST / GraphQL | Optional versioning fallback. |
| Wiki enabled | REST / GraphQL | Documentation signal when available. |
| Docs directory | REST content API | Documentation signal. |
| Examples directory | REST content API | Craft and reusability signal. |
| Tests directory | REST content API | Optimization signal. |
| CI files | REST content API | `.github/workflows`, CircleCI, Travis, etc. |
| Package manifests | REST content API | `package.json`, `pyproject.toml`, `Cargo.toml`, etc. |
| Config files | REST content API | Build, lint, format, container, deployment config. |
| Contribution guide | REST content API | `CONTRIBUTING.md`, issue templates, PR templates. |
| Security policy | REST content API | Optional reliability signal. |

## 3. Signal Model

Every Behavior Signal has the same public shape.

```text
id
name
version
meaning
rawInputs
calculation
normalization
score
confidence
explanation
```

Signal scores use `0..100`.

Confidence also uses `0..100` and describes whether enough public data existed to calculate the signal.

```text
0   = no usable data
50  = partial public data
100 = enough public data for MVP calculation
```

Signal Engine v1.0 must preserve both:

- Raw values used for calculation
- Normalized signal scores

This is required for explainability, debugging, Monthly Evolution, and future platform support.

## 4. Shared Calculation Rules

## 4.1 Count Normalization

Use logarithmic normalization for count signals.

```text
count_norm(value, reference) =
  min(100, log10(value + 1) / log10(reference + 1) * 100)
```

## 4.2 Ratio Normalization

Use ratio normalization for percentage-like signals.

```text
ratio_norm(value) =
  min(100, max(0, value * 100))
```

## 4.3 Boolean Normalization

```text
true  = 100
false = 0
```

## 4.4 Weighted Component Score

For multi-component signals:

```text
signal_score =
  round(sum(component_score * component_weight))
```

Weights must add up to `1.00`.

## 4.5 Default Time Window

Activity signals use the last 12 months.

Repository metadata signals use current public state.

## 4.6 Eligible Repositories

Unless a signal explicitly includes forks, eligible repositories are:

- Public
- Not archived
- Not forks

## 5. Behavior Signals

Signal Engine v1.0 defines 36 MVP-compatible behavior signals.

## 5.1 Signal Summary

| ID | Signal | Primary Meaning |
| --- | --- | --- |
| S01 | Repository Volume | Amount of public project surface. |
| S02 | Repository Diversity | Breadth across repositories, topics, and domains. |
| S03 | Repository Freshness | How recently repositories are maintained. |
| S04 | Repository Completion | Whether projects look finished enough to use. |
| S05 | Language Diversity | Breadth of language usage. |
| S06 | Language Specialization | Depth in a primary language. |
| S07 | Cross-Language Development | Meaningful use of multiple languages. |
| S08 | Commit Volume | Visible implementation volume. |
| S09 | Commit Consistency | Regular contribution rhythm. |
| S10 | Active Day Density | Number of active days in the year. |
| S11 | Contribution Streak | Longest visible continuous contribution habit. |
| S12 | Pull Request Volume | PR-based delivery activity. |
| S13 | Feature Delivery | Merged or completed PR work. |
| S14 | Code Ownership | Ownership of maintained public code. |
| S15 | External PR Activity | Contribution to repositories outside ownership. |
| S16 | Review Activity | Review participation and code feedback. |
| S17 | Issue Activity | Issues opened and discussed. |
| S18 | Issue Responsiveness | Maintainer-like issue engagement. |
| S19 | Community Support | Helping others through comments and interactions. |
| S20 | OSS Participation | External contribution and fork-based OSS behavior. |
| S21 | Public Adoption | Stars, forks, and visible project use. |
| S22 | Project Leadership | Guidance files, releases, and maintainer signals. |
| S23 | Documentation Presence | README, docs, wiki, and examples presence. |
| S24 | Documentation Quality | Depth and usefulness of documentation. |
| S25 | README Craft | README presentation and usage clarity. |
| S26 | Metadata Craft | Descriptions, topics, and public repository metadata. |
| S27 | Release Discipline | Releases and tags as versioning behavior. |
| S28 | License Openness | License presence across public projects. |
| S29 | CI Automation | CI workflow presence. |
| S30 | Test Presence | Test files and test directories. |
| S31 | Automation Depth | Build, lint, format, dependency, and deployment config. |
| S32 | Performance Focus | Benchmark, performance, and optimization signals. |
| S33 | Research Depth | Notes, papers, long-form docs, algorithms, and labs. |
| S34 | Experimentation | New repositories, emerging topics, and prototypes. |
| S35 | Maintenance Activity | Long-term care and low abandonment. |
| S36 | Reusability | Templates, packages, examples, and integration readiness. |

## 6. Signal Calculation Specification

All references below are v1.0 defaults. They may change only in a new Signal Engine version.

| ID | Signal | Meaning | GitHub Data | Calculation | Normalization |
| --- | --- | --- | --- | --- | --- |
| S01 | Repository Volume | Measures visible public project surface. | Public repository count. | Count public repositories. | `count_norm(public_repositories, 50)` |
| S02 | Repository Diversity | Measures breadth across projects and domains. | Unique topics, descriptions, repository count. | `unique_topics 50% + domain_diversity 30% + repo_count 20%`. | Weighted score using `count_norm(unique_topics, 30)` and `count_norm(public_repositories, 50)`. |
| S03 | Repository Freshness | Measures how much public work is recently active. | `pushedAt`, `updatedAt`. | Ratio of eligible repos updated in last 12 months. | `ratio_norm(recently_updated / eligible_repos)` |
| S04 | Repository Completion | Measures whether projects appear usable. | README, license, release/tag, description, non-empty code. | Per repo completion checklist, averaged across eligible repos. | Checklist ratio to `0..100`. |
| S05 | Language Diversity | Measures breadth of language usage. | Language breakdown. | Count languages above minimum meaningful usage threshold. | `count_norm(languages_used, 8)` |
| S06 | Language Specialization | Measures visible depth in one language. | Language breakdown. | Percentage of code in primary language, adjusted by repo activity. | `ratio_norm(primary_language_share) * activity_factor` |
| S07 | Cross-Language Development | Measures practical multi-language work. | Language breakdown per repo. | Count repos using 2+ meaningful languages plus total language diversity. | `multi_language_repo_score 60% + language_diversity 40%`. |
| S08 | Commit Volume | Measures visible implementation output. | Commit count, contribution calendar. | Count commits in last 12 months. | `count_norm(commits_per_year, 1000)` |
| S09 | Commit Consistency | Measures regularity of commits. | Contribution calendar. | Compare active contribution weeks against 52 weeks. | `ratio_norm(active_weeks / 52)` |
| S10 | Active Day Density | Measures how often the user is active. | Contribution calendar. | Count active days in last 12 months. | `count_norm(active_days, 250)` |
| S11 | Contribution Streak | Measures continuous contribution habit. | Contribution calendar. | Longest active-day streak. | `count_norm(longest_streak_days, 90)` |
| S12 | Pull Request Volume | Measures PR-based delivery activity. | Pull requests. | Count PRs created in last 12 months. | `count_norm(pull_requests_per_year, 100)` |
| S13 | Feature Delivery | Measures completed PR work. | PR state, merged PRs. | Merged PR count and merge ratio. | `merged_count 70% + merge_ratio 30%`. |
| S14 | Code Ownership | Measures maintained owned code surface. | Owned repos, commits to owned repos, releases. | Owned active repos plus commits to owned repos. | `owned_active_repos 50% + owned_commit_score 50%`. |
| S15 | External PR Activity | Measures contribution outside owned repos. | External PRs. | Count PRs to external repositories. | `count_norm(external_pull_requests, 40)` |
| S16 | Review Activity | Measures code feedback behavior. | Reviews. | Count submitted reviews in last 12 months. | `count_norm(reviews_per_year, 80)` |
| S17 | Issue Activity | Measures issue-based investigation and participation. | Issues opened. | Count issues opened in last 12 months. | `count_norm(issues_opened, 80)` |
| S18 | Issue Responsiveness | Measures maintainer-like response behavior. | Issue comments on owned repos, issue comment timing when available. | Owned issue comments plus response ratio when available. | `comment_count 70% + response_ratio 30%`. |
| S19 | Community Support | Measures support through comments and public interaction. | Issue comments, discussions if available, following. | Issue comments and social interaction surface. | `issue_comments 80% + following 20%`. |
| S20 | OSS Participation | Measures open-source behavior outside owned repos. | External PRs, forks, external issues, reviews. | External PRs, external issues, reviews, forks. | Weighted external activity score. |
| S21 | Public Adoption | Measures whether others use or notice projects. | Stars, forks, watchers. | Stars 60%, forks 35%, watchers 5%. | Count-normalized weighted score. |
| S22 | Project Leadership | Measures visible project guidance. | CONTRIBUTING, issue templates, PR templates, releases, README. | Guidance file ratio, release score, README quality. | Weighted checklist average. |
| S23 | Documentation Presence | Measures whether documentation surfaces exist. | README, docs directory, wiki, examples. | Ratio of repos with docs-related surfaces. | `ratio_norm(documented_repos / eligible_repos)` |
| S24 | Documentation Quality | Measures depth and usability of docs. | README length, headings, code blocks, docs files. | README quality plus docs depth. | Weighted quality checklist. |
| S25 | README Craft | Measures README clarity and presentation. | README content. | Exists, length, headings, examples, links/images/badges. | Checklist score from `Genome_Scoring_v0.1.0`. |
| S26 | Metadata Craft | Measures care for repository public metadata. | Description, topics, homepage. | Ratio of repos with description, topics, homepage. | Weighted ratio score. |
| S27 | Release Discipline | Measures versioning behavior. | Releases and tags. | Release count and repo release coverage. | `release_count 60% + release_coverage 40%`. |
| S28 | License Openness | Measures open-source licensing posture. | License files / license API field. | Ratio of eligible repos with license. | `ratio_norm(licensed_repos / eligible_repos)` |
| S29 | CI Automation | Measures automated validation. | CI workflow files. | Ratio of eligible repos with CI config. | `ratio_norm(ci_repos / eligible_repos)` |
| S30 | Test Presence | Measures visible test practice. | Test directories and test files. | Ratio of eligible repos with test signals. | `ratio_norm(test_repos / eligible_repos)` |
| S31 | Automation Depth | Measures tooling and repeatability. | Build, lint, format, dependency, deployment config. | Average automation checklist per repo. | Checklist ratio to `0..100`. |
| S32 | Performance Focus | Measures performance and optimization attention. | Benchmark files, perf topics, profiling config. | Topic/file checklist. | Weighted checklist score. |
| S33 | Research Depth | Measures investigation and knowledge depth. | Long-form markdown, research topics, notes, algorithms. | Research topics, long-form docs, issue investigation. | Weighted research checklist. |
| S34 | Experimentation | Measures prototype and frontier activity. | New repos, emerging topics, topic diversity. | New repos, emerging topic score, domain diversity. | Weighted score using v0.1.0 topic lists. |
| S35 | Maintenance Activity | Measures sustained project care. | Updated repos, archived repos, releases, active days. | Maintained ratio minus abandonment penalty. | Clamp weighted score to `0..100`. |
| S36 | Reusability | Measures whether projects are usable by others. | License, examples, package manifests, docs, templates, releases. | Reuse checklist averaged across eligible repos. | Checklist ratio to `0..100`. |

## 6.1 Detailed Signal Notes

### Repository Completion

A repository completion checklist includes:

- README exists
- Description exists
- License exists
- Has meaningful source files
- Has release, tag, package manifest, or usage instructions

This signal should not punish early experiments too strongly. It should mainly help distinguish finished public assets from empty or abandoned repositories.

### Feature Delivery

If merged PR information is unavailable, use closed PRs as a fallback with lower confidence.

Confidence rules:

```text
merged PR data available = 100
closed PR fallback only = 70
PR count only = 50
no PR data = 0
```

### Issue Responsiveness

Precise response time is not always available or practical in MVP. For v1.0, issue responsiveness can use:

- Number of issue comments on owned repositories
- Ratio of opened issues with user response
- Optional median response time if collected later

### Documentation Quality

Documentation quality must remain explainable. The MVP should use structural checks, not subjective language quality.

Signals:

- README length
- Headings
- Code blocks
- Usage section
- Links
- Images or badges
- Docs directory
- Examples directory

### Research Depth

Research Depth should not be assigned from low activity alone.

It requires visible research artifacts:

- Notes
- Algorithms
- Labs
- Long-form markdown
- Paper references
- Benchmark explanations
- Data or systems topics

### Maintenance Activity

Maintenance Activity should compare active and abandoned repositories.

Suggested definition:

```text
maintained_repo = eligible repo updated in last 12 months
abandoned_repo = non-archived public repo not updated in 24 months
```

## 7. Genome Mapping

The Signal Engine maps Behavior Signals into the 10 Genome dimensions.

Each mapping uses integer weights from `1` to `5`.

```text
5 = primary signal for this Genome
4 = strong signal
3 = useful signal
2 = supporting signal
1 = weak contextual signal
blank = no direct impact
```

Genome score calculation:

```text
Genome[dimension] =
  round(sum(signal_score * weight) / sum(weights))
```

Only mapped signals affect a Genome dimension.

## 7.1 Signal-to-Genome Weight Table

| Signal | Execution | Architecture | Innovation | Community | Leadership | Optimization | Research | Reliability | Craft | Openness |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| S01 Repository Volume | 2 |  |  |  |  |  |  |  |  | 3 |
| S02 Repository Diversity |  | 2 | 4 |  |  |  | 2 |  | 2 | 2 |
| S03 Repository Freshness | 3 |  |  |  |  | 2 |  | 4 |  |  |
| S04 Repository Completion | 2 | 3 |  |  | 2 |  |  | 3 | 3 | 2 |
| S05 Language Diversity |  | 3 | 4 |  |  |  |  |  |  |  |
| S06 Language Specialization |  | 2 |  |  |  | 3 | 2 |  |  |  |
| S07 Cross-Language Development |  | 4 | 3 |  |  | 2 |  |  |  |  |
| S08 Commit Volume | 5 |  |  |  |  | 2 |  |  |  |  |
| S09 Commit Consistency | 4 |  |  |  |  |  |  | 5 |  |  |
| S10 Active Day Density | 5 |  |  |  |  |  |  | 4 |  |  |
| S11 Contribution Streak | 3 |  |  |  |  |  |  | 5 |  |  |
| S12 Pull Request Volume | 5 |  |  | 2 |  |  |  |  |  |  |
| S13 Feature Delivery | 5 |  |  |  | 2 |  |  | 2 |  |  |
| S14 Code Ownership | 4 | 3 |  |  | 4 |  |  | 3 |  |  |
| S15 External PR Activity | 2 |  |  | 5 |  |  |  |  |  | 4 |
| S16 Review Activity |  |  |  | 5 | 4 |  |  |  |  |  |
| S17 Issue Activity |  |  |  | 3 |  |  | 3 |  |  |  |
| S18 Issue Responsiveness |  |  |  | 4 | 4 |  |  | 3 |  |  |
| S19 Community Support |  |  |  | 5 | 3 |  |  |  | 2 | 3 |
| S20 OSS Participation |  |  | 2 | 5 |  |  |  |  |  | 5 |
| S21 Public Adoption |  |  |  |  | 5 |  |  |  |  | 4 |
| S22 Project Leadership |  | 3 |  |  | 5 |  |  | 2 | 3 | 2 |
| S23 Documentation Presence |  | 2 |  |  | 2 |  | 3 |  | 4 |  |
| S24 Documentation Quality |  | 2 |  |  | 3 |  | 4 |  | 5 |  |
| S25 README Craft |  |  |  |  | 2 |  | 2 |  | 5 |  |
| S26 Metadata Craft |  |  | 2 |  |  |  |  |  | 5 | 3 |
| S27 Release Discipline |  | 4 |  |  | 3 |  |  | 5 |  |  |
| S28 License Openness |  |  |  |  |  |  |  | 3 |  | 5 |
| S29 CI Automation |  | 2 |  |  |  | 5 |  | 5 |  |  |
| S30 Test Presence |  | 2 |  |  |  | 5 |  | 4 |  |  |
| S31 Automation Depth |  | 3 |  |  |  | 5 |  | 3 |  |  |
| S32 Performance Focus |  |  | 2 |  |  | 5 | 3 |  |  |  |
| S33 Research Depth |  |  | 3 |  |  | 2 | 5 |  | 2 |  |
| S34 Experimentation |  |  | 5 |  |  |  | 3 |  | 2 | 3 |
| S35 Maintenance Activity | 2 |  |  |  |  | 2 |  | 5 |  |  |
| S36 Reusability |  | 2 |  |  | 3 |  |  | 2 | 4 | 5 |

## 8. Weight System

Signal weights are directional and additive.

Human-readable examples:

```text
Commit Consistency
-> Execution +4
-> Reliability +5

Review Activity
-> Community +5
-> Leadership +4

Documentation Quality
-> Craft +5
-> Research +4
-> Leadership +3

CI Automation
-> Optimization +5
-> Reliability +5
```

## 8.1 Genome Calculation from Signals

For each Genome dimension:

1. Select all mapped signals.
2. Multiply each signal score by its mapping weight.
3. Divide by total mapped weights.
4. Round to nearest integer.
5. Clamp to `0..100`.

Example:

```text
Execution =
  weighted_average(
    Repository Volume * 2,
    Repository Freshness * 3,
    Commit Volume * 5,
    Commit Consistency * 4,
    Active Day Density * 5,
    Pull Request Volume * 5,
    Feature Delivery * 5,
    Code Ownership * 4,
    External PR Activity * 2,
    Maintenance Activity * 2
  )
```

## 8.2 Confidence-Aware Scoring

Signal Engine v1.0 should not silently treat missing API data as zero.

Each signal must produce:

```text
score
confidence
missingInputs
```

Genome scoring should include a Genome confidence value:

```text
Genome confidence =
  weighted_average(signal_confidence, signal_weights)
```

If Genome confidence is below `50`, the result should show a low-confidence explanation.

## 8.3 Penalties

Penalties should be explicit signals, not hidden adjustments.

Examples:

- Abandonment is handled inside `S35 Maintenance Activity`.
- Missing license affects `S28 License Openness`.
- Missing documentation affects `S23`, `S24`, and `S25`.

This keeps the algorithm explainable.

## 9. Output Contract

The Signal Engine output should be serializable and versioned.

Suggested shape:

```json
{
  "signalEngineVersion": "1.0",
  "source": "github",
  "username": "octocat",
  "generatedAt": "2026-07-06T00:00:00Z",
  "signals": {
    "S08": {
      "id": "S08",
      "name": "Commit Volume",
      "score": 82,
      "confidence": 100,
      "rawInputs": {
        "commitsPerYear": 640
      },
      "explanation": "Commit volume is high compared with the v1.0 reference value."
    }
  },
  "genome": {
    "execution": {
      "score": 78,
      "confidence": 92,
      "topSignals": ["S08", "S10", "S12"]
    }
  }
}
```

## 10. Future Compatibility

The Signal Engine must be platform-adaptable.

Future integrations should not directly rewrite Type System logic. They should add or update signal extractors.

Target future sources:

- GitLab
- VSCode
- LeetCode
- Stack Overflow
- npm
- PyPI
- crates.io
- Docker Hub
- Product telemetry, only with explicit user consent

## 10.1 Platform Adapter Pattern

Each platform should produce the same behavior signal shape.

```text
Platform Raw Data
-> Platform Adapter
-> Behavior Signals
-> Genome Mapping
-> Type Assignment
```

Example:

```text
GitHub commits
GitLab commits
VSCode coding sessions

all can contribute to:

S08 Commit Volume
S09 Commit Consistency
S10 Active Day Density
```

## 10.2 Source-Specific Signals

Some future platforms may need new signals.

Examples:

| Platform | Possible Signal | Genome Impact |
| --- | --- | --- |
| LeetCode | Algorithm Practice | Research, Optimization |
| Stack Overflow | Answer Support | Community, Leadership, Openness |
| VSCode | Local Coding Rhythm | Execution, Reliability |
| GitLab | Merge Request Activity | Execution, Community |
| npm / PyPI | Package Adoption | Leadership, Openness |

New platform-specific signals must not break existing GitHub signal IDs.

## 10.3 Stable Signal IDs

Signal IDs are permanent inside a major version.

Rules:

- Do not rename existing IDs in v1.x.
- Do not change a signal's meaning in v1.x.
- Add new signals as new IDs.
- Deprecate old signals instead of deleting them.
- Major semantic changes require v2.0.

## 11. Versioning

Signal Engine versions use semantic versioning.

```text
v1.0 = first official GitHub MVP signal engine
v1.1 = backward-compatible signal additions or reference tuning
v2.0 = breaking changes to signal meaning, IDs, or Genome mapping
```

## 11.1 Versioned Artifacts

The following must be versioned:

- Signal definitions
- Reference values
- Topic lists
- File detection rules
- Signal-to-Genome weights
- Confidence rules
- Platform adapters

## 11.2 Snapshot Requirement

Monthly Evolution snapshots must store:

```text
signal_engine_version
genome_scoring_version
type_system_version
raw_signal_scores
genome_scores
public_type
```

This allows old results to remain explainable after the algorithm evolves.

## 12. MVP Implementation Boundary

Signal Engine v1.0 is designed for MVP implementation.

Required for MVP:

- GitHub public profile data
- Public repository metadata
- Contribution calendar
- Pull requests
- Issues and issue comments
- Reviews when available
- README/license/release/topic/file checks
- Signal scores
- Genome scores
- Explanations

Not required for MVP:

- Private repository analysis
- AI interpretation
- Real-time webhooks
- Cross-platform adapters
- Paid GitHub data
- Organization-level team analysis

## 13. Non-Negotiables

- Raw GitHub data must not map directly to a type.
- Raw GitHub data must pass through Behavior Signals first.
- Every signal must be explainable.
- Every signal must be versioned.
- Missing data must be represented with confidence, not hidden as zero.
- Signal Engine changes must not require rewriting Type System semantics.
- MVP must stay rule-based and deterministic.

