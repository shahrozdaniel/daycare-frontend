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

const Meal: React.FC<ModalDetailsProps> = ({ control }) => {
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
            Add Meals
          </div>
        </HeaderContainer>
        <FormContainer>
          <TwoInputContainer>
            <CustomSelect
              name="mealType"
              label="Meal Type"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
            <CustomInput
              label=""
              type="text"
              placeholder="Food"
              name=""
              control={control}
              className="w-full"
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

export default Meal;
