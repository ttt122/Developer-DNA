import type { GenomeScores } from "@/genome/types";

type GenomeBarsProps = {
  genome: GenomeScores;
};

export function GenomeBars({ genome }: GenomeBarsProps) {
  const entries = Object.entries(genome).sort(([, a], [, b]) => b - a);

  return (
    <div className="grid gap-3">
      {entries.map(([name, score]) => (
        <div key={name} className="grid gap-1.5">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="capitalize text-[#c9d1d9]">{name}</span>
            <span className="font-mono text-[#f0f6fc]">{score}</span>
          </div>
          <div className="h-2 rounded-full bg-[#21262d]">
            <div
              className="h-2 rounded-full bg-[#39d0ff]"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

