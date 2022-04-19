import styled from "styled-components";
import { ZoomType } from "../types/zoom";

export const ZoomBox = styled.div<{ "scale-correction": number }>`
  background: #252528;
  border: 2px solid #040405;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px 24px;
  box-shadow: 0px 4px 16px 8px rgb(0 0 0 / 20%);
  display: flex;
  align-items: center;
  width: 400px;
  transform-origin: right top;
  transform: scale(${(props) => 1 / props["scale-correction"]});
  margin-top: ${(props) => 2 / props["scale-correction"]}vw;
  margin-right: ${(props) => 2 / props["scale-correction"]}vw;
  @media only screen and (max-width: 390px) {
    width: 90vw;
    padding: 4px 12px;
  }
`;

export const ZoomContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
`;

export const DisplaySizeText = styled.span`
  font-family: inherit;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #e4e7ea;
  @media only screen and (max-width: 390px) {
    font-size: 12px;
  }
`;

export const ZoomSwitchButton = styled.button<{
  "zoom-type": ZoomType;
}>`
  font-family: inherit;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  background: #252528;
  border: none;
  position: relative;
  margin: 0 4px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background 0.2s;
  &:hover {
    cursor: pointer;
    background: #36363a;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 16px;
    height: 2px;
    background-color: #8f969c;
    transform: translate(-50%, -50%);
  }
  &::after {
    display: ${(props) => (props["zoom-type"] === "in" ? "inherit" : "none")};
    transform: ${(props) =>
      props["zoom-type"] === "in"
        ? "translate(-50%, -50%) rotate(90deg)"
        : "translate(-50%, -50%)"};
  }
  @media only screen and (max-width: 390px) {
    width: 24px;
    height: 24px;
    &::before,
    &::after {
      width: 12px;
      height: 2px;
    }
  }
`;

export const ZoomResetButton = styled.button`
  background: #252528;
  border: 3px solid #35383b;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: inherit;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #9cbaee;
  padding: 8px 16px;
  margin-left: 24px;
  transition: background 0.2s;
  &:hover {
    cursor: pointer;
    background: #36363a;
  }
  @media only screen and (max-width: 390px) {
    font-size: 12px;
    margin-left: 12px;
  }
`;

export const Spacer = styled.div`
  flex: 1 1 0%;
  place-self: stretch;
`;
