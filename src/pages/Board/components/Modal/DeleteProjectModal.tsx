import ActionButton from "./ActionButton";
import Backdrop from "./Backdrop";
import ButtonContainer from "./ButtonContainer";
import CancelButton from "./CancelButton";
import Description from "./Description";
import FormContainer from "./FormContainer";
import ModalTextInput from "./InputWidget/ModalTextInput";
import useTextInputs from "./InputWidget/useTextInputs";
import ModalPaper from "./ModalPaper";
import Title from "./Title";
import WidgetsContainer from "./WidgetsContainer";

function DeleteProjectModal({
  deleteProject,
  closeModal,
  projectName,
}: {
  deleteProject: () => void;
  closeModal: () => void;
  projectName: string;
}) {
  const { inputs, onChange } = useTextInputs([
    {
      name: "프로젝트 이름 확인",
      test: (input) => new RegExp(projectName).test(input),
    },
  ]);
  return (
    <Backdrop onClick={closeModal}>
      <ModalPaper onClick={(e) => e.stopPropagation()}>
        <Title>모집 프로젝트 삭제</Title>
        <WidgetsContainer>
          <Description>{`정말로 이 모집 프로젝트(${projectName})를 삭제하시겠습니까? 프로젝트 삭제는 되돌릴 수 없습니다.프로젝트를 삭제하려면 프로젝트의 이름을 입력해주세요.`}</Description>
          <FormContainer>
            <ModalTextInput
              name={"프로젝트 이름 확인"}
              placeholder={projectName}
              value={inputs["프로젝트 이름 확인"].value}
              onChange={onChange}
              isValid={inputs["프로젝트 이름 확인"].isValid}
            />
            <ButtonContainer>
              <CancelButton onClick={closeModal}>취소</CancelButton>
              <ActionButton
                type="submit"
                onClick={deleteProject}
                disabled={
                  !inputs["프로젝트 이름 확인"].isValid
                  // !Object.values(inputs).reduce(
                  //   (acc, { isValid }) => acc && isValid,
                  //   true,
                  // )
                }
              >
                삭제하기
              </ActionButton>
            </ButtonContainer>
          </FormContainer>
        </WidgetsContainer>
      </ModalPaper>
    </Backdrop>
  );
}

export default DeleteProjectModal;
