# DevDNA Type System v1.0

## 0. Status

This document defines the official DevDNA Type System v1.0.

It depends on:

- `DevDNA Design Bible`
- `Genome Scoring Specification v0.1.0`

This document does not replace Genome scoring. It defines how the 10 Genome scores become a public Developer DNA type.

```text
GitHub public data
-> Genome Scoring v0.1.0
-> 10 Genome scores
-> Type System v1.0
-> Public DevDNA type
```

## 1. Type Design Philosophy

### 1.1 Why Types Exist

Raw GitHub data is too fragmented to become a shared language.

Genome scores explain behavior, but a 10-dimensional score is too detailed for daily communication.

Types exist to compress a Genome pattern into a memorable symbol.

```text
Genome = detailed measurement
Type = cultural shorthand
```

A developer should be able to say:

```text
I am FORGE.
```

And another developer should roughly understand the person's public GitHub style.

### 1.2 DevDNA Worldview

DevDNA is not a personality test.

DevDNA describes visible developer behavior:

- How code is shipped
- How projects are shaped
- How knowledge is shared
- How communities are supported
- How systems are maintained
- How technical growth appears over time

The type names are intentionally symbolic. They are not job titles and they are not generic categories.

The goal is to create a GitHub-native vocabulary that developers want to use in README profiles, OSS pages, team pages, and community spaces.

### 1.3 Role on GitHub

Each type represents a recognizable GitHub role:

- Some types turn ideas into working repositories.
- Some types make projects understandable to others.
- Some types maintain stability and trust.
- Some types connect people and projects.
- Some types explore technical frontiers.
- Some types refine, test, document, and standardize.

No type is ranked above another. A mature engineering ecosystem needs all 16.

### 1.4 Official Genome Dimensions

Type System v1.0 uses the 10 official Genome dimensions from `Genome Scoring v0.1.0`:

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

In earlier notes, `Creativity` maps mostly to `Innovation + Craft`, and `Learning` maps mostly to `Research`. The official v1.0 names remain `Craft` and `Research`.

## 2. Genome Rating Scale

Type profiles use a 1 to 5 rating scale.

```text
5 = defining trait
4 = strong trait
3 = supporting trait
2 = secondary or situational trait
1 = low visible signal for this type
```

These ratings are archetype targets, not the user's exact score.

For implementation, convert ratings to target scores:

```text
1 -> 20
2 -> 40
3 -> 60
4 -> 80
5 -> 95
```

## 3. All 16 Types

## 3.1 FORGE

| Field | Definition |
| --- | --- |
| Type Name | FORGE |
| Title | The System Crafter |
| Concept | Turns plans into working systems. |
| One-line | A high-output developer who shapes code into usable software. |
| Features | Strong implementation rhythm, practical structure, direct repository progress. |
| Strengths | Shipping, system assembly, MVP delivery, backend logic, infrastructure glue. |
| Blind Spots | Public storytelling, long review cycles, community discussion, polish beyond utility. |
| Team Role | Converts goals into functioning code and stabilizes the first working version. |
| Recommended OSS | CLIs, frameworks, developer tools, backend services, infrastructure utilities. |
| Development Style | Build-first, iterate quickly, keep technical decisions close to the code. |
| Recommended Languages | TypeScript, Go, Rust, Python, Kotlin. |
| Growth Direction | Add Community and Craft to make shipped work easier for others to adopt. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 5 |
| Architecture | 4 |
| Innovation | 3 |
| Community | 1 |
| Leadership | 3 |
| Optimization | 4 |
| Research | 2 |
| Reliability | 4 |
| Craft | 2 |
| Openness | 2 |

## 3.2 ORBIT

