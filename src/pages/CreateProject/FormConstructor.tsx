import React, { useReducer } from "react";
import styled from "styled-components";

import templateImage1 from "./assets/templateImage1.png";
import TextDisplayWidget, {
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
import GenericWidget from "./defaultWidgets/GenericWidget";
import RecruitNumInput, {
  RecruitNumInputWidgetData,
} from "./defaultWidgets/RecruitNumInput";
import SimpleTextInput, {
  SimpleTextInputWidgetData,
} from "./defaultWidgets/SimpleTextInput";
import Paper from "./Paper";

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
  | TextDisplayWidgetData;

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
}

type Action =
  | SimpleTextInputAction
  | DurationInputAction
  | RecruitNumInputAction
  | AccordionCarouselAction
  | TextDisplayAction
  | DeleteWidgetAction;

function reducer(state: WidgetData[], action: Action) {
  if (action.widgetType === null) {
    return state.filter((widget) => widget.id !== action.id);
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
        default:
          console.log("No matching widget type!");
          return widget;
      }
    } else return widget;
  });
}

interface Templates {
  [key: string]: WidgetData[];
}

const templates: Templates = {
  default: [
    {
      id: "ProjectNameInput",
      widgetType: "SimpleTextInput",
      size: "1em",
      placeholder: "프로젝트 이름",
      value: "",
    },
    {
      id: "ProjectDescriptionInput",
      widgetType: "SimpleTextInput",
      size: "0.7em",
      placeholder: "프로젝트 설명",
      value: "",
    },
    {
      id: "DurationInput",
      widgetType: "DurationInput",
      start: {
        name: "start",
        placeholder: "",
        value: "",
      },
      end: {
        name: "end",
        placeholder: "",
        value: "",
      },
    },
    {
      id: "RecruitNumInput",
      widgetType: "RecruitNumInput",
      recruitNum: "0",
      isNoLimit: false,
    },
    {
      id: "AccordionInfo",
      widgetType: "AccordionInfo",
    },
    {
      id: "AccordionCarousel",
      widgetType: "AccordionCarousel",
      templates: [
        {
          name: "코딩동아리 모집",
          imagePath: templateImage1,
        },
        {
          name: "행사 참석 여부",
          imagePath: templateImage1,
        },
        {
          name: "의견 수집",
          imagePath: templateImage1,
        },
        {
          name: "강의 후 설문",
          imagePath: templateImage1,
        },
        {
          name: "코딩동아리 모집2",
          imagePath: templateImage1,
        },
        {
          name: "행사 참석 여부2",
          imagePath: templateImage1,
        },
        {
          name: "의견 수집2",
          imagePath: templateImage1,
        },
        {
          name: "강의 후 설문2",
          imagePath: templateImage1,
        },
      ],
      selectedTemplate: null,
    },
    {
      id: "TextDisplay",
      widgetType: "TextDisplay",
      placeholder: "안내문 내용",
      value: "",
    },
  ],
};

const FormConstructor = () => {
  const [formData, dispatch] = useReducer(reducer, templates.default);

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

  const onTextDisplayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      id: e.target.id,
      widgetType: "TextDisplay",
      value: e.target.value,
    });
  };

  const onDeleteWidget = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      id: e.currentTarget.id,
      widgetType: null,
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
                  key={i}
                />
              );
            case "TextDisplay":
              return (
                <TextDisplayWidget
                  {...widgetData}
                  onChange={onTextDisplayChange}
                  key={i}
                />
              );
          }
        })}
        <GenericWidget />
      </Paper>
    </Wrapper>
  );
};

export default FormConstructor;
