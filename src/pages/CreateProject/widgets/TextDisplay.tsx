import { useEffect, useRef } from "react";
import styled from "styled-components";

import handleIcon from "../assets/handleIcon.svg";
import { WidgetTypes } from "../FormConstructor";

const Handle = styled.div`
  display: flex;
  width: 40px;
  height: 100%;
  background-image: ${`url(${handleIcon})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 15px;
  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #fffafa;
  border: 1px solid #eb6263;
  border-radius: 8px;
  &:has(${Handle}:active) {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px 10px 0;
`;

const Title = styled.div`
  display: flex;
  font-weight: 500;
  color: #2b2b2b;
  margin: 10px 0;
`;

const Content = styled.textarea`
  display: flex;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  margin: 10px 0;
  padding: 1em;
  font-size: 0.8em;
  resize: none;
  overflow-y: hidden;

  &::placeholder {
    color: gray;
    font-weight: 500;
  }
  &:focus {
    outline: none;
    background-color: #fce3e3;
  }
`;

export interface TextDisplayWidgetData {
  id: string;
  widgetType: WidgetTypes.TextDisplay;
  placeholder: string;
  value: string;
}

export interface TextDisplayProps extends TextDisplayWidgetData {
  key: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextDisplay = (props: TextDisplayProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [props.value]);

  return (
    <Container id={props.id}>
      <Handle />
      <ContentSection>
        <Title>텍스트 요소</Title>
        <Content ref={textAreaRef} {...props} />
      </ContentSection>
    </Container>
  );
};

export default TextDisplay;