| Field | Definition |
| --- | --- |
| Type Name | ORBIT |
| Title | The Network Steward |
| Concept | Keeps people, issues, reviews, and projects moving around a shared center. |
| One-line | A collaboration-heavy developer who strengthens the social gravity of projects. |
| Features | External pull requests, reviews, issue discussion, public support, broad contact surface. |
| Strengths | Review culture, contributor flow, issue triage, project visibility, community trust. |
| Blind Spots | Deep solo implementation, low-level optimization, long isolated research. |
| Team Role | Connects contributors and keeps project communication healthy. |
| Recommended OSS | Community frameworks, documentation hubs, plugin ecosystems, governance-heavy projects. |
| Development Style | Review early, discuss openly, keep contribution paths clear. |
| Recommended Languages | TypeScript, Python, Ruby, JavaScript, PHP. |
| Growth Direction | Add Execution or Architecture to turn coordination into stronger project ownership. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 3 |
| Architecture | 2 |
| Innovation | 2 |
| Community | 5 |
| Leadership | 4 |
| Optimization | 2 |
| Research | 2 |
| Reliability | 3 |
| Craft | 3 |
| Openness | 5 |

## 3.3 NOVA

| Field | Definition |
| --- | --- |
| Type Name | NOVA |
| Title | The Frontier Spark |
| Concept | Opens new technical directions through experiments and prototypes. |
| One-line | A novelty-driven developer whose repositories reveal technical curiosity. |
| Features | Diverse topics, emerging tools, prototypes, cross-domain repositories. |
| Strengths | Exploration, early adoption, prototype creation, technical imagination. |
| Blind Spots | Maintenance, documentation depth, long-term consistency, issue follow-through. |
| Team Role | Finds new options before the rest of the team sees them. |
| Recommended OSS | AI tools, language experiments, WebAssembly, edge runtimes, creative coding, robotics. |
| Development Style | Prototype broadly, document assumptions, retire weak experiments quickly. |
| Recommended Languages | Python, Rust, TypeScript, Julia, Zig. |
| Growth Direction | Add Reliability and Craft so experiments become adoptable assets. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 3 |
| Architecture | 2 |
| Innovation | 5 |
| Community | 2 |
| Leadership | 2 |
| Optimization | 2 |
| Research | 4 |
| Reliability | 1 |
| Craft | 3 |
| Openness | 4 |

## 3.4 PULSE

| Field | Definition |
| --- | --- |
| Type Name | PULSE |
| Title | The Momentum Keeper |
| Concept | Maintains visible rhythm across commits, issues, and project updates. |
| One-line | A steady contributor whose activity keeps repositories alive. |
| Features | Active days, consistent commits, issue responses, recurring updates. |
| Strengths | Consistency, delivery cadence, project freshness, team energy. |
| Blind Spots | Deep design, advanced optimization, long-form research. |
| Team Role | Keeps work moving and prevents projects from going dormant. |
| Recommended OSS | Active apps, release-driven tools, community-maintained packages, integration libraries. |
| Development Style | Small frequent changes, short feedback loops, visible progress. |
| Recommended Languages | TypeScript, Python, JavaScript, Swift, Kotlin. |
| Growth Direction | Add Architecture to make momentum produce more durable systems. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 5 |
| Architecture | 2 |
| Innovation | 2 |
| Community | 4 |
| Leadership | 3 |
| Optimization | 2 |
| Research | 1 |
| Reliability | 5 |
| Craft | 2 |
| Openness | 3 |

## 3.5 ECHO

| Field | Definition |
| --- | --- |
| Type Name | ECHO |
| Title | The Knowledge Resonator |
| Concept | Turns technical work into reusable knowledge for others. |
| One-line | A documentation-rich developer who makes learning travel through repositories. |
| Features | Strong README files, notes, tutorials, issue explanations, public learning artifacts. |
| Strengths | Explanation, knowledge transfer, onboarding, technical writing. |
| Blind Spots | Heavy implementation velocity, complex production architecture, performance tuning. |
| Team Role | Makes project intent, usage, and context understandable. |
| Recommended OSS | Docs sites, learning repos, templates, examples, SDK guides, educational tools. |
| Development Style | Explain while building, keep examples close to source, preserve decision context. |
| Recommended Languages | Markdown, TypeScript, Python, JavaScript, Ruby. |
| Growth Direction | Add Execution to make knowledge artifacts ship with stronger working examples. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 2 |
| Architecture | 2 |
| Innovation | 3 |
| Community | 4 |
| Leadership | 3 |
| Optimization | 1 |
| Research | 5 |
| Reliability | 3 |
| Craft | 5 |
| Openness | 4 |

