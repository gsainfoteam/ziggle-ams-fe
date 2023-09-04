import { Outlet } from "react-router";
import styled from "styled-components";

const Container = styled.div``;

const MainLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default MainLayout;
