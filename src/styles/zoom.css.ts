import styled from "styled-components";
import { ZoomType } from "../types/zoom";

export const ZoomBox = styled.div<{ "scale-correction": number }>`
  background: #252528;
  border: 0.12vw solid #040405;
  box-sizing: border-box;
  border-radius: 0.4vw;
  padding: 0.4vw 1vw;
  box-shadow: 0px 0.4vw 1vw 0.4vw rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  width: 32vw;
  max-width: 300px;
  transform-origin: right top;
  transform: scale(${(props) => 1 / props["scale-correction"]});
  margin-top: ${(props) => 2 / props["scale-correction"]}vw;
  margin-right: ${(props) => 2 / props["scale-correction"]}vw;
  @media only screen and (max-width: 820px) {
    width: 50vw;
    max-width: 400px;
    padding: 1vw 1.6vw;
    border-radius: 1vw;
  }
  @media only screen and (max-width: 390px) {
    width: 60vw;
    max-width: 500px;
    padding: 1.2vw 2vw;
    border-radius: 1.2vw;
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
  font-size: 0.9vw;
  color: #e4e7ea;
  @media only screen and (max-width: 820px) {
    font-size: 2vw;
  }
  @media only screen and (max-width: 390px) {
    font-size: 3vw;
  }
`;

export const ZoomSwitchButton = styled.button<{
  "zoom-type": ZoomType;
}>`
  font-family: inherit;
  font-style: normal;
  font-weight: 700;
  font-size: 0;
  background: #252528;
  border: none;
  position: relative;
  margin: 0 0.4vw;
  width: 2vw;
  height: 2vw;
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
    width: 1vw;
    height: 0.2vw;
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
  @media only screen and (max-width: 820px) {
    margin: 0 0.6vw;
    width: 3.2vw;
    height: 3.2vw;
    &::before,
    &::after {
      width: 1.6vw;
      height: 0.3vw;
    }
  }
  @media only screen and (max-width: 390px) {
    margin: 0 1.2vw;
    width: 4vw;
    height: 4vw;
    &::before,
    &::after {
      width: 3vw;
      height: 0.6vw;
    }
  }
`;

export const ZoomResetButton = styled.button`
  background: #252528;
  border: 0.2vw solid #35383b;
  box-sizing: border-box;
  border-radius: 0.4vw;
  font-family: inherit;
  font-style: normal;
  font-weight: 700;
  font-size: 1vw;
  color: #9cbaee;
  padding: 0.8vw 1.2vw;
  margin-left: 1vw;
  transition: background 0.2s;
  &:hover {
    cursor: pointer;
    background: #36363a;
  }
  @media only screen and (max-width: 820px) {
    font-size: 1.4vw;
    border-width: 0.3vw;
    margin-left: 2vw;
    padding: 0.8vw 2vw;
  }
  @media only screen and (max-width: 390px) {
    font-size: 3vw;
    border-width: 0.6vw;
    margin-left: 3vw;
    padding: 0.8vw 2vw;
  }
`;

export const Spacer = styled.div`
  flex: 1 1 0%;
  place-self: stretch;
`;
