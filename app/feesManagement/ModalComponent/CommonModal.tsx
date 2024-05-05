import React from "react";
import {
  AddButton,
  CancelButton,
  ModalButton,
  ModalChildrenContainer,
  ModalComponentContainer,
  ModalOverlay,
} from "../../../components/common/FormModal/formModal.styled";

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
  return (
    <>
      {modalOpen && (
        <ModalOverlay>
          <ModalComponentContainer>
            <ModalChildrenContainer>{children}</ModalChildrenContainer>
            <ModalButton>
              {/* <CancelButton onClick={() => closeModal(modalName)}>
                {cancelText}
              </CancelButton> */}
              {/* <AddButton type="submit">{AddText}</AddButton> */}
            </ModalButton>
          </ModalComponentContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default FormModal;
