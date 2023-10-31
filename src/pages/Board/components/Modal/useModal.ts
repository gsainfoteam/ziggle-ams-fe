import { useState } from "react";

interface ModalState {
  isOpen: boolean;
}

function useModal() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
  });

  const openModal = () => {
    setModalState((modalState) => ({
      ...modalState,
      isOpen: true,
    }));
  };

  const closeModal = () => {
    setModalState((modalState) => ({
      ...modalState,
      isOpen: false,
    }));
  };

  return { modalState, openModal, closeModal };
}

export default useModal;
