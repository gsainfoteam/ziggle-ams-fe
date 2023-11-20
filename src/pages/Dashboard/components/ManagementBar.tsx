import { useState } from "react";
import styled from "styled-components";

import arrow from "../assets/arrow.png";
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
  border-radius: 8px;
  border-style: solid;
  border-color: lightgray;
  justify-content: space-around;
  padding: 30px 0;
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
  gap: 1.5em;
`;

const Status = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  color: #656565;
  h2 {
    margin: 0;
    font-size: 2.25rem;
  }
  span {
    display: inline;
    color: #bbb;
    margin: 0;
  }
  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

const Border = styled.div`
  border-right: solid 3px;
  border-right-color: #d2d2d2;
`;

const Change = styled.section`
  border-radius: 13px;
  color: #e04141;
  background-color: #ffdddd;
  img {
    width: 18px;
    height: 18px;
  }

  ${Logo} {
    font-size: 0.8rem;

    h3 {
      margin: 0;
    }
  }
`;

const ManagementBar = () => {
  const [day, setday] = useState(0);
  const [applicant, setApplicant] = useState(0);
  const [rate, setRate] = useState(1);
  const [view, setView] = useState(0);
  return (
    <StatusContainer>
      <Flex>
        <Management>
          <Logo>
            <img src={caution} alt="caution icon" />
            <h3>마감기한</h3>
          </Logo>
          <Status>
            <h2>D - {day}</h2>
          </Status>
        </Management>
        <Border />
        <Management>
          <Logo>
            <img src={profile} alt="profile icon" />
            <h3>지원자 수</h3>
          </Logo>
          <Status>
            <h2>
              {applicant}
              <span> 명</span>
            </h2>
            <Change>
              <Logo>
                <h3></h3>
                <img src={arrow} alt="arrow icon" />
              </Logo>
            </Change>
          </Status>
        </Management>
        <Border />
        <Management>
          <Logo>
            <img src={doughnut} alt="doughnut icon" />
            <h3>경쟁률</h3>
          </Logo>
          <Status>
            <h2>
              {rate}
              <span> : 1</span>
            </h2>
            <Change>
              <Logo>
                <h3> %</h3>
                <img src={arrow} alt="arrow icon" />
              </Logo>
            </Change>
          </Status>
        </Management>
        <Border />
        <Management>
          <Logo>
            <img src={plus} alt="plus icon" />
            <h3>조회수</h3>
          </Logo>
          <Status>
            <h2>
              {view}
              <span> 회</span>
            </h2>
            <Change>
              <Logo>
                <h3></h3>
                <img src={arrow} alt="arrow icon" />
              </Logo>
            </Change>
          </Status>
        </Management>
      </Flex>
    </StatusContainer>
  );
};

export default ManagementBar;
