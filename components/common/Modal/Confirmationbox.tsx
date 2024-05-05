import React from "react";
import {
    AddButton,
    CancelButton,
    ModalButton,
    ModalChildrenContainer,
    ModalComponentContainer,
    ModalOverlay,
    SmallModalComponentContainer,
    ConfirmationComponentContainer,
    ConfirmationModalChildrenContainer
} from "./Modal.styled";

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

const Confirmationbox = ({
    modalOpen,
    children,
    cancelText,
    AddText,
    closeModal,
    modalName,
    editModal,
    className,
}: modalProps) => {
    return (
        <div>
            {modalOpen && (
                <ConfirmationComponentContainer>
                    <ConfirmationModalChildrenContainer>{children}</ConfirmationModalChildrenContainer>
                </ConfirmationComponentContainer>

            )}
        </div>
    );
};

export default Confirmationbox;
