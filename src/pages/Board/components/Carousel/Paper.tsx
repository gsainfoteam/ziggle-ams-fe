import styled from "styled-components";

import { ProjectCardWidth } from "./cssConst";

interface PaperProps {
  focused?: boolean;
  shadow?: boolean;
  outline?: boolean;
}

const Paper = styled.div<PaperProps>`
  --ProjectCardWidth: ${ProjectCardWidth};
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 30px;
  overflow: hidden;
  width: var(--ProjectCardWidth);
  height: 350px;
  border-radius: 10px;
  background-color: white;
  ${({ outline = false }) => outline && "border: 1px solid darkgray"};
  ${({ shadow = true }) => shadow && "box-shadow: 0 0 5px"};
  &:hover {
    box-shadow: 0 0 10px;
    cursor: pointer;
  }
  &:active {
    box-shadow: 0 0 3px;
  }
  transform: ${({ focused = true }) => !focused && "scale(0.8)"};
  transition: transform 1s ease;
`;

export default Paper;
