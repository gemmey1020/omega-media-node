import { useEffect, useState } from "react";
import type { DecisionSnapshot } from "./types";

const KEY = "OMEGA_MEDIA_NODE_SNAPSHOTS";
const MAX = 7;

export function useDecisionSnapshots(decision: any) {
  const [items, setItems] = useState<DecisionSnapshot[]>([]);

  useEffect(() => {
    const raw = sessionStorage.getItem(KEY);
    const prev: DecisionSnapshot[] = raw ? JSON.parse(raw) : [];

    const snap: DecisionSnapshot = {
      id: crypto.randomUUID(),
      ts: new Date().toISOString(),
      mode: decision.mode,
      intent: decision.intent,
      confidence: decision.confidence,
      context: decision.context.key,
    };

    const next = [snap, ...prev].slice(0, MAX);
    sessionStorage.setItem(KEY, JSON.stringify(next));
    setItems(next);
  }, [decision.mode, decision.intent, decision.context.key]);

  return items;
}
