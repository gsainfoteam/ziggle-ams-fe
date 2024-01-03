import { FaCheck } from "react-icons/fa6";

import ActionButton from "./ActionButton";

const AddElementButton = () => {
  return (
    <ActionButton>
      <FaCheck size="1.2em" />
      완성하기
    </ActionButton>
  );
};

export default AddElementButton;
