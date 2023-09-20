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
`;
const CarouselSection = styled.div`
  width: ${CarouselWidth};
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