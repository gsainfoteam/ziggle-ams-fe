import styled from "styled-components";

import { ProjectCardWidth } from "./cssConst";

interface PaperProps {
  focused?: boolean;
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
  height: 640px;
  border-radius: 10px;
  background-color: white;
  ${({ outline = false }) => outline && "border: 1px solid darkgray"};
  transform: ${({ focused = true }) => !focused && "scale(0.8)"};
  transition: transform 0.5s ease;

  &:hover {
    cursor: pointer;
  }
`;

export default Paper;
