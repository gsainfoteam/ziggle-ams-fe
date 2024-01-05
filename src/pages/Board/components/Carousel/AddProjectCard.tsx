import { MdOutlineAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";

import CircularButton from "../CircularButton";
import Paper from "./Paper";

const LinkContainer = styled(Link)`
  text-decoration: none;
`;

function AddProjectCard({ focused }: { focused: boolean }) {
  return (
    <LinkContainer to="/create">
      <Paper focused={focused} outline>
        <h1>새 모집 프로젝트 시작하기</h1>
        <CircularButton color={"lightgray"}>
          <MdOutlineAdd size={50} />
        </CircularButton>
      </Paper>
    </LinkContainer>
  );
}

export default AddProjectCard;
