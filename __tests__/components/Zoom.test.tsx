import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Zoom from "../../src/components/Zoom";
import { INITIAL_DISPLAY_SIZE } from "../../src/consts/config";
import "jest-styled-components";

describe("Zoom Component", () => {
  it("renders component correctly", () => {
    render(<Zoom />);
    // 表示サイズが表示されている
    const displaySizeText = screen.getByTestId("display-size");
    expect(displaySizeText).toHaveTextContent(`${INITIAL_DISPLAY_SIZE}%`);
    // -ボタンが表示されている
    expect(screen.getByRole("button", { name: /縮小/i })).toBeInTheDocument();
    // +ボタンが表示されている
    expect(screen.getByRole("button", { name: /拡大/i })).toBeInTheDocument();
    // リセットボタンが表示されている
    expect(
      screen.getByRole("button", { name: /リセット/i })
    ).toBeInTheDocument();
  });
  it("should render with 10% added when zoom-in button is clicked", () => {
    render(<Zoom />);
    // 表示サイズが表示されている
    const displaySizeText = screen.getByTestId("display-size");
    expect(displaySizeText).toHaveTextContent(`${INITIAL_DISPLAY_SIZE}%`);
    // +ボタンをクリック
    userEvent.click(screen.getByRole("button", { name: /拡大/i }));
    // 表示サイズが10%上がっている
    expect(displaySizeText).toHaveTextContent(`${INITIAL_DISPLAY_SIZE + 10}%`);
  });
  it("should render with 10% reduced when 縮小 button is clicked", () => {
    render(<Zoom />);
    // 表示サイズが表示されている
    const displaySizeText = screen.getByTestId("display-size");
    expect(displaySizeText).toHaveTextContent(`${INITIAL_DISPLAY_SIZE}%`);
    // -ボタンをクリック
    userEvent.click(
      screen.getByRole("button", {
        name: /縮小/i,
      })
    );
    // 表示サイズが10%下がっている
    expect(displaySizeText).toHaveTextContent(`${INITIAL_DISPLAY_SIZE - 10}%`);
  });
  it("should render the display size reduced when reset button is clicked", () => {
    render(<Zoom />);
    // 表示サイズが表示されている
    const displaySizeText = screen.getByTestId("display-size");
    expect(displaySizeText).toHaveTextContent(`${INITIAL_DISPLAY_SIZE}%`);
    // -ボタンを2回クリック
    const zoomOutActionButton = screen.getByRole("button", {
      name: /縮小/i,
    });
    userEvent.click(zoomOutActionButton);
    userEvent.click(zoomOutActionButton);
    // 表示サイズが20%下がっている
    expect(displaySizeText).toHaveTextContent(`${INITIAL_DISPLAY_SIZE - 20}%`);
    // リセットボタンをクリック
    userEvent.click(screen.getByRole("button", { name: /リセット/i }));
    // 表示サイズがデフォルト値で表示されている
    expect(displaySizeText).toHaveTextContent(`${INITIAL_DISPLAY_SIZE}%`);
  });
  it("should deactivate the reset button if the display size is the default value", () => {
    render(<Zoom />);
    // リセットボタンが非活性である
    const resetActionButton = screen.getByRole("button", { name: /リセット/i });
    expect(resetActionButton).toBeDisabled();
    // -ボタンをクリック
    userEvent.click(
      screen.getByRole("button", {
        name: /縮小/i,
      })
    );
    expect(resetActionButton).toBeEnabled();
  });
  it("should be alerted if the range of set values is exceeded", () => {
    render(<Zoom />);
    global.alert = jest.fn();
    const displaySizeText = screen.getByTestId("display-size");
    // -ボタンを5回クリック
    const zoomOutActionButton = screen.getByRole("button", {
      name: /縮小/i,
    });
    userEvent.click(zoomOutActionButton);
    userEvent.click(zoomOutActionButton);
    userEvent.click(zoomOutActionButton);
    userEvent.click(zoomOutActionButton);
    expect(displaySizeText).toHaveTextContent(`${INITIAL_DISPLAY_SIZE - 40}%`);
    userEvent.click(zoomOutActionButton);
    // アラートが呼ばれ、かつ表示サイズが変更されない
    expect(global.alert).toHaveBeenCalled();
    expect(displaySizeText).toHaveTextContent(`${INITIAL_DISPLAY_SIZE - 40}%`);
    // 表示サイズリセット
    userEvent.click(screen.getByRole("button", { name: /リセット/i }));
    // +ボタンを3回クリック
    const zoomInActionButton = screen.getByRole("button", { name: /拡大/i });
    userEvent.click(zoomInActionButton);
    userEvent.click(zoomInActionButton);
    expect(displaySizeText).toHaveTextContent(`${INITIAL_DISPLAY_SIZE + 20}%`);
    userEvent.click(zoomInActionButton);
    // アラートが呼ばれ、かつ表示サイズが変更されない
    expect(global.alert).toHaveBeenCalled();
    expect(displaySizeText).toHaveTextContent(`${INITIAL_DISPLAY_SIZE + 20}%`);
  });
});
