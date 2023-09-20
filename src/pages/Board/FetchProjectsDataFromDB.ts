import dayjs from "dayjs";

import ProjectsDataFromDB from "./ProjectsDataFromDB";

async function FetchProjectsDataFromDB() {
  const ProjectsData = await ProjectsDataFromDB.map((projectData) => ({
    ...projectData,
    start_date: dayjs(projectData.start_date),
    end_date: dayjs(projectData.end_date),
  })); // TODO: Replace with actual fetch function later
  return ProjectsData;
}

export default FetchProjectsDataFromDB;

export interface projectData {
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
