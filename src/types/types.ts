import type { GenomeDimension } from "@/genome/types";

export const TYPE_SYSTEM_VERSION = "1.0";

export const DEV_DNA_TYPES = [
  "FORGE",
  "ORBIT",
  "NOVA",
  "PULSE",
  "ECHO",
  "VECTOR",
  "CORE",
  "CIPHER",
  "PRISM",
  "QUANT",
  "APEX",
  "FLUX",
  "VOID",
  "ATLAS",
  "NEXUS",
  "ZENITH",
] as const;

export type DevDnaTypeName = (typeof DEV_DNA_TYPES)[number];

export type TypeDefinition = {
  name: DevDnaTypeName;
  title: string;
  concept: string;
  genomeProfile: Record<GenomeDimension, 1 | 2 | 3 | 4 | 5>;
};

export type TypeResult = {
  name: DevDnaTypeName | "INSUFFICIENT SIGNAL";
  title: string;
  confidence: number;
  nearType: DevDnaTypeName | null;
  distanceGap: number | null;
  isBoundary: boolean;
  explanation: string;
};
