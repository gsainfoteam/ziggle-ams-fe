import styled from "styled-components";

import chat from "../assets/chat.png";
import emptyBox from "../assets/emptyBox.png";
import exclamation from "../assets/exclamation.png";
import paper from "../assets/paper.png";
import pencil from "../assets/pencil.svg";
import { AddButton, Logo, Section } from "./Common";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 35px;
`;

const Scroll = styled.div`
  border-radius: 6px;
  background: #f2f2f2;
  height: 320px;

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
  gap: 0.5rem;
`;

const ApplicantCard = styled.li`
  display: flex;
  background-color: white;
  flex: 1;
  padding: 10px 0;
  width: 100%;
  border-radius: 5px;
  justify-content: space-between;

  & div {
    font-size: 20px;
  }

  ${Logo} {
    &:first-of-type div {
      font-size: 20px;
      font-weight: 500;
    }
    & img {
      width: 28px;
      height: 28px;
    }
    &:last-of-type img {
      width: 20px;
      height: 20px;
    }
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
  padding: 0 10px;
  flex-direction: column;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
  height: 100%;
  overflow: auto;
  h2 {
    margin: 0.5rem 0;
  }
`;

const GroupTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BaseGroupCard = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 2px;
  gap: 0.5em;
`;

const GroupCard = styled(BaseGroupCard)`
  div {
    margin: 0;
    &:hover {
      border-radius: 3px;
      background: #e9e9e9;
    }
  }

  img {
    width: 15px;
    height: 15px;
  }
`;

const EmptyGroupCard = styled(BaseGroupCard)`
  flex-direction: column;
  align-items: center;
  color: #656565;

  img {
    width: 25px;
    height: 25px;
    opacity: 50%;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  border-radius: 5px;
  border: 2px dashed #bbb;
  align-items: center;
  justify-content: center;
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
            {[...Array(50)].map((_, index) => (
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
            ))}
          </ApplicationSection>
        </Scroll>
        <Scroll>
          <GroupSection>
            {[...Array(9)].map((_, index) => {
              return (
                <Group key={index}>
                  <GroupTitle>
                    <h2>그룹 {index + 1}</h2>
                    <img src={pencil} alt="pencil icon" />
                  </GroupTitle>
                  {[...Array(5)].map((_, index) => {
                    return (
                      <GroupCard key={index}>
                        <img src={paper} alt="paper icon" />
                        <div>응답 타이틀</div>
                      </GroupCard>
                    );
                  })}
                </Group>
              );
            })}
            <Group>
              <h2>그룹</h2>
              <EmptyGroupCard>
                <img src={emptyBox} alt="empty cursor icon" />
                <div>여기에 지원서 정보를 끌어다 놓으세요</div>
              </EmptyGroupCard>
            </Group>
            <ButtonBox>
              <AddButton title="그룹" color="#656565" />
            </ButtonBox>
          </GroupSection>
        </Scroll>
      </Flex>
    </Section>
  );
};

export default ApplicantInfo;
