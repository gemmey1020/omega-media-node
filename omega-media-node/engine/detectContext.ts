import { DetectedContext, Signals } from "./types";

function getUTM(url: URL) {
  const utm_source = url.searchParams.get("utm_source") || "";
  const utm_medium = url.searchParams.get("utm_medium") || "";
  const utm_campaign = url.searchParams.get("utm_campaign") || "";
  return { utm_source, utm_medium, utm_campaign };
}

export function detectContext(
  contract: any,
  signals: Signals
): DetectedContext {
  const url = new URL(signals.url);
  const ref = (signals.referrer || "").toLowerCase();
  const ua = (signals.userAgent || "").toLowerCase();
  const { utm_source, utm_medium, utm_campaign } = getUTM(url);

  // Internal ERP gate (locked)
  const internalTokenParam = contract?.rules?.internalTokenParam || "_omega";
  const internalTokenValue = contract?.rules?.internalTokenValue || "ATLAS";
  if (url.searchParams.get(internalTokenParam) === internalTokenValue) {
    return { key: "internal_erp", confidence: 0.95, meta: { internal: "1" } };
  }

  // QR hint: common pattern is "utm_medium=qr" or short links / explicit param
  if (
    utm_medium.toLowerCase() === "qr" ||
    url.searchParams.get("src") === "qr"
  ) {
    return {
      key: "qr",
      confidence: 0.9,
      meta: { utm_source, utm_medium, utm_campaign },
    };
  }

  // Ads / Google
  if (utm_source.toLowerCase().includes("google") || ref.includes("google")) {
    return {
      key: "google_ads",
      confidence: 0.8,
      meta: { utm_source, utm_medium, utm_campaign },
    };
  }

  // Social referrers
  if (ref.includes("instagram"))
    return { key: "instagram", confidence: 0.7, meta: { referrer: ref } };
  if (ref.includes("facebook"))
    return { key: "facebook", confidence: 0.7, meta: { referrer: ref } };
  if (ref.includes("tiktok"))
    return { key: "tiktok", confidence: 0.7, meta: { referrer: ref } };
  if (ref.includes("linkedin"))
    return { key: "linkedin", confidence: 0.8, meta: { referrer: ref } };

  // Direct
  if (!ref)
    return {
      key: "direct",
      confidence: 0.55,
      meta: { ua, utm_source, utm_medium, utm_campaign },
    };

  // Fallback
  return {
    key: "direct",
    confidence: 0.55,
    meta: { referrer: ref, utm_source, utm_medium, utm_campaign },
  };
}
