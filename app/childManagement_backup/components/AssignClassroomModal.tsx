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

import { TwoInputContainer } from "@/app/reports/Common.styled";
import {
  ModalDetailsContainer,
  HeaderContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import CustomSelect from "@/components/common/CustomSelect";
interface Props {
  closeModal: () => void;
  register: any;
  control: any;
  error: any;
  classroomData: { value: number | string; label: string }[];
}
const AssignClassroomModal: React.FC<Props> = ({
  closeModal,
  register,
  error,
  control,
  classroomData,
}) => {
  return (
    <ModalDetailsContainer>
      <HeaderContainer>
        <div className="text-[#4b4b4b] font-[DM_Sans] text-[16px] font-medium mx-auto">
          Assign Classroom
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
      <div className="mt-3 w-full max-w-[600px]">
        <TwoInputContainer>
          <CustomSelect
            name="classroom"
            label="Classroom"
            options={classroomData}
            control={control}
            register={register}
            required={true}
            error={error.classroom}
          />
        </TwoInputContainer>
        <div className="flex justify-end self-end items-centern gap-[16px] mt-5">
          <CancelButton type="button" onClick={closeModal}>
            Cancel
          </CancelButton>
          <AddButton type="submit">Add</AddButton>
        </div>
      </div>
    </ModalDetailsContainer>
  );
};

export default AssignClassroomModal;
