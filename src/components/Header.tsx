import styled from "styled-components";

const Container = styled.div`
  background-color: #eb6263;
  display: flex;
  padding: 0.5rem 1rem;
  color: white;
`;

const Header = () => {
  return (
    <Container>
      <h1>GIST AMS</h1>
    </Container>
  );
};

export default Header;
