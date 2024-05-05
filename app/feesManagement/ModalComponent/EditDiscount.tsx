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
  closeModal: () => void;
  register: any;
  errors: any;
}

const EditDiscount: React.FC<ModalDetailsProps> = ({
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
            Edit Discount
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
              <CustomInput
                label=""
                type="text"
                placeholder="Discount Name"
                name="name"
                control={control}
                className="w-full text-black"
                register={register}
                required
                error={errors?.name}
              />
            </div>
            <div className="w-full">
              {" "}
              <CustomSelect
                name="discountType"
                label="Discount Type"
                options={[
                  { value: "", label: "Select Discount Type" },
                  { value: "percentage", label: "Percentage" },
                  { value: "fixed", label: "Fixed" },
                  // Add more options as needed
                ]}
                control={control}
                register={register}
                error={errors.discountType}
              />
            </div>
          </TwoInputContainer>
          <TwoInputContainer>
            <div className="w-full">
              {" "}
              <CustomInput
                label=""
                type="number"
                placeholder="Amount"
                name="value"
                control={control}
                className="w-full text-black"
                register={register}
                required
                error={errors.name}
              />
            </div>
            <div className="w-full">
              {" "}
              <CustomInput
                label=""
                type="text"
                placeholder="Description"
                name="description"
                control={control}
                className="w-full"
                register={register}
                required
                error={errors.description}
              />
            </div>
          </TwoInputContainer>

          <div className="flex justify-end self-end items-centern gap-[16px]">
            <CancelButton type="button" onClick={closeModal}>
              Cancel
            </CancelButton>
            <AddButton type="submit">Add</AddButton>
          </div>
        </FormContainer>
      </ModalDetailsContainer>
    </>
  );
};

export default EditDiscount;
