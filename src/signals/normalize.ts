export function clampScore(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
}

export function countNorm(value: number, reference: number): number {
  if (value <= 0 || reference <= 0) {
    return 0;
  }

  return clampScore((Math.log10(value + 1) / Math.log10(reference + 1)) * 100);
}

export function ratioNorm(value: number): number {
  return clampScore(value * 100);
}

export function booleanNorm(value: boolean): number {
  return value ? 100 : 0;
}

export function weightedAverage(
  entries: Array<{ score: number; weight: number }>,
): number {
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);

  if (totalWeight <= 0) {
    return 0;
  }

  const total = entries.reduce(
    (sum, entry) => sum + entry.score * entry.weight,
    0,
  );

  return clampScore(total / totalWeight);
}

