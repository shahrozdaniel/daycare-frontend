import React from "react";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "./Common.styled";
import CustomSelect from "@/components/common/CustomSelect";
import CustomInput from "@/components/common/CustomInput";

interface ModalDetailsProps {
  control: any; // or use proper type for control based on your setup
}

const DuplicateActivity: React.FC<ModalDetailsProps> = ({ control }) => {
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
            Duplicate Activity and Menu
          </div>
        </HeaderContainer>
        <FormContainer>
          <TwoInputContainer>
            <CustomInput
              label=""
              type="time"
              placeholder="Timings(from):"
              name="description"
              control={control}
              className="time-picker w-6/12"
            />
            <CustomInput
              label=""
              type="time"
              placeholder="Timings(to):"
              name="description"
              control={control}
              className="time-picker w-6/12"
            />
          </TwoInputContainer>
        </FormContainer>
      </ModalDetailsContainer>
    </>
  );
};

export default DuplicateActivity;
