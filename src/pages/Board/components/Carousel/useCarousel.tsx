import dayjs from "dayjs";
import { useState } from "react";

import ProjectsData from "../../ProjectsDataFromDB";

function useCarousel() {
  const [focusIndex, setFocusIndex] = useState(0);
  const [projectsData, setProjectData] = useState(
    ProjectsData.map((projectData) => ({
      ...projectData,
      start_date: dayjs(projectData.start_date),
      end_date: dayjs(projectData.end_date),
    })),
  ); // TODO: fetch from DB later

  const nextSlide = () => {
    setFocusIndex((currentFocusIndex) =>
      Math.min(currentFocusIndex + 1, projectsData.length),
    );
  };
  const previousSlide = () => {
    setFocusIndex((currentFocusIndex) =>
      currentFocusIndex > 0 ? currentFocusIndex - 1 : 0,
    );
  };

  const deleteProject = () => {
    const targetProjectUUID = projectsData[focusIndex].project_uuid;
    setProjectData((currentProjectData) =>
      currentProjectData.filter(
        (projectData) => projectData.project_uuid !== targetProjectUUID,
      ),
    ); // TODO: remove from DB later
  };

  return { projectsData, focusIndex, nextSlide, previousSlide, deleteProject };
}

export default useCarousel;
