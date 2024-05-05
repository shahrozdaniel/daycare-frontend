import React, { useState } from "react";

interface SelectWithChipsProps {
  selectedOptions: string[];
  handleDeleteChip: (option: string) => void;
  setInputValue: any;
  inputValue: any;
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

const InputTagComponent = ({
  selectedOptions,
  handleDeleteChip,
  inputValue,
  setInputValue,
}: SelectWithChipsProps) => {
  //   const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      handleDeleteChip(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyPress}
          className="w-full p-2 bg-input_bg rounded-[20px] h-full"
          placeholder="Enter Indicator"
        />
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

export default InputTagComponent;
