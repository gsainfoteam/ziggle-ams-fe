import styled from "styled-components";

const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7em 1.5em;
  background-color: white;
  border: 1px solid #eb6263;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.8em;
  white-space: nowrap;
  color: #eb6263;
  gap: 0.5em;
  &:hover {
    cursor: pointer;
    background-color: #eb6263;
    color: white;
    border: 1px solid none;
  }
  &:active {
    box-shadow: none;
  }
  &:disabled {
    background-color: gray;
    border: none;
    color: white;
    &:hover {
      color: white;
    }
  }
`;

export default ActionButton;
