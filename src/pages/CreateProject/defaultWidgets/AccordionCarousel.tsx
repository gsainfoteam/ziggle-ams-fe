import { useState } from "react";
import styled from "styled-components";

import arrowDown from "../assets/arrowDown.svg";
import close from "../assets/close.svg";

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
  --margin-side: 20px;
  --padding: 10px;
  display: flex;
  gap: 20px;
  padding: var(--padding);
  margin: 0 var(--margin-side);
  width: ${`calc(100% - var(--margin-side) * 2 - var(--padding) * 2)`};
  height: 230px;
`;

const CarouselContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #eb626238;
    border-radius: 5px;
  }
`;

const SlideContainer = styled.div`
  display: flex;
  position: absolute;
  margin: 2px 20px;
  gap: 20px;
`;

const Slide = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 200px;
  overflow: hidden;
  background-color: #eb626238;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  outline: ${({ selected }) => selected && "2px solid #eb6263"};
`;

const TemplateName = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8em;
`;

const TemplateImage = styled.img`
  display: flex;
  overflow: hidden;
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
  &:disabled {
    background-color: gray;
    border: none;
    color: white;
    &:hover {
      color: white;
    }
  }
`;

export interface AccordionCarouselWidgetData {
  id: string;
  widgetType: "AccordionCarousel";
  required: boolean;
  templates: {
    name: string;
    imagePath: string;
  }[];
  selectedTemplate: string | null;
}

export interface AccordionCarouselProps extends AccordionCarouselWidgetData {
  key: number;
  onChange: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDeleteWidget: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const AccordionCarousel = (props: AccordionCarouselProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id, templates, selectedTemplate, onChange, onDeleteWidget } = props;

  const toggle = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  return (
    <Container id={id}>
      <HeadSection>
        <Wrapper onClick={toggle}>
          <Arrow isExpanded={isExpanded} />
          <Title>📚 템플릿으로 빠르게 시작하기</Title>
        </Wrapper>
        <Close id={id} onClick={onDeleteWidget} />
      </HeadSection>
      {isExpanded && (
        <>
          <ContentSection>
            <CarouselContainer>
              <SlideContainer>
                {templates.map((template, i) => (
                  <Slide
                    key={i}
                    id={id}
                    title={template.name}
                    onClick={onChange}
                    selected={template.name === selectedTemplate}
                  >
                    <TemplateName>{template.name}</TemplateName>
                    <TemplateImage src={template.imagePath} draggable={false} />
                  </Slide>
                ))}
              </SlideContainer>
            </CarouselContainer>
          </ContentSection>
          <ActionSection>
            <ActionButton disabled={!selectedTemplate}>
              {selectedTemplate ?? "📚"} 템플릿 불러오기
            </ActionButton>
          </ActionSection>
        </>
      )}
    </Container>
  );
};

export default AccordionCarousel;
