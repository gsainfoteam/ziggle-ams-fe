import styled from "styled-components";

const FormWidgetContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.5em;
  font-weight: 700;
  margin-bottom: 10px;
`;

interface textInputProps {
  name: string;
  showLabel?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

const TextInput = styled.input<textInputProps>`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 2.5em;
  border: 1px solid ${({ isValid }) => (isValid ? "lightgray" : "#eb6263")};
  border-radius: 10px;
  background-color: white;
  padding: 0 1em;

  &:focus {
    outline: 1.5px solid darkgray;
  }
`;

function ModalTextInput({
  name,
  showLabel = true,
  placeholder,
  onChange,
  isValid,
}: textInputProps) {
  return (
    <FormWidgetContainer>
      {showLabel && <Label>{name}</Label>}
      <TextInput
        name={name}
        placeholder={placeholder ?? name}
        onChange={onChange}
        isValid={isValid}
      />
    </FormWidgetContainer>
  );
}

export default ModalTextInput;