## 3.6 VECTOR

| Field | Definition |
| --- | --- |
| Type Name | VECTOR |
| Title | The Direction Shaper |
| Concept | Sets technical direction and converts it into execution paths. |
| One-line | A decisive project driver with strong implementation and ownership signals. |
| Features | High PR activity, releases, project guidance, structured repositories. |
| Strengths | Technical direction, prioritization, release planning, execution leadership. |
| Blind Spots | Slow consensus cycles, exploratory ambiguity, excessive polish. |
| Team Role | Aligns project direction and moves it toward release. |
| Recommended OSS | Productive frameworks, platform tools, API services, maintained libraries. |
| Development Style | Define target, cut scope, ship versioned increments. |
| Recommended Languages | TypeScript, Go, Java, Rust, C#. |
| Growth Direction | Add Community depth to turn direction into broader contributor alignment. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 5 |
| Architecture | 4 |
| Innovation | 2 |
| Community | 3 |
| Leadership | 5 |
| Optimization | 3 |
| Research | 2 |
| Reliability | 4 |
| Craft | 3 |
| Openness | 3 |

## 3.7 CORE

| Field | Definition |
| --- | --- |
| Type Name | CORE |
| Title | The Stability Anchor |
| Concept | Protects project reliability through maintenance and structure. |
| One-line | A consistency-first developer whose work makes repositories dependable. |
| Features | CI, releases, licenses, tests, maintained repositories, low abandonment. |
| Strengths | Maintenance, dependable releases, regression prevention, long-term care. |
| Blind Spots | Trend adoption, public promotion, rapid experimentation. |
| Team Role | Keeps critical systems stable and trustworthy. |
| Recommended OSS | Core libraries, security tools, CI systems, runtime packages, infra components. |
| Development Style | Test, release, monitor, maintain; avoid needless churn. |
| Recommended Languages | Go, Rust, Java, C, Python. |
| Growth Direction | Add Innovation to avoid becoming only maintenance-oriented. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 3 |
| Architecture | 4 |
| Innovation | 1 |
| Community | 2 |
| Leadership | 3 |
| Optimization | 4 |
| Research | 2 |
| Reliability | 5 |
| Craft | 2 |
| Openness | 3 |

## 3.8 CIPHER

| Field | Definition |
| --- | --- |
| Type Name | CIPHER |
| Title | The Silent Resolver |
| Concept | Solves difficult technical problems with limited public noise. |
| One-line | A quiet precision developer with strong optimization and problem-solving traces. |
| Features | Tests, performance topics, algorithmic work, focused commits, low social activity. |
| Strengths | Debugging, optimization, technical puzzles, hidden complexity. |
| Blind Spots | Public explanation, community participation, discoverability. |
| Team Role | Resolves hard technical knots that block progress. |
| Recommended OSS | Compilers, security tooling, performance libraries, algorithms, low-level utilities. |
| Development Style | Analyze deeply, change precisely, verify with tests or benchmarks. |
| Recommended Languages | Rust, C, C++, Go, Python. |
| Growth Direction | Add Craft and Openness so solutions become easier to discover and reuse. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 4 |
| Architecture | 3 |
| Innovation | 2 |
| Community | 1 |
| Leadership | 1 |
| Optimization | 5 |
| Research | 4 |
| Reliability | 3 |
| Craft | 1 |
| Openness | 1 |

## 3.9 PRISM

| Field | Definition |
| --- | --- |
| Type Name | PRISM |
| Title | The Experience Refiner |
| Concept | Makes projects readable, usable, and visually clear. |
| One-line | A presentation-conscious developer who turns repositories into approachable experiences. |
| Features | Polished README files, examples, screenshots, demos, strong repository metadata. |
| Strengths | Developer experience, onboarding, interface clarity, demos, project packaging. |
| Blind Spots | Low-level internals, high-volume maintenance, deep optimization. |
| Team Role | Makes the project understandable and attractive to users and contributors. |
| Recommended OSS | UI kits, templates, docs systems, examples, design tools, starter projects. |
| Development Style | Lead with usage, show examples, polish public surfaces. |
| Recommended Languages | TypeScript, JavaScript, Swift, Kotlin, Python. |
| Growth Direction | Add Reliability so polished projects stay trustworthy over time. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 3 |
| Architecture | 2 |
| Innovation | 4 |
| Community | 3 |
| Leadership | 3 |
| Optimization | 1 |
| Research | 2 |
| Reliability | 2 |
| Craft | 5 |
| Openness | 4 |

