import React, { useEffect, useState } from "react";
import RadioInput from "@/components/common/RadioInput";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { FieldValues, UseFormRegister } from "react-hook-form";
import DocumentUpload from "@/components/common/DocumentUpload";
import Image from "next/image";

interface DietaryInformationProps {
  control: any;
  register: any;
  setValue: any;
  data: any;
  handleSkip: any;
  activeStep: number;

  //   register: UseFormRegister<FormData>;
}

const DietaryInformation: React.FC<DietaryInformationProps> = ({
  control,
  register,
  setValue,
  data,
  handleSkip,
  activeStep,
}) => {
  const [val, setVal] = useState<string>("");

  const options = [
    { value: "option1", label: "Yes" },
    { value: "option2", label: "No" },
    // Add more options as needed
  ];
  useEffect(() => {
    if (data) {
      let tempData = {
        foodType: data[0].dietary_details?.food_type,
        pleaseSpecify: data[0].dietary_details?.food_details,
        specifyDietary: data[0].dietary_details?.other_details,
        id: data[0].id,
      };
      Object.entries(tempData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [data]);
  return (
    <>
      <div className="flex justify-center items-center mb-6">
        <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/dietary-detail.svg"}
            alt="Logo"
            width={24}
            height={24}
            className="object-contain mb-1 "
          />
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Dietary or Feeding Information (Optional)
          </h1>
        </div>
      </div>

      <section className="mt-4">
        <div className="mb-4">
          <span className="px-[17%] mb-4">Personal Details: </span>
          <div className="flex items-center justify-center gap-y-5 gap-x-4 mx-2 mt-4">
            <div className="w-4/12 flex flex-col gap-2">
              <CustomSelect
                name="foodType"
                label="Food Type"
                options={[
                  { value: "", label: "Select Food Type" },
                  { value: "Veg", label: "Veg" },
                  { value: "Non-Veg", label: "Non-Veg" },
                  { value: "Vegan", label: "Vegan" },
                  { value: "Other", label: "Other" },
                  // Add more options as needed
                ]}
                control={control}
                register={register}
              />
            </div>
            <div className="w-4/12 flex flex-col gap-2">
              <CustomInput
                label=""
                divclass="w-full"
                className="w-full p-3"
                type="text"
                placeholder="Please Specify"
                name="pleaseSpecify"
                control={control}
                register={register}
              />
            </div>
          </div>
        </div>

        {/* <div className="text-blue-b1 text-right w-[70%] mx-auto mb-4">+ Add Another Contact</div> */}
        <span className="md:mx-auto md:px-[6%] lg:px-[17%] mb-4">
          If have any other feeding or dietary arrangement, please specify it :
        </span>
        <div className="flex flex-col items-center mt-4">
          <div className="w-[68%]">
            {" "}
            <CustomInput
              className="w-[70%] p-3"
              label=""
              type="text"
              placeholder="Specify Dietary"
              name="specifyDietary"
              register={register}
              control={control}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default DietaryInformation;
