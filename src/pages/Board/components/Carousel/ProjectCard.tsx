import styled from "styled-components";

import thumbnailUrl from "/src/assets/dummy_thumbnail.jpg";

import { ProjectData } from "../../FetchProjectsDataFromDB";
import MiniDueWidget from "./MiniWidget/MiniDueWidget";
import MiniRecruitStatWidget from "./MiniWidget/MiniRecruitStatWidget";
import Paper from "./Paper";

const Thumbnail = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  object-fit: cover;
`;
const ProjectName = styled.h1`
  color: #eb6263;
  margin: 20px 30px 0 30px;
`;
const WidgetSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 215px;
  background-color: white;
  padding: 20px 0;
`;

function ProjectCard({
  projectData,
  focused,
}: {
  projectData: ProjectData;
  focused: boolean;
}) {
  const { startDate, endDate, title } = projectData; // TODO: get recruit stat from DB

  return (
    <Paper focused={focused} shadow={false}>
      <Thumbnail src={thumbnailUrl} />
      <WidgetSection>
        <ProjectName>{title}</ProjectName>
        <MiniDueWidget startDate={startDate} endDate={endDate} />
        <MiniRecruitStatWidget // TODO: put values from DB
          currentApplicantsNum={5}
          targetRecruitNum={6}
        />
      </WidgetSection>
    </Paper>
  );
}

export default ProjectCard;
