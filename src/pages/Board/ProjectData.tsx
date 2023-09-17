export interface ProjectData {
  project_uuid: string;
  title: string;
  start_date: Date;
  end_date: Date;
  image_url: string;
  recruit_num: number;
  state: boolean;
  application_uuid: string;
  admin_uuid: string[];
}

const ProjectsData = [
  {
    project_uuid: "superUniqueID",
    title: "GDSC Recruiting",
    start_date: new Date(2023, 1, 1),
    end_date: new Date(2023, 10, 1),
    image_url: "alsdhlfkasjldf",
    recruit_num: 10,
    state: false,
    application_uuid: "asdfads",
    admin_uuid: ["askdjlfaksjd"],
  },
  {
    project_uuid: "duperUniqueID",
    title: "InfoTeam Recruiting",
    start_date: new Date(2023, 1, 2),
    end_date: new Date(2023, 2, 2),
    image_url: "alsdhlfkasjl",
    recruit_num: 3,
    state: true,
    application_uuid: "asdfas",
    admin_uuid: ["askdjlfjd", "sidogifhsl"],
  },
  {
    project_uuid: "UniqueID",
    title: "Ziggle",
    start_date: new Date(2023, 1, 3),
    end_date: new Date(2023, 2, 3),
    image_url: "alsdsjldf",
    recruit_num: 18,
    state: false,
    application_uuid: "oirhfj",
    admin_uuid: ["op9oiuhjk", "9oyighjllyg", "poit", "lkjdfgb"],
  },
];

export default ProjectsData;
