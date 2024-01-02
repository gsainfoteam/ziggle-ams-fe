import React, { useReducer } from "react";
import styled from "styled-components";

import Caution, { CautionWidgetData } from "./customWidgets/Caution";
import Choice, { ChoiceWidgetData } from "./customWidgets/Choice";
import { GenericWidgetData } from "./customWidgets/GenericWidget";
import TextAnswer, { TextAnswerWidgetData } from "./customWidgets/TextAnswer";
import TextDisplay, {
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
import Paper from "./Paper";
import templates from "./templates";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
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

interface SimpleTextInputAction {
  id: string;
  widgetType: "SimpleTextInput";
  value: string;
}

interface DurationInputAction {
  id: string;
  widgetType: "DurationInput";
  target: "start" | "end";
  value: string;
}

interface RecruitNumInputAction {
  id: string;
  widgetType: "RecruitNumInput";
  target: "isNoLimit" | "recruitNum";
  value: boolean | string;
}

interface AccordionCarouselAction {
  id: string;
  widgetType: "AccordionCarousel";
  selected: string | null;
}

interface TextDisplayAction {
  id: string;
  widgetType: "TextDisplay";
  value: string;
}

interface DeleteWidgetAction {
  id: string;
  widgetType: null;
  actionType: "deleteWidget";
}

interface ToggleRequiredAction {
  id: string;
  widgetType: null;
  actionType: "toggleRequired";
}

interface ChangeMinMaxAction {
  id: string;
  widgetType: null;
  actionType: "changeMinMax";
  minOrMax: "min" | "max";
  value: string;
}

interface ChangeWidgetTypeAction {
  id: string;
  widgetType: null;
  actionType: "changeWidgetType";
  targetWidgetType: string;
}

interface ChoiceEditAction {
  id: string;
  widgetType: "Choice";
  actionType: "Edit";
  targetName: string;
  value: string;
}

interface ChoiceAddOptionAction {
  id: string;
  widgetType: "Choice";
  actionType: "Add";
}

interface ChoiceRemoveOptionAction {
  id: string;
  widgetType: "Choice";
  actionType: "Remove";
  targetName: string;
}

interface TextAnswerEditAction {
  id: string;
  widgetType: "TextAnswer";
  value: string;
}

interface CautionEditAction {
  id: string;
  widgetType: "Caution";
  value: string;
}

type Action =
  | SimpleTextInputAction
  | DurationInputAction
  | RecruitNumInputAction
  | AccordionCarouselAction
  | TextDisplayAction
  | DeleteWidgetAction
  | ToggleRequiredAction
  | ChangeMinMaxAction
  | ChangeWidgetTypeAction
  | ChoiceEditAction
  | ChoiceAddOptionAction
  | ChoiceRemoveOptionAction
  | TextAnswerEditAction
  | CautionEditAction;

function uniqueId(formData: WidgetData[], length = 16) {
  const generateId = () =>
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace(".", "");
  const ids = new Set(formData.map((widget) => widget.id));
  let id = generateId();
  while (ids.has(id)) {
    id = generateId();
  }
  return id;
}

function reducer(state: WidgetData[], action: Action) {
  if (action.widgetType === null) {
    switch (action.actionType) {
      case "deleteWidget":
        return state.filter((widget) => widget.id !== action.id);
      case "toggleRequired":
        return state.map((widget) =>
          widget.id === action.id
            ? { ...widget, required: !widget.required }
            : widget,
        );
      case "changeMinMax":
        return state.map((widget) => {
          if (widget.id === action.id) {
            const changedWidget = {
              ...widget,
              [action.minOrMax]: action.value,
            };
            if (
              parseInt((changedWidget as GenericWidgetData).min ?? "1") <=
              parseInt((changedWidget as GenericWidgetData).max ?? "1")
            )
              return changedWidget;
            else return widget;
          } else return widget;
        });
      case "changeWidgetType":
        return state.map((widget) => {
          if (widget.id === action.id) {
            const id = uniqueId(state);
            switch (action.targetWidgetType) {
              case "TextDisplay":
                return {
                  id: id,
                  widgetType: "TextDisplay",
                  placeholder: "안내문 내용",
                  value: "",
                  required: null,
                  min: null,
                  max: null,
                } as TextDisplayWidgetData;
              case "Choice":
                return {
                  id: id,
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
                } as ChoiceWidgetData;
              case "TextAnswer":
                return {
                  id: "TextAnswer",
                  widgetType: "TextAnswer",
                  placeholder: "주관식 질문",
                  value: "",
                  required: false,
                  min: null,
                  max: null,
                } as TextAnswerWidgetData;
              case "Caution":
                return {
                  id: "Caution",
                  widgetType: "Caution",
                  placeholder: "⚠️ 주의사항 텍스트 입력 ⚠️",
                  value: "",
                  required: null,
                  min: null,
                  max: null,
                } as CautionWidgetData;
              default:
                return widget;
            }
          } else {
            return widget;
          }
        });
    }
  }
  return state.map((widget) => {
    if (widget.id === action.id) {
      switch (action.widgetType) {
        case "SimpleTextInput":
          return {
            ...widget,
            value: action.value,
          };
        case "DurationInput":
          return {
            ...widget,
            [action.target]: {
              ...(widget as DurationInputWidgetData)[action.target],
              value: action.value,
            },
          };
        case "RecruitNumInput":
          return {
            ...widget,
            [action.target]: action.value,
          };
        case "AccordionCarousel":
          return {
            ...widget,
            selectedTemplate: action.selected,
          };
        case "TextDisplay":
          return {
            ...widget,
            value: action.value,
          };
        case "Choice":
          switch (action.actionType) {
            case "Edit":
              if (action.targetName === "question") {
                return {
                  ...widget,
                  question: {
                    ...(widget as ChoiceWidgetData).question,
                    value: action.value,
                  },
                };
              } else {
                return {
                  ...widget,
                  options: (widget as ChoiceWidgetData).options.map((option) =>
                    option.name === action.targetName
                      ? { ...option, value: action.value }
                      : option,
                  ),
                };
              }
            case "Add":
              return {
                ...widget,
                max: (
                  (widget as ChoiceWidgetData).options.length + 1
                ).toString(),
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
              };
            case "Remove":
              return {
                ...widget,
                max: (
                  (widget as ChoiceWidgetData).options.length - 1
                ).toString(),
                options: (widget as ChoiceWidgetData).options
                  .filter(({ name }) => name !== action.targetName)
                  .map((option, i) => ({ ...option, max: `답변 ${i + 1}` })),
              };
            default:
              return widget;
          }
        case "TextAnswer":
          return {
            ...widget,
            value: action.value,
          };
        case "Caution":
          return {
            ...widget,
            value: action.value,
          };
        default:
          console.log("No matching widget type!");
          return widget;
      }
    } else return widget;
  });
}

const FormConstructor = () => {
  const [formData, dispatch] = useReducer(reducer, templates.coding);

  const onSimpleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      id: e.target.id,
      widgetType: "SimpleTextInput",
      value: e.target.value,
    });
  };

  const onDurationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      id: e.target.id,
      widgetType: "DurationInput",
      target: e.target.name as "start" | "end",
      value: e.target.value,
    });
  };

  const onRecruitNumInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      id: e.target.id,
      widgetType: "RecruitNumInput",
      target: e.target.name as "isNoLimit" | "recruitNum",
      value:
        (e.target.name as "isNoLimit" | "recruitNum") === "isNoLimit"
          ? e.target.checked
          : e.target.value,
    });
  };

  const onAccordionCarouselChange = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      id: e.currentTarget.id,
      widgetType: "AccordionCarousel",
      selected: e.currentTarget.title,
    });
  };

  const onDeleteWidget = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      id: e.currentTarget.id,
      widgetType: null,
      actionType: "deleteWidget",
    });
  };

  const onTextDisplayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      id: e.target.id,
      widgetType: "TextDisplay",
      value: e.target.value,
    });
  };

  const onToggleRequired = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      id: e.currentTarget.id,
      widgetType: null,
      actionType: "toggleRequired",
    });
  };

  const onMinMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      id: e.currentTarget.id,
      widgetType: null,
      actionType: "changeMinMax",
      minOrMax: e.currentTarget.name as "min" | "max",
      value: e.currentTarget.value,
    });
  };

  const onWidgetTypeChange = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      id: e.currentTarget.id,
      widgetType: null,
      actionType: "changeWidgetType",
      targetWidgetType: e.currentTarget.title,
    });
  };

  const onChoiceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      id: e.target.id,
      widgetType: "Choice",
      actionType: "Edit",
      targetName: e.target.name,
      value: e.target.value,
    });
  };

  const onAddOption = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      id: e.currentTarget.id,
      widgetType: "Choice",
      actionType: "Add",
    });
  };

  const onRemoveOption = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      id: e.currentTarget.id,
      widgetType: "Choice",
      actionType: "Remove",
      targetName: e.currentTarget.title,
    });
  };

  const onTextAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      id: e.target.id,
      widgetType: "TextAnswer",
      value: e.target.value,
    });
  };

  const onCautionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      id: e.target.id,
      widgetType: "Caution",
      value: e.target.value,
    });
  };

  console.log(formData);

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
          }
        })}
      </Paper>
    </Wrapper>
  );
};

export default FormConstructor;
