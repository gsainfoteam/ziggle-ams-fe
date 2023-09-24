import styled from "styled-components";

export const Section = styled.article`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 3px;
  border-style: solid;
  border-color: lightgray;
  justify-content: space-around;
  padding: 12px 20px;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  padding: 0 10px;
  gap: 14px;

  h3 {
    margin: 0;
  }
`;
