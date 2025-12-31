export type Mode = "SILENT" | "CONTACT" | "BUSINESS" | "FOUNDER" | "ATLAS";
export type Intent = "OBSERVE" | "CONTACT" | "WORK" | "EXPLORE";

export type ContextKey =
  | "qr"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "linkedin"
  | "google_ads"
  | "direct"
  | "internal_erp";

export type Signals = {
  url: string;
  referrer: string;
  userAgent: string;
  language: string;
  timeISO: string;
};

export type DetectedContext = {
  key: ContextKey;
  confidence: number;
  meta: Record<string, string>;
};

export type EngineDecision = {
  context: DetectedContext;
  mode: Mode;
  intent: Intent;
  confidence: number;
  priority: string[];
  uiProfile: {
    motion: number;
    density: number;
    ctaStyle: string;
    tone: string;
  };
};

export type Contract = any; // v1 flexible — v2 will be strict
