import styled from "styled-components";

import caution from "../assets/caution.png";
import doughnut from "../assets/doughnut.png";
import plus from "../assets/plus.png";
import profile from "../assets/profile.png";
import { Logo } from "./Common";

const StatusContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  border-radius: 3px;
  border-style: solid;
  border-color: lightgray;
  justify-content: space-around;
  padding: 30px 80px;
`;

const Flex = styled.div`
  display: flex;
`;

const Management = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 0px 10px;
`;

const Status = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

const Border = styled.div`
  border-right: solid 3px;
  border-right-color: #d2d2d2;
`;

const Change = styled.section`
  width: 50px;
  height: 27;
  background-color: #ffdddd;
  border-radius: 13px;
  width: 58px;
  height: 27px;
`;

const ManagementBar = () => {
  return (
    <StatusContainer>
      <Flex>
        <Management>
          <Logo>
            <img src={caution} alt="caution icon" />
            <h3>마감기한</h3>
          </Logo>
          <Status>
            <h2>props</h2>
          </Status>
        </Management>
        <Border />
        <Management>
          <Logo>
            <img src={profile} alt="profile icon" />
            <h3>지원자 수</h3>
          </Logo>
          <Status>
            <h2>props</h2>
            <Change />
          </Status>
        </Management>
        <Border />
        <Management>
          <Logo>
            <img src={doughnut} alt="doughnut icon" />
            <h3>경쟁률</h3>
          </Logo>
          <Status>
            <h2>props</h2>
            <Change />
          </Status>
        </Management>
        <Border />
        <Management>
          <Logo>
            <img src={plus} alt="plus icon" />
            <h3>조회수</h3>
          </Logo>
          <Status>
            <h2>props</h2>
            <Change />
          </Status>
        </Management>
      </Flex>
    </StatusContainer>
  );
};

export default ManagementBar;
