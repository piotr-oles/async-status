type AsyncStatus = undefined | "PENDING" | "RESOLVED" | "REJECTED";

namespace AsyncStatus {
  export const IDLE: AsyncStatus = undefined;
  export const PENDING: AsyncStatus = "PENDING";
  export const RESOLVED: AsyncStatus = "RESOLVED";
  export const REJECTED: AsyncStatus = "REJECTED";

  export type IDLE = undefined;
  export type PENDING = "PENDING";
  export type RESOLVED = "RESOLVED";
  export type REJECTED = "REJECTED";

  export function all(...statuses: AsyncStatus[]): AsyncStatus {
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

/**
 * Configure namespace property descriptors.
 */
const STATUS_DESCRIPTOR: PropertyDescriptor = {
  enumerable: true,
  writable: false
};
const METHOD_DESCRIPTOR: PropertyDescriptor = {
  enumerable: false,
  writable: false
};
Object.defineProperties(AsyncStatus, {
  IDLE: STATUS_DESCRIPTOR,
  PENDING: STATUS_DESCRIPTOR,
  RESOLVED: STATUS_DESCRIPTOR,
  REJECTED: STATUS_DESCRIPTOR,
  all: METHOD_DESCRIPTOR
});

export { AsyncStatus };
