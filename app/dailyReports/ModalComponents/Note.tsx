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

const Note: React.FC<ModalDetailsProps> = ({ control }) => {
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
            Add Notes
          </div>
        </HeaderContainer>
        <FormContainer>
          <CustomInput
            label=""
            type="text"
            placeholder="Add notes"
            name=""
            control={control}
            className="w-full h-44"
          />
        </FormContainer>
      </ModalDetailsContainer>
    </>
  );
};

export default Note;
