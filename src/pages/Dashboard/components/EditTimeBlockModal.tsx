import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ChangeEvent } from "react";
import { MdDelete } from "react-icons/md";
import ActionButton from "src/pages/Board/components/Modal/ActionButton";
import ButtonContainer from "src/pages/Board/components/Modal/ButtonContainer";
import CancelButton from "src/pages/Board/components/Modal/CancelButton";
import FormContainer from "src/pages/Board/components/Modal/FormContainer";
import ModalTextInput from "src/pages/Board/components/Modal/InputWidget/ModalTextInput";
import useTextInputs from "src/pages/Board/components/Modal/InputWidget/useTextInputs";
import Title from "src/pages/Board/components/Modal/Title";
import WidgetsContainer from "src/pages/Board/components/Modal/WidgetsContainer";
import styled from "styled-components";

import { EditTimeBlockProps, TimeBlockData } from "./Calendar";
import FloatingModalContainer from "./FloatingModalContainer";
import GlassModalPaper from "./GlassModalPaper";

dayjs.extend(customParseFormat);

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled(MdDelete)`
  color: lightgray;
  font-size: 1.2em;
  &:hover {
    color: #eb6263;
    cursor: pointer;
    animation: shake 0.15s infinite linear;
  }
  @keyframes shake {
    0% {
      transform: rotate(5deg);
    }

    50% {
      transform: rotate(-5deg);
    }

    100% {
      transform: rotate(5deg);
    }
  }
`;

function EditTimeBlockModal({
  closeModal,
  timeBlocksData,
  activeId,
  editTimeBlock,
  deleteTimeBlock,
  xPosition,
}: {
  closeModal: () => void;
  timeBlocksData: TimeBlockData[];
  activeId: string;
  editTimeBlock: (timeBlockData: EditTimeBlockProps) => void;
  deleteTimeBlock: () => void;
  xPosition: number;
}) {
  const { title, start, end } = timeBlocksData.filter(
    (timeBlockData) => timeBlockData.id === activeId,
  )[0];
  const { inputs, onChange, setInputs } = useTextInputs([
    {
      name: "title",
      value: title,
    },
    {
      name: "start",
      test: (input) => dayjs(input, "YYYY-MM-DD H:mm", true).isValid(),
      value: start.format("YYYY-MM-DD H:mm"),
    },
    {
      name: "end",
      test: (input) => dayjs(input, "YYYY-MM-DD H:mm", true).isValid(),
      value: end.format("YYYY-MM-DD H:mm"),
    },
  ]);

  const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const { name, value } = e.target;

    // TODO: Very Dirty!!!
    if (name === "title") {
      editTimeBlock({
        id: activeId,
        title: value,
      });
    } else if (name === "start" || name === "end") {
      const isValid =
        name === "start"
          ? dayjs(value).isBefore(
              timeBlocksData.find(({ id }) => id === activeId)?.end,
            )
          : dayjs(value).isAfter(
              timeBlocksData.find(({ id }) => id === activeId)?.start,
            );
      if (!isValid) {
        setInputs(({ start, end }) => ({
          ...inputs,
          start: {
            ...start,
            isValid: false,
          },
          end: {
            ...end,
            isValid: false,
          },
        }));
      } else if (dayjs(value, "YYYY-MM-DD H:mm", true).isValid()) {
        editTimeBlock({
          id: activeId,
          [name]: dayjs(value),
        });
        setInputs(({ start, end }) => ({
          ...inputs,
          start: {
            ...start,
            isValid: true,
          },
          end: {
            ...end,
            isValid: true,
          },
        }));
      }
    }
  };

  return (
    <FloatingModalContainer xPosition={xPosition}>
      <GlassModalPaper outline onClick={(e) => e.stopPropagation()}>
        <TitleSection>
          <Title>일정 수정</Title>
          <DeleteButton onClick={deleteTimeBlock} />
        </TitleSection>
        <WidgetsContainer>
          <FormContainer>
            <ModalTextInput
              name={"title"}
              label={"일정 이름"}
              placeholder={"일정 #1"}
              onChange={onEdit}
              value={inputs["title"].value}
              isValid={inputs["title"].isValid}
            />
            <ModalTextInput
              name={"start"}
              label={"시작 시간"}
              placeholder={"2023-11-14 9:00"}
              onChange={onEdit}
              value={inputs["start"].value}
              isValid={inputs["start"].isValid}
            />
            <ModalTextInput
              name={"end"}
              label={"종료 시간"}
              placeholder={"2023-11-15 10:15"}
              onChange={onEdit}
              value={inputs["end"].value}
              isValid={inputs["end"].isValid}
            />
            <ButtonContainer>
              <CancelButton onClick={closeModal}>
                {/*TODO: Refresh without posting to DB*/}
                취소
              </CancelButton>
              <ActionButton
                type="submit"
                onClick={(e) => {
                  e.preventDefault(); // TODO: remove after connecting to DB
                  closeModal(); // TODO: remove after connecting to DB
                  console.log("Post to DB"); // TODO: Post to DB
                }}
                disabled={
                  !Object.values(inputs).reduce(
                    (acc, { isValid }) => acc && isValid,
                    true,
                  )
                }
              >
                수정하기
              </ActionButton>
            </ButtonContainer>
          </FormContainer>
        </WidgetsContainer>
      </GlassModalPaper>
    </FloatingModalContainer>
  );
}

export default EditTimeBlockModal;
