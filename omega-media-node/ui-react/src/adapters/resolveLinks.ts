type Contract = any;

export function resolveLinks(contract: Contract, priority: string[]) {
  const links = contract?.links || {};
  return priority
    .filter((id: string) => Boolean(links[id]))
    .map((id: string) => ({
      id,
      label: String(links[id].label || id),
      href: String(links[id].href || "#"),
    }));
}
