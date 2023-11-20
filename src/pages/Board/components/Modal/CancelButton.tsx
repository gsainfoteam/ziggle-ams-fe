import styled from "styled-components";

import ActionButton from "./ActionButton";

const CancelButton = styled(ActionButton)`
  background-color: lightgray;
  &:hover {
    cursor: pointer;
    color: lightgray;
    border: 1px solid lightgray;
  }
`;

export default CancelButton;