## 3.10 QUANT

| Field | Definition |
| --- | --- |
| Type Name | QUANT |
| Title | The Logic Distiller |
| Concept | Reduces complex technical material into precise models and algorithms. |
| One-line | A research-heavy developer whose repositories reveal analytical depth. |
| Features | Algorithms, data, math, systems notes, benchmarks, structured experiments. |
| Strengths | Modeling, algorithmic thinking, measurement, technical rigor. |
| Blind Spots | Community rhythm, product polish, broad public packaging. |
| Team Role | Provides analytical clarity and validates technical assumptions. |
| Recommended OSS | Data tools, algorithms, ML infrastructure, benchmarking suites, scientific packages. |
| Development Style | Define model, measure behavior, publish reproducible artifacts. |
| Recommended Languages | Python, Julia, Rust, R, C++. |
| Growth Direction | Add Craft to make deep work easier for others to apply. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 2 |
| Architecture | 3 |
| Innovation | 3 |
| Community | 1 |
| Leadership | 2 |
| Optimization | 5 |
| Research | 5 |
| Reliability | 3 |
| Craft | 2 |
| Openness | 2 |

## 3.11 APEX

| Field | Definition |
| --- | --- |
| Type Name | APEX |
| Title | The Release Standard |
| Concept | Sets visible quality bars for public projects. |
| One-line | A high-ownership developer whose repositories look maintained, trusted, and adopted. |
| Features | Stars, forks, releases, documentation, contributor guidance, strong public signals. |
| Strengths | Project authority, release discipline, public trust, ecosystem influence. |
| Blind Spots | Early experimentation, low-profile deep work, casual prototyping. |
| Team Role | Represents the project standard and turns work into trusted releases. |
| Recommended OSS | Widely used packages, frameworks, SDKs, platform integrations, public APIs. |
| Development Style | Maintain public quality, publish releases, guide contributors clearly. |
| Recommended Languages | TypeScript, Go, Rust, Python, Java. |
| Growth Direction | Add Innovation to keep mature projects from becoming static. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 4 |
| Architecture | 4 |
| Innovation | 2 |
| Community | 3 |
| Leadership | 5 |
| Optimization | 3 |
| Research | 2 |
| Reliability | 5 |
| Craft | 4 |
| Openness | 4 |

## 3.12 FLUX

| Field | Definition |
| --- | --- |
| Type Name | FLUX |
| Title | The Adaptive Catalyst |
| Concept | Moves quickly across changing tools, domains, and implementation paths. |
| One-line | A flexible developer whose GitHub activity shows rapid technical adaptation. |
| Features | New repos, diverse languages, emerging topics, active iteration, open experiments. |
| Strengths | Adaptation, fast learning, prototyping, connecting new tools to working code. |
| Blind Spots | Long-term maintenance, stable conventions, careful release discipline. |
| Team Role | Helps teams pivot when the technical landscape changes. |
| Recommended OSS | AI agents, edge apps, integrations, experimental frameworks, automation tools. |
| Development Style | Try fast, compare options, keep migration paths visible. |
| Recommended Languages | TypeScript, Python, Rust, Go, JavaScript. |
| Growth Direction | Add Reliability to transform adaptation into sustained capability. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 4 |
| Architecture | 2 |
| Innovation | 5 |
| Community | 3 |
| Leadership | 2 |
| Optimization | 2 |
| Research | 3 |
| Reliability | 1 |
| Craft | 3 |
| Openness | 4 |

## 3.13 VOID

