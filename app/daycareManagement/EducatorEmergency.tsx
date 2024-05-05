import React, { useEffect, useState } from "react";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { GENDER_TYPE } from "../Dropdowns";
import Image from "next/image";

interface EducatorEmergencyProps {
  control: any; // or use proper type for control based on your setup
  register: any;
  watch: any;
  setValue?: any;
  errors: any;
  detailssection: any;
  setDetailsSection: any;
}

const EducatorEmergency: React.FC<EducatorEmergencyProps> = ({
  control,
  register,
  watch,
  setValue,
  errors,
  detailssection,
  setDetailsSection,
}) => {
  // const [detailssection, setDetailsSection] = useState<number[]>([1]);

  const addDetailsSection = () => {
    setDetailsSection((prevSections: any) => [
      ...prevSections,
      prevSections.length + 1,
    ]);
  };
  const handleRemove = (
    index: number,
    statename: any,
    setStateName: any,
    fieldName: any
  ) => {
    // console.log('documentSections---->', statename)
    // console.log('index', index)
    // console.log('statename', setStateName)
    let filtercontact = watch(fieldName).filter((item: any, id: number) => {
      return id !== index;
    });

    setValue(fieldName, filtercontact);
    let removeItems = [...statename];
    removeItems.splice(index, 1);
    setStateName(removeItems);
  };
  return (
    <>
      {/* <h1 className="text-center mb-2  mt-2 text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
        Educator’s Emergency contact details
      </h1>
      <hr /> */}
      <div className="flex justify-center items-center">
        <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/educator-emergency-detail.svg"}
            alt="Logo"
            width={30}
            height={30}
            className="w-[2.24538rem] h-[2.25rem] object-contain"
          />
          <h1 className="text-center text-[1.875rem] p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Educator’s Emergency contact details
          </h1>
        </div>
      </div>
      <section className="">
        <div className="flex-col p-5 w-full max-w-[826px] mx-auto items-center justify-center gap-6">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            {detailssection?.map((item: any, index: number) => {
              const fieldName = `emergencyDetail[${index}]`;
              return (
                <div key={index} className="w-full">
                  <div className="flex gap-3 justify-start items-center">
                    {" "}
                    {index == 0 && (
                      <button
                        className="text-right text-[#00858E] my-2"
                        onClick={addDetailsSection}
                        type="button"
                      >
                        + Add Another Contact
                      </button>
                    )}
                    {index > 0 && (
                      <span
                        className="cursor-pointer text-right text-[#00858E] my-2"
                        onClick={() =>
                          handleRemove(
                            index,
                            detailssection,
                            setDetailsSection,
                            "emergencyDetail"
                          )
                        }
                      >
                        Remove
                      </span>
                    )}
                    <p>{watch(`${fieldName}.doc`)?.name}</p>
                  </div>
                  <div className="flex gap-3 w-full mb-3">
                    <CustomInput
                      className="w-full p-3"
                      divclass="w-full"
                      label=""
                      type="text"
                      placeholder="First Name"
                      name={`${fieldName}.firstName`}
                      control={control}
                      register={register}
                    />
                    <CustomInput
                      className="w-full p-3"
                      divclass="w-full"
                      label=""
                      type="text"
                      placeholder="Last Name"
                      name={`${fieldName}.lastName`}
                      control={control}
                      register={register}
                    />
                  </div>
                  <div className="flex gap-3 w-full mb-3">
                    <CustomInput
                      className="w-full p-3"
                      divclass="w-full"
                      label=""
                      type="text"
                      placeholder="Preferred Name (if any)"
                      name={`${fieldName}.prefferedName`}
                      control={control}
                      register={register}
                    />
                    <CustomInput
                      className="w-full p-3"
                      divclass="w-full"
                      label=""
                      type="text"
                      placeholder="Relation"
                      name={`${fieldName}.relation`}
                      control={control}
                      register={register}
                    />
                  </div>
                  <div className="flex gap-3 w-full mb-3">
                    <CustomInput
                      className="w-full p-3"
                      divclass="w-full"
                      label=""
                      type="text"
                      placeholder="Contact Number"
                      name={`${fieldName}.contactNumber`}
                      control={control}
                      error={
                        errors?.emergencyDetail &&
                        errors?.emergencyDetail[index]?.contactNumber
                      }
                      register={register}
                    />

                    <CustomSelect
                      label="Gender"
                      options={GENDER_TYPE}
                      control={control}
                      name={`${fieldName}.gender`}
                      register={register}
                    />
                  </div>
                  {/* <div className="flex gap-3 justify-between items-center">
                    {" "}
                    <button
                      className="text-right text-[#3a70e2]"
                      onClick={addDetailsSection}
                      type="button"
                    >
                      + Add Another
                    </button>
                    <p>{watch(`${fieldName}.doc`)?.name}</p>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* <Button>Next</Button> */}
    </>
  );
};

export default EducatorEmergency;
