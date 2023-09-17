import styled, { css } from "styled-components";

import CircularButton from "./CircularButton";
import { ProjectCardWidth } from "./cssConst";

const Paper = styled.div<{ ProjectCardWidth: string; focused: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 30px;
  overflow: hidden;
  width: ${({ ProjectCardWidth }) => ProjectCardWidth};
  height: 350px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid darkgray;
  &:hover {
    box-shadow: 0 0 5px;
    cursor: pointer;
  }
  &:active {
    box-shadow: 0 0 2px;
  }
  ${({ focused }) => {
    if (!focused) {
      return css`
        transform: scale(0.8);
      `;
    }
  }}
  transition: transform 1s ease;
`;

function AddProjectCard({ focused }: { focused: boolean }) {
  return (
    <Paper ProjectCardWidth={ProjectCardWidth} focused={focused}>
      <>
        <h1>새 모집 프로젝트 시작하기</h1>
        <CircularButton color={"lightgray"} shadow={false} />
      </>
    </Paper>
  );
}

export default AddProjectCard;
