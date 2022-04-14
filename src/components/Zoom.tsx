import { memo } from "react";
import useZoom from "../hooks/useZoom";
import {
  ZoomBox,
  DisplaySizeText,
  ZoomSwitchButton,
  ZoomResetButton,
  Spacer,
} from "../styles/zoom.css";

const Zoom = memo(() => {
  const [displaySize, func] = useZoom();
  return (
    <ZoomBox scale-correction={displaySize / 100}>
      <DisplaySizeText>{displaySize}%</DisplaySizeText>
      <Spacer aria-hidden="true" />
      <ZoomSwitchButton
        onClick={func.zoomOut}
        aria-label="縮小"
        zoom-type="out"
      >
        -
      </ZoomSwitchButton>
      <ZoomSwitchButton onClick={func.zoomIn} aria-label="拡大" zoom-type="in">
        +
      </ZoomSwitchButton>
      <ZoomResetButton onClick={func.reset} aria-label="リセット">
        リセット
      </ZoomResetButton>
    </ZoomBox>
  );
});

export default Zoom;
