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

const AddActivity: React.FC<ModalDetailsProps> = ({ control }) => {
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
            Add Activity
          </div>
        </HeaderContainer>
        <FormContainer>
          <TwoInputContainer>
            <CustomInput
              label=""
              type="text"
              placeholder="Activity Name & Title"
              name=""
              control={control}
              className="w-full"
            />
            <CustomSelect
              name="ageRange"
              label="Domain/Learning Area"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
          </TwoInputContainer>
          <TwoInputContainer>
            <DatePickerComponent name="" label=" Date" control={control} />
            <CustomSelect
              name="mealType"
              label="Activity For(Age Range):"
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
            placeholder="Description"
            name=""
            control={control}
            className="w-full"
          />
          <CustomInput
            label=""
            type="text"
            placeholder="Materials To Be Used"
            name=""
            control={control}
            className="w-full"
          />
          <CustomInput
            label=""
            type="text"
            placeholder="Instructions(Step by Step)"
            name=""
            control={control}
            className="w-full"
          />
          <TwoInputContainer>
            <CustomInput
              label=""
              type="text"
              placeholder="Extra Details"
              name=""
              control={control}
              className="w-full"
            />
            <CustomInput
              label=""
              type="text"
              placeholder="Tag a Development Skill"
              name=""
              control={control}
              className="w-full"
            />
          </TwoInputContainer>
        </FormContainer>
      </ModalDetailsContainer>
    </>
  );
};

export default AddActivity;
