import React, { ChangeEvent } from "react";
import { useController, FieldValues, UseFormRegister } from "react-hook-form";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";

interface TextareaProps {
  name: string;
  label: string;
  control: any;
  register?: any;
  className?: string;
  placeholder: string;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  error?: any;
  required?: boolean;
}

const EnrollmentTextarea: React.FC<TextareaProps> = ({
  name,
  label,
  control,
  register,
  className,
  placeholder,
  required,
}) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  const generatedLabel = label || placeholder;
  return (
    <div className={`mb-4 ${className}`}>
      {/* <label id="label-input" htmlFor={name}>
        {" "}
        {generatedLabel}
        {required && <span className="text-red-500">*</span>}
      </label> */}
      <ShadcnTextarea
        // {...register?.(name)}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={handleChange}
        className="w-full border border-[#d3e4e5] rounded-[0.5rem] p-3 focus:ring-accent focus:border-accent bg-[#f4fbfb] min-h-[110px]"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default EnrollmentTextarea;
