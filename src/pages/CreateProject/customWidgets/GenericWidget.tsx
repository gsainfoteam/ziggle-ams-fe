import React, { useEffect, useRef, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RiTriangleFill } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import { RxDividerVertical } from "react-icons/rx";
import styled from "styled-components";

import widgetIcon from "../assets/TextDisplay.png";

const Handle = styled(RxDragHandleDots2)`
  display: flex;
  width: 20px;
  margin: 0 5px;
  color: gray;
  height: 100%;

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
  &:focus-within {
    outline: 1px solid #eb6263;
  }
`;

const MainContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 10px 20px 10px 0;
`;

const HeadSection = styled.div`
  display: flex;
  width: 100%;
  min-height: 1.6em;
  justify-content: space-between;
  gap: 10px;
`;

const HeadContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const SelectionSection = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  position: relative;
  justify-content: center;
  height: 100%;
`;

const WidgetSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  background-color: white;
  box-sizing: content-box;
  padding: 0.2em 1em;
  font-weight: 700;
  font-size: 0.8em;
  line-height: 1.6em;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    background-color: #fce3e3;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 5px;
  overflow: hidden;
  ${WidgetSelect}:not(:first-child) {
    border-top: 1px solid lightgray;
  }
`;

const TriangleIcon = styled(RiTriangleFill)<{ $isDropDownActive: boolean }>`
  display: flex;
  width: 0.6em;
  color: gray;
  transform: ${({ $isDropDownActive }) =>
    $isDropDownActive ? "rotate(0deg)" : "rotate(180deg)"};
  transition: transform 0.3s;
`;

const WidgetIcon = styled.img`
  display: flex;
  width: 0.8em;
  height: 0.8em;
`;

const Controls = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  gap: 10px;
  color: gray;
  font-size: 0.7em;
  line-height: 1em;
  font-weight: 500;
`;

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 5px;
`;

const DeleteIcon = styled(IoTrashOutline)`
  display: flex;
  height: 1em;
  color: gray;
  &:hover {
    color: #eb6263;
    cursor: pointer;
    animation: shake 0.15s infinite linear;
  }
  @keyframes shake {
    0% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(5deg);
    }
  }
`;

const VerticalDivider = styled(RxDividerVertical)`
  display: flex;
  height: 1em;
  color: gray;
`;

const ToggleSwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 2em;
  height: 1em;
`;

const ToggleSwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightgray;
  border-radius: 0.5em;
  transition: 0.4s;
  &:before {
    position: absolute;
    content: "";
    height: calc(1em - 2 * 1px);
    width: calc(1em - 2 * 1px);
    left: 1px;
    bottom: 1px;
    border-radius: 50%;
    background-color: white;
    transition: 0.4s;
  }
`;

const ToggleSwitch = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  &:checked + ${ToggleSwitchSlider}::before {
    transform: translateX(calc(2em - 2 * 1px - (1em - 2 * 1px)));
    background-color: #eb6263;
  }
`;

const NumInput = styled.input.attrs({ type: "number" })`
  display: flex;
  width: 3em;
  height: 1em;
  border: 1px solid lightgray;
  border-radius: 3px;
  text-align: center;
  &:focus {
    border: 1px solid #eb6263;
    outline: 1px solid #eb6263;
  }
`;

export const customWidgets = {
  TextDisplay: "안내문",
  dlsakj: "1",
  askdj: "2",
};

export interface GenericWidgetData {
  id: string;
  widgetType: string;
  required: boolean | null;
  min: string | null;
  max: string | null;
}

export interface GenericWidgetProps extends GenericWidgetData {
  onToggleRequired: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteWidget: (e: React.MouseEvent<HTMLElement>) => void;
  onMinMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWidgetTypeChange: (e: React.MouseEvent<HTMLElement>) => void;
}

const GenericWidget = (
  props: GenericWidgetProps & {
    TitleComponent?: React.ReactNode;
    ContentComponent?: React.ReactNode;
  },
) => {
  const [isDropDownActive, setIsDropDownActive] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownActive((isDropDownActive) => !isDropDownActive);
  };

  const {
    TitleComponent,
    ContentComponent,
    id,
    widgetType,
    required,
    onToggleRequired,
    min,
    max,
    onMinMaxChange,
    onWidgetTypeChange,
    onDeleteWidget,
  } = props;

  const widgetSelectionRef = useRef<HTMLDivElement>(null);
  const selectionSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectionSectionRef.current) {
      selectionSectionRef.current.style.width = `calc(${
        widgetSelectionRef.current?.getBoundingClientRect().width
      }px + 1em)`;
    }
  }, [widgetSelectionRef]);

  return (
    <Container id={id}>
      <Handle />
      <MainContainer>
        <HeadSection>
          <HeadContent>{TitleComponent}</HeadContent>
          <SelectionSection ref={selectionSectionRef}>
            <SelectWrapper ref={widgetSelectionRef}>
              <WidgetSelect onClick={toggleDropDown}>
                <WidgetIcon src={widgetIcon} />
                {customWidgets[widgetType as keyof typeof customWidgets]}
                <TriangleIcon $isDropDownActive={isDropDownActive} />
              </WidgetSelect>
              {isDropDownActive &&
                Object.entries(customWidgets)
                  .filter((widget) => widget[0] !== widgetType)
                  .map((widget, i) => (
                    <WidgetSelect
                      key={i}
                      id={id}
                      title={widget[1]}
                      onClick={(e: React.MouseEvent<HTMLElement>) => {
                        onWidgetTypeChange(e);
                        toggleDropDown();
                      }}
                    >
                      <WidgetIcon src={widgetIcon} />
                      {widget[1]}
                    </WidgetSelect>
                  ))}
            </SelectWrapper>
          </SelectionSection>
        </HeadSection>
        {ContentComponent}
        <Controls>
          {required !== null && (
            <ControlContainer id={id}>
              필수
              <ToggleSwitchLabel>
                <ToggleSwitch
                  id={id}
                  checked={required}
                  onChange={onToggleRequired}
                />
                <ToggleSwitchSlider />
              </ToggleSwitchLabel>
            </ControlContainer>
          )}
          {min && (
            <ControlContainer>
              최소 선택
              <NumInput
                id={id}
                min={1}
                max={max ? (parseInt(max) - 1).toString() : undefined}
                placeholder={min}
                name="min"
                value={min}
                onChange={onMinMaxChange}
              />
              개
            </ControlContainer>
          )}
          {max && (
            <ControlContainer>
              최대 선택
              <NumInput
                id={id}
                min={min ?? 1}
                placeholder={max}
                name="max"
                value={max}
                onChange={onMinMaxChange}
              />
              개
            </ControlContainer>
          )}
          {required !== null && <VerticalDivider />}
          <ControlContainer id={id} onClick={onDeleteWidget}>
            위젯 삭제
            <DeleteIcon />
          </ControlContainer>
        </Controls>
      </MainContainer>
    </Container>
  );
};

export default GenericWidget;
