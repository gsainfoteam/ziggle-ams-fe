import { useState } from "react";
import styled, { css } from "styled-components";

import ProjectsData, { ProjectData } from "../../ProjectData";
import AddProjectCard from "./AddProjectCard";
import CircularButton from "./CircularButton";
import { CarouselWidth, ProjectCardWidth } from "./cssConst";
import ProjectCard from "./ProjectCard";
import Title from "./Title";

const TitleSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 40px 0 40px 0;
`;

const SlidesSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 20px 0 20px 0;
`;

const SlidesContainer = styled.div<{
  index: number;
  CarouselWidth: string;
  ProjectCardWidth: string;
}>`
  --gap: 20px;
  display: flex;
  flex-direction: row;
  gap: var(--gap);
  transform: ${({ index, CarouselWidth, ProjectCardWidth }) =>
    `translateX(calc(${CarouselWidth} / 2 - ${ProjectCardWidth} / 2 - (${ProjectCardWidth} + var(--gap)) * ${index}))`};
  // (width of SlidesSections) / 2 - (width of ProjectCard) / 2 - ((width of ProjectCard) + (gap of Slides Container)) * index
  transition: all 1s ease;
`;
const ControlsSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 15px 0 15px 0;
  width: 100%;
  height: 50px;
`;
const SlideShiftButton = styled.button<{ direction: "right" | "left" }>`
  position: absolute;
  ${({ direction }) =>
    direction === "right"
      ? css`
          right: 20px;
        `
      : css`
          left: 20px;
        `}
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 0 10px;
  &:hover {
    box-shadow: 0 0 15px;
    cursor: pointer;
  }
  &:active {
    box-shadow: 0 0 5px;
  }
  opacity: 0.6;
`;

function Carousel({ projectsData }: { projectsData: ProjectData[] }) {
  const [focusIndex, setFocusIndex] = useState(0);

  const nextSlide = () => {
    setFocusIndex((currentFocusIndex) =>
      currentFocusIndex < projectsData.length
        ? currentFocusIndex + 1
        : projectsData.length,
    );
  };
  const previousSlide = () => {
    setFocusIndex((currentFocusIndex) =>
      currentFocusIndex > 0 ? currentFocusIndex - 1 : 0,
    );
  };
  return (
    <div>
      <TitleSection>
        {focusIndex < projectsData.length && (
          <Title title={projectsData[focusIndex].title} />
        )}
      </TitleSection>
      <SlidesSection>
        <SlidesContainer
          index={focusIndex}
          CarouselWidth={CarouselWidth}
          ProjectCardWidth={ProjectCardWidth}
        >
          {projectsData.map((projectData, i) => (
            <ProjectCard
              key={projectData.project_uuid}
              focused={i == focusIndex}
              projectData={projectData}
            />
          ))}
          <AddProjectCard focused={projectsData.length == focusIndex} />
        </SlidesContainer>
        <SlideShiftButton direction="right" onClick={nextSlide} />
        <SlideShiftButton direction="left" onClick={previousSlide} />
      </SlidesSection>
      <ControlsSection>
        {focusIndex < ProjectsData.length && (
          <>
            <CircularButton />
            <CircularButton />
            <CircularButton />
          </>
        )}
      </ControlsSection>
    </div>
  );
}

export default Carousel;
