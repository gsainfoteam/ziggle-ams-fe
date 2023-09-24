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

const Scroll = styled.div`
  border-radius: 6px;
  background: #f2f2f2;
  height: 377px;

  flex: 1;
  padding: 25px 10px;
  gap: 10px;
  overflow: hidden;
`;
const ApplicationSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  padding: 0 20px;
  gap: 0.5rem;
`;
const ApplicantCard = styled.li`
  display: flex;
  background-color: white;
  flex: 1 0 54px;
  width: 100%;
  border-radius: 5px;
  justify-content: space-between;

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
        <Scroll>
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
        </Scroll>
        <Scroll>
          <GroupSection>
            {[...Array(50)].map((_, index) => {
              return (
                <Group key={index}>
                  <h2>그룹 {index + 1}</h2>
                </Group>
              );
            })}
          </GroupSection>
        </Scroll>
      </Flex>
    </Section>
  );
};

export default ApplicantInfo;
