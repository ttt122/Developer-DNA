export const GENOME_DIMENSIONS = [
  "execution",
  "architecture",
  "innovation",
  "community",
  "leadership",
  "optimization",
  "research",
  "reliability",
  "craft",
  "openness",
] as const;

export type GenomeDimension = (typeof GENOME_DIMENSIONS)[number];

export type GenomeScores = Record<GenomeDimension, number>;

export type GenomeConfidence = Record<GenomeDimension, number>;

export type GenomeResult = {
  scores: GenomeScores;
  confidence: GenomeConfidence;
  topSignals: Record<GenomeDimension, string[]>;
};

