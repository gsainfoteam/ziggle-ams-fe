import { Outlet } from "react-router";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1 0 0;
`;

const MainLayout = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Container>
  );
};

export default MainLayout;
