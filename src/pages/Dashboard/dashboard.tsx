// import calander from "./assets/calander.png";
import styled from "styled-components";

import exclamation from "./assets/exclamation.png";
import ApplicantTrend from "./components/ApplicantTrend";
import { Logo, Section } from "./components/Common";
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
const ApplicantInfo = styled.div``;
const Applicant = styled.li`
  background-color: white;
  height: 54px;
  border-radius: 5px;
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
      <Section>
        <Logo>
          <img src={exclamation} alt="exclamation icon" />
          <h3>지원자 정보</h3>
        </Logo>
        <ApplicantInfo>
          <Applicant></Applicant>
        </ApplicantInfo>
      </Section>
    </Container>
  );
};

export default Dashboard;
