import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  z-index: 9999;

  display: flex;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

export default Backdrop;
