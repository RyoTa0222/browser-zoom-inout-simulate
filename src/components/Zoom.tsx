import { memo } from "react";
import useZoom from "../hooks/useZoom";
import {
  ZoomBox,
  DisplaySizeText,
  ZoomSwitchButton,
  ZoomResetButton,
  Spacer,
} from "../styles/zoom.css";
import { INITIAL_DISPLAY_SIZE } from "../consts/config";

const Zoom = memo(() => {
  const { displaySize, zoomIn, zoomOut, reset } = useZoom();
  return (
    <ZoomBox scale-correction={displaySize / 100}>
      <DisplaySizeText data-testid="display-size">
        {displaySize}%
      </DisplaySizeText>
      <Spacer aria-hidden="true" />
      <ZoomSwitchButton onClick={zoomOut} aria-label="縮小" zoom-type="out">
        -
      </ZoomSwitchButton>
      <ZoomSwitchButton onClick={zoomIn} aria-label="拡大" zoom-type="in">
        +
      </ZoomSwitchButton>
      <ZoomResetButton
        onClick={reset}
        aria-label="リセット"
        disabled={displaySize === INITIAL_DISPLAY_SIZE}
      >
        リセット
      </ZoomResetButton>
    </ZoomBox>
  );
});

export default Zoom;
