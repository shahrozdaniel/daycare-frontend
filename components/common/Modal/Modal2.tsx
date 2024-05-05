// import {
//   AddButton,
//   CancelButton,
// } from "@/components/common/Modal/Modal.styled";
import Button from "@/components/common/Button";
import {
    ModalChildrenContainer,
    ModalOverlay,
} from "../FormModal/formModal.styled";
import styled from "styled-components";
import { XCircleIcon, XIcon } from "lucide-react";

export const Modal2 = ({
    title,
    children,
    modalOpen,
    closeModal,
    handleConfirm,
}: {
    title?: string;
    children?: React.ReactNode;
    modalOpen: boolean;
    closeModal: any;
    handleConfirm?: any;
}) => {
    const ModalComponentContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // align-items: center;
    background-color: white;
    overflow: auto;
    border-radius: 16px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  `;

    const Title = styled.div`
    font-size: 1.25rem;
    color: #4b4b4b;
    background-color: #eefcfc;
    width: 100%;
    // display: flex;
    // justify-content: center;
    align-items: center;
    padding: 10px 0px 10px 0px;
  `;

    return (
        <div>
            {modalOpen && (
                <ModalOverlay className="bg-[#8c8c8c]">
                    <ModalComponentContainer>
                        <Title className="relative">
                            <div className="font-sans font-medium flex justify-center capitalize">{title}</div>
                            <XIcon className="absolute right-2 bottom-[10px] cursor-pointer h-7 w-6" color="#4b4b4b" size={0} onClick={closeModal} />
                        </Title>
                        <ModalChildrenContainer>{children}</ModalChildrenContainer>
                    </ModalComponentContainer>
                </ModalOverlay>
            )}
        </div>
    );
};
