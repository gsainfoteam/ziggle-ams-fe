import styled from "styled-components";

import ModalTextInput from "./InputWidget/ModalTextInput";
import useTextInputs from "./InputWidget/useTextInputs";

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

const Container = styled.div`
  z-index: 10000;
  width: 400px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 40px;

  background-color: white;
  border-radius: 15px;
`;

const WidgetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 2em;
  line-height: normal;
  margin: 0;
`;

const Description = styled.div`
  display: flex;

  margin-top: 20px;

  font-size: 1em;

  color: gray;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
`;

const ActionButton = styled.button`
  display: flex;
  width: 100%;
  height: 2.7em;
  padding: 0 1.5em;
  justify-content: center;
  align-items: center;

  font-weight: 700;

  border-radius: 10px;

  color: white;
  border: none;
  background-color: #eb6263;

  &:hover {
    cursor: pointer;
    color: #eb6263;
    border: 1px solid #eb6263;
    background-color: white;
  }
`;

const CancelButton = styled(ActionButton)`
  background-color: lightgray;
  &:hover {
    cursor: pointer;
    color: lightgray;
    border: 1px solid lightgray;
  }
`;

function Modal({
  title,
  action,
  actionName,
  closeModal,
  description,
  textInputProps,
}: {
  title: string;
  action: () => void;
  actionName: string;
  closeModal: () => void;
  description?: string;
  textInputProps: {
    name: string;
    showLabel?: boolean;
    placeholder?: string;
    regex?: RegExp;
    required?: boolean;
  }[];
}) {
  const { inputs, onChange } = useTextInputs(
    textInputProps.map(({ name, regex, required }) => ({
      name,
      regex,
      required,
    })),
  );
  return (
    <Backdrop onClick={closeModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        <WidgetsContainer>
          {description && <Description>{description}</Description>}
          <Form>
            {textInputProps.map(({ name, showLabel, placeholder }) => (
              <ModalTextInput
                key={name}
                name={name}
                showLabel={showLabel}
                placeholder={placeholder}
                onChange={onChange}
                isValid={inputs[name].isValid}
              />
            ))}
            <ButtonContainer>
              <CancelButton onClick={closeModal}>취소</CancelButton>
              <ActionButton
                type="submit"
                onClick={action}
                disabled={
                  !Object.values(inputs).reduce(
                    (acc, { isValid }) => acc && isValid,
                    true,
                  )
                }
              >
                {actionName}
              </ActionButton>
            </ButtonContainer>
          </Form>
        </WidgetsContainer>
      </Container>
    </Backdrop>
  );
}

export default Modal;
