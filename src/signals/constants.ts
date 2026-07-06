import type {
  SignalDefinition,
  SignalGenomeWeights,
  SignalId,
} from "@/signals/types";

export const SIGNAL_ENGINE_VERSION = "1.0";

export const SIGNAL_DEFINITIONS: Record<SignalId, SignalDefinition> = {
  S01: {
    id: "S01",
    name: "Repository Volume",
    meaning: "Amount of public project surface.",
  },
  S02: {
    id: "S02",
    name: "Repository Diversity",
    meaning: "Breadth across repositories, topics, and domains.",
  },
  S03: {
    id: "S03",
    name: "Repository Freshness",
    meaning: "How recently repositories are maintained.",
  },
  S04: {
    id: "S04",
    name: "Repository Completion",
    meaning: "Whether projects look finished enough to use.",
  },
  S05: {
    id: "S05",
    name: "Language Diversity",
    meaning: "Breadth of language usage.",
  },
  S06: {
    id: "S06",
    name: "Language Specialization",
    meaning: "Depth in a primary language.",
  },
  S07: {
    id: "S07",
    name: "Cross-Language Development",
    meaning: "Meaningful use of multiple languages.",
  },
  S08: {
    id: "S08",
    name: "Commit Volume",
    meaning: "Visible implementation volume.",
  },
  S09: {
    id: "S09",
    name: "Commit Consistency",
    meaning: "Regular contribution rhythm.",
  },
  S10: {
    id: "S10",
    name: "Active Day Density",
    meaning: "Number of active days in the year.",
  },
  S11: {
    id: "S11",
    name: "Contribution Streak",
    meaning: "Longest visible continuous contribution habit.",
  },
  S12: {
    id: "S12",
    name: "Pull Request Volume",
    meaning: "PR-based delivery activity.",
  },
  S13: {
    id: "S13",
    name: "Feature Delivery",
    meaning: "Merged or completed PR work.",
  },
  S14: {
    id: "S14",
    name: "Code Ownership",
    meaning: "Ownership of maintained public code.",
  },
  S15: {
    id: "S15",
    name: "External PR Activity",
    meaning: "Contribution to repositories outside ownership.",
  },
  S16: {
    id: "S16",
    name: "Review Activity",
    meaning: "Review participation and code feedback.",
  },
  S17: {
    id: "S17",
    name: "Issue Activity",
    meaning: "Issues opened and discussed.",
  },
  S18: {
    id: "S18",
    name: "Issue Responsiveness",
    meaning: "Maintainer-like issue engagement.",
  },
  S19: {
    id: "S19",
    name: "Community Support",
    meaning: "Helping others through comments and interactions.",
  },
  S20: {
    id: "S20",
    name: "OSS Participation",
    meaning: "External contribution and fork-based OSS behavior.",
  },
  S21: {
    id: "S21",
    name: "Public Adoption",
    meaning: "Stars, forks, and visible project use.",
  },
  S22: {
    id: "S22",
    name: "Project Leadership",
    meaning: "Guidance files, releases, and maintainer signals.",
  },
  S23: {
    id: "S23",
    name: "Documentation Presence",
    meaning: "README, docs, wiki, and examples presence.",
  },
  S24: {
    id: "S24",
    name: "Documentation Quality",
    meaning: "Depth and usefulness of documentation.",
  },
  S25: {
    id: "S25",
    name: "README Craft",
    meaning: "README presentation and usage clarity.",
  },
  S26: {
    id: "S26",
    name: "Metadata Craft",
    meaning: "Descriptions, topics, and public repository metadata.",
  },
  S27: {
    id: "S27",
    name: "Release Discipline",
    meaning: "Releases and tags as versioning behavior.",
  },
  S28: {
    id: "S28",
    name: "License Openness",
    meaning: "License presence across public projects.",
  },
  S29: {
    id: "S29",
    name: "CI Automation",
    meaning: "CI workflow presence.",
  },
  S30: {
    id: "S30",
    name: "Test Presence",
    meaning: "Test files and test directories.",
  },
  S31: {
    id: "S31",
    name: "Automation Depth",
    meaning: "Build, lint, format, dependency, and deployment config.",
  },
  S32: {
    id: "S32",
    name: "Performance Focus",
    meaning: "Benchmark, performance, and optimization signals.",
  },
  S33: {
    id: "S33",
    name: "Research Depth",
    meaning: "Notes, papers, long-form docs, algorithms, and labs.",
  },
  S34: {
    id: "S34",
    name: "Experimentation",
    meaning: "New repositories, emerging topics, and prototypes.",
  },
  S35: {
    id: "S35",
    name: "Maintenance Activity",
    meaning: "Long-term care and low abandonment.",
  },
  S36: {
    id: "S36",
    name: "Reusability",
    meaning: "Templates, packages, examples, and integration readiness.",
  },
};

export const SIGNAL_GENOME_WEIGHTS: Record<SignalId, SignalGenomeWeights> = {
  S01: { execution: 2, openness: 3 },
  S02: { architecture: 2, innovation: 4, research: 2, craft: 2, openness: 2 },
  S03: { execution: 3, optimization: 2, reliability: 4 },
  S04: {
    execution: 2,
    architecture: 3,
    leadership: 2,
    reliability: 3,
    craft: 3,
    openness: 2,
  },
  S05: { architecture: 3, innovation: 4 },
  S06: { architecture: 2, optimization: 3, research: 2 },
  S07: { architecture: 4, innovation: 3, optimization: 2 },
  S08: { execution: 5, optimization: 2 },
  S09: { execution: 4, reliability: 5 },
  S10: { execution: 5, reliability: 4 },
  S11: { execution: 3, reliability: 5 },
  S12: { execution: 5, community: 2 },
  S13: { execution: 5, leadership: 2, reliability: 2 },
  S14: { execution: 4, architecture: 3, leadership: 4, reliability: 3 },
  S15: { execution: 2, community: 5, openness: 4 },
  S16: { community: 5, leadership: 4 },
  S17: { community: 3, research: 3 },
  S18: { community: 4, leadership: 4, reliability: 3 },
  S19: { community: 5, leadership: 3, craft: 2, openness: 3 },
  S20: { innovation: 2, community: 5, openness: 5 },
  S21: { leadership: 5, openness: 4 },
  S22: { architecture: 3, leadership: 5, reliability: 2, craft: 3, openness: 2 },
  S23: { architecture: 2, leadership: 2, research: 3, craft: 4 },
  S24: { architecture: 2, leadership: 3, research: 4, craft: 5 },
  S25: { leadership: 2, research: 2, craft: 5 },
  S26: { innovation: 2, craft: 5, openness: 3 },
  S27: { architecture: 4, leadership: 3, reliability: 5 },
  S28: { reliability: 3, openness: 5 },
  S29: { architecture: 2, optimization: 5, reliability: 5 },
  S30: { architecture: 2, optimization: 5, reliability: 4 },
  S31: { architecture: 3, optimization: 5, reliability: 3 },
  S32: { innovation: 2, optimization: 5, research: 3 },
  S33: { innovation: 3, optimization: 2, research: 5, craft: 2 },
  S34: { innovation: 5, research: 3, craft: 2, openness: 3 },
  S35: { execution: 2, optimization: 2, reliability: 5 },
  S36: { architecture: 2, leadership: 3, reliability: 2, craft: 4, openness: 5 },
};

