import "./initChartJS";

import { SubTitle } from "chart.js";
import { Line } from "react-chartjs-2";
// import { Link } from "react-router-dom";
import styled from "styled-components";

// import calander from "./assets/calander.png";
import caution from "./assets/caution.png";
import chart from "./assets/chart.png";
import doughnut from "./assets/doughnut.png";
import exclamation from "./assets/exclamation.png";
import manager from "./assets/manager.png";
import plus from "./assets/plus.png";
import profile from "./assets/profile.png";
import profileGrey from "./assets/profileGrey.png";

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
const Management = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 3px;
  border-style: solid;
  border-color: lightgray;
  justify-content: space-around;
  padding: 30px 80px;
`;

const Section = styled.article`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 3px;
  border-style: solid;
  border-color: lightgray;
  justify-content: space-around;
  padding: 12px 20px;
`;

const Status = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 80px;
`;

const Border = styled.div`
  border-right: solid 3px;
  border-right-color: #d2d2d2;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Change = styled.section`
  width: 50px;
  height: 27;
  background-color: #ffdddd;
  border-radius: 20px;
`;

const Trend = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  ${Section} {
    flex: 1;
  }
`;

const Manager = styled.div`
  display: flex;
  flex: 0 0 378px;
  width: 378px;

  ${Section} {
    flex: 1;
  }
`;

const ManagerInfo = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-radius: 5px;
  background: #f2f2f2;
  margin-left: auto;
  width: 100%;

  & h4 {
    color: grey;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "dataset 1",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

// const config = {
//   type: "line",
//   data: data,
//   options: {},
// };

const Applicant = styled.article;
const Dashboard = () => {
  return (
    <Container>
      <Title>
        <h2>프로젝트 관리</h2>
        <h3>DEMO EVENT</h3>
      </Title>
      <StatusContainer>
        <Management>
          <Border>
            <Status>
              <Logo>
                <img src={caution} alt="caution icon" />
                <h3>마감기한</h3>
              </Logo>
              <h2>props</h2>
            </Status>
          </Border>
          <Border>
            <Status>
              <Logo>
                <img src={profile} alt="profile icon" />
                <h3>지원자 수</h3>
              </Logo>
              <h2>props</h2>
              <Change />
            </Status>
          </Border>
          <Border>
            <Status>
              <Logo>
                <img src={doughnut} alt="doughnut icon" />
                <h3>경쟁률</h3>
              </Logo>
              <h2>props</h2>
              <Change />
            </Status>
          </Border>
          <Status>
            <Logo>
              <img src={plus} alt="plus icon" />
              <h3>조회수</h3>
            </Logo>
            <h2>props</h2>
            <Change />
          </Status>
        </Management>
      </StatusContainer>

      <Flex>
        <Trend>
          <Section>
            <Logo>
              <img src={chart} alt="chart icon" />
              <h3>지원자 추이</h3>
            </Logo>
            <div style={{ alignSelf: "center" }}>
              <Line options={options} data={data} />
            </div>
          </Section>
        </Trend>
        <Manager>
          <Section>
            <Logo>
              <img src={manager} alt="manager icon" />
              <h3>관리자 정보</h3>
            </Logo>
            <ManagerInfo>
              <Logo>
                <img src={profileGrey} alt="grey profile icon" />
                <h3>박미솔</h3>
              </Logo>
              <h4>email</h4>
            </ManagerInfo>
            <ManagerInfo>
              <Logo>
                <img src={profileGrey} alt="grey profile icon" />
                <h3>박미솔</h3>
              </Logo>
              <h4>email</h4>
            </ManagerInfo>
          </Section>
        </Manager>
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
