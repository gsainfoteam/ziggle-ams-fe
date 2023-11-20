import styled from "styled-components";

import ApplicantInfo from "./components/ApplicantInfo";
import ApplicantTrend from "./components/ApplicantTrend";
import Calendar from "./components/Calendar";
import ManagementBar from "./components/ManagementBar";
import ManagerInfo from "./components/ManagerInfo";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
`;
const Title = styled.h2`
  margin-top: 60px;
  gap: 10px;
  font-size: 30px;

  h3 {
    display: inline;
    color: gray;
    margin: 0;
    font-size: 0.8em;
  }
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
        프로젝트 관리 <h3>Project Name</h3>
      </Title>
      <ManagementBar></ManagementBar>
      <Flex>
        <ApplicantTrend></ApplicantTrend>
        <ManagerInfo></ManagerInfo>
      </Flex>
      <ApplicantInfo></ApplicantInfo>
      <Calendar />
    </Container>
  );
};

export default Dashboard;
