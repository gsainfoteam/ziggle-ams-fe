import dayjs from "dayjs";

import ProjectsDataFromDB from "./ProjectsDataFromDB";

async function FetchProjectsDataFromDB() {
  const ProjectsData = await ProjectsDataFromDB.map<ProjectData>(
    (projectData) => ({
      startDate: dayjs(projectData.start_date),
      endDate: dayjs(projectData.end_date),
      projectUuid: projectData.project_uuid,
      title: projectData.title,
      imageUrl: projectData.image_url,
      recruitNum: projectData.recruit_num,
      state: projectData.state,
      applicationUuid: projectData.application_uuid,
      adminUuid: projectData.admin_uuid,
    }),
  ); // TODO: Replace with actual fetch function later
  return ProjectsData;
}

export default FetchProjectsDataFromDB;

export interface ProjectData {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  projectUuid: string;
  title: string;
  imageUrl: string;
  recruitNum: number;
  state: boolean;
  applicationUuid: string;
  adminUuid: string[];
}
