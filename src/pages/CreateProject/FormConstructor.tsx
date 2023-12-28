import React, { useReducer } from "react";
import styled from "styled-components";

import Paper from "./Paper";
import DurationInput, {
  DurationInputWidgetData,
} from "./widgets/DurationInput";
import RecruitNumInput, {
  RecruitNumInputWidgetData,
} from "./widgets/RecruitNumInput";
import SimpleTextInput, {
  SimpleTextInputWidgetData,
} from "./widgets/SimpleTextInput";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

export enum WidgetTypes {
  SimpleTextInput = "SimpleTextInput",
  DurationInput = "DurationInput",
  RecruitNumInput = "RecruitNumInput",
}

export type WidgetData =
  | SimpleTextInputWidgetData
  | DurationInputWidgetData
  | RecruitNumInputWidgetData;

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

type Action =
  | SimpleTextInputAction
  | DurationInputAction
  | RecruitNumInputAction;

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
          }
        })}
      </Paper>
    </Wrapper>
  );
};

export default FormConstructor;
