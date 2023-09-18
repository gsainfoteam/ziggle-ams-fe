import dayjs from "dayjs";
import styled from "styled-components";

import thumbnailUrl from "/src/assets/dummy_thumbnail.jpg";

import { ProjectCardWidth } from "./cssConst";
import MiniDueWidget from "./MiniWidget/MiniDueWidget";
import MiniRecruitStatWidget from "./MiniWidget/MiniRecruitStatWidget";

const Paper = styled.div<{ ProjectCardWidth: string; focused: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  width: ${({ ProjectCardWidth }) => ProjectCardWidth};
  height: 350px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 5px;
  &:hover {
    box-shadow: 0 0 10px;
    cursor: pointer;
  }
  &:active {
    box-shadow: 0 0 3px;
  }
  transform: ${({ focused }) => !focused && "scale(0.8)"};
  transition: transform 1s ease;
`;
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

interface ProjectData {
  start_date: dayjs.Dayjs;
  end_date: dayjs.Dayjs;
  project_uuid: string;
  title: string;
  image_url: string;
  recruit_num: number;
  state: boolean;
  application_uuid: string;
  admin_uuid: string[];
}
[];

function ProjectCard({
  projectData,
  focused,
}: {
  projectData: ProjectData;
  focused: boolean;
}) {
  return (
    <Paper ProjectCardWidth={ProjectCardWidth} focused={focused}>
      <Thumbnail src={thumbnailUrl} />
      <WidgetSection>
        <MiniDueWidget
          start_date={projectData.start_date}
          end_date={projectData.end_date}
        />
        <MiniRecruitStatWidget />
      </WidgetSection>
    </Paper>
  );
}

export default ProjectCard;
