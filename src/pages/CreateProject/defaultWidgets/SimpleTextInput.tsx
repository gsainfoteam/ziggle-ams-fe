import styled from "styled-components";

const Container = styled.div<{ size: string }>`
  display: flex;
  position: relative;
  flex-direction: column;
  font-size: ${({ size }) => size};
`;

const UnderLine = styled.div`
  display: flex;
  position: absolute;
  bottom: -3px;
  width: 100%;
  height: 3px;
  background-color: lightgray;
`;

const UnderLineColor = styled(UnderLine)`
  z-index: 1;
  background-color: #eb6263;
  width: 0;
  transition: width 0.5s;
`;

const Input = styled.input`
  width: 100%;
  height: fit-content;

  border: none;

  font-size: 2em;
  font-weight: 700;
  outline: none;

  &::placeholder {
    color: gray;
  }

  &:focus ~ ${UnderLineColor} {
    width: 100%;
  }
`;

type Unit = "px" | "em" | "rem";

export interface SimpleTextInputWidgetData {
  id: string;
  widgetType: "SimpleTextInput";
  required: boolean;
  size: `${number}${Unit}`;
  placeholder: string;
  value: string;
}

export interface SimpleTextInputProps extends SimpleTextInputWidgetData {
  key: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SimpleTextInput = (props: SimpleTextInputProps) => {
  const { id, size, placeholder, value, onChange } = props;

  return (
    <Container id={id} size={size}>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <UnderLineColor />
      <UnderLine />
    </Container>
  );
};

export default SimpleTextInput;
