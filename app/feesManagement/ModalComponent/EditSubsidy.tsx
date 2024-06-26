import React from "react";
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
interface ModalDetailsProps {
  control: any; // or use proper type for control based on your setup
  closeModal: any;
  register: any;
  errors: any;
}

const EditSubsidy: React.FC<ModalDetailsProps> = ({
  control,
  closeModal,
  register,
  errors,
}) => {
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
            Edit Subsidy Program
          </div>

          <button type="button" className="flex self-end" onClick={closeModal}>
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        <FormContainer>
          <TwoInputContainer>
            <CustomInput
              label=""
              type="text"
              placeholder="Subsidy Name"
              name="subsidyName"
              control={control}
              className="w-full"
              register={register}
              required
              error={errors.subsidyName}
            />
            <CustomInput
              label=""
              type="text"
              placeholder="Subsidy Provider"
              name="subsidyProvider"
              control={control}
              className="w-full"
              required
              register={register}
              error={errors.subsidyName}
            />
          </TwoInputContainer>

          <CustomInput
            label=""
            type="text"
            placeholder="Provider Agency ID"
            name="subsidyProviderId"
            control={control}
            className="w-full"
            register={register}
            required
            error={errors.subsidyName}
          />
          <CustomInput
            label=""
            type="text"
            placeholder="Description"
            name="Description"
            control={control}
            className="w-full"
            register={register}
            required
            error={errors.subsidyName}
          />

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

export default EditSubsidy;
