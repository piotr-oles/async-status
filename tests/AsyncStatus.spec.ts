import AsyncStatus from "../src";

describe("AsyncStatus", () => {
  it("should export AsyncStatus object which has enumerable and immutable statuses", () => {
    const ALL = Object.values(AsyncStatus);

    expect(ALL).toEqual([undefined, "PENDING", "RESOLVED", "REJECTED"]);
    expect(() => {
      AsyncStatus.IDLE = "PENDING";
    }).toThrow();
    expect(() => {
      AsyncStatus.PENDING = "RESOLVED";
    }).toThrow();
    expect(() => {
      AsyncStatus.RESOLVED = "REJECTED";
    }).toThrow();
    expect(() => {
      AsyncStatus.REJECTED = undefined;
    }).toThrow();
    expect(AsyncStatus.IDLE).toBeUndefined();
    expect(AsyncStatus.PENDING).toEqual("PENDING");
    expect(AsyncStatus.RESOLVED).toEqual("RESOLVED");
    expect(AsyncStatus.REJECTED).toEqual("REJECTED");
  });

  it("should export AsyncStatus object which has immutable method all", () => {
    expect(AsyncStatus.all).toBeInstanceOf(Function);
    expect(() => {
      AsyncStatus.all = () => undefined;
    }).toThrow();
  });

  it.each([
    [
      [
        AsyncStatus.PENDING,
        AsyncStatus.IDLE,
        AsyncStatus.REJECTED,
        AsyncStatus.RESOLVED
      ],
      AsyncStatus.REJECTED
    ],
    [
      [
        AsyncStatus.PENDING,
        AsyncStatus.IDLE,
        AsyncStatus.IDLE,
        AsyncStatus.RESOLVED
      ],
      AsyncStatus.PENDING
    ],
    [
      [
        AsyncStatus.IDLE,
        AsyncStatus.IDLE,
        AsyncStatus.IDLE,
        AsyncStatus.RESOLVED
      ],
      AsyncStatus.IDLE
    ],
    [
      [
        AsyncStatus.RESOLVED,
        AsyncStatus.RESOLVED,
        AsyncStatus.RESOLVED,
        AsyncStatus.RESOLVED
      ],
      AsyncStatus.RESOLVED
    ],
    [
      [AsyncStatus.IDLE, AsyncStatus.IDLE, AsyncStatus.IDLE, AsyncStatus.IDLE],
      AsyncStatus.IDLE
    ],
    [[], AsyncStatus.IDLE],
    [[AsyncStatus.REJECTED], AsyncStatus.REJECTED],
    [[AsyncStatus.RESOLVED], AsyncStatus.RESOLVED]
  ])(
    "should compose many statuses (%p) into one (%p)",
    (statuses, expectedStatus) => {
      expect(AsyncStatus.all(...(statuses as AsyncStatus[]))).toEqual(
        expectedStatus
      );
    }
  );
});
