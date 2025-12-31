import contract from "@contract/media.contract.v1.json";
import { resolveLinks } from "./adapters/resolveLinks";
import { useOmegaMediaNode } from "./adapters/useOmegaMediaNode";
import "./App.css";
import { LinkGrid } from "./renderers/LinkGrid";
import { ModeBadge } from "./renderers/ModeBadge";

// import { brncEmit } from "./integrations/brncEmitter";
// useEffect(() => brncEmit(decision), []);

// import { useEffect } from "react";
// import { brncEmit } from "./integrations/brncEmitter";
// useEffect(() => brncEmit(decision), [decision.mode]);

export default function App() {
  const decision = useOmegaMediaNode();
  const items = resolveLinks(contract as any, decision.priority);

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginBottom: 6 }}>Omega Media Node</h1>
      <p style={{ opacity: 0.7, marginTop: 0 }}>
        Contract-first. Engine authority. UI surface only.
      </p>

      <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
        <ModeBadge
          mode={decision.mode}
          intent={decision.intent}
          confidence={decision.confidence}
        />
        <LinkGrid items={items} />
      </div>
    </div>
  );
}
