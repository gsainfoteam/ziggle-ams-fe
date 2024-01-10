interface SimpleTextInputAction {
  actionType: "SimpleTextInputAction";
  id: string;
  value: string;
}

interface DurationInputAction {
  actionType: "DurationInputAction";
  id: string;
  target: "start" | "end";
  value: string;
}

interface RecruitNumInputAction {
  actionType: "RecruitNumInputAction";
  id: string;
  target: "isNoLimit" | "recruitNum";
  value: boolean | string;
}

interface AccordionCarouselAction {
  actionType: "AccordionCarouselAction";
  id: string;
  selected: string | null;
}

interface TextDisplayAction {
  actionType: "TextDisplayAction";
  id: string;
  value: string;
}

interface DeleteWidgetAction {
  actionType: "DeleteWidgetAction";
  id: string;
}

interface ToggleRequiredAction {
  actionType: "ToggleRequiredAction";
  id: string;
}

interface ChangeMinMaxAction {
  actionType: "ChangeMinMaxAction";
  id: string;
  minOrMax: "min" | "max";
  value: string;
}

interface ChangeWidgetTypeAction {
  actionType: "ChangeWidgetTypeAction";
  id: string;
  targetWidgetType: string;
}

interface ChoiceEditAction {
  actionType: "ChoiceEditAction";
  id: string;
  targetName: string;
  value: string;
}

interface ChoiceAddOptionAction {
  actionType: "ChoiceAddOptionAction";
  id: string;
}

interface ChoiceRemoveOptionAction {
  actionType: "ChoiceRemoveOptionAction";
  id: string;
  targetName: string;
}

interface ChoiceReorderOptionsAction {
  actionType: "ChoiceReorderOptionsAction";
  id: string;
  dragIndex: number;
  hoverIndex: number;
}

interface TextAnswerEditAction {
  actionType: "TextAnswerEditAction";
  id: string;
  value: string;
}

interface CautionEditAction {
  actionType: "CautionEditAction";
  id: string;
  value: string;
}

interface ApplyTemplateAction {
  actionType: "ApplyTemplateAction";
}

interface AddElementAction {
  actionType: "AddElementAction";
}

interface ReorderAction {
  actionType: "ReorderAction";
  dragIndex: number;
  hoverIndex: number;
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
  | ChoiceReorderOptionsAction
  | TextAnswerEditAction
  | CautionEditAction
  | ApplyTemplateAction
  | AddElementAction
  | ReorderAction;

export default Action;
