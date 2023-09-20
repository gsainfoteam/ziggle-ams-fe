// import calander from "./assets/calander.png";
import styled from "styled-components";

import ApplicantInfo from "./components/ApplicantInfo";
import ApplicantTrend from "./components/ApplicantTrend";
import ManagementBar from "./components/ManagementBar";
import ManagerInfo from "./components/ManagerInfo";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
`;
const Title = styled.div`
  display: flex;
  justify-content: left;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Dashboard = () => {
  return (
    <Container>
      <Title>
        <h2>프로젝트 관리</h2>
        <h3>DEMO EVENT</h3>
      </Title>
      <ManagementBar></ManagementBar>
      <Flex>
        <ApplicantTrend></ApplicantTrend>
        <ManagerInfo></ManagerInfo>
      </Flex>
      <ApplicantInfo></ApplicantInfo>
    </Container>
  );
};

export default Dashboard;
