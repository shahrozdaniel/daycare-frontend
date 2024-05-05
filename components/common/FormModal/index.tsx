import React, { useEffect } from "react";
import {
  AddButton,
  CancelButton,
  ModalButton,
  ModalChildrenContainer,
  ModalComponentContainer,
  ModalOverlay,
} from "./formModal.styled";

interface modalProps {
  modalOpen: boolean;
  children: React.ReactNode;
  cancelText: string;
  AddText: string;
  closeModal: (x: string) => void;
  modalName: string;
  handleAdd?: any;
  handleSubmit?: any;
  onformsubmit?: any;
}

const FormModal = ({
  modalOpen,
  children,
  cancelText,
  AddText,
  closeModal,
  modalName,
  handleSubmit,
  onformsubmit,
}: modalProps) => {

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup function to reset overflow when component unmounts or modal is closed
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);
  return (
    <form onSubmit={handleSubmit(onformsubmit)}>
      {modalOpen && (
        <ModalOverlay>
          <ModalComponentContainer >
            <ModalChildrenContainer>{children}</ModalChildrenContainer>
            <ModalButton>
            </ModalButton>
          </ModalComponentContainer>
        </ModalOverlay>
      )}
    </form>
  );
};

export default FormModal;
