import { MdOutlineAdd } from "react-icons/md";

import CircularButton from "../CircularButton";
import Paper from "./Paper";

function AddProjectCard({ focused }: { focused: boolean }) {
  return (
    <Paper focused={focused} outline>
      <h1>새 모집 프로젝트 시작하기</h1>
      <CircularButton color={"lightgray"}>
        <MdOutlineAdd size={50} />
      </CircularButton>
    </Paper>
  );
}

export default AddProjectCard;
