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

interface OtherDetailsProps {
  control: any;
  register: any;
  setValue: any;
  data: any;
  //   register: UseFormRegister<FormData>;
}

const OtherDetails: React.FC<OtherDetailsProps> = ({
  control,
  register,
  setValue,
  data,
}) => {
  const [val, setVal] = useState<string>("");

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
  useEffect(() => {
    if (data) {
      let tempData = {
        otherChildUseDiapers: data[0].diaper_arrangement_details
          .child_use_diapers
          ? "yes"
          : "no",
        otherDetails: data[0].diaper_arrangement_details.other_details,
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
            src={"/svgs/Group.svg"}
            alt="Logo"
            width={24}
            height={24}
            className="object-contain mb-2 "
          />
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Other Details (Optional)
          </h1>
        </div>
      </div>
      <div className="mx-auto w-fit flex items-center gap-20 mt-8">
        <h2>Does child use Diapers?</h2>
        <RegisterRadioInput
          options={options}
          control={control}
          // register={register}
          name={`otherChildUseDiapers`}
        />
      </div>
      <div className="w-[70%] mx-auto mt-10 flex flex-col">
        <Textarea
          name="otherDetails"
          label="Other Details:"
          control={control}
          register={register}
          placeholder="If you have other details that need to be shared"
        />
      </div>
    </>
  );
};

export default OtherDetails;
