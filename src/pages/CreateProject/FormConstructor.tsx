import React, { useReducer } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import Action from "./actionTypes";
import AddElementButton from "./AddElementButton";
import Caution, {
  CautionWidgetData,
  defaultCautionWidgetData,
} from "./customWidgets/Caution";
import Choice, {
  ChoiceWidgetData,
  defaultChoiceWidgetData,
} from "./customWidgets/Choice";
import { GenericWidgetData } from "./customWidgets/GenericWidget";
import TextAnswer, {
  defaultTextAnswerWidgetData,
  TextAnswerWidgetData,
} from "./customWidgets/TextAnswer";
import TextDisplay, {
  defaultTextDisplayWidgetData,
  TextDisplayWidgetData,
} from "./customWidgets/TextDisplay";
import AccordionCarousel, {
  AccordionCarouselWidgetData,
} from "./defaultWidgets/AccordionCarousel";
import AccordionInfo, {
  AccordionInfoWidgetData,
} from "./defaultWidgets/AccordionInfo";
import DurationInput, {
  DurationInputWidgetData,
} from "./defaultWidgets/DurationInput";
import RecruitNumInput, {
  RecruitNumInputWidgetData,
} from "./defaultWidgets/RecruitNumInput";
import SimpleTextInput, {
  SimpleTextInputWidgetData,
} from "./defaultWidgets/SimpleTextInput";
import { Paper } from "./styles";
import SubmitButton from "./SubmitButton";
import templates from "./templates";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ActionSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Divider = styled.div`
  display: flex;
  background-color: lightgray;
  width: 100%;
  height: 2px;
`;

export type WidgetData =
  | SimpleTextInputWidgetData
  | DurationInputWidgetData
  | RecruitNumInputWidgetData
  | AccordionInfoWidgetData
  | AccordionCarouselWidgetData
  | TextDisplayWidgetData
  | ChoiceWidgetData
  | TextAnswerWidgetData
  | CautionWidgetData;

function reducer(state: WidgetData[], action: Action) {
  switch (action.actionType) {
    case "SimpleTextInputAction":
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...widget,
              value: action.value,
            }
          : widget,
      );
    case "DurationInputAction":
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...widget,
              [action.target]: {
                ...(widget as DurationInputWidgetData)[action.target],
                value: action.value,
              },
            }
          : widget,
      );
    case "RecruitNumInputAction":
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...widget,
              [action.target]: action.value,
            }
          : widget,
      );
    case "AccordionCarouselAction":
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...widget,
              selectedTemplate: action.selected,
            }
          : widget,
      );
    case "TextDisplayAction":
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...widget,
              value: action.value,
            }
          : widget,
      );
    case "ChoiceEditAction":
      return state.map((widget) =>
        widget.id === action.id
          ? action.targetName === "question"
            ? {
                ...widget,
                question: {
                  ...(widget as ChoiceWidgetData).question,
                  value: action.value,
                },
              }
            : {
                ...widget,
                options: (widget as ChoiceWidgetData).options.map((option) =>
                  option.name === action.targetName
                    ? { ...option, value: action.value }
                    : option,
                ),
              }
          : widget,
      );
    case "ChoiceAddOptionAction":
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...widget,
              max: ((widget as ChoiceWidgetData).options.length + 1).toString(),
              options: (widget as ChoiceWidgetData).options
                .concat({
                  name: "",
                  placeholder: "",
                  value: "",
                })
                .map((option, i) => ({
                  ...option,
                  name: `option${i + 1}`,
                  placeholder: `답변 ${i + 1}`,
                })),
            }
          : widget,
      );
    case "ChoiceRemoveOptionAction":
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...widget,
              max: ((widget as ChoiceWidgetData).options.length - 1).toString(),
              options: (widget as ChoiceWidgetData).options
                .filter(({ name }) => name !== action.targetName)
                .map((option, i) => ({ ...option, max: `답변 ${i + 1}` })),
            }
          : widget,
      );
    case "TextAnswerEditAction":
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...widget,
              value: action.value,
            }
          : widget,
      );
    case "CautionEditAction":
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...widget,
              value: action.value,
            }
          : widget,
      );
    case "DeleteWidgetAction":
      return state.filter((widget) => widget.id !== action.id);
    case "ToggleRequiredAction":
      return state.map((widget) =>
        widget.id === action.id
          ? { ...widget, required: !widget.required }
          : widget,
      );
    case "ChangeMinMaxAction":
      return state.map((widget) => {
        if (widget.id === action.id) {
          const changedWidget = {
            ...widget,
            [action.minOrMax]: action.value,
          };
          if (
            parseInt((changedWidget as GenericWidgetData).min ?? "1") <=
            parseInt((changedWidget as GenericWidgetData).max ?? "9999")
          )
            return changedWidget;
          else return widget;
        } else return widget;
      });
    case "ChangeWidgetTypeAction":
      return state.map((widget) => {
        const id = uuidv4();
        if (widget.id === action.id) {
          switch (action.targetWidgetType) {
            case "TextDisplay":
              return { ...defaultTextDisplayWidgetData, id: id };
            case "Choice":
              return { ...defaultChoiceWidgetData, id: id };
            case "TextAnswer":
              return { ...defaultTextAnswerWidgetData, id: id };
            case "Caution":
              return { ...defaultCautionWidgetData, id: id };
            default:
              return widget;
          }
        } else {
          return widget;
        }
      });
    case "ApplyTemplateAction":
      return (
        templates[
          (
            state.filter(
              (widget) => widget.widgetType === "AccordionCarousel",
            )[0] as AccordionCarouselWidgetData
          ).selectedTemplate ?? "default"
        ] ?? state
      );
    case "AddElementAction":
      return state.concat({
        id: uuidv4(),
        widgetType: "TextAnswer",
        placeholder: "주관식 질문",
        value: "",
        required: false,
        min: null,
        max: null,
      } as TextAnswerWidgetData);
    default:
      throw new Error("UnImplemented action!");
  }
}