| Field | Definition |
| --- | --- |
| Type Name | VOID |
| Title | The Deep Signal |
| Concept | Shows narrow but intense technical depth with minimal public surface. |
| One-line | A specialist whose public work is sparse but technically concentrated. |
| Features | Few focused repositories, research or optimization signals, low community and polish signals. |
| Strengths | Depth, concentration, hard problem focus, independent investigation. |
| Blind Spots | Visibility, collaboration, documentation, broad adoption. |
| Team Role | Investigates difficult unknowns before they become public commitments. |
| Recommended OSS | Research prototypes, security investigations, compilers, data experiments, internal tools later opened. |
| Development Style | Work in focused cycles, publish summaries when results become stable. |
| Recommended Languages | Rust, Python, C++, Go, Julia. |
| Growth Direction | Add Openness and Craft to turn depth into shared value. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 2 |
| Architecture | 2 |
| Innovation | 3 |
| Community | 1 |
| Leadership | 1 |
| Optimization | 4 |
| Research | 5 |
| Reliability | 2 |
| Craft | 1 |
| Openness | 1 |

## 3.14 ATLAS

| Field | Definition |
| --- | --- |
| Type Name | ATLAS |
| Title | The System Cartographer |
| Concept | Maps complex systems so others can navigate and extend them. |
| One-line | A structure-heavy developer who reveals how systems fit together. |
| Features | Architecture docs, multi-package repositories, diagrams, docs folders, versioned projects. |
| Strengths | System mapping, design explanation, modular structure, technical orientation. |
| Blind Spots | Fast iteration, public social motion, experimental breadth. |
| Team Role | Makes complex projects navigable and coherent. |
| Recommended OSS | Monorepos, infrastructure maps, SDKs, platform docs, distributed systems. |
| Development Style | Define boundaries, document flows, keep structure visible. |
| Recommended Languages | Go, TypeScript, Java, Rust, Python. |
| Growth Direction | Add Execution to make architecture produce faster visible output. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 3 |
| Architecture | 5 |
| Innovation | 2 |
| Community | 2 |
| Leadership | 4 |
| Optimization | 3 |
| Research | 4 |
| Reliability | 4 |
| Craft | 3 |
| Openness | 3 |

## 3.15 NEXUS

| Field | Definition |
| --- | --- |
| Type Name | NEXUS |
| Title | The Integration Link |
| Concept | Connects repositories, people, APIs, and ecosystems. |
| One-line | A connective developer whose work joins separate systems into useful flows. |
| Features | External PRs, integration repos, API wrappers, plugin work, cross-project activity. |
| Strengths | Integration, collaboration, ecosystem awareness, practical interoperability. |
| Blind Spots | Deep specialization, isolated research, strict performance focus. |
| Team Role | Bridges project boundaries and makes systems cooperate. |
| Recommended OSS | Plugins, SDKs, API clients, workflow tools, automation bridges, adapters. |
| Development Style | Connect existing strengths, document integration edges, test cross-system behavior. |
| Recommended Languages | TypeScript, Python, Go, JavaScript, Ruby. |
| Growth Direction | Add Leadership to turn integration work into ecosystem direction. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 4 |
| Architecture | 4 |
| Innovation | 3 |
| Community | 5 |
| Leadership | 3 |
| Optimization | 2 |
| Research | 2 |
| Reliability | 3 |
| Craft | 3 |
| Openness | 5 |

## 3.16 ZENITH

| Field | Definition |
| --- | --- |
| Type Name | ZENITH |
| Title | The Public Standard |
| Concept | Combines trust, presentation, leadership, and openness into a visible reference point. |
| One-line | A high-signal public developer whose repositories feel complete and reliable. |
| Features | Strong docs, releases, public adoption, polished profile, open-source posture. |
| Strengths | Public credibility, documentation, release quality, community trust, visible standards. |
| Blind Spots | Rapid low-stakes experimentation, quiet specialist work, private iteration. |
| Team Role | Sets the visible benchmark for project quality and public confidence. |
| Recommended OSS | Flagship libraries, docs-heavy frameworks, SDKs, educational platforms, public tools. |
| Development Style | Make quality visible, explain decisions, maintain public trust. |
| Recommended Languages | TypeScript, Python, Go, Rust, JavaScript. |
| Growth Direction | Add Innovation to keep standards fresh rather than only polished. |

