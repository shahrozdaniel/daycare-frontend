import React, { ChangeEvent } from "react";
import { FieldValues, UseFormRegister, useController } from "react-hook-form";
import { Input } from "../ui/input";
import { RegisterUserBody } from "@/app/register/components/api/RegisterApi";
import { PasswordBody } from "@/app/register/components/api/passwordSetupApi";
import "./common.css";
import Image from "next/image";

interface InputProps<T extends FieldValues> {
  name: string;
  label?: string;
  registerProp?: T;
  type?: string;
  placeholder?: string;
  control?: any;
  min?: number | string;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  className?: string;
  divclass?: string;
  register?: UseFormRegister<T>;
  value?: any;
  required?: boolean;
  error?: any;
  disabled?: boolean;
  datevalidation?: boolean;
}

const CustomDateInput: React.FC<InputProps<any>> = ({
  name,
  type,
  label,
  placeholder,
  className,
  divclass,
  min,
  control,
  onChange,
  register,
  value,
  required,
  error,
  disabled,
  datevalidation,
  ...rest
}) => {
  const generatedLabel = label || placeholder;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <>
      {/* <label
        className="block text-sm font-medium text-gray-700 mb-2 text-left"
        htmlFor={name}
      >
        {generatedLabel} {required && <span className="text-red-500">*</span>}
      </label>

      <div className={`mb-4 ${divclass}`}>
        {register ? (
          <input
            className={`w-full bg-input_bg rounded-[20px] h-full p-3 ${className}`}
            type={type}
            {...register(name)}
            placeholder={placeholder}
            {...rest}
          />
        ) : (
          <input
            className={`w-full bg-input_bg rounded-[20px] h-full p-3 ${className}`}
            type={type}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            {...rest}
          />
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div> */}
      <div className="w-full flex flex-col">
        <div className="relative ">
          {register ? (
            type === "date" ? (
              <div className="custom-datepicker hidden">
                <input
                  id="input"
                  className="w-full input-cal input-base "
                  type={type}
                  {...register(name)}
                  placeholder=""
                  disabled={disabled}
                  // placeholder={placeholder}
                  {...rest}
                />
                <div className="custom-date-icon">
                  <Image
                    src={"/svgs/datapicker-icon.svg"}
                    alt={"_Down_arrow"}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            ) : (
              <input
                id="input"
                className="w-full input-cal input-base "
                type={type}
                {...register(name)}
                placeholder=""
                disabled={disabled}
                // placeholder={placeholder}
                {...rest}
              />
            )
          ) : (
            <input
              id="input"
              className="w-full input-cal input-base "
              type={type}
              onChange={onChange}
              value={value}
              placeholder=""
              disabled={disabled}
              // placeholder={placeholder}
              {...rest}
            />
          )}
          <label id="label-input" htmlFor={name}>
            {" "}
            {generatedLabel}
            {required && <span className="text-red-500">*</span>}
          </label>
        </div>
        {error && <p className="text-red-500 text-sm  ml-4">{error.message}</p>}
      </div>
    </>
  );
};

export default CustomDateInput;
