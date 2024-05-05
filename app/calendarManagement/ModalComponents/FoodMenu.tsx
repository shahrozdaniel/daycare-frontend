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

const FoodMenu: React.FC<ModalDetailsProps> = ({ control }) => {
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
            Add Food Menu
          </div>
        </HeaderContainer>
        <FormContainer>
          <TwoInputContainer>
            <CustomInput
              label=""
              type="text"
              placeholder="Food menu name"
              name=""
              control={control}
              className="w-full"
            />
            <CustomSelect
              name="ageRange"
              label="Age Range"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
          </TwoInputContainer>
          <TwoInputContainer>
            <CustomSelect
              name="menuType"
              label="Menu Type"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
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
          </TwoInputContainer>
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
          <CustomInput
            label=""
            type="text"
            placeholder="Food menu name"
            name=""
            control={control}
            className="w-full"
          />
        </FormContainer>
      </ModalDetailsContainer>
    </>
  );
};

export default FoodMenu;
