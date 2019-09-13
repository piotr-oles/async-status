export type AsyncStatus = undefined | "PENDING" | "RESOLVED" | "REJECTED";

const IDLE: AsyncStatus = undefined;
const PENDING: AsyncStatus = "PENDING";
const RESOLVED: AsyncStatus = "RESOLVED";
const REJECTED: AsyncStatus = "REJECTED";

interface AsyncStatusAPI {
  IDLE: AsyncStatus;
  PENDING: AsyncStatus;
  RESOLVED: AsyncStatus;
  REJECTED: AsyncStatus;

  all: (...statuses: AsyncStatus[]) => AsyncStatus;
}

export const AsyncStatus = {} as AsyncStatusAPI;

/**
 * Define API properties to make statuses enumerable and API immutable
 */
Object.defineProperties(AsyncStatus, {
  IDLE: {
    value: IDLE,
    enumerable: true
  },
  PENDING: {
    value: PENDING,
    enumerable: true
  },
  RESOLVED: {
    value: RESOLVED,
    enumerable: true
  },
  REJECTED: {
    value: REJECTED,
    enumerable: true
  },
  all: {
    value: function all(...statuses: AsyncStatus[]): AsyncStatus {
      // for empty list of statuses return idle as it's starting status
      if (statuses.length === 0) {
        return IDLE;
      }

      // if at least one status is rejected/pending, return this status.
      for (const status of [REJECTED, PENDING]) {
        if (statuses.indexOf(status) !== -1) {
          return status;
        }
      }

      // if all statuses are resolved, return resolved
      if (statuses.every(status => status === RESOLVED)) {
        return RESOLVED;
      }

      // in other case, return idle
      return IDLE;
    }
  }
});
