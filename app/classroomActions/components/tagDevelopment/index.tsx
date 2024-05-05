import React, { useState } from "react";
import CustomSelect from "@/components/common/CustomSelect";
import SelectWithChips from "./selectChip";
const TagDevelopmentComponent = ({
  control,
  register,
  selectedOptions,
  setSelectedOptions,
  currentOption,
  setCurrentOption,
}: any) => {
  // static for now
  const domainArray = [
    { value: "", label: "Please select domain" },
    { value: 1, label: "Social" },
    { value: 2, label: "Emotional" },
    { value: 3, label: "Communication, Language & Literacy" },
    { value: 4, label: "Cognition" },
    { value: 5, label: "Physical" },
  ];
  const skillArray = [
    { value: "", label: "Please select skill" },
    { value: 1, label: "skill 1 " },
    { value: 2, label: "skill 2 " },
    { value: 3, label: "skill 3" },
    { value: 4, label: "skill 4" },
    { value: 5, label: "skill5" },
  ];

  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  // const [currentOption, setCurrentOption] = useState<string | undefined>(
  //   undefined
  // );

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentOption(e.target.value);

    if (e.target.value && !selectedOptions.includes(e.target.value)) {
      setSelectedOptions([...selectedOptions, e.target.value]);
    }
  };

  const handleDeleteChip = (option: string) => {
    const updatedOptions = selectedOptions.filter(
      (item: any) => item !== option
    );
    setSelectedOptions(updatedOptions);
  };
  return (
    <div className="flex flex-col gap-5 items-center">
      <CustomSelect
        name="tagDevelopment"
        label="Domain"
        options={domainArray}
        control={control}
        register={register}
      />

      <CustomSelect
        name="tagDevelopment"
        label="Skill"
        options={skillArray}
        control={control}
        register={register}
      />
      {/* <CustomSelect
        name="tagDevelopment"
        label="Indicators"
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          // Add more options as needed
        ]}
        control={control}
      /> */}

      <SelectWithChips
        selectedOptions={selectedOptions}
        currentOption={currentOption}
        handleDeleteChip={handleDeleteChip}
        handleSelectChange={handleSelectChange}
      />
    </div>
  );
};

export default TagDevelopmentComponent;
