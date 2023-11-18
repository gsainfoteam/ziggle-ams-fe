import styled from "styled-components";

const FloatingModalContainer = styled.div<{
  xPosition: number;
}>`
  position: fixed;
  display: flex;

  left: ${({ xPosition }) => `${xPosition}px`};
  top: 50%;

  transform: translateY(-50%);

  justify-content: center;
  align-items: center;
`;

export default FloatingModalContainer;
