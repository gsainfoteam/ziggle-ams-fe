import styled from "styled-components";

import thumbnailUrl from "/src/assets/dummy_thumbnail.jpg";

import { ProjectData } from "../../FetchProjectsDataFromDB";
import MiniDueWidget from "./MiniWidget/MiniDueWidget";
import MiniRecruitStatWidget from "./MiniWidget/MiniRecruitStatWidget";
import Paper from "./Paper";

const Thumbnail = styled.img`
  width: 100%;
  object-fit: cover;
`;
const WidgetSection = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  padding: 10px 0 10px 0;
`;

function ProjectCard({
  projectData,
  focused,
}: {
  projectData: ProjectData;
  focused: boolean;
}) {
  const { start_date, end_date } = projectData; // TODO: get recruit stat from DB

  return (
    <Paper focused={focused}>
      <Thumbnail src={thumbnailUrl} />
      <WidgetSection>
        <MiniDueWidget start_date={start_date} end_date={end_date} />
        <MiniRecruitStatWidget // TODO: put values from DB
          current_applicants_num={20}
          target_recruit_num={6}
        />
      </WidgetSection>
    </Paper>
  );
}

export default ProjectCard;
