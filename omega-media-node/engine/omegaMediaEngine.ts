import { detectContext } from "./detectContext";
import { inferIntent } from "./inferIntent";
import { selectMode } from "./selectMode";
import { Contract, EngineDecision, Signals } from "./types";

export function omegaMediaEngine(
  contract: Contract,
  signals: Signals
): EngineDecision {
  // 1) Context
  const context = detectContext(contract, signals);

  // 2) Mode
  const { mode, confidence } = selectMode(contract, context);

  // 3) Intent
  const intent = inferIntent(contract, mode);

  // 4) Priority + UI profile (pure mapping)
  const priority = contract?.intents?.[intent]?.priority || [];
  const uiProfile = contract?.modes?.[mode]?.uiProfile || {
    motion: 0.25,
    density: 1.0,
    ctaStyle: "SOFT",
    tone: "CALM",
  };

  return {
    context,
    mode,
    intent,
    confidence,
    priority,
    uiProfile,
  };
}
