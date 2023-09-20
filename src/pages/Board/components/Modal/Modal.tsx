import styled from "styled-components";

const ModalBackdrop = styled.div`
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
const ModalContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 10px;
  border: none;
  padding: 20px;
`;

interface modalProps {
  onExitModal: () => void;
  onAcceptModal: () => void;
}

function Modal({ onExitModal, onAcceptModal }: modalProps) {
  return (
    <ModalBackdrop onClick={onExitModal}>
      <ModalContainer>
        <div>
          <h1>Are you sure that you want to delete the project?</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "50px",
            }}
          >
            <button onClick={onAcceptModal}>YES</button>
            <button onClick={onExitModal}>NO</button>
          </div>
        </div>
      </ModalContainer>
    </ModalBackdrop>
  );
}

export default Modal;
