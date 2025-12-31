import { useMemo } from "react";
import contract from "../../contract/media.contract.v1.json";
import { omegaMediaEngine } from "../../engine/omegaMediaEngine";

export function useOmegaMediaNode() {
  return useMemo(() => {
    const decision = omegaMediaEngine(contract as any, {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language || "en",
      timeISO: new Date().toISOString(),
    });
    return decision;
  }, []);
}
