import styled from "styled-components";

import { WidgetTypes } from "../FormConstructor";

export interface NameInputProps {
  id: string;
  widgetType: WidgetTypes;
  placeholder: string;
  required: boolean;
  value: string;
}

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
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

export const NameInput = (
  props: NameInputProps & {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  },
) => {
  return (
    <Container>
      <Input {...props} />
      <UnderLineColor />
      <UnderLine />
    </Container>
  );
};
