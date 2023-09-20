import { useEffect, useState } from "react";

import FetchProjectsDataFromDB, {
  ProjectData,
} from "../../FetchProjectsDataFromDB";

function useCarousel() {
  const [focusIndex, setFocusIndex] = useState(0);
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      const response = await FetchProjectsDataFromDB();
      setProjectsData(response);
    };
    fetchProjectData();
  }, []);

  const nextSlide = () => {
    setFocusIndex((currentFocusIndex) =>
      Math.min(currentFocusIndex + 1, projectsData.length),
    );
  };
  const previousSlide = () => {
    setFocusIndex((currentFocusIndex) => Math.max(currentFocusIndex - 1, 0));
  };

  const deleteProject = () => {
    const targetProjectUUID = projectsData[focusIndex].projectUuid;
    setProjectsData((currentProjectData) =>
      currentProjectData.filter(
        (projectData) => projectData.projectUuid !== targetProjectUUID,
      ),
    ); // TODO: remove from actual DB later
  };

  return { projectsData, focusIndex, nextSlide, previousSlide, deleteProject };
}

export default useCarousel;
