import styled from "styled-components";

import useCheckInput from "./useCheckInput";

const ModalBackdrop = styled.div`
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

const ModalContainer = styled.div`
  z-index: 10000;
  width: 400px;
  height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px;

  background-color: white;
  border-radius: 15px;
`;

const ModalTitle = styled.h1`
  display: flex;
  font-size: 2.5em;
`;

const ModalMessage = styled.div`
  display: flex;
  font-size: 1.5em;
  line-height: 1.3em;
  color: gray;
  word-wrap: break-word;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const ModalFormTextInput = styled.input`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 2.5em;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: lightgray;
  padding: 0 1em;

  &:focus {
    outline: 1.5px solid darkgray;
  }
`;

interface ActionButtonProps {
  color: "dangerous" | "normal";
}

const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  width: 100%;
  height: 2.5em;
  justify-content: center;
  align-items: center;

  border-radius: 5px;

  --mainColor: ${({ color }) =>
    color === "dangerous" ? "#eb6263" : "darkgray"};

  border: 1px solid var(--mainColor);
  color: var(--mainColor);
  background-color: white;

  &:hover {
    color: white;
    border: none;
    background-color: var(--mainColor);
  }
`;

function Modal({
  action,
  closeModal,
  projectName,
}: {
  action: () => void;
  closeModal: () => void;
  projectName: string;
}) {
  const { onChange, isValid } = useCheckInput(projectName);
  return (
    <ModalBackdrop onClick={closeModal}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalTitle>모집 프로젝트 삭제</ModalTitle>
        <>
          <ModalMessage>
            정말로 이 모집 프로젝트({projectName})를 삭제하시겠습니까? 프로젝트
            삭제는 되돌릴 수 없습니다.
            <br />
            프로젝트를 삭제하려면 프로젝트의 이름을 입력해주세요.
          </ModalMessage>
        </>
        <ModalForm>
          <ModalFormTextInput placeholder={projectName} onChange={onChange} />
          {isValid ? (
            <ActionButton color={"dangerous"} onClick={action}>
              프로젝트 영구 삭제
            </ActionButton>
          ) : (
            <ActionButton color={"normal"} onClick={closeModal}>
              취소
            </ActionButton>
          )}
        </ModalForm>
      </ModalContainer>
    </ModalBackdrop>
  );
}

export default Modal;
