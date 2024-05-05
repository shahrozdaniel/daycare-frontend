import React, { ChangeEvent, useState } from "react";
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
  min?: any;
  max?: any;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  className?: string;
  errorClassName?: string;
  divclass?: string;
  register?: UseFormRegister<T>;
  value?: any;
  required?: boolean;
  error?: any;
  disabled?: boolean;
  datevalidation?: boolean;
  pattern?: any;
}

const CustomInput: React.FC<InputProps<any>> = ({
  name,
  type,
  label,
  placeholder,
  className,
  divclass,
  control,
  onChange,
  register,
  value,
  required,
  error,
  disabled,
  datevalidation,
  pattern,
  errorClassName,
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
      <div
        className={` w-full relative flex flex-col `}
        style={{ color: "black" }}
      >
        <div className="relative h-[3.5rem] ">
          {register ? (
            type === "date" ? (
              <div className="custom-datepicker hidden">
                <input
                  style={disabled ? { backgroundColor: "#e3e3e3" } : {}}
                  id="input"
                  className="w-full input-cal input-base optimize data-picker "
                  type={type}
                  {...register(name)}
                  placeholder=""
                  disabled={disabled}
                  // placeholder={placeholder}
                  {...rest}
                />
                <div
                  className="custom-date-icon"
                  style={disabled ? { backgroundColor: "#e3e3e3" } : {}}
                >
                  <Image
                    src={"/svgs/datapicker-icon.svg"}
                    alt={"_Down_arrow"}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            ) : (
              <>
                {type == "time" ? (
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
                      style={disabled ? { backgroundColor: "#e3e3e3" } : {}}
                      value={value}
                    />
                    <div
                      className="custom-date-icon"
                      style={disabled ? { backgroundColor: "#e3e3e3" } : {}}
                    >
                      <Image
                        src={"/svgs/clock-icon.svg"}
                        alt={"_clock_icon"}
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                ) : (
                  <input
                    id="input"
                    className="w-full input-cal input-base"
                    type={type}
                    {...register(name)}
                    placeholder=""
                    disabled={disabled}
                    // placeholder={placeholder}
                    {...rest}
                    style={disabled ? { backgroundColor: "#e3e3e3" } : {}}
                  />
                )}
              </>
            )
          ) : type === "date" ? (
            <div className="relative">
              <input
                id="input"
                className="input-cal input-base optimize data-picker"
                type={type}
                onChange={onChange}
                value={value}
                placeholder=""
                disabled={disabled}
                // placeholder={placeholder}
                {...rest}
                style={disabled ? { backgroundColor: "#e3e3e3" } : {}}
              />
              <div className="custom-date-icon-recovery z-10 absolute right-4 bottom-5">
                <Image
                  src={"/svgs/datapicker-icon.svg"}
                  alt={"_Down_arrow"}
                  width={20}
                  height={20}
                />
              </div>
            </div>
          ) : type === "time" ? (
            <div className="custom-datepicker hidden">
              <input
                id="input"
                className="w-full input-cal input-base "
                onChange={onChange}
                type={type}
                placeholder=""
                disabled={disabled}
                name={name}
                value={value}
                {...rest}
                style={disabled ? { backgroundColor: "#e3e3e3" } : {}}
              />
              <div className="custom-date-icon">
                <Image
                  src={"/svgs/clock-icon.svg"}
                  alt={"_clock_icon"}
                  width={20}
                  height={20}
                />
              </div>
            </div>
          ) : (
            <input
              id="input"
              className="input-cal input-base"
              type={type}
              onChange={onChange}
              value={value}
              placeholder=""
              disabled={disabled}
              name={name}
              // placeholder={placeholder}
              {...rest}
              style={disabled ? { backgroundColor: "#e3e3e3" } : {}}
            />
          )}
          <label id="label-input" htmlFor={name}>
            {" "}
            {generatedLabel}
            {required && <span className="text-red-500">*</span>}
          </label>
          {error && (
            <p
              className={`text-red-500 text-sm ml-2 absolute  sentence ${errorClassName}`}
            >
              {error.message || error}
            </p>
          )}
        </div>
        {/* <div className="h-1"></div> */}
      </div>
      <style>{`
      .optimize::-webkit-calendar-picker-indicator { 
        opacity: 0;
        height:100%;
        position:absolute; 
        right:10px ;
        width:28rem;
        visibility:none;
        z-index:15;
       }
       .sentence::first-letter {
        text-transform: uppercase;
    }
      `}</style>
    </>
  );
};

export default CustomInput;
