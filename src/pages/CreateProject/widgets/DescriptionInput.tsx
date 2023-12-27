import styled from "styled-components";

import { NameInput, NameInputProps } from "./NameInput";

export type DescriptionInputProps = NameInputProps;

const DescriptionInput = styled(NameInput)`
  border-bottom: 2px solid lightgray;
  font-size: 1.2em;
`;

export default DescriptionInput;
