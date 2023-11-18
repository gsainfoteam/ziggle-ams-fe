import styled from "styled-components";

import Carousel from "./components/Carousel/Carousel";
import { CarouselWidth } from "./components/Carousel/cssConst";

const BoardLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`;
const CarouselSection = styled.div`
  width: ${`${CarouselWidth}px`};
`;

const BoardPage = () => {
  return (
    <>
      <BoardLayout>
        <CarouselSection>
          <Carousel />
        </CarouselSection>
      </BoardLayout>
    </>
  );
};

export default BoardPage;
