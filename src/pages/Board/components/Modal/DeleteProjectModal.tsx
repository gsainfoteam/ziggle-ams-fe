import Modal from "./Modal";

function DeleteProjectModal({
  closeModal,
  deleteProject,
  projectName,
}: {
  closeModal: () => void;
  deleteProject: () => void;
  projectName: string;
}) {
  return (
    <Modal
      title="모집 프로젝트 삭제"
      closeModal={closeModal}
      action={deleteProject}
      actionName="삭제하기"
      description={`정말로 이 모집 프로젝트(${projectName})를 삭제하시겠습니까? 프로젝트 삭제는 되돌릴 수 없습니다.프로젝트를 삭제하려면 프로젝트의 이름을 입력해주세요.`}
      textInputProps={[
        {
          name: "프로젝트 이름 확인",
          showLabel: false,
          placeholder: projectName,
          regex: new RegExp(projectName),
        },
      ]}
    />
  );
}

export default DeleteProjectModal;
