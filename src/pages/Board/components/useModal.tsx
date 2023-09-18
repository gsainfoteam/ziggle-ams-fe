import { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalResult, setModalResult] = useState(false);

  const openModal = () => {
    setModalResult(false);
    setIsOpen(true);
    console.log("open modal");
  };

  const onExitModal = () => {
    setIsOpen(false);
    console.log("exit modal");
  };

  const onAcceptModal = () => {
    setModalResult(true);
    console.log("accept modal");
  };

  return { isOpen, modalResult, openModal, onExitModal, onAcceptModal };
}

export default useModal;
