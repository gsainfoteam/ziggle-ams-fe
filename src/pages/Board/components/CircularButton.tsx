import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface CircularButtonProps {
  color?: string;
  shadow?: boolean;
  outline?: boolean;
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
  background-color: ${({ color }) => color ?? "white"};
  ${({ outline = false }) => outline && "border: 1px solid darkgray"};
  ${({ shadow = true }) => shadow && "box-shadow: 0 0 5px"};
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  transition: transform 0.2s ease;
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
