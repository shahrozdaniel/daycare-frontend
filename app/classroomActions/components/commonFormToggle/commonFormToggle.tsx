import React, { ReactNode } from "react";
import { DatePickerComponent } from "@/components/ui/datePicker";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";

interface CommonFormPropTypes {
  headerText: string;
  children: ReactNode;
}
const CommonFormToggleComponent: React.FC<CommonFormPropTypes> = ({
  headerText,
  children,
}) => {
  return (
    <div className="flex flex-col  gap-[40px] w-full">
      <div className="mb-5 text-center w-full">
        <span className="text-[20px] font-medium leading-9 text-[#4B4B4B]">
          {headerText}
        </span>
        <hr className="bg-[#00858E] mx-auto w-2/5 h-[3px] mt-1" />
      </div>

      <div className="w-[70%] mx-auto">
        {children}
      </div>
    </div>
  );
};

export default CommonFormToggleComponent;
