import { useState } from "react";
import styled from "styled-components";

import arrowDown from "../assets/arrowDown.svg";
import close from "../assets/close.svg";
import ziggleImage from "../assets/ziggle.png";
import { WidgetTypes } from "../FormConstructor";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fce3e3;
  border-radius: 8px;
  transition: height 0.3s;
`;

const HeadSection = styled.div`
  display: flex;
  align-items: center;
  height: 2em;
  gap: 1em;
  margin: 10px 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Arrow = styled.img.attrs({ src: arrowDown })<{ isExpanded: boolean }>`
  display: flex;
  width: 1.2em;
  transform: ${({ isExpanded }) => isExpanded && `rotate(180deg)`};
  transition: transform 0.3s;
`;

const Title = styled.div`
  display: flex;
  font-weight: 700;
`;

const Close = styled.img.attrs({ src: close })`
  width: 1.2em;
  &:hover {
    cursor: pointer;
  }
`;

const ContentSection = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  margin: 0 20px;
`;

const Image = styled.img`
  display: flex;
  width: 250px;
  border-radius: 5px;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const ActionButton = styled.button`
  display: flex;
  padding: 0.7em 1.5em;
  background-color: white;
  border: 1px solid #eb6263;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.8em;
  color: #eb6263;
  &:hover {
    cursor: pointer;
    background-color: #eb6263;
    color: white;
    border: 1px solid none;
  }
  &:active {
    box-shadow: none;
  }
`;

export interface AccordionInfoWidgetData {
  id: string;
  widgetType: WidgetTypes.AccordionInfo;
}

interface AccordionInfoProps extends AccordionInfoWidgetData {
  onDeleteWidget: (e: React.MouseEvent<HTMLElement>) => void;
}

const AccordionInfo = (props: AccordionInfoProps) => {
  const { id, onDeleteWidget } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  return (
    <Container id={id}>
      <HeadSection>
        <Wrapper onClick={toggle}>
          <Arrow isExpanded={isExpanded} />
          <Title>🔥 혹시 지글(Ziggle)에 공지를 올리셨나요?</Title>
        </Wrapper>
        <Close id={id} onClick={onDeleteWidget} />
      </HeadSection>
      {isExpanded && (
        <>
          <ContentSection>
            <Image src={ziggleImage} />
            <Text>
              지글(Ziggle)은 지스트대학 통합 공지 및 단체 홍보, 모집
              서비스입니다. 여러분은 Ziggle에 모집 공고, 행사 홍보를 위한 글을
              사진과 함께 작성할 수 있습니다. 지글은 지스트 학생이라면 누구나
              이용 가능하고, 뛰어난 접근성을 갖추고 있습니다. 지금 바로 Ziggle에
              공지를 작성해보세요!
            </Text>
          </ContentSection>
          <ActionSection>
            <ActionButton>🔥지글(Ziggle)에 공지 작성하기</ActionButton>
          </ActionSection>
        </>
      )}
    </Container>
  );
};

export default AccordionInfo;
