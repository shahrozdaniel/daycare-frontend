import React, { useState } from "react";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { Checkbox } from "@/components/ui/checkbox";
import DaysComponent from "./components/DaysComponent";
import { AvailabilityState } from "./components/DaysComponent";
import { SetAvailabilityFunction } from "./components/DaysComponent";
import moment from "moment";
import Image from "next/image";
interface EducatorAvailabilityProps {
  control: any; // or use proper type for control based on your setup
  register: any;
  value: AvailabilityState;
  setValue: SetAvailabilityFunction;
  watch?: any;
  errors?: any;
  error?: any;
  setError?: any;
}

const EducatorAvailability: React.FC<EducatorAvailabilityProps> = ({
  control,
  register,
  value,
  setValue,
  watch,
  errors,
  error,
  setError,
}) => {
  const [employmentType, setEmploymentType] = useState<string>("1");

  // const handleEmploymentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   alert(123)
  //   setEmploymentType(e.target.value);
  // };
  let watchEmployment = watch("employementtype");
  return (
    <>
      {/* <h1 className="text-center mb-2  mt-2 text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium"></h1> */}
      <div className="flex justify-center items-center">
        <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/educator-availability-detail.svg"}
            alt="Logo"
            width={30}
            height={30}
            className="w-[2.24538rem] h-[2.25rem] object-contain"
          />
          <h1 className="text-center text-[1.875rem] p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Educator’s Availability
          </h1>
        </div>
      </div>
      <section className="">
        <div className="flex-col p-5 w-full max-w-[826px] mx-auto items-center justify-center gap-6">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <div className="flex gap-3 w-full">
              <CustomInput
                className="w-full p-3"
                label=""
                type="date"
                placeholder="Start date"
                name="employmentStartDate"
                control={control}
                divclass="w-full"
                register={register}
                required={true}
                error={errors.employmentStartDate}
              />
              <div className="w-full">
                <CustomSelect
                  name="employementtype"
                  label="Employee Type"
                  required
                  options={[
                    { value: "", label: "Select employment type" },
                    { value: "1", label: "Full Time" },
                    { value: "2", label: "Part time" },
                    // Add more options as needed
                  ]}
                  control={control}
                  register={register}
                  // onChange={(e) => handleEmploymentTypeChange(e)}
                  error={errors.employementtype}
                />
              </div>
            </div>

            {/* availibility------------------------- */}
            {/* {employmentType === "2" &&  */}
            {watchEmployment == 2 && (
              <div className="w-full flex flex-col items-left">
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mb-2">
                  Available days and time :
                </div>
                <DaysComponent
                  control={control}
                  value={value}
                  setValue={setValue}
                  error={error}
                  setError={setError}
                />
              </div>
            )}
            {/* availibility------------------------- */}
          </div>
        </div>
      </section>
      {/* <Button>Next</Button> */}
    </>
  );
};

export default EducatorAvailability;
