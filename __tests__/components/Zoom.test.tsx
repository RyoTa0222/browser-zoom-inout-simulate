import { render, screen, fireEvent } from "@testing-library/react";
import Zoom from "../../src/components/Zoom";
import { INITIAL_DISPLAY_SIZE } from "../../src/consts/config";
import "jest-styled-components";

describe("Zoom Component", () => {
  let container: HTMLElement | null;
  beforeEach(() => {
    container = render(<Zoom />).container;
  });
  afterEach(() => {
    if (container) {
      container.remove();
      container = null;
    }
  });
  it("renders component correctly", () => {
    // 表示サイズが表示されている
    const displaySizeText = screen.getByTestId("display-size");
    expect(displaySizeText.textContent).toBe(`${INITIAL_DISPLAY_SIZE}%`);
    // -ボタンが表示されている
    const zoomOutActionButton = screen.getByTestId("zoom-out-action-button");
    expect(zoomOutActionButton).toBeInTheDocument();
    // +ボタンが表示されている
    const zoomInActionButton = screen.getByTestId("zoom-in-action-button");
    expect(zoomInActionButton).toBeInTheDocument();
    // +ボタンが表示されている
    const resetActionButton = screen.getByTestId("reset-action-button");
    expect(resetActionButton).toBeInTheDocument();
  });
  it("should render with 10% added when zoom-in button is clicked", () => {
    // 表示サイズが表示されている
    const displaySizeText = screen.getByTestId("display-size");
    expect(displaySizeText.textContent).toBe(`${INITIAL_DISPLAY_SIZE}%`);
    // +ボタンをクリック
    const zoomInActionButton = screen.getByTestId("zoom-in-action-button");
    fireEvent.click(zoomInActionButton);
    // 表示サイズが10%上がっている
    expect(displaySizeText.textContent).toBe(`${INITIAL_DISPLAY_SIZE + 10}%`);
  });
  it("should render with 10% reduced when zoom-out button is clicked", () => {
    // 表示サイズが表示されている
    const displaySizeText = screen.getByTestId("display-size");
    expect(displaySizeText.textContent).toBe(`${INITIAL_DISPLAY_SIZE}%`);
    // -ボタンをクリック
    const zoomOutActionButton = screen.getByTestId("zoom-out-action-button");
    fireEvent.click(zoomOutActionButton);
    // 表示サイズが10%下がっている
    expect(displaySizeText.textContent).toBe(`${INITIAL_DISPLAY_SIZE - 10}%`);
  });
  it("should render the display size reduced when reset button is clicked", () => {
    // 表示サイズが表示されている
    const displaySizeText = screen.getByTestId("display-size");
    expect(displaySizeText.textContent).toBe(`${INITIAL_DISPLAY_SIZE}%`);
    // -ボタンを2回クリック
    const zoomOutActionButton = screen.getByTestId("zoom-out-action-button");
    fireEvent.click(zoomOutActionButton);
    fireEvent.click(zoomOutActionButton);
    // 表示サイズが20%下がっている
    expect(displaySizeText.textContent).toBe(`${INITIAL_DISPLAY_SIZE - 20}%`);
    // リセットボタンをクリック
    const resetActionButton = screen.getByTestId("reset-action-button");
    fireEvent.click(resetActionButton);
    // 表示サイズがデフォルト値で表示されている
    expect(displaySizeText.textContent).toBe(`${INITIAL_DISPLAY_SIZE}%`);
  });
  it("should deactivate the reset button if the display size is the default value", () => {
    // リセットボタンが非活性である
    const resetActionButton = screen.getByTestId("reset-action-button");
    expect(resetActionButton).toBeDisabled();
    // -ボタンをクリック
    const zoomOutActionButton = screen.getByTestId("zoom-out-action-button");
    fireEvent.click(zoomOutActionButton);
    expect(resetActionButton).not.toBeDisabled();
  });
  it("should be alerted if the range of set values is exceeded", () => {
    global.alert = jest.fn();
    const displaySizeText = screen.getByTestId("display-size");
    // -ボタンを5回クリック
    const zoomOutActionButton = screen.getByTestId("zoom-out-action-button");
    fireEvent.click(zoomOutActionButton);
    fireEvent.click(zoomOutActionButton);
    fireEvent.click(zoomOutActionButton);
    fireEvent.click(zoomOutActionButton);
    expect(displaySizeText.textContent).toBe(`${INITIAL_DISPLAY_SIZE - 40}%`);
    fireEvent.click(zoomOutActionButton);
    // アラートが呼ばれ、かつ表示サイズが変更されない
    expect(global.alert).toHaveBeenCalled();
    expect(displaySizeText.textContent).toBe(`${INITIAL_DISPLAY_SIZE - 40}%`);
    // 表示サイズリセット
    const resetActionButton = screen.getByTestId("reset-action-button");
    fireEvent.click(resetActionButton);
    // +ボタンを3回クリック
    const zoomInActionButton = screen.getByTestId("zoom-in-action-button");
    fireEvent.click(zoomInActionButton);
    fireEvent.click(zoomInActionButton);
    expect(displaySizeText.textContent).toBe(`${INITIAL_DISPLAY_SIZE + 20}%`);
    fireEvent.click(zoomInActionButton);
    // アラートが呼ばれ、かつ表示サイズが変更されない
    expect(global.alert).toHaveBeenCalled();
    expect(displaySizeText.textContent).toBe(`${INITIAL_DISPLAY_SIZE + 20}%`);
  });
});
