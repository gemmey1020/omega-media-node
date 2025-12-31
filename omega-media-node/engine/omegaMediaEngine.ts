// omega-media-node/engine/omegaMediaEngine.ts

import { detectContext } from "./detectContext";
import { inferIntent } from "./inferIntent";
import { selectMode } from "./selectMode";
import { Contract, EngineDecision, Signals } from "./types";

/**
 * Omega Media Engine
 * ------------------
 * - Contract-first
 * - Fail-fast
 * - Pure decision engine (no side effects)
 * - UI is a consumer, not a participant
 */
export function omegaMediaEngine(
  contract: Contract,
  signals: Signals
): EngineDecision {
  // ─────────────────────────────────────────────
  // 0) HARD FAIL — Contract integrity
  // ─────────────────────────────────────────────
  if (!contract) {
    throw new Error("[OMEGA_ENGINE] Contract is missing");
  }

  if (contract.sealed !== true) {
    throw new Error("[OMEGA_ENGINE] Contract is not sealed");
  }

  if (contract.identity?.node !== "OMEGA_MEDIA_NODE") {
    throw new Error("[OMEGA_ENGINE] Invalid node identity");
  }

  if (contract.identity?.authority !== "CANONICAL") {
    throw new Error("[OMEGA_ENGINE] Contract authority violation");
  }

  // ─────────────────────────────────────────────
  // 1) Context Detection
  // ─────────────────────────────────────────────
  const context = detectContext(contract, signals);

  if (!context) {
    throw new Error("[OMEGA_ENGINE] Context resolution failed");
  }

  // ─────────────────────────────────────────────
  // 2) Mode Selection
  // ─────────────────────────────────────────────
  const { mode, confidence } = selectMode(contract, context);

  if (!mode) {
    throw new Error("[OMEGA_ENGINE] Mode selection failed");
  }

  // ─────────────────────────────────────────────
  // 3) Intent Inference
  // ─────────────────────────────────────────────
  const intent = inferIntent(contract, mode);

  if (!intent) {
    throw new Error("[OMEGA_ENGINE] Intent inference failed");
  }

  // ─────────────────────────────────────────────
  // 4) Priority Mapping (pure read)
  // ─────────────────────────────────────────────
  const priority = contract.intents?.[intent]?.priority ?? [];

  // ─────────────────────────────────────────────
  // 5) UI Profile Mapping (pure read, safe default)
  // ─────────────────────────────────────────────
  const uiProfile = contract.modes?.[mode]?.uiProfile ?? {
    motion: 0.25,
    density: 1.0,
    ctaStyle: "SOFT",
    tone: "CALM",
  };

  // ─────────────────────────────────────────────
  // 6) Final Engine Decision
  // ─────────────────────────────────────────────
  return {
    context,
    mode,
    intent,
    confidence,
    priority,
    uiProfile,
  };
}
