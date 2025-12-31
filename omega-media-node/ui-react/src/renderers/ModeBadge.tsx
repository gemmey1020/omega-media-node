type Props = { mode: string; intent: string; confidence: number };

export function ModeBadge({ mode, intent, confidence }: Props) {
  return (
    <div
      style={{
        padding: 12,
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 12,
      }}
    >
      <div style={{ fontWeight: 700 }}>Mode: {mode}</div>
      <div>Intent: {intent}</div>
      <div style={{ opacity: 0.8 }}>Confidence: {confidence.toFixed(2)}</div>
    </div>
  );
}
