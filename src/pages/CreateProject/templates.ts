import dayjs from "dayjs";

import templateImage1 from "./assets/templateImage1.png";
import { WidgetData } from "./FormConstructor";

export interface Templates {
  [key: string]: WidgetData[];
}

const templates: Templates = {
  default: [
    {
      id: "ProjectNameInput",
      widgetType: "SimpleTextInput",
      required: true,
      size: "1em",
      placeholder: "프로젝트 이름",
      value: "",
    },
    {
      id: "ProjectDescriptionInput",
      widgetType: "SimpleTextInput",
      required: true,
      size: "0.7em",
      placeholder: "프로젝트 설명",
      value: "",
    },
    {
      id: "DurationInput",
      widgetType: "DurationInput",
      required: true,
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
      required: true,
      recruitNum: "0",
      isNoLimit: false,
    },
    {
      id: "AccordionInfo",
      widgetType: "AccordionInfo",
      required: false,
    },
    {
      id: "AccordionCarousel",
      widgetType: "AccordionCarousel",
      required: false,
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
      required: null,
      min: null,
      max: null,
    },
    {
      id: "Choice",
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
    },
    {
      id: "TextAnswer",
      widgetType: "TextAnswer",
      placeholder: "주관식 질문",
      value: "",
      required: false,
      min: null,
      max: null,
    },
    {
      id: "Caution",
      widgetType: "Caution",
      placeholder: "⚠️ 주의사항 텍스트 입력 ⚠️",
      value: "",
      required: null,
      min: null,
      max: null,
    },
  ],
  coding: [
    {
      id: "ProjectNameInput",
      widgetType: "SimpleTextInput",
      required: true,
      size: "1em",
      placeholder: "프로젝트 이름",
      value: "[    ] 전산 동아리 신규 모집",
    },
    {
      id: "ProjectDescriptionInput",
      widgetType: "SimpleTextInput",
      required: true,
      size: "0.7em",
      placeholder: "프로젝트 설명",
      value: "20** 신규 동아리 회원을 모집합니다. ",
    },
    {
      id: "DurationInput",
      widgetType: "DurationInput",
      required: true,
      start: {
        name: "start",
        placeholder: "",
        value: dayjs().format("YYYY-MM-DD"),
      },
      end: {
        name: "end",
        placeholder: "",
        value: dayjs().add(14, "day").format("YYYY-MM-DD"),
      },
    },
    {
      id: "RecruitNumInput",
      widgetType: "RecruitNumInput",
      required: true,
      recruitNum: "5",
      isNoLimit: false,
    },
    {
      id: "AccordionInfo",
      widgetType: "AccordionInfo",
      required: false,
    },
    {
      id: "AccordionCarousel",
      widgetType: "AccordionCarousel",
      required: false,
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
      value: "20**년도 1년간 [ ]코딩 동아리에서 활동하실 부원을 모집합니다. ",
      required: null,
      min: null,
      max: null,
    },
    {
      id: "학번",
      widgetType: "TextAnswer",
      placeholder: "주관식 질문",
      value: "학번을 적어주세요. [20******]",
      required: true,
      min: null,
      max: null,
    },
    {
      id: "이름",
      widgetType: "TextAnswer",
      placeholder: "주관식 질문",
      value: "이름을 적어주세요.",
      required: true,
      min: null,
      max: null,
    },
    {
      id: "이메일",
      widgetType: "TextAnswer",
      placeholder: "주관식 질문",
      value: "이메일을 적어주세요.",
      required: true,
      min: null,
      max: null,
    },
    {
      id: "전화번호",
      widgetType: "TextAnswer",
      placeholder: "주관식 질문",
      value: "전화번호를 적어주세요.",
      required: true,
      min: null,
      max: null,
    },
    {
      id: "질문",
      widgetType: "TextAnswer",
      placeholder: "주관식 질문",
      value:
        "개발에 참여하신 경험이 있다면 적어주세요. 꼭 개발이 아니더라고, 본인이 오랫동안 몰두했던 일이나 프로젝트에 참여한 경험을 적어 주세요.",
      required: false,
      min: null,
      max: null,
    },
    {
      id: "활동 기간",
      widgetType: "Choice",
      required: true,
      min: "1",
      max: "1",
      question: {
        name: "question",
        placeholder: "질문 내용",
        value: "활동하실 기간을 골라주세요. ",
      },
      options: [
        {
          name: "option1",
          placeholder: "답변 1",
          value: "1학기",
        },
        {
          name: "option2",
          placeholder: "답변 2",
          value: "1학기, 2학기",
        },
        {
          name: "option3",
          placeholder: "답변 3",
          value: "잘 모르겠어요.",
        },
      ],
    },
    {
      id: "언어",
      widgetType: "Choice",
      required: true,
      min: "0",
      max: null,
      question: {
        name: "question",
        placeholder: "질문 내용",
        value:
          "자주 사용하거나 능숙하게 다룰 수 있는 프로그래밍 언어를 골라주세요. ",
      },
      options: [
        {
          name: "option1",
          placeholder: "답변 1",
          value: "Javascript",
        },
        {
          name: "option2",
          placeholder: "답변 2",
          value: "C/C++",
        },
        {
          name: "option3",
          placeholder: "답변 3",
          value: "Python",
        },
        {
          name: "option4",
          placeholder: "답변 4",
          value: "Rust",
        },
        {
          name: "option5",
          placeholder: "답변 5",
          value: "PHP",
        },
        {
          name: "option6",
          placeholder: "답변 6",
          value: "Go",
        },
        {
          name: "option7",
          placeholder: "답변 7",
          value: "기타",
        },
      ],
    },
    {
      id: "Caution",
      widgetType: "Caution",
      placeholder: "⚠️ 주의사항 텍스트 입력 ⚠️",
      value: "입력하신 내용을 한 번만 더 확인해주세요. ",
      required: null,
      min: null,
      max: null,
    },
  ],
};

export default templates;
