import type { DecisionSnapshot } from "./types";

type Props = { items: DecisionSnapshot[] };

export function SnapshotTimeline({ items }: Props) {
  if (!items.length) return null;

  return (
    <div className="hud-snapshots">
      <div className="hud-panel-head">
        <div className="hud-panel-title">Decision Timeline</div>
        <div className="hud-panel-badge">SNAPSHOT</div>
      </div>

      <div className="hud-snapshot-list">
        {items.map((s) => (
          <div key={s.id} className="hud-snapshot">
            <div className="hud-snapshot-dot" />
            <div className="hud-snapshot-body">
              <div className="hud-snapshot-top">
                <span className="hud-snapshot-mode">{s.mode}</span>
                <span className="hud-snapshot-intent">{s.intent}</span>
              </div>
              <div className="hud-snapshot-meta">
                <span>{s.context}</span>
                <span>•</span>
                <span>{s.confidence.toFixed(2)}</span>
                <span>•</span>
                <span>{new Date(s.ts).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
