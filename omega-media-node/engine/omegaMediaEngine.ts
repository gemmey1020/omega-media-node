import { detectContext } from "./detectContext";
import { inferIntent } from "./inferIntent";
import { selectMode } from "./selectMode";
import { Contract, EngineDecision, Signals } from "./types";

export function omegaMediaEngine(
  contract: Contract,
  signals: Signals
): EngineDecision {
  const context = detectContext(contract, signals);
  const { mode, confidence } = selectMode(contract, context);
  const intent = inferIntent(mode, contract);

  const priority = contract?.intents?.[intent]?.priority || [];
  const motion = Number(contract?.modes?.[mode]?.motion ?? 0.25);
  const density = Number(contract?.modes?.[mode]?.density ?? 1.0);

  return {
    context,
    intent,
    mode,
    confidence,
    priority,
    ui: { motion, density },
  };
}
