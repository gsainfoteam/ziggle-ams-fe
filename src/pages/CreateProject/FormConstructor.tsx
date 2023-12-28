import { useReducer } from "react";
import styled from "styled-components";

import Paper from "./Paper";
import { AccordionInfo, AccordionInfoProps } from "./widgets/AccordionInfo";
import DescriptionInput, {
  DescriptionInputProps,
} from "./widgets/DescriptionInput";
import { NameInput, NameInputProps } from "./widgets/NameInput";
import PeriodInput, { PeriodInputProps } from "./widgets/PeriodInput";
import RecruitNumInput, {
  RecruitNumInputProps,
} from "./widgets/RecruitNumInput";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

export enum WidgetTypes {
  "NameInput",
  "DescriptionInput",
  "PeriodInput",
  "RecruitNumInput",
  "AccordionInfo",
}

type Widgets =
  | NameInputProps
  | DescriptionInputProps
  | PeriodInputProps
  | RecruitNumInputProps
  | AccordionInfoProps;

const templates = {
  default: [
    {
      id: "NameInput",
      widgetType: WidgetTypes.NameInput,
      placeholder: "프로젝트 이름",
      required: true,
      value: "",
    },
    {
      id: "DescriptionInput",
      widgetType: WidgetTypes.DescriptionInput,
      placeholder: "프로젝트 설명",
      required: false,
      value: "",
    },
    {
      id: "ProjectPeriodInput",
      widgetType: WidgetTypes.PeriodInput,
      start: {
        id: "start",
        placeholder: "2023-12-10",
        required: true,
        value: "2023-12-10",
      },
      end: {
        id: "end",
        placeholder: "2023-12-11",
        required: true,
        value: "2023-12-11",
      },
    },
    {
      id: "RecruitNumInput",
      widgetType: WidgetTypes.RecruitNumInput,
      recruitNum: "0",
      isNoLimit: false,
    },
    {
      id: "ZiggleInfo",
      widgetType: WidgetTypes.AccordionInfo,
    },
  ],
};

interface NameEditProps {
  value: string;
}

interface DescriptionEditProps {
  value: string;
}

interface PeriodEditProps {
  id: "start" | "end";
  value: string;
}

interface RecruitNumEditProps {
  id: "recruitNum" | "isNoLimit";
  value: boolean | string;
}

type WidgetEditProps =
  | NameEditProps
  | DescriptionEditProps
  | PeriodEditProps
  | RecruitNumEditProps;

function reducer(
  state: Widgets[],
  action: { type: WidgetTypes; id: string; edit: WidgetEditProps },
) {
  switch (action.type) {
    case WidgetTypes.NameInput:
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...(widget as NameInputProps),
              value: (action.edit as NameEditProps).value,
            }
          : widget,
      );
    case WidgetTypes.DescriptionInput:
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...(widget as DescriptionInputProps),
              value: (action.edit as DescriptionEditProps).value,
            }
          : widget,
      );
    case WidgetTypes.PeriodInput:
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...widget,
              [(action.edit as PeriodEditProps).id]: {
                ...(widget as PeriodInputProps)[
                  (action.edit as PeriodEditProps).id
                ],
                value: action.edit.value,
              },
            }
          : widget,
      );
    case WidgetTypes.RecruitNumInput:
      return state.map((widget) =>
        widget.id === action.id
          ? {
              ...widget,
              [(action.edit as RecruitNumEditProps).id]: (
                action.edit as RecruitNumEditProps
              ).value,
            }
          : widget,
      );
    default:
      return state;
  }
}

const FormConstructor = () => {
  const [formData, dispatch] = useReducer(reducer, templates.default);

  const onNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: WidgetTypes.NameInput,
      id: e.target.id,
      edit: { value: e.target.value },
    });
  };

  const onDescriptionInputChange = onNameInputChange;

  const onPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: WidgetTypes.PeriodInput,
      id: "ProjectPeriodInput",
      edit: { id: e.target.id as "start" | "end", value: e.target.value },
    });
  };

  const onRecruitNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: WidgetTypes.RecruitNumInput,
      id: "RecruitNumInput",
      edit: {
        id: e.target.id as "isNoLimit" | "recruitNum",
        value:
          (e.target.id as "isNoLimit" | "recruitNum") === "isNoLimit"
            ? e.target.checked
            : e.target.value,
      },
    });
  };

  // const onAccrodionInfoClose = () => {
  //   dispatch({
  //     type: WidgetTypes.AccordionInfo,
  //     id: ,
  //     edit: {  },
  //   });
  // };

  return (
    <Wrapper>
      <Paper>
        <NameInput
          {...(formData[0] as NameInputProps)}
          onChange={onNameInputChange}
        />
        <DescriptionInput
          {...(formData[1] as DescriptionInputProps)}
          onChange={onDescriptionInputChange}
        />
        <PeriodInput
          {...(formData[2] as PeriodInputProps)}
          onChange={onPeriodChange}
        />
        <RecruitNumInput
          {...(formData[3] as RecruitNumInputProps)}
          onChange={onRecruitNumChange}
        />
        <AccordionInfo />
      </Paper>
    </Wrapper>
  );
};

export default FormConstructor;
