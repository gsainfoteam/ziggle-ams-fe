import styled from "styled-components";

export const Section = styled.article`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  border-style: solid;
  border-color: lightgray;
  justify-content: space-between;
  padding: 12px 20px;
  gap: 1em;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  padding: 0 10px;
  gap: 0.75em;

  h3 {
    margin: 0;
  }

  img {
    width: 40px;
    height: 40px;
  }
`;

const Plus = styled.div`
  width: 18px;
  height: 18px;
  background-color: currentColor;
  border-radius: 100px;
  position: relative;

  &::before,
  &::after {
    content: "";
    display: block;
    width: 10px;
    height: 2px;
    background-color: white;
    border-radius: 1px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::after {
    width: 2px;
    height: 10px;
  }
`;

const ButtonContainer = styled.div<{ color: string }>`
  display: flex;
  align-self: center;
  align-items: center;
  gap: 5px;
  color: ${({ color }) => color};
  font-size: 15px;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;

interface AddButtonProps {
  title: string;
  color: string;
}

export const AddButton = ({ title, color }: AddButtonProps) => {
  return (
    <ButtonContainer color={color}>
      <Plus />
      <div>{title} 추가하기</div>
    </ButtonContainer>
  );
};
