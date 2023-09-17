import styled, { css } from "styled-components";

const Button = styled.button<{
  color?: string;
  shadow?: boolean;
  size?: number;
}>`
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
}: {
  color?: string;
  shadow?: boolean;
  size?: number;
}) {
  return <Button color={color} shadow={shadow} size={size} />;
}

export default CircularButton;
