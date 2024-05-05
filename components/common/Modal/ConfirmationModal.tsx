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

export const ConfirmationModal = ({
  title,
  content,
  modalOpen,
  closeModal,
  handleConfirm,
  loading
}: {
  title: string;
  content: string;
  modalOpen: boolean;
  closeModal: any;
  handleConfirm: any;
  loading?:any
}) => {
  const ModalComponentContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // align-items: center;
    background-color: white;
    height: 30%;
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
              <XIcon className="absolute right-2 bottom-[10px] cursor-pointer h-7 w-6" color="#4b4b4b" size={0}   onClick={closeModal}/>
            </Title>
            <div className="text-center text-[16px] font-sans font-medium">
              {content}
            </div>
            <div className="bg-[#F5F5F5] mb-0  w-full  py-4   ">
              <div className="flex justify-end mr-[5%]  gap-3">
                <Button
                  onClick={closeModal}
                  type="button"
                  form="white"
                  className="bg-[#F5F5F5]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="blue"
                  className="rounded-md w-[20%]"
                  onClick={handleConfirm}
                >
                  {loading ? <span className="loader_button"></span> : <span>Save</span>}
                  
                </Button>
              </div>
            </div>
          </ModalComponentContainer>
        </ModalOverlay>
      )}
    </div>
  );
};
