import React, { ChangeEvent, useState } from "react";
import { useController, FieldValues, UseFormRegister } from "react-hook-form";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";

interface TextareaProps {
  name: string;
  label?: string;
  control: any;
  register?: any;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  onChangeHandle?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  error?: any;
  required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  control,
  register,
  className,
  placeholder,
  required,
  inputClassName,
  onChangeHandle
}) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: any) => {
    onChange(e.target.value);
    onChangeHandle&&onChangeHandle(e)
  };
  const generatedLabel = label || placeholder;
  return (
    <div
      className={`mb-4 ${className} relative`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      {/* <label id="label-input" htmlFor={name}>
        {" "}
        {generatedLabel}
        {<span className="text-red-500">*</span>}
      </label> */}
      <ShadcnTextarea
        id="textarea-input"
        // {...register?.(name)}
        value={value}
        // placeholder={placeholder}
        onBlur={onBlur}
        onChange={handleChange}
        className={`w-full border border-[#d3e4e5] rounded-[0.5rem] focus:ring-accent focus:border-accent bg-[#f4fbfb] ${
          inputClassName ? inputClassName : "min-h-[80px]"
        }`}
        // required={required}
      />
       <label id="label-input">
            {" "}
            {generatedLabel}
            {required && <span className="text-red-500">*</span>}
          </label>
      {/* {required && !isFocused && (
        <div className="text-[13px] absolute top-3 left-4 text-[#A4A4AC]">
          Add Notes<span className="text-red-500">*</span>
        </div>
      )} */}
      {error && (
        <p className="text-red-500 text-sm mt-0.5 ml-2">{error.message}</p>
      )}
    </div>
  );
};

export default Textarea;
