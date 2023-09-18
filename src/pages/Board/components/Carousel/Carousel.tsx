import {
  MdChevronLeft,
  MdChevronRight,
  MdDeleteOutline,
  MdOutlineVisibilityOff,
  MdStarOutline,
} from "react-icons/md";
import styled from "styled-components";

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

interface SlidesContainerProps {
  index: number;
  CarouselWidth: string;
  ProjectCardWidth: string;
}
const SlidesContainer = styled.div<SlidesContainerProps>`
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
interface SlideShiftButtonProps {
  direction: "right" | "left";
}
const SlideShiftButton = styled(CircularButton)<SlideShiftButtonProps>`
  position: absolute;
  right: ${({ direction }) => direction === "right" && "20px"};
  left: ${({ direction }) => direction === "left" && "20px"};
`;

function Carousel() {
  const { projectsData, focusIndex, nextSlide, previousSlide, deleteProject } =
    useCarousel();

  const isNotEnd = focusIndex < projectsData.length;

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
          <AddProjectCard focused={projectsData.length === focusIndex} />
        </SlidesContainer>
        <SlideShiftButton direction="right" onClick={nextSlide}>
          <MdChevronRight size={50} />
        </SlideShiftButton>
        <SlideShiftButton direction="left" onClick={previousSlide}>
          <MdChevronLeft size={50} />
        </SlideShiftButton>
      </SlidesSection>
      <ControlsSection>
        {isNotEnd && (
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
