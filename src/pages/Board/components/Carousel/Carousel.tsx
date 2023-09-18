import {
  MdChevronLeft,
  MdChevronRight,
  MdDeleteOutline,
  MdOutlineVisibilityOff,
  MdStarOutline,
} from "react-icons/md";
import styled, { css } from "styled-components";

import CircularButton from "../CircularButton";
import AddProjectCard from "./AddProjectCard";
import { CarouselWidth, ProjectCardWidth } from "./cssConst";
import ProjectCard from "./ProjectCard";
import Title from "./Title";
import useCarousel from "./useCarousel";

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
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px;
  &:hover {
    box-shadow: 0 0 15px;
    cursor: pointer;
  }
  &:active {
    box-shadow: 0 0 5px;
  }
`;

function Carousel() {
  const { projectsData, focusIndex, nextSlide, previousSlide, deleteProject } =
    useCarousel();

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
        <SlideShiftButton direction="right" onClick={nextSlide}>
          <MdChevronRight size={50} />
        </SlideShiftButton>
        <SlideShiftButton direction="left" onClick={previousSlide}>
          <MdChevronLeft size={50} />
        </SlideShiftButton>
      </SlidesSection>
      <ControlsSection>
        {focusIndex < projectsData.length && (
          <>
            <CircularButton>
              <MdOutlineVisibilityOff size={25} />
            </CircularButton>
            <CircularButton>
              <MdStarOutline size={25} />
            </CircularButton>
            <CircularButton onClick={deleteProject}>
              <MdDeleteOutline size={25} color={"red"} />
            </CircularButton>
          </>
        )}
      </ControlsSection>
    </div>
  );
}

export default Carousel;
