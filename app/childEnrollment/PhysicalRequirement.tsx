import React, { useEffect, useState } from "react";
import RadioInput from "@/components/common/RadioInput";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { FieldValues, UseFormRegister } from "react-hook-form";
import DocumentUpload from "@/components/common/DocumentUpload";
import Textarea from "@/components/common/Textarea";
import RegisterRadioInput from "@/components/common/RegisterRadioInput";
import Image from "next/image";
import EnrollmentTextarea from "@/components/common/EnrollmentTextarea";

interface PhysicalRequirementProps {
  control: any;
  register: any;
  setValue: any;
  data: any;
  //   register: UseFormRegister<FormData>;
}

const PhysicalRequirement: React.FC<PhysicalRequirementProps> = ({
  control,
  register,
  setValue,
  data,
}) => {
  const [val, setVal] = useState<string>("");

  const diaperOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const useWashroomOptions = [
    { value: "1", label: "Independently" },
    { value: "2", label: "Needs some assistance" },
    { value: "3", label: "Requires full support" },
  ];

  useEffect(() => {
    if (data) {
      let tempData = {
        physicalChildUseDiaper: data[0].physical_arrangement_details
          .child_use_diapers
          ? "yes"
          : "no",
        washroomOptions: String(
          data[0].physical_arrangement_details.child_use_washroom
        ),
        physicalReqOtherDetail:
          data[0].physical_arrangement_details.other_details,
        id: data[0].id,
      };

      Object.entries(tempData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [data]);
  return (
    <>
      <div className="flex justify-center items-center mb-4">
        <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/physical-detail.svg"}
            alt="Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Physical Requirement
          </h1>
        </div>
      </div>
      <div className="flex flex-col pl-[15%]">
        {" "}
        <div className="w-fit flex items-center gap-20 my-6">
          <h2>Does child use diapers?</h2>
          <RegisterRadioInput
            options={diaperOptions}
            control={control}
            // register={register}
            name={`physicalChildUseDiaper`}
          />
        </div>
        <div className="w-fit flex md:flex-col lg:flex-row  md:gap-5 lg:gap-20 md:mt-6 lg:mt-4">
          <h2>Uses washroom :</h2>
          <RegisterRadioInput
            options={useWashroomOptions}
            control={control}
            type="col"
            // register={register}
            name={`washroomOptions`}
          />
        </div>
      </div>

      <div className="w-[70%] mx-auto mt-10 flex flex-col">
        <EnrollmentTextarea
          name="physicalReqOtherDetail"
          label="Other Details:"
          control={control}
          register={register}
          placeholder="If you have other details that need to be shared"
        />
      </div>
    </>
  );
};

export default PhysicalRequirement;
