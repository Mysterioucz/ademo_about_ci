import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useCounter from "./useCounter";

describe("useCounter", () => {
  it("should initialize with count 0 and val 1", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(1);
  });

  it("should increment count by val when increment is called", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("should increment count by the current val value", () => {
    const { result } = renderHook(() => useCounter());

    // Change val to 5
    act(() => {
      result.current.setVal(5);
    });

    // Increment should add 5 to count
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(5);
  });

  it("should increment multiple times correctly", () => {
    const { result } = renderHook(() => useCounter());

    // Set val to 3
    act(() => {
      result.current.setVal(3);
    });

    // Increment twice
    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(6);
  });

  it("should handle negative val values", () => {
    const { result } = renderHook(() => useCounter());

    // Set val to -2
    act(() => {
      result.current.setVal(-2);
    });

    // Increment should subtract 2 from count
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(-2);
  });

  it("should handle zero val value", () => {
    const { result } = renderHook(() => useCounter());

    // Set val to 0
    act(() => {
      result.current.setVal(0);
    });

    // Increment should not change count
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(0);
  });

  it("should maintain val value after incrementing", () => {
    const { result } = renderHook(() => useCounter());

    // Set val to 7
    act(() => {
      result.current.setVal(7);
    });

    // Increment
    act(() => {
      result.current.increment();
    });

    // Val should remain 7
    expect(result.current.val).toBe(7);
    expect(result.current.count).toBe(7);
  });

  it("should allow changing val multiple times", () => {
    const { result } = renderHook(() => useCounter());

    // Change val multiple times
    act(() => {
      result.current.setVal(10);
    });

    expect(result.current.val).toBe(10);

    act(() => {
      result.current.setVal(20);
    });

    expect(result.current.val).toBe(20);

    // Increment should use the latest val value
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(20);
  });
});
