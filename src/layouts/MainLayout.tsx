import { Outlet } from "react-router";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: #f5f5f5;
  justify-content: center;
`;
const Main = styled.main`
  width: 100vw;
  max-width: 1340px;
  padding: 0 20px;
`;

const MainLayout = () => {
  return (
    <Container>
      <Header />
      <Wrapper>
        <Main>
          <Outlet />
        </Main>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default MainLayout;
