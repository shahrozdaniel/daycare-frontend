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
  control: any; // or use the proper type for control based on your setup
  closeModal: any;
  register: any;
  errors: any;
  watch: any;
}

const ViewSubsidy: React.FC<ModalDetailsProps> = ({
  control,
  closeModal,
  register,
  errors,
  watch,
}) => {
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-sans text-[20px] font-medium mx-auto">
            View Subsidy Program
          </div>

          <button type="button" className="flex self-end" onClick={closeModal}>
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        <FormContainer>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[#4b4b4b] font-sans text-base font-medium">
                Subsidy Name
              </label>
              <p>{watch("subsidyName")}</p>
            </div>

            <div className="flex flex-col">
              <label className="text-[#4b4b4b] font-sans text-base font-medium">
                Subsidy Provider
              </label>
              <p>{watch("subsidyProvider")}</p>
            </div>

            <div className="flex flex-col">
              <label className="text-[#4b4b4b] font-sans text-base font-medium">
                Subsidy Provider Id
              </label>
              <p>{watch("subsidyProviderId")}</p>
            </div>

            <div className="flex flex-col">
              <label className="text-[#4b4b4b] font-sans text-base font-medium">
                Description
              </label>
              <p>{watch("Description")}</p>
            </div>
          </div>
        </FormContainer>
      </ModalDetailsContainer>
    </>
  );
};

export default ViewSubsidy;
