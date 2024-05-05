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

const Photo: React.FC<ModalDetailsProps> = ({ control }) => {
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
            Add Photo
          </div>
        </HeaderContainer>
        <FormContainer>
          <ImageUpload control={control} name="image" />

          <CustomInput
            label=""
            type="text"
            placeholder="Add Photo Title"
            name=""
            control={control}
            className="w-full"
          />
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

export default Photo;
