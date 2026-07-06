import { GenomeBars } from "@/components/GenomeBars";
import type { GenomeScores } from "@/genome/types";
import Image from "next/image";

type ResultPanelProps = {
  result: {
    username: string;
    type: {
      name: string;
      title: string;
      confidence: number;
      isBoundary: boolean;
      nearType: string | null;
      explanation: string;
    };
    genome: GenomeScores;
    explanations: string[];
  };
};

export function ResultPanel({ result }: ResultPanelProps) {
  const cardUrl = `/api/card/${result.username}.svg`;
  const markdown = `[![DevDNA](${cardUrl})](${typeof window === "undefined" ? "" : window.location.origin})`;

  return (
    <section className="grid gap-5 rounded-lg border border-[var(--panel-border)] bg-[var(--panel)] p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-[var(--muted)]">@{result.username}</p>
          <h2 className="text-4xl font-semibold tracking-normal">
            {result.type.name}
          </h2>
          <p className="text-lg text-[#c9d1d9]">{result.type.title}</p>
        </div>
        <div className="text-sm text-[var(--muted)]">
          Confidence{" "}
          <span className="font-mono text-[#f0f6fc]">
            {result.type.confidence}
          </span>
        </div>
      </div>

      <GenomeBars genome={result.genome} />

      <div className="grid gap-2 rounded-md border border-[var(--panel-border)] bg-[#0d1117] p-4 text-sm text-[#c9d1d9]">
        {result.explanations.map((explanation) => (
          <p key={explanation}>{explanation}</p>
        ))}
        {result.type.isBoundary ? (
          <p>Boundary result near {result.type.nearType}.</p>
        ) : null}
      </div>

      <div className="grid gap-3">
        <p className="text-sm font-medium text-[#f0f6fc]">README card</p>
        <Image
          src={cardUrl}
          alt={`DevDNA card for ${result.username}`}
          width={640}
          height={320}
          unoptimized
          className="w-full max-w-[640px] rounded-lg border border-[var(--panel-border)]"
        />
        <code className="overflow-x-auto rounded-md border border-[var(--panel-border)] bg-[#0d1117] p-3 text-xs text-[#c9d1d9]">
          {markdown}
        </code>
      </div>
    </section>
  );
}
