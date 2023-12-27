import styled from "styled-components";

import { WidgetTypes } from "../FormConstructor";

export interface NameInputProps {
  id: string;
  widgetType: WidgetTypes;
  placeholder: string;
  required: boolean;
  value: string;
}

export const NameInput = styled.input<NameInputProps>`
  width: 100%;
  height: fit-content;

  border: none;
  border-bottom: 3px solid
    ${({ value }) => (value === "" ? "#EB6263" : "lightgray")};

  font-size: 2em;
  font-weight: 700;
  outline: none;

  &::placeholder {
    color: gray;
  }
`;
