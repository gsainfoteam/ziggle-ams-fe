import { TiPlus } from "react-icons/ti";

import { ActionButton } from "./styles";

const AddElementButton = ({ onAddElement }: { onAddElement: () => void }) => {
  return (
    <ActionButton onClick={onAddElement}>
      <TiPlus size="1.2em" />
      지원서 요소 추가하기
    </ActionButton>
  );
};

export default AddElementButton;
