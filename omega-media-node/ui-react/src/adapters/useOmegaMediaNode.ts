import contract from "@contract/media.contract.v1.json";
import { omegaMediaEngine } from "@engine/omegaMediaEngine";
import { useMemo } from "react";
import { useTestHarness } from "./useTestHarness";

export function useOmegaMediaNode() {
  const test = useTestHarness();

  return useMemo(() => {
    return omegaMediaEngine(contract as any, {
      url: test.url,
      referrer: test.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language || "en",
      timeISO: new Date().toISOString(),
    });
  }, [test.url, test.referrer]);
}
