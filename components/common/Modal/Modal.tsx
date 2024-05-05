import React, { useEffect } from "react";

import { SmallModalComponentContainer } from "./Modal.styled";

import {
  AddButton,
  CancelButton,
  ModalButton,
  ModalChildrenContainer,
  ModalComponentContainer,
  ModalOverlay,
} from "../FormModal/formModal.styled";

interface modalProps {
  modalOpen?: boolean;
  children?: React.ReactNode;
  cancelText?: string;
  AddText?: string;
  closeModal?: (x: string) => void;
  modalName?: string;
  editModal?: string;
  className?: boolean;
}

const Modal = ({
  modalOpen,
  children,
  cancelText,
  AddText,
  closeModal,
  modalName,
  editModal,
  className,
}: modalProps) => {
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup function to reset overflow when component unmounts or modal is closed
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <div>
      {modalOpen && (
        <ModalOverlay>
          {className ? (
            <SmallModalComponentContainer>
              <ModalChildrenContainer>{children}</ModalChildrenContainer>
            </SmallModalComponentContainer>
          ) : (
            <ModalComponentContainer>
              <ModalChildrenContainer>{children}</ModalChildrenContainer>
            </ModalComponentContainer>
          )}
        </ModalOverlay>
      )}
    </div>
  );
};

export default Modal;
