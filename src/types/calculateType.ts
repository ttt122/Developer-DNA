import { GENOME_DIMENSIONS } from "@/genome/types";
import type { GenomeScores } from "@/genome/types";
import { TYPE_DEFINITIONS } from "@/types/definitions";
import type { DevDnaTypeName, TypeDefinition, TypeResult } from "@/types/types";

const RATING_TARGETS = {
  1: 20,
  2: 40,
  3: 60,
  4: 80,
  5: 95,
} as const;

const DIMENSION_WEIGHTS = {
  execution: 1.1,
  architecture: 1.05,
  innovation: 1.05,
  community: 1.05,
  leadership: 1.05,
  optimization: 1,
  research: 1,
  reliability: 1.1,
  craft: 1,
  openness: 1,
} as const;

type TypeDistance = {
  definition: TypeDefinition;
  distance: number;
};

function distanceToType(
  genome: GenomeScores,
  definition: TypeDefinition,
): number {
  return GENOME_DIMENSIONS.reduce((sum, dimension) => {
    const target = RATING_TARGETS[definition.genomeProfile[dimension]];
    const weight = DIMENSION_WEIGHTS[dimension];

    return sum + Math.abs(genome[dimension] - target) * weight;
  }, 0);
}

function sortedDistances(genome: GenomeScores): TypeDistance[] {
  return TYPE_DEFINITIONS.map((definition) => ({
    definition,
    distance: distanceToType(genome, definition),
  })).sort((a, b) => {
    if (a.distance === b.distance) {
      return a.definition.name.localeCompare(b.definition.name);
    }

    return a.distance - b.distance;
  });
}

function strongestDimensions(genome: GenomeScores): string {
  return [...GENOME_DIMENSIONS]
    .sort((a, b) => genome[b] - genome[a])
    .slice(0, 3)
    .map((dimension) => `${dimension} ${genome[dimension]}`)
    .join(", ");
}

export function calculateType(genome: GenomeScores): TypeResult {
  const highestScore = Math.max(...Object.values(genome));

  if (highestScore < 45) {
    return {
      name: "INSUFFICIENT SIGNAL",
      title: "Insufficient Signal",
      confidence: 0,
      nearType: null,
      distanceGap: null,
      isBoundary: false,
      explanation: "Not enough public GitHub signal exists to assign a DevDNA type.",
    };
  }

  const distances = sortedDistances(genome);
  const best = distances[0];
  const runnerUp = distances[1];
  const maxDistance = GENOME_DIMENSIONS.length * 100;
  const distanceGap = runnerUp.distance - best.distance;
  const distanceGapPercent = (distanceGap / maxDistance) * 100;
  const isBoundary = distanceGapPercent < 5;
  const confidence = Math.max(
    0,
    Math.min(100, Math.round(100 - (best.distance / maxDistance) * 100)),
  );

  return {
    name: best.definition.name,
    title: best.definition.title,
    confidence,
    nearType: runnerUp.definition.name as DevDnaTypeName,
    distanceGap: Number(distanceGapPercent.toFixed(2)),
    isBoundary,
    explanation: `${best.definition.name} is closest to this Genome pattern. Strongest dimensions: ${strongestDimensions(genome)}.`,
  };
}

