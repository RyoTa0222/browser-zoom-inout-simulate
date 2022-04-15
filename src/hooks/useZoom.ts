import { useEffect, useState, useCallback } from "react";
import { ZoomType } from "../types/zoom";
import {
  SCALE_INTERVAL,
  MINIMUM_ZOOM_RATIO,
  MAXIMUM_ZOOM_RATIO,
  ALERT_MESSAGE,
  INITIAL_DISPLAY_SIZE,
} from "../consts/config";

export type UseZoom = {
  displaySize: number;
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
};

const useZoom = (): UseZoom => {
  const [displaySize, setDisplaySize] = useState(INITIAL_DISPLAY_SIZE);
  /**
   * 拡大する
   */
  const zoomIn = useCallback(() => {
    const canResize = checkCanResize("in");
    // リサイズできない場合はアラートを出して終了
    if (!canResize) {
      alert(ALERT_MESSAGE);
      return;
    }
    // リサイズ後のディスプレイサイズ
    const resizedDispSize = displaySize + SCALE_INTERVAL;
    // リサイズ処理
    resize(resizedDispSize);
    // 値の更新
    setDisplaySize(resizedDispSize);
  }, [displaySize]);
  /**
   * 縮小する
   */
  const zoomOut = useCallback(() => {
    const canResize = checkCanResize("out");
    // リサイズできない場合はアラートを出して終了
    if (!canResize) {
      alert(ALERT_MESSAGE);
      return;
    }
    // リサイズ後のディスプレイサイズ
    const resizedDispSize = displaySize - SCALE_INTERVAL;
    // リサイズ処理
    resize(resizedDispSize);
    // 値の更新
    setDisplaySize(resizedDispSize);
  }, [displaySize]);
  /**
   * リセットする
   */
  const reset = useCallback(() => {
    // リサイズ後のディスプレイサイズ
    const resizedDispSize = 100;
    // リサイズ処理
    resize(resizedDispSize);
    // 値の更新
    setDisplaySize(resizedDispSize);
  }, [displaySize]);
  /**
   * リサイズ処理を行う
   *
   * @param {number} resizedSizePercentage リサイズ後の幅（%）
   */
  const resize = useCallback((resizedSizePercentage: number) => {
    // リサイズ後のディスプレイサイズの割合
    const resizedDispSizeRatio = resizedSizePercentage / 100;
    // リサイズ後のディスプレイサイズの割合の逆数
    const reciprocalResizedDispSizeRatio = 1 / resizedDispSizeRatio;
    // html要素のCSSを変更
    document.documentElement.style.transform = `scale(${resizedDispSizeRatio})`;
    document.documentElement.style.width = `${
      reciprocalResizedDispSizeRatio * 100
    }vw`;
    // !リサイズができない箇所がある場合は適宜追加（以下、例）
    // const main = document.getElementsByTagName("main");
    // main[0].style.width = `${reciprocalResizedDispSizeRatio * 100}vw`;
  }, []);
  /**
   * リサイズ可能かどうか
   *
   * @param {ZoomType} type リサイズのタイプ（inは拡大、outは縮小）
   * @returns {boolean} trueなら拡縮可能
   */
  const checkCanResize = useCallback(
    (type: ZoomType) => {
      // 拡大の場合ズーム率が最大値を超えていた場合何もしない
      if (type === "in" && displaySize >= MAXIMUM_ZOOM_RATIO) {
        return false;
      }
      // 縮小の場合ズーム率が最大値を超えていた場合何もしない
      if (type === "out" && displaySize <= MINIMUM_ZOOM_RATIO) {
        return false;
      }
      return true;
    },
    [displaySize]
  );
  useEffect(() => {
    document.documentElement.style.transformOrigin = "top left";
  }, []);
  return {
    displaySize,
    zoomIn,
    zoomOut,
    reset,
  };
};

export default useZoom;
