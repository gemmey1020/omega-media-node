export type DecisionSnapshot = {
  id: string;
  ts: string;
  mode: string;
  intent: string;
  confidence: number;
  context: string;
};
