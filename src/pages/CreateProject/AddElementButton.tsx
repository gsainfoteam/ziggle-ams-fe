import { TiPlus } from "react-icons/ti";

import ActionButton from "./ActionButton";

const AddElementButton = ({
  onAddElement,
}: {
  onAddElement: (e: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <ActionButton onClick={onAddElement}>
      <TiPlus size="1.2em" />
      지원서 요소 추가하기
    </ActionButton>
  );
};

export default AddElementButton;
