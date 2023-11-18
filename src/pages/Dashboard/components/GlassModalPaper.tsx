import ModalPaper from "src/pages/Board/components/Modal/ModalPaper";
import styled from "styled-components";

const GlassModalPaper = styled(ModalPaper)`
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(2px);
  border: 1px solid lightgray;

  cursor: default;
`;

export default GlassModalPaper;
