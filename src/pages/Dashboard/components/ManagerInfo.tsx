import styled from "styled-components";

import manager from "../assets/manager.png";
import profileGrey from "../assets/profileGrey.png";
import { Logo, Section } from "./Common";

const Manager = styled.div`
  display: flex;
  flex: 0 0 378px;
  width: 378px;

  ${Section} {
    flex: 1;
  }
`;
const ManagerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  overflow: auto;
`;
const ManagerInfoCard = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-radius: 5px;
  background: #f2f2f2;
  margin-left: auto;
  width: 100%;
  box-sizing: border-box;
  padding: 5px 8px;

  & h4 {
    color: grey;
  }
`;

const ManagerInfo = () => {
  return (
    <Manager>
      <Section>
        <Logo>
          <img src={manager} alt="manager icon" />
          <h3>관리자 정보</h3>
        </Logo>
        <ManagerList>
          <ManagerInfoCard>
            <Logo>
              <img src={profileGrey} alt="grey profile icon" />
              <h3>Name</h3>
            </Logo>
            <h4>email</h4>
          </ManagerInfoCard>
          <ManagerInfoCard>
            <Logo>
              <img src={profileGrey} alt="grey profile icon" />
              <h3>Name</h3>
            </Logo>
            <h4>email</h4>
          </ManagerInfoCard>
        </ManagerList>
      </Section>
    </Manager>
  );
};

export default ManagerInfo;
