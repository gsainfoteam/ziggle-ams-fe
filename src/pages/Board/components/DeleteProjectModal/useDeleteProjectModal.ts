import { useState } from "react";

function useDeleteProjectModal({ projectName }: { projectName: string }) {
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] =
    useState(false);

  const openDeleteProjectModal = () => {
    setIsDeleteProjectModalOpen(true);
  };

  const closeDeleteProjectModal = () => {
    setIsDeleteProjectModalOpen(false);
  };

  const [isValid, setIsValid] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === projectName) setIsValid(true);
    else setIsValid(false);
  };

  return {
    isDeleteProjectModalOpen,
    openDeleteProjectModal,
    closeDeleteProjectModal,
    onChange,
    isValid,
  };
}

export default useDeleteProjectModal;