Genome profile:

| Genome | Rating |
| --- | --- |
| Execution | 3 |
| Architecture | 4 |
| Innovation | 2 |
| Community | 4 |
| Leadership | 5 |
| Optimization | 3 |
| Research | 3 |
| Reliability | 5 |
| Craft | 5 |
| Openness | 5 |

## 4. Type Decision Rules

## 4.1 Primary Method: Archetype Distance

Type assignment is based on the nearest type profile.

1. Convert each type's 1 to 5 Genome profile into target scores.
2. Compare the user's 10 Genome scores against each target vector.
3. Select the type with the lowest weighted distance.

Distance formula:

```text
distance(type) =
  sum(abs(user_genome[dimension] - type_target[dimension]) * dimension_weight)
```

Default dimension weights:

| Genome | Weight |
| --- | ---: |
| Execution | 1.10 |
| Architecture | 1.05 |
| Innovation | 1.05 |
| Community | 1.05 |
| Leadership | 1.05 |
| Optimization | 1.00 |
| Research | 1.00 |
| Reliability | 1.10 |
| Craft | 1.00 |
| Openness | 1.00 |

Execution and Reliability receive slightly higher weights because they strongly affect visible GitHub activity and Monthly Evolution.

## 4.2 Representative Rule Examples

These are human-readable examples, not the only implementation path.

| Type | Representative Conditions |
| --- | --- |
| FORGE | Execution >= 80, Architecture >= 70, Optimization >= 65, Community < 50 |
| ORBIT | Community >= 80, Openness >= 75, Leadership >= 65 |
| NOVA | Innovation >= 85, Research >= 65, Reliability < 55 |
| PULSE | Execution >= 80, Reliability >= 80, Community >= 60 |
| ECHO | Research >= 80, Craft >= 80, Community >= 60 |
| VECTOR | Execution >= 80, Leadership >= 80, Architecture >= 70 |
| CORE | Reliability >= 85, Optimization >= 70, Architecture >= 70, Innovation < 55 |
| CIPHER | Optimization >= 85, Research >= 70, Community < 45, Craft < 55 |
| PRISM | Craft >= 85, Innovation >= 65, Openness >= 65 |
| QUANT | Research >= 85, Optimization >= 80, Community < 50 |
| APEX | Leadership >= 85, Reliability >= 80, Execution >= 65 |
| FLUX | Innovation >= 85, Execution >= 65, Reliability < 60 |
| VOID | Research >= 75, Optimization >= 65, Openness < 45, Community < 45 |
| ATLAS | Architecture >= 85, Research >= 65, Reliability >= 65 |
| NEXUS | Community >= 80, Architecture >= 65, Openness >= 80 |
| ZENITH | Leadership >= 85, Craft >= 80, Reliability >= 80, Openness >= 80 |

## 4.3 Boundary Conditions

If the nearest two types are close, DevDNA must avoid unstable monthly flipping.

Rules:

- If the distance gap between first and second type is less than `5%`, mark the result as a boundary type.
- Boundary types should still show one public type, but the explanation should mention the runner-up.
- If the current month is within `5%` of the previous month's type, keep the previous type unless the new type wins for two consecutive snapshots.
- If a user's highest Genome dimension is below `45`, assign no final public type and show `INSUFFICIENT SIGNAL`.
- If fewer than 3 public repositories and fewer than 30 active days exist in the last 12 months, show `INSUFFICIENT SIGNAL`.

Boundary label format:

```text
Primary: FORGE
Near: VECTOR
Reason: Execution and Architecture match both, but Leadership is closer to VECTOR.
```

## 4.4 Tie-Break Order

When distances are equal, use this order:

1. Type with stronger match on the user's top Genome dimension
2. Type with stronger match on the user's second Genome dimension
3. Type with lower penalty against the user's weakest Genome dimension
4. Previous monthly type, if available
5. Deterministic alphabetical order

## 5. Evolution

