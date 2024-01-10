import { useEffect, useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { IoClose } from "react-icons/io5";
import { RxDragHandleDots2 } from "react-icons/rx";
import styled from "styled-components";

import GenericWidget, {
  GenericWidgetData,
  GenericWidgetProps,
} from "./GenericWidget";
import { ItemTypes } from "./ItemTypes";

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

const OptionContainer = styled.li`
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 3px;
  padding: 5px 0;
  gap: 10px;
  &:hover {
    background-color: #fce3e3;
  }
  &:focus-within {
    background-color: #fce3e3;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
    opacity: 0;
    pointer-events: none;
  }

  &:active::after {
    opacity: 1;
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

export const defaultChoiceWidgetData: ChoiceWidgetData = {
  id: "",
  widgetType: "Choice",
  required: false,
  min: "1",
  max: "1",
  question: {
    name: "question",
    placeholder: "질문 내용",
    value: "",
  },
  options: [
    {
      name: "option1",
      placeholder: "답변 1",
      value: "",
    },
  ],
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface OptionProps {
  index: number;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  option: { name: string; placeholder: string; value: string };
  onRemoveOption: (e: React.MouseEvent<HTMLElement>) => void;
  reorderOptions: (id: string, dragIndex: number, hoverIndex: number) => void;
}

const Option = (props: OptionProps) => {
  const { index, id, onChange, option, onRemoveOption, reorderOptions } = props;

  const handleRef = useRef<HTMLDivElement>(null);

  const textboxRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textboxRef && textboxRef.current) {
      textboxRef.current.style.height = "auto";
      textboxRef.current.style.height = textboxRef.current.scrollHeight + "px";
    }
  }, [option]);

  const [, drop] = useDrop<DragItem, void, void>({
    accept: ItemTypes.OPTION,
    hover(item: DragItem, monitor) {
      if (!handleRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      const { bottom, top } = handleRef.current.getBoundingClientRect();
      const { y } = monitor.getClientOffset() as XYCoord;
      const hoverMiddleY = (bottom - top) / 2;
      const hoverClientY = y - top;

      if (dragIndex === hoverIndex) return;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      reorderOptions(id, dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag, connect] = useDrag({
    type: ItemTypes.OPTION,
    item: () => ({ id, index }),
  });

  drag(drop(handleRef));

  return (
    <OptionContainer ref={(el) => connect(el)}>
      <div ref={handleRef}>
        <HandleIcon />
      </div>
      <InputContainer>
        <Input id={id} onChange={onChange} ref={textboxRef} {...option} />
        <UnderLineColor />
        <UnderLine />
      </InputContainer>
      <CloseContainer id={id} title={option.name} onClick={onRemoveOption}>
        <CloseIcon />
      </CloseContainer>
    </OptionContainer>
  );
};

export interface ChoiceProps
  extends ChoiceWidgetData,
    Omit<GenericWidgetProps, "widgetType"> {
  key: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddOption: (e: React.MouseEvent<HTMLElement>) => void;
  onRemoveOption: (e: React.MouseEvent<HTMLElement>) => void;
  reorderOptions: (id: string, dragIndex: number, hoverIndex: number) => void;
}

const Choice = (props: ChoiceProps) => {
  const {
    id,
    question,
    options,
    onChange,
    onAddOption,
    onRemoveOption,
    reorderOptions,
    ...rest
  } = props;

  const titleRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
  }, [question]);

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
            <Option
              key={i}
              id={id}
              index={i}
              option={option}
              onChange={onChange}
              onRemoveOption={onRemoveOption}
              reorderOptions={reorderOptions}
            />
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
