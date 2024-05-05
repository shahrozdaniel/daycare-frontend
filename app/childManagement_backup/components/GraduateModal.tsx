import {
  AddButton,
  CancelButton,
} from "@/components/common/Modal/Modal.styled";
import React, { useState } from "react";
import CustomInput from "@/components/common/CustomInput";
import Image from "next/image";
// import { UpdateFoodmenu } from '@/services/CalendarManagementServices'
import { toast } from "react-toastify";
import {
  UpdateFoodmenu,
  createActivityPlanning,
  createFoodMenu,
} from "@/services/CalendarManagementServices";
import {TwoInputContainer } from "@/app/reports/Common.styled";
import {
  ModalDetailsContainer,
  HeaderContainer,
  FormContainer,
  FormButton,
} from "@/app/feesManagement/ModalComponent/Common.styled";
interface Props {
  closeModal: () => void;
  register: any;
  control: any;
  error: any;
}
const GraduateModal: React.FC<Props> = ({
  closeModal,
  register,
  error,
  control,
}) => {
  return (
    <ModalDetailsContainer>
      <HeaderContainer>
        <div className="text-[#4B4B4B] font-[DM_Sans] text-[20px] font-medium mx-auto">
          Graduate
        </div>
        <button
          type="button"
          className="flex self-end mb-3"
          onClick={closeModal}
        >
          {" "}
          <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
        </button>
      </HeaderContainer>
      <FormContainer>
        <TwoInputContainer>
          <CustomInput
            required
            label=""
            type="date"
            placeholder="Graduation Date"
            name="graduationDate"
            min={new Date().toISOString().split("T")[0]}
            control={control}
            error={error.graduationDate}
            register={register}
          />
        </TwoInputContainer>
      </FormContainer>
      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px]  py-1">
            <CancelButton type="button" onClick={closeModal}>
              Cancel
            </CancelButton>
            <AddButton type="submit">Add</AddButton>
          </div>
        </FormContainer>
      </FormButton>
    </ModalDetailsContainer>
  );
};
export default GraduateModal;
