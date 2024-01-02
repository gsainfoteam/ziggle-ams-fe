import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { RxDragHandleDots2 } from "react-icons/rx";
import styled from "styled-components";

import GenericWidget, {
  GenericWidgetData,
  GenericWidgetProps,
} from "./GenericWidget";

const TitleContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  font-size: 1em;
  line-height: 1.2em;
`;

const InputContainer = styled(TitleContainer)`
  font-size: 0.8em;
  line-height: 1em;
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

const Input = styled.textarea.attrs({ rows: 1 })`
  display: flex;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 0;
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

const OptionsList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  list-style: none;
  gap: 5px;
`;

const HandleIcon = styled(RxDragHandleDots2)`
  color: gray;
  width: 20px;
  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing;
  }
`;

const Option = styled.li`
  display: flex;
  border-radius: 3px;
  padding: 5px 0;
  gap: 10px;
  &:hover {
    background-color: #fce3e3;
  }
  &:focus-within {
    background-color: #fce3e3;
  }
  &:has(${HandleIcon}:active) {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
  }
`;

const CloseContainer = styled.div`
  display: flex;
`;

const CloseIcon = styled(IoClose)`
  color: gray;
  &:hover {
    cursor: pointer;
    color: #eb6263;
  }
`;

const AddOption = styled.div`
  display: flex;
  color: gray;
  font-size: 0.8em;
  border: none;
  border-radius: 3px;
  padding: 0.2em 0;
  width: fit-content;
  margin-left: 28px;
  &:hover {
    cursor: pointer;
    background-color: #fce3e3;
  }
`;

export interface ChoiceWidgetData extends GenericWidgetData {
  widgetType: "Choice";
  question: {
    name: "question";
    placeholder: string;
    value: string;
  };
  options: {
    name: string;
    placeholder: string;
    value: string;
  }[];
}

export interface ChoiceProps
  extends ChoiceWidgetData,
    Omit<GenericWidgetProps, "widgetType"> {
  key: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddOption: (e: React.MouseEvent<HTMLElement>) => void;
  onRemoveOption: (e: React.MouseEvent<HTMLElement>) => void;
}

const Choice = (props: ChoiceProps) => {
  const {
    id,
    question,
    options,
    onChange,
    onAddOption,
    onRemoveOption,
    ...rest
  } = props;

  const titleRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
  }, [question]);

  const textboxRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    textboxRefs.current = textboxRefs.current.slice(0, options.length);

    textboxRefs.current.forEach((textboxRef) => {
      if (textboxRef) {
        textboxRef.style.height = "auto";
        textboxRef.style.height = textboxRef.scrollHeight + "px";
      }
    });
  }, [options]);

  return (
    <GenericWidget
      id={id}
      {...rest}
      TitleComponent={
        <TitleContainer>
          <Input id={id} onChange={onChange} ref={titleRef} {...question} />
          <UnderLineColor />
          <UnderLine />
        </TitleContainer>
      }
      ContentComponent={
        <OptionsList>
          {options.map((option, i) => (
            <Option key={i}>
              <HandleIcon />
              <InputContainer>
                <Input
                  id={id}
                  onChange={onChange}
                  ref={(el) => (textboxRefs.current[i] = el)}
                  {...option}
                />
                <UnderLineColor />
                <UnderLine />
              </InputContainer>
              <CloseContainer
                id={id}
                title={option.name}
                onClick={onRemoveOption}
              >
                <CloseIcon />
              </CloseContainer>
            </Option>
          ))}
          <AddOption id={id} onClick={onAddOption}>
            옵션 추가
          </AddOption>
        </OptionsList>
      }
    />
  );
};

export default Choice;
