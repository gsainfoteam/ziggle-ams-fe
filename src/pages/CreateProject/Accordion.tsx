import React from "react";
import styled from "styled-components";

type Props = {
  title?: string | React.ReactNode;
  contents?: string | React.ReactNode;
};

const Accordion = (props: Props) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);

  const [isCollapse, setIsCollapse] = React.useState(false);

  const handleButtonClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0";
      } else {
        console.log(childRef.current.clientHeight);
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse],
  );

  const parentRefHeight = parentRef.current?.style.height ?? "0px";
  const buttonText = parentRefHeight === "0px" ? "열기" : "닫기";

  return (
    <Container>
      <Header>
        {props.title}
        <Arrow onClick={(e) => handleButtonClick(e)}></Arrow>
      </Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{props.contents}</Contents>
      </ContentsWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;

  border-radius: 0.5rem;
  border: 1px solid rgba(235, 98, 99, 1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  height: 32px;
  margin: 0 32px 0 8px;
`;

const Button = styled.button`
  font-size: 14px;
  position: absolute;
`;

const Arrow = styled.button`
  /* background-color: gray; */
  width: 23px;
  height: 11.4px;
  position: relative;
  border: none;
  background: none;

  &::before,
  &::after {
    content: "";
    width: 2px;
    height: 11.4px;
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    background-color: rgba(235, 98, 99, 1);
    border-radius: 0.5rem;
    transform-origin: 50% 1px;
  }

  &::before {
    transform: translateX(-50%) rotate(45deg);
  }

  &::after {
    transform: translateX(-50%) rotate(-45deg);
  }

  transform: ${(props) => isCollapse ?  rotate(180deg);
  /* transform-origin: 50% 25%; */

  transition: transform 0.3s ease-in-out;
`;

const ContentsWrapper = styled.div`
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: height 0.35s ease;
`;

const Contents = styled.div`
  padding-bottom: 0.25rem;
`;

export default Accordion;
