import { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

export interface CircularButtonProps {
  color?: string;
  shadow?: boolean;
  size?: number;
}

const Button = styled.button<CircularButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size ?? 50}px;
  height: ${({ size }) => size ?? 50}px;
  border-radius: 50%;
  border: none;
  background-color: ${({ color }) => color || "white"};
  &:hover {
    cursor: pointer;
  }
  ${({ shadow = true }) =>
    shadow
      ? css`
          box-shadow: 0 0 5px;
          &:hover {
            box-shadow: 0 0 10px;
          }
          &:active {
            box-shadow: 0 0 3px;
          }
        `
      : css`
          box-shadow: none;
        `}
`;

function CircularButton({
  color,
  shadow,
  size,
  ...props
}: CircularButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <Button color={color} shadow={shadow} size={size} {...props} />;
}

export default CircularButton;
