type LinkItem = { id: string; label: string; href: string };

type Props = { items: LinkItem[] };

export function LinkGrid({ items }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gap: 10,
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      }}
    >
      {items.map((x) => (
        <a
          key={x.id}
          href={x.href}
          style={{
            padding: 14,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.12)",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div style={{ fontWeight: 700 }}>{x.label}</div>
          <div style={{ opacity: 0.7, fontSize: 12 }}>{x.href}</div>
        </a>
      ))}
    </div>
  );
}
