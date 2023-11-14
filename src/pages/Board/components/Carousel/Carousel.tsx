import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import styled from "styled-components";

import CircularButton from "../CircularButton";
import AddProjectCard from "./AddProjectCard";
import { CarouselWidth, ProjectCardWidth } from "./cssConst";
import ProjectCard from "./ProjectCard";
import useCarousel from "./useCarousel";
import useCarouselScroll from "./useCarouselScroll";

const SlidesSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 20px 0 20px 0;
`;

const SlidesContainer = styled.div<{ focusIndex: number }>`
  --gap: 20px;
  --ProjectCardWidth: ${ProjectCardWidth};
  --CarouselWidth: ${CarouselWidth};
  display: flex;
  flex-direction: row;
  gap: var(--gap);
  transform: ${({ focusIndex }) =>
    `translateX(calc(var(--CarouselWidth) / 2 - var(--ProjectCardWidth) / 2 - (var(--ProjectCardWidth) + var(--gap)) * ${focusIndex}))`};
  transition: transform 0.5s ease;
`;
interface SlideShiftButtonProps {
  direction: "right" | "left";
}
const SlideShiftButton = styled(CircularButton)<SlideShiftButtonProps>`
  position: absolute;
  right: ${({ direction }) => direction === "right" && "20px"};
  left: ${({ direction }) => direction === "left" && "20px"};
  background-color: rgba(255, 255, 255, 0.7);
`;

function Carousel() {
  const { projectsData, focusIndex, nextSlide, previousSlide, deleteProject } =
    useCarousel();
  const carouselScrollEvents = useCarouselScroll({
    next: nextSlide,
    prev: previousSlide,
  });

  return (
    <div>
      <SlidesSection>
        <SlidesContainer focusIndex={focusIndex} {...carouselScrollEvents}>
          {projectsData.map((projectData, i) => (
            <ProjectCard
              key={projectData.projectUuid}
              focused={i === focusIndex}
              projectData={projectData}
              deleteProject={deleteProject}
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
    </div>
  );
}

export default Carousel;
