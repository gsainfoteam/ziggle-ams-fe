import styled from "styled-components";

import chat from "../assets/chat.png";
import exclamation from "../assets/exclamation.png";
import paper from "../assets/paper.png";
import { Logo, Section } from "./Common";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 35px;
`;
const ApplicationSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  background: #f2f2f2;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25) inset;
  height: 377px;
  flex: 1;
  padding: 25px 30px;
  overflow: auto;
  gap: 10px;
`;
const ApplicantCard = styled.li`
  display: flex;
  background-color: white;
  height: 54px;
  width: 100%;
  border-radius: 5px;
  justify-content: space-between;
  padding: 16px;

  & div {
    font-size: 20px;
  }
`;

const Date = styled.div`
  color: #656565;
  font-size: 18px;
`;
const GroupSection = styled(ApplicationSection)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 140px;
`;
const Group = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
  height: 100%;
`;
const ApplicantInfo = () => {
  return (
    <Section>
      <Logo>
        <img src={exclamation} alt="exclamation icon" />
        <h3>지원자 정보</h3>
      </Logo>
      <Flex>
        <ApplicationSection>
          {[...Array(100)].map((_, index) => {
            return (
              <ApplicantCard key={index}>
                <Logo>
                  <img src={paper} alt="paper icon" />
                  <div>학번</div>
                  <div>이름</div>
                </Logo>
                <Logo>
                  <Date>날짜</Date>
                  <img src={chat} alt="chat icon" />
                </Logo>
              </ApplicantCard>
            );
          })}
        </ApplicationSection>
        <GroupSection>
          {[...Array(50)].map((_, index) => {
            return (
              <Group key={index}>
                <h2>그룹 {index + 1}</h2>
              </Group>
            );
          })}
        </GroupSection>
      </Flex>
    </Section>
  );
};

export default ApplicantInfo;
