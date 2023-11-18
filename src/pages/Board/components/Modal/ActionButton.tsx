import styled from "styled-components";

const ActionButton = styled.button`
  display: flex;
  width: 100%;
  height: 2.2em;
  padding: 0 1.5em;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 0.6em;

  border-radius: 5px;

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

export default ActionButton;
