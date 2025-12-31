type LinkItem = { id: string; label: string; href: string };
type Props = { items: LinkItem[] };

export function LinkGrid({ items }: Props) {
  return (
    <div className="hud-link-grid">
      {items.map((x) => (
        <a key={x.id} className="hud-link" href={x.href}>
          <div className="hud-link-title">{x.label}</div>
          <div className="hud-link-href">{x.href}</div>
        </a>
      ))}
    </div>
  );
}
