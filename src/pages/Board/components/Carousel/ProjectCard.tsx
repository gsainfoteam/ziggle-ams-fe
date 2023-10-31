import { createPortal } from "react-dom";
import styled from "styled-components";

import thumbnailUrl from "/src/assets/dummy_thumbnail.jpg";

import { ProjectData } from "../../FetchProjectsDataFromDB";
import Modal from "../Modal/Modal";
import useModal from "../Modal/useModal";
import MiniDueWidget from "./MiniWidget/MiniDueWidget";
import MiniRecruitStatWidget from "./MiniWidget/MiniRecruitStatWidget";
import Paper from "./Paper";

const Thumbnail = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  object-fit: cover;
`;
const ProjectName = styled.h1`
  color: #eb6263;
  margin: 0 30px;
`;
const WidgetSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 215px;
  background-color: white;
  padding: 20px;
`;
const ActionSection = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0 30px;
`;
const DeleteButton = styled.button`
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  color: darkgray;
  &:hover {
    background-color: #eb6263;
    color: white;
    cursor: pointer;
  }
`;

function ProjectCard({
  projectData,
  focused,
  deleteProject,
}: {
  projectData: ProjectData;
  focused: boolean;
  deleteProject: () => void;
}) {
  const { startDate, endDate, title } = projectData; // TODO: get recruit stat from DB
  const { modalState, openModal, closeModal } = useModal();

  return (
    <Paper focused={focused}>
      <Thumbnail src={thumbnailUrl} />
      <WidgetSection>
        <ActionSection>
          {focused && (
            <>
              <DeleteButton onClick={openModal}>삭제하기</DeleteButton>
              {modalState.isOpen &&
                createPortal(
                  <Modal
                    action={deleteProject}
                    closeModal={closeModal}
                    projectName={title}
                  />,
                  document.body,
                )}
            </>
          )}
        </ActionSection>
        <ProjectName>{title}</ProjectName>
        <MiniDueWidget startDate={startDate} endDate={endDate} />
        <MiniRecruitStatWidget // TODO: put values from DB
          currentApplicantsNum={5}
          targetRecruitNum={6}
        />
      </WidgetSection>
    </Paper>
  );
}

export default ProjectCard;
