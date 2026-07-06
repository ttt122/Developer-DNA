import type { GenomeScores } from "@/genome/types";
import type { TypeResult } from "@/types/types";

type ReadmeCardProps = {
  username: string;
  type: TypeResult;
  genome: GenomeScores;
  generatedAt: string;
};

function topGenome(genome: GenomeScores) {
  return Object.entries(genome)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);
}

function barWidth(score: number): number {
  return Math.max(8, Math.min(220, Math.round((score / 100) * 220)));
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderReadmeCard({
  username,
  type,
  genome,
  generatedAt,
}: ReadmeCardProps): string {
  const top = topGenome(genome);
  const topDescription = top
    .map(([name, score]) => `${name} ${score}`)
    .join(", ");
  const bars = top
    .map(([name, score], index) => {
      const y = 190 + index * 26;

      return `
        <g>
          <text x="30" y="${y}" fill="#c9d1d9" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="13">${escapeXml(name)}</text>
          <rect x="170" y="${y - 11}" width="220" height="10" rx="5" fill="#21262d" />
          <rect x="170" y="${y - 11}" width="${barWidth(score)}" height="10" rx="5" fill="url(#accent)" />
          <text x="410" y="${y}" fill="#f0f6fc" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600">${score}</text>
        </g>`;
    })
    .join("");

  return `<!DOCTYPE svg>
    <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc" viewBox="0 0 640 320" width="640" height="320">
      <title id="title">DevDNA card for ${escapeXml(username)}: ${escapeXml(type.name)}</title>
      <desc id="desc">${escapeXml(type.name)}, ${escapeXml(type.title)}. Top Genome scores: ${escapeXml(topDescription)}.</desc>
      <metadata>${escapeXml(
        JSON.stringify({
          cardSpecVersion: "1.0",
          username,
          type: type.name,
          generatedAt,
        }),
      )}</metadata>
      <defs>
        <linearGradient id="accent" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="#39d0ff" />
          <stop offset="100%" stop-color="#8bffb1" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" rx="8" fill="#0d1117" />
      <rect
        x="0.5"
        y="0.5"
        width="639"
        height="319"
        rx="8"
        fill="none"
        stroke="#30363d"
      />
      <text
        x="28"
        y="42"
        fill="#8b949e"
        font-family="Inter, ui-sans-serif, system-ui, sans-serif"
        font-size="14"
      >
        DevDNA
      </text>
      <text
        x="28"
        y="96"
        fill="#f0f6fc"
        font-family="Inter, ui-sans-serif, system-ui, sans-serif"
        font-size="46"
        font-weight="700"
      >
        ${escapeXml(type.name)}
      </text>
      <text
        x="30"
        y="126"
        fill="#c9d1d9"
        font-family="Inter, ui-sans-serif, system-ui, sans-serif"
        font-size="18"
      >
        ${escapeXml(type.title)}
      </text>
      <text
        x="30"
        y="154"
        fill="#8b949e"
        font-family="Inter, ui-sans-serif, system-ui, sans-serif"
        font-size="13"
      >
        @${escapeXml(username)} - Generated ${escapeXml(generatedAt.slice(0, 10))}
      </text>
      ${bars}

      <text
        x="500"
        y="42"
        fill="#8b949e"
        font-family="Inter, ui-sans-serif, system-ui, sans-serif"
        font-size="12"
      >
        v0.1.0
      </text>
      <text
        x="500"
        y="286"
        fill="#39d0ff"
        font-family="Inter, ui-sans-serif, system-ui, sans-serif"
        font-size="13"
        font-weight="600"
      >
        devdna
      </text>
    </svg>`;
}
