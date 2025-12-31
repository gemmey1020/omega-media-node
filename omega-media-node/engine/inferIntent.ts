import { Intent, Mode } from "./types";

export function inferIntent(contract: any, mode: Mode): Intent {
  const hint = contract?.modes?.[mode]?.intentHint as Intent | undefined;
  return hint || "OBSERVE";
}
