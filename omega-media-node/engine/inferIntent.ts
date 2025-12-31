import { Intent, Mode } from "./types";

export function inferIntent(mode: Mode, contract: any): Intent {
  const hint = contract?.modes?.[mode]?.intentHint as Intent | undefined;
  return hint || "observe";
}
