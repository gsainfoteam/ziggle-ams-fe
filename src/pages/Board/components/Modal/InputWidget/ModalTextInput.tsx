import styled from "styled-components";

const FormWidgetContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.8em;
  font-weight: 700;
`;

interface textInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  isValid: boolean;
}

const TextInput = styled.input<textInputProps>`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 2em;
  font-size: 0.8em;
  border: 1px solid ${({ isValid }) => (isValid ? "lightgray" : "#eb6263")};
  border-radius: 5px;
  background-color: white;
  padding: 0 1em;

  &:focus {
    outline: 1.5px solid darkgray;
  }
`;

function ModalTextInput({
  name,
  label,
  placeholder,
  onChange,
  value,
  isValid,
}: textInputProps) {
  return (
    <FormWidgetContainer>
      {label && <Label>{label}</Label>}
      <TextInput
        name={name}
        placeholder={placeholder ?? name}
        onChange={onChange}
        value={value}
        isValid={isValid}
      />
    </FormWidgetContainer>
  );
}

export default ModalTextInput;
