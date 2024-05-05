import React from "react";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "./Common.styled";
import ImageUpload from "@/components/common/ImageUpload";
import CustomSelect from "@/components/common/CustomSelect";
import CustomInput from "@/components/common/CustomInput";

interface ModalDetailsProps {
  control: any; // or use proper type for control based on your setup
}

const Loo: React.FC<ModalDetailsProps> = ({ control }) => {
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
            Add Loo Break
          </div>
        </HeaderContainer>
        <FormContainer>
          <TwoInputContainer>
            <CustomSelect
              name="time"
              label="Time"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
          </TwoInputContainer>
          <CustomInput
            label=""
            type="text"
            placeholder="Add Description"
            name=""
            control={control}
            className="w-full"
          />
        </FormContainer>
      </ModalDetailsContainer>
    </>
  );
};

export default Loo;
