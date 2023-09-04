import { Outlet } from "react-router";
import Header from "src/components/Header";
import styled from "styled-components";

const Container = styled.div``;

const MainLayout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};

export default MainLayout;
