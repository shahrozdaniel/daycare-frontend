import React, { useState } from "react";
interface SelectWithChipsProps {
  selectedOptions: string[];
  currentOption: string | undefined;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDeleteChip: (option: string) => void;
  inputTag?: any;
}
const Chip = ({ label, onDelete }: { label: string; onDelete: () => void }) => {
  return (
    <div className="bg-gray-300 px-2 py-1 rounded-full flex items-center space-x-1">
      <span>{label}</span>
      <button onClick={onDelete} className="focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

const SelectWithChips = ({
  selectedOptions,
  currentOption,
  handleSelectChange,
  handleDeleteChip,
  inputTag,
}: SelectWithChipsProps) => {
  //   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  //   const [currentOption, setCurrentOption] = useState<string | undefined>(
  //     undefined
  //   );

  //   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setCurrentOption(e.target.value);

  //     if (e.target.value && !selectedOptions.includes(e.target.value)) {
  //       setSelectedOptions([...selectedOptions, e.target.value]);
  //     }
  //   };

  //   const handleDeleteChip = (option: string) => {
  //     const updatedOptions = selectedOptions.filter((item) => item !== option);
  //     setSelectedOptions(updatedOptions);
  //   };

  return (
    <div className="space-y-2 w-full">
      <div className="flex space-x-2">
        <select
          value={currentOption || ""}
          onChange={handleSelectChange}
          className="w-full p-2 bg-input_bg rounded-[20px] h-full"
        >
          <option value="" disabled>
            Select Indicator
          </option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      </div>
      <div className="flex flex-wrap space-x-2">
        {selectedOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            onDelete={() => handleDeleteChip(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectWithChips;
