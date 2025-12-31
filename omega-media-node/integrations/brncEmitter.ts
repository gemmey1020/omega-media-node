import type { EngineDecision } from "../engine/types";

export async function brncEmit(decision: EngineDecision) {
  // minimal event payload (no heavy tracking)
  const payload = {
    node: "OMEGA_MEDIA_NODE",
    mode: decision.mode,
    intent: decision.intent,
    context: decision.context.key,
    confidence: decision.confidence,
    meta: decision.context.meta,
    ts: new Date().toISOString(),
  };

  // Example: ERP endpoint (you’ll swap the URL)
  // NOTE: keep it fire-and-forget; do not block UX
  fetch("/brnc/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => void 0);
}
