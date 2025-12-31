export type Mode = "SILENT" | "CONTACT" | "BUSINESS" | "FOUNDER" | "ATLAS";

export type ContextKey =
  | "qr"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "linkedin"
  | "google_ads"
  | "direct"
  | "internal_erp";

export type Intent = "observe" | "contact" | "work" | "explore";

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
  intent: Intent;
  mode: Mode;
  confidence: number;
  priority: string[];
  ui: { motion: number; density: number };
};

export type Contract = any; // keep v1 flexible; we’ll strict-type in v2