Evolution shows likely growth paths. It is not fixed and should be recalculated monthly from Genome changes.

| Type | Common Evolution Paths | Meaning |
| --- | --- | --- |
| FORGE | VECTOR -> APEX, CORE -> ATLAS, PRISM | Adds direction, stability, or public presentation. |
| ORBIT | NEXUS -> ZENITH, VECTOR, ECHO | Turns collaboration into integration, leadership, or knowledge. |
| NOVA | FLUX -> PRISM, QUANT, FORGE | Turns exploration into adaptation, polish, depth, or implementation. |
| PULSE | FORGE -> VECTOR, ORBIT, CORE | Turns activity rhythm into building, coordination, or stability. |
| ECHO | ZENITH, ORBIT, ATLAS, PRISM | Turns knowledge into public standard, community, system maps, or polish. |
| VECTOR | APEX, FORGE, NEXUS, ZENITH | Turns direction into releases, systems, integration, or public standard. |
| CORE | APEX, ATLAS, CIPHER, ZENITH | Turns stability into standard, maps, precision, or public trust. |
| CIPHER | QUANT, CORE, FORGE, VOID | Turns precision into analysis, reliability, implementation, or depth. |
| PRISM | ZENITH, ECHO, FLUX, APEX | Turns polish into public standard, knowledge, adaptation, or authority. |
| QUANT | CIPHER, ATLAS, NOVA, ZENITH | Turns analysis into precision, maps, exploration, or public standard. |
| APEX | ZENITH, VECTOR, CORE, NEXUS | Turns authority into public standard, direction, stability, or ecosystem reach. |
| FLUX | NOVA, FORGE, NEXUS, PRISM | Turns adaptation into exploration, implementation, integration, or polish. |
| VOID | CIPHER, QUANT, NOVA, PRISM | Turns depth into precision, analysis, exploration, or visibility. |
| ATLAS | VECTOR, ZENITH, CORE, ECHO | Turns system maps into direction, standard, stability, or knowledge. |
| NEXUS | ORBIT, ZENITH, VECTOR, APEX | Turns integration into community, public standard, direction, or authority. |
| ZENITH | APEX, ORBIT, ATLAS, PRISM | Evolves by emphasizing authority, community, system mapping, or experience. |

Evolution markers:

```text
TYPE   = current stable type
TYPE+  = same type with stronger top Genome dimensions
TYPE*  = boundary or transitional type
TYPE>  = moving toward another type
```

## 6. Compatibility

Compatibility compares collaboration fit between type patterns.

It is based on:

- Complementary strengths
- Shared reliability expectations
- Balance between execution and communication
- Balance between exploration and stability
- Avoidance of repeated blind spots

Rating scale:

```text
5 = exceptional fit
4 = strong fit
3 = workable fit
2 = friction likely
1 = high mismatch unless roles are explicit
```

## 6.1 Compatibility Matrix

