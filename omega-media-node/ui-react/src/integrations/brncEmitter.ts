import type { EngineDecision } from "@engine/types";
import { BRNC_CONFIG } from "./brncConfig";

export function brncEmit(decision: EngineDecision) {
  if (!BRNC_CONFIG.enabled) return;

  const payload = {
    node: "OMEGA_MEDIA_NODE",
    mode: decision.mode,
    intent: decision.intent,
    context: decision.context.key,
    confidence: decision.confidence,
    meta: decision.context.meta,
    ts: new Date().toISOString(),
  };

  fetch(BRNC_CONFIG.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => void 0);
}
