import styled, { css } from "styled-components";

export interface CircularButtonProps {
  color?: string;
  shadow?: boolean;
  size?: number;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = styled.button<CircularButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size }) =>
    size
      ? css`
          width: ${size}px;
          height: ${size}px;
        `
      : css`
          width: 50px;
          height: 50px;
        `}
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
  onClick,
  children,
}: CircularButtonProps) {
  return (
    <Button color={color} shadow={shadow} size={size} onClick={onClick}>
      {children}
    </Button>
  );
}

export default CircularButton;
