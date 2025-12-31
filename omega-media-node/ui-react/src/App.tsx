import contract from "@contract/media.contract.v1.json";
import { resolveLinks } from "./adapters/resolveLinks";
import { useOmegaMediaNode } from "./adapters/useOmegaMediaNode";
import "./App.css";
import { LinkGrid } from "./renderers/LinkGrid";

export default function App() {
  const decision = useOmegaMediaNode();
  const items = resolveLinks(contract as any, decision.priority);

  return (
    <div
      className="hud-root"
      data-mode={decision.mode}
      data-intent={decision.intent}
    >
      <div className="hud-bg" aria-hidden="true">
        <div className="hud-grid" />
        <div className="hud-radial" />
        <div className="hud-noise" />
      </div>

      <header className="hud-topbar">
        <div className="hud-brand">
          <div className="hud-sigil" aria-hidden="true" />
          <div className="hud-brand-text">
            <div className="hud-title">OMEGA MEDIA NODE</div>
            <div className="hud-subtitle">
              Contract-first • Engine authority • UI surface
            </div>
          </div>
        </div>

        <div className="hud-status">
          <div className="hud-pill">
            <span className="hud-dot" />
            <span className="hud-pill-label">MODE</span>
            <span className="hud-pill-value">{decision.mode}</span>
          </div>

          <div className="hud-pill">
            <span className="hud-pill-label">INTENT</span>
            <span className="hud-pill-value">{decision.intent}</span>
          </div>

          <div className="hud-pill hud-pill-soft">
            <span className="hud-pill-label">CONF</span>
            <span className="hud-pill-value">
              {decision.confidence.toFixed(2)}
            </span>
          </div>
        </div>
      </header>

      <main className="hud-main">
        <section className="hud-panel hud-panel-left">
          <div className="hud-panel-head">
            <div className="hud-panel-title">Decision Output</div>
            <div className="hud-panel-badge">ENGINE</div>
          </div>

          <div className="hud-kv">
            <div className="hud-kv-row">
              <div className="hud-k">Context</div>
              <div className="hud-v">{decision.context.key}</div>
            </div>
            <div className="hud-kv-row">
              <div className="hud-k">Confidence</div>
              <div className="hud-v">{decision.confidence.toFixed(2)}</div>
            </div>
            <div className="hud-kv-row">
              <div className="hud-k">Motion</div>
              <div className="hud-v">
                {Number(decision.uiProfile.motion).toFixed(2)}
              </div>
            </div>
            <div className="hud-kv-row">
              <div className="hud-k">Density</div>
              <div className="hud-v">
                {Number(decision.uiProfile.density).toFixed(2)}
              </div>
            </div>
            <div className="hud-kv-row">
              <div className="hud-k">Tone</div>
              <div className="hud-v">{decision.uiProfile.tone}</div>
            </div>
            <div className="hud-kv-row">
              <div className="hud-k">CTA</div>
              <div className="hud-v">{decision.uiProfile.ctaStyle}</div>
            </div>
          </div>

          <div className="hud-divider" />

          <div className="hud-mini">
            <div className="hud-mini-title">Meta</div>
            <pre className="hud-pre">
              {JSON.stringify(decision.context.meta, null, 2)}
            </pre>
          </div>
        </section>

        <section className="hud-panel hud-panel-right">
          <div className="hud-panel-head">
            <div className="hud-panel-title">Priority Links</div>
            <div className="hud-panel-badge">CONTRACT</div>
          </div>

          <div className="hud-links">
            <LinkGrid items={items} />
          </div>

          <div className="hud-footerline">
            <span className="hud-muted">Ω</span>
            <span className="hud-muted">Founder Lock: ON</span>
            <span className="hud-muted">•</span>
            <span className="hud-muted">Drift Policy: Zero</span>
          </div>
        </section>
      </main>
    </div>
  );
}
