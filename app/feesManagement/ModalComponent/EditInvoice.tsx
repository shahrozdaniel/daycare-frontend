import React, { useState } from "react";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "./Common.styled";
import CustomSelect from "@/components/common/CustomSelect";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import Image from "next/image";
import {
  AddButton,
  CancelButton,
} from "@/components/common/FormModal/formModal.styled";
import { getDiscountList } from "@/services/discountManagementServices";
import { toast } from "react-toastify";
interface ModalDetailsProps {
  register: any;
  control: any; // or use proper type for control based on your setup
  errors: any;
  closeModal?: any;
  discountlist: { value: number | string; label: string }[];
  childenrolldata: { value: number | string; label: string }[];
  subsidyprogramlist: { value: number | string; label: string }[];
}

const EditInvoice: React.FC<ModalDetailsProps> = ({
  register,
  control,
  errors,
  closeModal,
  discountlist,
  childenrolldata,
  subsidyprogramlist,
}) => {
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
            Edit Invoice
          </div>

          <button type="button" className="flex self-end" onClick={closeModal}>
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        <FormContainer>
          <TwoInputContainer>
            <div className="w-full">
              {" "}
              <CustomSelect
                name="invoiceFor"
                label="Invoice for"
                required
                options={[
                  { value: "", label: "Select Option" },
                  { value: "Tuition", label: "Tuition" },
                  { value: "Others", label: "Others" },
                  // Add more options as needed
                ]}
                control={control}
                register={register}
                error={errors?.invoiceFor}
              />
            </div>
            <div className="w-full">
              <CustomInput
                label=""
                type="text"
                placeholder="Amount"
                name="amount"
                required
                control={control}
                className="w-full"
                register={register}
                error={errors?.amount}
              />
            </div>
          </TwoInputContainer>
          <TwoInputContainer>
            <div className="w-full">
              {discountlist && (
                <CustomSelect
                  name="discountId"
                  label="Discount"
                  options={discountlist}
                  control={control}
                  register={register}
                  error={errors?.discountId}
                />
              )}
            </div>
            <div className="w-full">
              {childenrolldata && (
                <CustomSelect
                  name="enrollmentId"
                  label="Enrollment"
                  options={childenrolldata}
                  control={control}
                  required
                  register={register}
                  error={errors?.enrollmentId}
                />
              )}
            </div>
          </TwoInputContainer>
          <TwoInputContainer>
            <div className="w-full">
              {" "}
              {subsidyprogramlist && (
                <CustomSelect
                  name="subsidyId"
                  label="SubsidyId"
                  options={subsidyprogramlist}
                  control={control}
                  register={register}
                  error={errors?.subsidyId}
                />
              )}{" "}
            </div>
            <div className="w-full">
              <CustomInput
                label=""
                type="text"
                placeholder="Notes"
                name="notes"
                control={control}
                className="w-full"
                register={register}
                error={errors?.notes}
              />
            </div>
          </TwoInputContainer>

          <div className="flex justify-end self-end items-centern gap-[16px]">
            <CancelButton type="button" onClick={closeModal}>
              Cancel
            </CancelButton>
            <AddButton type="submit">Save</AddButton>
          </div>
        </FormContainer>
      </ModalDetailsContainer>
    </>
  );
};

export default EditInvoice;
