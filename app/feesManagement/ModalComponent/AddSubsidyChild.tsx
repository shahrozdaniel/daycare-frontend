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

interface ModalDetailsProps {
  control: any; // or use proper type for control based on your setup
}

const AddSubsidyChild: React.FC<ModalDetailsProps> = ({ control }) => {
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
            Add Subsidy to Child
          </div>
        </HeaderContainer>
        <FormContainer>
          <TwoInputContainer>
            <CustomInput
              label=""
              type="text"
              placeholder="Select Subsidy Program"
              name=""
              control={control}
              className="w-full"
            />
            <CustomInput
              label=""
              type="text"
              placeholder="Select Children"
              name=""
              control={control}
              className="w-full"
            />
          </TwoInputContainer>
          <TwoInputContainer>
            <CustomInput
              label=""
              type="text"
              placeholder="Amount"
              name=""
              control={control}
              className="w-full"
            />
            <DatePickerComponent name="" label="Start Date" control={control} />
          </TwoInputContainer>
        </FormContainer>
      </ModalDetailsContainer>
    </>
  );
};

export default AddSubsidyChild;
