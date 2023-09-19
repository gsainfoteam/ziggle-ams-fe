import { MdOutlineAdd } from "react-icons/md";

import CircularButton from "../CircularButton";
import Paper from "./Paper";
import Title from "./Title";

function AddProjectCard({ focused }: { focused: boolean }) {
  return (
    <Paper focused={focused} outline shadow={false}>
      <Title title={"새 모집 프로젝트 시작하기"} />
      <CircularButton color={"lightgray"} shadow={false}>
        <MdOutlineAdd size={50} />
      </CircularButton>
    </Paper>
  );
}

export default AddProjectCard;
