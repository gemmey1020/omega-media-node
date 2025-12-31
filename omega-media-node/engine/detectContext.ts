import { DetectedContext, Signals } from "./types";

function clamp(n: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, n));
}

function utm(url: URL) {
  return {
    utm_source: url.searchParams.get("utm_source") || "",
    utm_medium: url.searchParams.get("utm_medium") || "",
    utm_campaign: url.searchParams.get("utm_campaign") || "",
  };
}

export function detectContext(
  contract: any,
  signals: Signals
): DetectedContext {
  const url = new URL(signals.url);
  const ref = (signals.referrer || "").toLowerCase();
  const { utm_source, utm_medium, utm_campaign } = utm(url);

  // 🔐 Internal ERP gate (locked)
  const token = contract?.rules?.internalToken;
  if (token && url.searchParams.get(token.param) === token.value) {
    return {
      key: "internal_erp",
      confidence: clamp(0.95),
      meta: { internal: "true" },
    };
  }

  // QR
  if (
    utm_medium.toLowerCase() === "qr" ||
    url.searchParams.get("src") === "qr"
  ) {
    return {
      key: "qr",
      confidence: clamp(0.9),
      meta: { utm_source, utm_medium, utm_campaign },
    };
  }

  // Google / Ads
  if (utm_source.toLowerCase().includes("google") || ref.includes("google")) {
    return {
      key: "google_ads",
      confidence: clamp(0.8),
      meta: { utm_source, utm_medium, utm_campaign },
    };
  }

  // Social
  if (ref.includes("instagram"))
    return { key: "instagram", confidence: 0.7, meta: { referrer: ref } };
  if (ref.includes("facebook"))
    return { key: "facebook", confidence: 0.7, meta: { referrer: ref } };
  if (ref.includes("tiktok"))
    return { key: "tiktok", confidence: 0.7, meta: { referrer: ref } };
  if (ref.includes("linkedin"))
    return { key: "linkedin", confidence: 0.85, meta: { referrer: ref } };

  // Direct / Fallback
  return {
    key: "direct",
    confidence: clamp(0.55),
    meta: { utm_source, utm_medium, utm_campaign },
  };
}
