import { useEffect, useRef } from "react";
import styled from "styled-components";

import GenericWidget, {
  GenericWidgetData,
  GenericWidgetProps,
} from "./GenericWidget";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  font-size: 1em;
`;

const UnderLine = styled.div`
  display: flex;
  position: absolute;
  bottom: -1px;
  width: 100%;
  height: 1px;
  background-color: lightgray;
`;

const UnderLineColor = styled(UnderLine)`
  z-index: 1;
  background-color: #eb6263;
  width: 0;
  transition: width 0.5s;
`;

const Input = styled.textarea`
  display: flex;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 0;
  font-size: 1em;
  line-height: 1.2em;
  resize: none;
  overflow-y: hidden;
  height: 1.2em;

  &::placeholder {
    color: gray;
    font-weight: 500;
  }
  &:focus {
    outline: none;
  }

  &:focus ~ ${UnderLineColor} {
    width: 100%;
  }
`;

export interface CautionWidgetData extends GenericWidgetData {
  widgetType: "Caution";
  placeholder: string;
  value: string;
}

export const defaultCautionWidgetData: CautionWidgetData = {
  id: "",
  widgetType: "Caution",
  placeholder: "⚠️ 주의사항 텍스트 입력 ⚠️",
  value: "",
  required: null,
  min: null,
  max: null,
};
export interface CutionProps
  extends CautionWidgetData,
    Omit<GenericWidgetProps, "widgetType"> {
  key: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Caution = (props: CutionProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [props.value]);

  const { value, placeholder, onChange, id, ...rest } = props;

  return (
    <GenericWidget
      id={id}
      {...rest}
      TitleComponent={
        <Container id={id}>
          <Input
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            ref={textAreaRef}
          />
          <UnderLineColor />
          <UnderLine />
        </Container>
      }
    ></GenericWidget>
  );
};

export default Caution;
