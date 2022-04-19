import useZoom from "../../src/hooks/useZoom";
import { act, renderHook } from "@testing-library/react-hooks";
import { INITIAL_DISPLAY_SIZE } from "../../src/consts/config";

describe("useZoom", () => {
  it("Should increment the value by 10", () => {
    const { result } = renderHook(() => useZoom());
    // 表示サイズが初期値
    expect(result.current.displaySize).toBe(INITIAL_DISPLAY_SIZE);
    // zoomIn
    act(() => result.current.zoomIn());
    expect(result.current.displaySize).toBe(INITIAL_DISPLAY_SIZE + 10);
  });
  it("Should decrement the value by 10", () => {
    const { result } = renderHook(() => useZoom());
    // 表示サイズが初期値
    expect(result.current.displaySize).toBe(INITIAL_DISPLAY_SIZE);
    // zoomIn
    act(() => result.current.zoomOut());
    expect(result.current.displaySize).toBe(INITIAL_DISPLAY_SIZE - 10);
  });
  it("Should reset the value to 100", () => {
    const { result } = renderHook(() => useZoom());
    // 表示サイズが初期値
    expect(result.current.displaySize).toBe(INITIAL_DISPLAY_SIZE);
    // zoomIn x 2
    act(() => result.current.zoomIn());
    act(() => result.current.zoomIn());
    expect(result.current.displaySize).toBe(INITIAL_DISPLAY_SIZE + 20);
    // reset
    act(() => result.current.reset());
    expect(result.current.displaySize).toBe(INITIAL_DISPLAY_SIZE);
  });
});