const FormConstructor = () => {
  const [formData, dispatch] = useReducer(reducer, templates.default);

  const onSimpleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      actionType: "SimpleTextInputAction",
      id: e.target.id,
      value: e.target.value,
    });
  };

  const onDurationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      actionType: "DurationInputAction",
      id: e.target.id,
      target: e.target.name as "start" | "end",
      value: e.target.value,
    });
  };

  const onRecruitNumInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      actionType: "RecruitNumInputAction",
      id: e.target.id,
      target: e.target.name as "isNoLimit" | "recruitNum",
      value:
        (e.target.name as "isNoLimit" | "recruitNum") === "isNoLimit"
          ? e.target.checked
          : e.target.value,
    });
  };

  const onAccordionCarouselChange = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      actionType: "AccordionCarouselAction",
      id: e.currentTarget.id,
      selected: e.currentTarget.title,
    });
  };

  const onTextDisplayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      actionType: "TextDisplayAction",
      id: e.target.id,
      value: e.target.value,
    });
  };

  const onDeleteWidget = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      actionType: "DeleteWidgetAction",
      id: e.currentTarget.id,
    });
  };

  const onToggleRequired = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      actionType: "ToggleRequiredAction",
      id: e.currentTarget.id,
    });
  };

  const onMinMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      actionType: "ChangeMinMaxAction",
      id: e.currentTarget.id,
      minOrMax: e.currentTarget.name as "min" | "max",
      value: e.currentTarget.value,
    });
  };

  const onWidgetTypeChange = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      actionType: "ChangeWidgetTypeAction",
      id: e.currentTarget.id,
      targetWidgetType: e.currentTarget.title,
    });
  };

  const onChoiceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      actionType: "ChoiceEditAction",
      id: e.target.id,
      targetName: e.target.name,
      value: e.target.value,
    });
  };

  const onAddOption = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      actionType: "ChoiceAddOptionAction",
      id: e.currentTarget.id,
    });
  };

  const onRemoveOption = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      actionType: "ChoiceRemoveOptionAction",
      id: e.currentTarget.id,
      targetName: e.currentTarget.title,
    });
  };

  const onTextAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      actionType: "TextAnswerEditAction",
      id: e.target.id,
      value: e.target.value,
    });
  };

  const onCautionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      actionType: "CautionEditAction",
      id: e.target.id,
      value: e.target.value,
    });
  };

  const onApplyTemplate = () => {
    dispatch({
      actionType: "ApplyTemplateAction",
    });
  };

  const onAddElement = () => {
    dispatch({
      actionType: "AddElementAction",
    });
  };

  return (
    <Wrapper>
      <Paper>
        {formData.map((widgetData, i) => {
          switch (widgetData.widgetType) {
            case "SimpleTextInput":
              return (
                <SimpleTextInput
                  {...widgetData}
                  onChange={onSimpleTextInputChange}
                  key={i}
                />
              );
            case "DurationInput":
              return (
                <DurationInput
                  {...widgetData}
                  onChange={onDurationInputChange}
                  key={i}
                />
              );
            case "RecruitNumInput":
              return (
                <RecruitNumInput
                  {...widgetData}
                  onChange={onRecruitNumInputChange}
                  key={i}
                />
              );
            case "AccordionInfo":
              return (
                <AccordionInfo
                  {...widgetData}
                  onDeleteWidget={onDeleteWidget}
                  key={i}
                />
              );
            case "AccordionCarousel":
              return (
                <AccordionCarousel
                  {...widgetData}
                  onChange={onAccordionCarouselChange}
                  onDeleteWidget={onDeleteWidget}
                  onApplyTemplate={onApplyTemplate}
                  key={i}
                />
              );
            case "TextDisplay":
              return (
                <TextDisplay
                  {...widgetData}
                  onToggleRequired={onToggleRequired}
                  onMinMaxChange={onMinMaxChange}
                  onWidgetTypeChange={onWidgetTypeChange}
                  onDeleteWidget={onDeleteWidget}
                  onChange={onTextDisplayChange}
                  key={i}
                />
              );
            case "Choice":
              return (
                <Choice
                  {...widgetData}
                  onToggleRequired={onToggleRequired}
                  onMinMaxChange={onMinMaxChange}
                  onWidgetTypeChange={onWidgetTypeChange}
                  onDeleteWidget={onDeleteWidget}
                  onChange={onChoiceChange}
                  onAddOption={onAddOption}
                  onRemoveOption={onRemoveOption}
                  key={i}
                />
              );
            case "TextAnswer":
              return (
                <TextAnswer
                  {...widgetData}
                  onToggleRequired={onToggleRequired}
                  onMinMaxChange={onMinMaxChange}
                  onWidgetTypeChange={onWidgetTypeChange}
                  onDeleteWidget={onDeleteWidget}
                  onChange={onTextAnswerChange}
                  key={i}
                />
              );
            case "Caution":
              return (
                <Caution
                  {...widgetData}
                  onToggleRequired={onToggleRequired}
                  onMinMaxChange={onMinMaxChange}
                  onWidgetTypeChange={onWidgetTypeChange}
                  onDeleteWidget={onDeleteWidget}
                  onChange={onCautionChange}
                  key={i}
                />
              );
            default:
              throw new Error("Unimplemented widget!");
          }
        })}
        <ActionSection>
          <Divider />
          <AddElementButton onAddElement={onAddElement} />
          <SubmitButton />
          <Divider />
        </ActionSection>
      </Paper>
    </Wrapper>
  );
};

export default FormConstructor;
