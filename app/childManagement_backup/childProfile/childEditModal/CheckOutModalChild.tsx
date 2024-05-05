"use client";
import { FormButton } from "@/app/feesManagement/ModalComponent/Common.styled";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "@/app/reports/Common.styled";
import CustomInput from "@/components/common/CustomInput";
import {
  AddButton,
  CancelButton,
} from "@/components/common/Modal/Modal.styled";
import { classRoomACtionCreate } from "@/services/classroomActionServices";
import { getCurrentTime } from "@/utils/utilityFunctions";
import Image from "next/image";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckOutModalChild: React.FC<any> = ({
  data,
  id,
  closeModal,
  getChildData,
  enrollment_id,
}) => {
  let currentDate = getCurrentTime();
  const [checkOutTime, setCheckOutTime] = useState<any>(currentDate);

  const submitForm = async () => {
    let childDetails = [{ childId: id, enrollmentId: enrollment_id }];
    let formbody = new FormData();
    formbody.append("childDetails", JSON.stringify(childDetails));
    formbody.append("checkOut", checkOutTime);
    formbody.append("checkOutNote", "");

    let res;
    try {
      res = await classRoomACtionCreate("12", formbody);
      if (res?.success) {
        toast.success("Checkout time successfully added");
        getChildData();
        closeModal();
        toast.success(res?.message);
      } else {
        closeModal();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <ModalDetailsContainer>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
            Check Out
          </div>

          <button type="button" className="flex self-end" onClick={closeModal}>
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        <FormContainer>
          <TwoInputContainer className="py-4">
            <CustomInput
              label="Check Out Time"
              type="time"
              name="checkOut"
              required
              className="rounded-[20px] bg-[#F5F5F5] p-2"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
            />
          </TwoInputContainer>
        </FormContainer>
      </ModalDetailsContainer>
      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px] ">
            <CancelButton onClick={closeModal}>{"Cancel"}</CancelButton>
            <AddButton type="button" onClick={submitForm}>
              {"Add"}
            </AddButton>
          </div>
        </FormContainer>
      </FormButton>
      <ToastContainer />
    </ModalDetailsContainer>
  );
};

export default CheckOutModalChild;
