import { useMemo } from "react";

export function useTestHarness() {
  const params = new URLSearchParams(window.location.search);
  const forcedUrl = params.get("_test_url");
  const forcedRef = params.get("_test_ref");

  return useMemo(() => {
    return {
      url: forcedUrl || window.location.href,
      referrer: forcedRef || document.referrer,
    };
  }, [forcedUrl, forcedRef]);
}
