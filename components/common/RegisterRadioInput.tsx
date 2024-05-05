import React, { ChangeEvent } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { useController } from "react-hook-form";
interface RadioOption {
  value?: any;
  label: string;
}

interface RadioInputProps {
  options: RadioOption[];
  value?: any;
  //   register: UseFormRegister<FieldValues>;
  name: string;
  type?: string;
  control?: any;
  disabled?: boolean;
}

const RegisterRadioInput: React.FC<RadioInputProps> = ({
  options,
  control,
  name,
  type = "row",
  disabled,
}) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
  });

  const handleRadioInput = (event: any) => {
    onChange(event.target.value);
  };
  return (
    <>
      <RadioGroup
        className={`flex items-center gap-8 ${
          type == "row" ? "flex-row" : "flex-col items-start"
        }`}
      >
        {options.map((option, index) => (
          <div className="flex w-max items-center gap-2" key={index}>
            {/* <RadioGroupItem
              key={option.value}
              value={value}
              onChange={handleRadioInput}
              className=""
            /> */}
            <input
              type="radio"
              name={name}
              value={option.value}
              disabled={disabled}
              checked={option.value === value}
              onChange={handleRadioInput}
              className="radio-btn"
            />
            <Label htmlFor={option.value} className="">
              {option.label}
            </Label>
          </div>
        ))}
        {/* <RadioGroupItem value={""} className='border-2 border-red-500'>
            <Label htmlFor={""}>fefer</Label> */}
      </RadioGroup>
    </>
  );
};

export default RegisterRadioInput;
