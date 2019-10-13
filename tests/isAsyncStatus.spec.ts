import AsyncStatus, { isAsyncStatus } from "../src";

describe("isAsyncStatus", () => {
  it("should export isAsyncStatus function", () => {
    expect(isAsyncStatus).toBeInstanceOf(Function);
  });

  it.each([
    [AsyncStatus.IDLE, true],
    [AsyncStatus.PENDING, true],
    [AsyncStatus.RESOLVED, true],
    [AsyncStatus.REJECTED, true],
    [null, false],
    [0, false],
    ["", false],
    [Function, false],
    [{}, false],
    ["IDLE", false]
  ])("should check if %p is an async status (%p)", (...args) => {
    const [candidate, expected] = args;
    expect(isAsyncStatus(candidate)).toEqual(expected);
  });
});
