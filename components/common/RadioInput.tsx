import React from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface RadioOption {
  value?: any;
  label: string;
}

interface RadioInputProps {
  options: RadioOption[];
  value?: any;
  onChange:any;
  //   register: UseFormRegister<FieldValues>;
  name: string;
  type?: string;
}

const RadioInput: React.FC<RadioInputProps> = ({
  options,
  value,
  onChange,
  name,
  type = "row",
}) => {
  return (
    <>
      <RadioGroup
        className={`flex items-center gap-8 ${
          type == "row" ? "flex-row" : "flex-col items-start"
        }`}
      >
        {options.map((option, index) => (
          <div className="flex w-max items-center gap-2" key={index}>
            <RadioGroupItem
              key={option.value}
              value={option.value}
              className=""
              onChange={onChange}
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

export default RadioInput;
