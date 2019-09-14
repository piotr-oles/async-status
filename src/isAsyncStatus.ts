import { AsyncStatus } from "./AsyncStatus";

const ALL = [
  AsyncStatus.IDLE,
  AsyncStatus.PENDING,
  AsyncStatus.RESOLVED,
  AsyncStatus.REJECTED
];

export function isAsyncStatus(candidate: any): candidate is AsyncStatus {
  return ALL.indexOf(candidate) !== -1;
}
