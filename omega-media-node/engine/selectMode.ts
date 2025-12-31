import { DetectedContext, Mode } from "./types";

export function selectMode(
  contract: any,
  ctx: DetectedContext
): { mode: Mode; confidence: number } {
  const cfg = contract?.contexts?.[ctx.key];
  const mode = (cfg?.defaultMode ||
    contract?.identity?.defaultMode ||
    "SILENT") as Mode;
  const confidence = Math.max(
    0,
    Math.min(1, Number(cfg?.confidence ?? ctx.confidence ?? 0.5))
  );
  return { mode, confidence };
}
