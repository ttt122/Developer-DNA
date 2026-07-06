import { calculateGenome } from "@/genome/calculateGenome";
import { GENOME_SCORING_VERSION } from "@/genome/constants";
import { fetchGitHubAnalysisInput } from "@/github/fetchGitHubAnalysisInput";
import { calculateSignals } from "@/signals/calculateSignals";
import { SIGNAL_ENGINE_VERSION } from "@/signals/constants";
import { calculateType } from "@/types/calculateType";
import { TYPE_SYSTEM_VERSION } from "@/types/types";

export async function analyzeGitHubUser(username: string) {
  const input = await fetchGitHubAnalysisInput(username);
  const signals = calculateSignals(input);
  const genome = calculateGenome(signals);
  const type = calculateType(genome.scores);

  return {
    username: input.profile.login,
    profile: {
      name: input.profile.name,
      bio: input.profile.bio,
      url: input.profile.htmlUrl,
      publicRepos: input.profile.publicRepos,
      followers: input.profile.followers,
      following: input.profile.following,
    },
    type,
    genome: genome.scores,
    genomeConfidence: genome.confidence,
    topSignals: Object.fromEntries(
      Object.entries(genome.topSignals).map(([dimension, signalIds]) => [
        dimension,
        signalIds.map((signalId) => ({
          id: signalId,
          name: signals[signalId as keyof typeof signals].name,
          score: signals[signalId as keyof typeof signals].score,
        })),
      ]),
    ),
    signals,
    explanations: [
      type.explanation,
      "Genome scores are calculated from versioned Behavior Signals, not raw GitHub counts directly.",
    ],
    versions: {
      signalEngine: SIGNAL_ENGINE_VERSION,
      genomeScoring: GENOME_SCORING_VERSION,
      typeSystem: TYPE_SYSTEM_VERSION,
    },
  };
}

