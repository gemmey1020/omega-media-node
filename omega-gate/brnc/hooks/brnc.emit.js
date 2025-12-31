/**
 * BRNC++ Emit Hook (v1)
 * External to Media Node. Receives explicit signals only.
 * No UI changes. No blocking. No identifiers.
 */

export function createBRNCEmitter({ append }) {
  return function brncEmit(payload) {
    try {
      // Validate minimal fields
      if (
        !payload ||
        !payload.behavior ||
        !payload.reason ||
        !payload.timestamp
      )
        return;

      // Append only (implementation decides storage)
      append({
        service: "BRNC++",
        event: "BEHAVIOR_OCCURRED",
        behavior: payload.behavior,
        node: payload.node || "Ω-MEDIA-NODE",
        reason: payload.reason,
        meta: payload.meta || {},
        timestamp: payload.timestamp,
      });
    } catch {
      // Silent failure by contract
    }
  };
}
