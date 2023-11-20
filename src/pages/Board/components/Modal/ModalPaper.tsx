import styled from "styled-components";

export const modalPaperWidth = "200px"; // Should be px
export const modalPaperPadding = "20px"; // Should be px

interface ModalPaperProps {
  outline?: boolean;
}

const ModalPaper = styled.div<ModalPaperProps>`
  z-index: 10000;
  width: ${modalPaperWidth};

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: ${modalPaperPadding};

  background-color: white;
  border-radius: 10px;

  ${({ outline = false }) => outline && `border: 1px solid lightgray`}
`;

export default ModalPaper;
