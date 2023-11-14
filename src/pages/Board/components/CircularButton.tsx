import styled from "styled-components";

interface CircularButtonProps {
  color?: string;
  outline?: boolean;
  size?: number;
}

const CircularButton = styled.button<CircularButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size ?? 50}px;
  height: ${({ size }) => size ?? 50}px;
  border-radius: 50%;
  border: none;
  background-color: ${({ color }) => color ?? "white"};
  ${({ outline = false }) => outline && "border: 1px solid darkgray"};
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  transition: transform 0.2s ease;
`;

export default CircularButton;