| Type | FORGE | ORBIT | NOVA | PULSE | ECHO | VECTOR | CORE | CIPHER | PRISM | QUANT | APEX | FLUX | VOID | ATLAS | NEXUS | ZENITH |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| FORGE | 4 | 5 | 3 | 4 | 3 | 5 | 4 | 4 | 3 | 3 | 5 | 4 | 2 | 4 | 5 | 4 |
| ORBIT | 5 | 4 | 4 | 5 | 5 | 4 | 3 | 2 | 4 | 2 | 4 | 4 | 1 | 4 | 5 | 5 |
| NOVA | 3 | 4 | 4 | 3 | 4 | 3 | 2 | 3 | 5 | 5 | 2 | 5 | 4 | 3 | 4 | 3 |
| PULSE | 4 | 5 | 3 | 4 | 4 | 5 | 4 | 2 | 4 | 2 | 5 | 4 | 1 | 3 | 5 | 4 |
| ECHO | 3 | 5 | 4 | 4 | 4 | 3 | 3 | 2 | 5 | 4 | 4 | 4 | 3 | 5 | 4 | 5 |
| VECTOR | 5 | 4 | 3 | 5 | 3 | 4 | 5 | 4 | 3 | 3 | 5 | 4 | 2 | 5 | 5 | 5 |
| CORE | 4 | 3 | 2 | 4 | 3 | 5 | 4 | 5 | 3 | 4 | 5 | 2 | 3 | 5 | 4 | 5 |
| CIPHER | 4 | 2 | 3 | 2 | 2 | 4 | 5 | 4 | 2 | 5 | 3 | 3 | 5 | 4 | 3 | 3 |
| PRISM | 3 | 4 | 5 | 4 | 5 | 3 | 3 | 2 | 4 | 3 | 4 | 5 | 3 | 4 | 4 | 5 |
| QUANT | 3 | 2 | 5 | 2 | 4 | 3 | 4 | 5 | 3 | 4 | 3 | 3 | 5 | 5 | 3 | 4 |
| APEX | 5 | 4 | 2 | 5 | 4 | 5 | 5 | 3 | 4 | 3 | 4 | 3 | 2 | 5 | 5 | 5 |
| FLUX | 4 | 4 | 5 | 4 | 4 | 4 | 2 | 3 | 5 | 3 | 3 | 4 | 4 | 3 | 5 | 4 |
| VOID | 2 | 1 | 4 | 1 | 3 | 2 | 3 | 5 | 3 | 5 | 2 | 4 | 3 | 4 | 2 | 2 |
| ATLAS | 4 | 4 | 3 | 3 | 5 | 5 | 5 | 4 | 4 | 5 | 5 | 3 | 4 | 4 | 5 | 5 |
| NEXUS | 5 | 5 | 4 | 5 | 4 | 5 | 4 | 3 | 4 | 3 | 5 | 5 | 2 | 5 | 4 | 5 |
| ZENITH | 4 | 5 | 3 | 4 | 5 | 5 | 5 | 3 | 5 | 4 | 5 | 4 | 2 | 5 | 5 | 4 |

## 6.2 Compatibility Reason Rules

Use these reason patterns when generating explanations:

| Pair Pattern | Typical Reason |
| --- | --- |
| High Execution + High Community | One side ships while the other expands contribution flow. |
| High Architecture + High Craft | Structure becomes easier to understand and adopt. |
| High Innovation + High Reliability | Experiments can become stable projects. |
| High Research + High Craft | Deep knowledge becomes readable and reusable. |
| High Optimization + High Reliability | Technical precision becomes long-term trust. |
| High Leadership + High Openness | Public projects gain direction and reach. |
| Both low Community | Collaboration friction may appear without explicit communication norms. |
| Both low Reliability | Ideas may move quickly but maintenance risk increases. |
| Both high Leadership | Strong direction can work well, but ownership boundaries must be clear. |
| High Innovation + low Reliability on both sides | High energy, high volatility. |

Example:

```text
FORGE x ORBIT = 5
FORGE brings implementation velocity.
ORBIT brings review flow and contributor motion.
Together they turn work into shared project progress.
```

## 7. Developer Dictionary Standard

Every public type page must follow this structure:

```text
Type Name
Title
Symbolic Meaning
One-line Description
Genome Pattern
Typical GitHub Signals
Strengths
Blind Spots
Team Role
Recommended OSS
Recommended Development Style
Recommended Languages
Growth Direction
Compatible Types
Tension Types
Evolution Paths
README Card Copy
SNS Share Copy
```

## 7.1 Dictionary Voice

The dictionary should sound official, concise, and developer-native.

Rules:

- Do not use generic labels such as Builder, Architect, or Explorer as type names or primary category names.
- Do not describe types as better or worse.
- Do not describe personality.
- Describe public GitHub behavior.
- Explain why the type appears from observable data.
- Keep titles short enough for README cards.

## 7.2 Public Dictionary Opening Copy

DevDNA types are not personality boxes.

They are public GitHub activity patterns translated into a shared developer language.

Each type represents a way technical work becomes visible:

- Code shipped
- Systems shaped
- Knowledge shared
- Communities supported
- Projects maintained
- Experiments opened
- Standards established

Your type can change as your GitHub activity changes.

DevDNA is not what you are forever. It is what your public development trail currently reveals.

