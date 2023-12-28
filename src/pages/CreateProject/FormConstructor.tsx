import React, { useReducer } from "react";
import styled from "styled-components";

import templateImage1 from "./assets/templateImage1.png";
import Paper from "./Paper";
import AccordionCarousel, {
  AccordionCarouselWidgetData,
} from "./widgets/AccordionCarousel";
import AccordionInfo, {
  AccordionInfoWidgetData,
} from "./widgets/AccordionInfo";
import DurationInput, {
  DurationInputWidgetData,
} from "./widgets/DurationInput";
import RecruitNumInput, {
  RecruitNumInputWidgetData,
} from "./widgets/RecruitNumInput";
import SimpleTextInput, {
  SimpleTextInputWidgetData,
} from "./widgets/SimpleTextInput";
import TextDisplayWidget from "./widgets/TextDisplayWidget";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

export enum WidgetTypes {
  SimpleTextInput = "SimpleTextInput",
  DurationInput = "DurationInput",
  RecruitNumInput = "RecruitNumInput",
  AccordionInfo = "AccordionInfo",
  AccordionCarousel = "AccordionCarousel",
}

export type WidgetData =
  | SimpleTextInputWidgetData
  | DurationInputWidgetData
  | RecruitNumInputWidgetData
  | AccordionInfoWidgetData
  | AccordionCarouselWidgetData;

interface SimpleTextInputAction {
  id: string;
  widgetType: WidgetTypes.SimpleTextInput;
  value: string;
}

interface DurationInputAction {
  id: string;
  widgetType: WidgetTypes.DurationInput;
  target: "start" | "end";
  value: string;
}

interface RecruitNumInputAction {
  id: string;
  widgetType: WidgetTypes.RecruitNumInput;
  target: "isNoLimit" | "recruitNum";
  value: boolean | string;
}

interface AccordionCarouselAction {
  id: string;
  widgetType: WidgetTypes.AccordionCarousel;
  selected: string | null;
}

type Action =
  | SimpleTextInputAction
  | DurationInputAction
  | RecruitNumInputAction
  | AccordionCarouselAction;

function reducer(state: WidgetData[], action: Action) {
  return state.map((widget) => {
    if (widget.id === action.id) {
      switch (action.widgetType) {
        case WidgetTypes.SimpleTextInput:
          return {
            ...widget,
            value: action.value,
          };
        case WidgetTypes.DurationInput:
          return {
            ...widget,
            [action.target]: {
              ...(widget as DurationInputWidgetData)[action.target],
              value: action.value,
            },
          };
        case WidgetTypes.RecruitNumInput:
          return {
            ...widget,
            [action.target]: action.value,
          };
        case WidgetTypes.AccordionCarousel:
          return {
            ...widget,
            selectedTemplate: action.selected,
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
      widgetType: WidgetTypes.SimpleTextInput,
      size: "1em",
      placeholder: "프로젝트 이름",
      value: "",
    },
    {
      id: "ProjectDescriptionInput",
      widgetType: WidgetTypes.SimpleTextInput,
      size: "0.7em",
      placeholder: "프로젝트 설명",
      value: "",
    },
    {
      id: "DurationInput",
      widgetType: WidgetTypes.DurationInput,
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
      widgetType: WidgetTypes.RecruitNumInput,
      recruitNum: "0",
      isNoLimit: false,
    },
    {
      id: "AccordionInfo",
      widgetType: WidgetTypes.AccordionInfo,
    },
    {
      id: "AccordionCarousel",
      widgetType: WidgetTypes.AccordionCarousel,
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
  ],
};

const FormConstructor = () => {
  const [formData, dispatch] = useReducer(reducer, templates.default);

  const onChange = {
    [WidgetTypes.SimpleTextInput]: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        id: e.target.id,
        widgetType: WidgetTypes.SimpleTextInput,
        value: e.target.value,
      });
    },
    [WidgetTypes.DurationInput]: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        id: e.target.id,
        widgetType: WidgetTypes.DurationInput,
        target: e.target.name as "start" | "end",
        value: e.target.value,
      });
    },
    [WidgetTypes.RecruitNumInput]: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        id: e.target.id,
        widgetType: WidgetTypes.RecruitNumInput,
        target: e.target.name as "isNoLimit" | "recruitNum",
        value:
          (e.target.name as "isNoLimit" | "recruitNum") === "isNoLimit"
            ? e.target.checked
            : e.target.value,
      });
    },
    [WidgetTypes.AccordionCarousel]: (e: React.MouseEvent<HTMLDivElement>) => {
      dispatch({
        id: e.currentTarget.id,
        widgetType: WidgetTypes.AccordionCarousel,
        selected: e.currentTarget.title,
      });
    },
  };

  return (
    <Wrapper>
      <Paper>
        {formData.map((widgetData, i) => {
          switch (widgetData.widgetType) {
            case WidgetTypes.SimpleTextInput:
              return (
                <SimpleTextInput
                  {...widgetData}
                  onChange={onChange[WidgetTypes.SimpleTextInput]}
                  key={i}
                />
              );
            case WidgetTypes.DurationInput:
              return (
                <DurationInput
                  {...widgetData}
                  onChange={onChange[WidgetTypes.DurationInput]}
                  key={i}
                />
              );
            case WidgetTypes.RecruitNumInput:
              return (
                <RecruitNumInput
                  {...widgetData}
                  onChange={onChange[WidgetTypes.RecruitNumInput]}
                  key={i}
                />
              );
            case WidgetTypes.AccordionInfo:
              return <AccordionInfo key={i} />;
            case WidgetTypes.AccordionCarousel:
              return (
                <AccordionCarousel
                  {...widgetData}
                  onChange={onChange[WidgetTypes.AccordionCarousel]}
                  key={i}
                />
              );
          }
        })}
        <TextDisplayWidget />
      </Paper>
    </Wrapper>
  );
};

export default FormConstructor;
