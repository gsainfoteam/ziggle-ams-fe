import { useEffect, useState } from "react";

import FetchProjectsDataFromDB, {
  projectData,
} from "../../FetchProjectsDataFromDB";

function useCarousel() {
  const [focusIndex, setFocusIndex] = useState(0);
  const [projectsData, setProjectsData] = useState<projectData[]>([]);

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
    const targetProjectUUID = projectsData[focusIndex].project_uuid;
    setProjectsData((currentProjectData) =>
      currentProjectData.filter(
        (projectData) => projectData.project_uuid !== targetProjectUUID,
      ),
    ); // TODO: remove from actual DB later
  };

  return { projectsData, focusIndex, nextSlide, previousSlide, deleteProject };
}

export default useCarousel;
