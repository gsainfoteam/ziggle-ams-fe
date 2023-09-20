import styled from "styled-components";

import caution from "../assets/caution.png";
import doughnut from "../assets/doughnut.png";
import plus from "../assets/plus.png";
import profile from "../assets/profile.png";
import { Logo } from "./Common";

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

const Change = styled.section`
  width: 50px;
  height: 27;
  background-color: #ffdddd;
  border-radius: 20px;
`;

const ManagementBar = () => {
  return (
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
  );
};

export default ManagementBar;
