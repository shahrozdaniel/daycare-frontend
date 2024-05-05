import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { RegisterUserBody } from "@/app/register/components/api/RegisterApi";
import Image from "next/image";

interface CustomSelectProps<T extends FieldValues> {
  name: string;
  label?: string;
  options: { value: string | number; label: string }[];
  control?: any;
  className?: string;
  registerProp?: T;
  register?: UseFormRegister<T>;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  error?: any;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps<any>> = ({
  name,
  label,
  options,
  control,
  className,
  register,
  value,
  onChange,
  required,
  error,
  disabled,
}) => {
  const generatedLabel = label;
  return (
    <>
      <div
        className={` w-full  flex flex-col`}
        style={{ color: "black" }}
      >
        {/* <label
      <div>
        <div className={` w-full ${className} flex flex-col`}>
          {/* <label
        className="block text-sm font-medium text-gray-700 mb-2 text-left"
        htmlFor={name}
      >
        {generatedLabel} {required && <span className="text-red-500">*</span>}
      </label> */}

        <div className="relative styled-select">
          {register ? (
            <div className="custom-dropdown">
              <select
                style={disabled ? { backgroundColor: "#e3e3e3" } : {}}
                id="select"
                className="w-full bg-input_bg rounded-[20px] h-full"
                {...register(name)}
                value={value}
                disabled={disabled}
              >
                {options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="custom-arrow">
                <Image
                  src={"/svgs/down-arrow.svg"}
                  alt={"_Down_arrow"}
                  width={20}
                  height={20}
                />
              </div>
            </div>
          ) : (
            <div className="custom-dropdown">
            <select
            style={disabled ? { backgroundColor: "#e3e3e3" } : {}}
              id="select"
              className="w-full p-4 bg-input_bg rounded-[20px] h-full"
              disabled={disabled}
              // {...register(name)}
              onChange={onChange}
              value={value}
            >
              {/* <div className="absolute z-20">H</div> */}
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="custom-arrow">
                <Image
                  src={"/svgs/down-arrow.svg"}
                  alt={"_Down_arrow"}
                  width={20}
                  height={20}
                />
              </div>
            </div>
          )}
          <label id="label-input" className="text-sm" htmlFor={name}>
            {" "}
            {generatedLabel}
            {required && <span className="text-red-500">*</span>}
          </label>
        {error && <p className="text-red-500 text-sm ml-2 absolute">{error.message||error}</p>}
        </div>
        {/* <div className="h-1"></div> */}
      </div>
    </>
  );
};

export default CustomSelect;