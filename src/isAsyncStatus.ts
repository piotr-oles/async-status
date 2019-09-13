import { AsyncStatus } from "./AsyncStatus";

// don't use Object.values as it's not supported by older browsers and we don't want to import polyfill for that
const ALL = Object.keys(AsyncStatus).map(
  key => AsyncStatus[key as keyof typeof AsyncStatus]
);

export function isAsyncStatus(status: any): status is AsyncStatus {
  return ALL.indexOf(status) !== -1;
}
