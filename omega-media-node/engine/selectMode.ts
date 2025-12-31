import { DetectedContext, Mode } from "./types";

function clamp(n: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, n));
}

export function selectMode(
  contract: any,
  ctx: DetectedContext
): { mode: Mode; confidence: number } {
  const ctxCfg = contract?.contexts?.[ctx.key];
  const mode = (ctxCfg?.defaultMode ||
    contract?.identity?.defaultMode ||
    "SILENT") as Mode;
  const conf = clamp(Number(ctxCfg?.confidence ?? ctx.confidence ?? 0.5));
  return { mode, confidence: conf };
}
