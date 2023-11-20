import styled from "styled-components";

const TransparentBackdrop = styled.div`
  position: fixed;
  z-index: 9999;

  display: flex;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  justify-content: center;
  align-items: center;
`;

export default TransparentBackdrop;
