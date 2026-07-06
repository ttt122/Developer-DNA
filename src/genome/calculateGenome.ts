import { GENOME_DIMENSIONS } from "@/genome/types";
import type {
  GenomeConfidence,
  GenomeDimension,
  GenomeResult,
  GenomeScores,
} from "@/genome/types";
import { SIGNAL_GENOME_WEIGHTS } from "@/signals/constants";
import { clampScore } from "@/signals/normalize";
import type { SignalScores } from "@/signals/types";

function emptyScores(): GenomeScores {
  return Object.fromEntries(
    GENOME_DIMENSIONS.map((dimension) => [dimension, 0]),
  ) as GenomeScores;
}

function emptyTopSignals(): Record<GenomeDimension, string[]> {
  return GENOME_DIMENSIONS.reduce(
    (result, dimension) => {
      result[dimension] = [];
      return result;
    },
    {} as Record<GenomeDimension, string[]>,
  );
}

function calculateDimension(
  signals: SignalScores,
  dimension: GenomeDimension,
): {
  score: number;
  confidence: number;
  topSignals: string[];
} {
  const entries = Object.values(signals)
    .map((signal) => {
      const weight = SIGNAL_GENOME_WEIGHTS[signal.id][dimension];

      return weight
        ? {
            signal,
            weight,
          }
        : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);

  if (!entries.length || totalWeight <= 0) {
    return {
      score: 0,
      confidence: 0,
      topSignals: [],
    };
  }

  const score = entries.reduce(
    (sum, entry) => sum + entry.signal.score * entry.weight,
    0,
  );
  const confidence = entries.reduce(
    (sum, entry) => sum + entry.signal.confidence * entry.weight,
    0,
  );
  const topSignals = entries
    .sort(
      (a, b) => b.signal.score * b.weight - a.signal.score * a.weight,
    )
    .slice(0, 3)
    .map((entry) => entry.signal.id);

  return {
    score: clampScore(score / totalWeight),
    confidence: clampScore(confidence / totalWeight),
    topSignals,
  };
}

export function calculateGenome(signals: SignalScores): GenomeResult {
  const scores = emptyScores();
  const confidence = emptyScores() as GenomeConfidence;
  const topSignals = emptyTopSignals();

  for (const dimension of GENOME_DIMENSIONS) {
    const result = calculateDimension(signals, dimension);

    scores[dimension] = result.score;
    confidence[dimension] = result.confidence;
    topSignals[dimension] = result.topSignals;
  }

  return {
    scores,
    confidence,
    topSignals,
  };
}
