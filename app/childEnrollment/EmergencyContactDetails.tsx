import React, { useEffect, useState } from "react";
import RadioInput from "@/components/common/RadioInput";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { FieldValues, UseFormRegister } from "react-hook-form";
import DocumentUpload from "@/components/common/DocumentUpload";
import RegisterRadioInput from "@/components/common/RegisterRadioInput";
import { GENDER_TYPE } from "../Dropdowns";
import Image from "next/image";
import { formatPhoneNumber } from "@/utils/utilityFunctions";
import CustomFormattedNumberInput from "@/components/common/CustomFormattedNumberInput";

interface EmergencyContactDetailsProps {
  control: any;
  setValue: any;
  register: any;
  data: any;
  addDetailsSection: any;
  detailsSection: any;
  handleRemove: any;
  setDetailsSection: any;
  watch?: any;
  errors?: any;
  //   register: UseFormRegister<FormData>;
}

const EmergencyContactDetails: React.FC<EmergencyContactDetailsProps> = ({
  control,
  setValue,
  register,
  data,
  addDetailsSection,
  detailsSection,
  handleRemove,
  setDetailsSection,
  watch,
  errors,
}) => {
  const [val, setVal] = useState<string>("");

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    // Add more options as needed
  ];
  useEffect(() => {
    if (data) {
      let filteremergency = data.filter(
        (item: any) => item.is_emergency_contact === true
      );
      // setDetailsSection(filteremergency?.length)
      // setDetailsSection([filteremergency.length]);

      setDetailsSection(
        filteremergency.length > 0
          ? Array.from(
              { length: filteremergency.length },
              (_, index) => index + 1
            )
          : [1]
      );

      filteremergency.map((item: any, index: number) => {
        const fieldName = `emergencyContactDetails[${index}]`;

        setValue(
          `${fieldName}.isPickupAuthorized`,
          item.is_pickup_authorized ? "yes" : "no"
        );
        setValue(`${fieldName}.firstName`, item.first_name);
        setValue(`${fieldName}.lastName`, item.last_name);
        setValue(`${fieldName}.preferredName`, item.preferred_name);
        setValue(`${fieldName}.contact`, item.phone_no);
        setValue(`${fieldName}.relation`, item.relation);
        setValue(`${fieldName}.gender`, item.gender);
        setValue(`${fieldName}.id`, item.id);
        setValue(`${fieldName}.email`, item.email);
      });
    }
  }, [data]);

  // useEffect(() => {
  //   const formattedNumber = formatPhoneNumber(watch("parent1Contact"));
  //   formattedNumber&&setValue("parent1Contact",formattedNumber);
  // }, [watch('parent1Contact')]);

  return (
    <>
      <div className="flex justify-center items-center mb-4">
        <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/emergency-detail.svg"}
            alt="Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Emergency Contact Details
          </h1>
        </div>
      </div>
      <section className="">
        {detailsSection?.map((item: any, index: any) => {
          const fieldName = `emergencyContactDetails[${index}]`;
          console.log(
            "errors",
            errors &&
              errors?.emergencyContactDetails &&
              errors?.emergencyContactDetails[index]
          );
          return (
            <div key={index} className="flex flex-col">
              <div className="mx-auto w-fit flex md:flex-col lg:flex-row items-center md:gap-5 lg:gap-20 mb-8 ml-[17%] mt-4">
                <h2>Authorization to pick up the child ?</h2>
                <RegisterRadioInput
                  options={options}
                  control={control}
                  // register={register}
                  name={`${fieldName}.isPickupAuthorized`}
                />
              </div>
              <span className="px-[17%] mb-2">Contact {index + 1} :</span>

              <div className="flex items-center justify-center gap-5 mt-3">
                <div className="w-4/12 flex flex-col gap-5">
                  <CustomInput
                    label=""
                    divclass="w-full"
                    className="w-full p-3"
                    type="text"
                    placeholder="First Name"
                    name={`${fieldName}.firstName`}
                    control={control}
                    register={register}
                  />
                  <CustomInput
                    label=""
                    divclass="w-full"
                    className="w-full p-3"
                    type="text"
                    placeholder="Preferred Name (if any)"
                    name={`${fieldName}.preferredName`}
                    control={control}
                    register={register}
                  />
                  <CustomFormattedNumberInput
                    label=""
                    divclass="w-full"
                    className="w-full p-3"
                    type="text"
                    name={`${fieldName}.contact`}
                    placeholder="Contact Number"
                    register={register}
                    control={control}
                    watch={watch}
                    setValue={setValue}
                    error={
                      errors &&
                      errors?.emergencyContactDetails &&
                      errors?.emergencyContactDetails[index]?.contact
                    }
                  />
                </div>
                <div className="w-4/12 flex flex-col gap-5">
                  <CustomInput
                    label=""
                    divclass="w-full"
                    className="w-full p-3"
                    type="text"
                    placeholder="Last Name"
                    name={`${fieldName}.lastName`}
                    control={control}
                    register={register}
                  />
                  <CustomInput
                    label=""
                    divclass="w-full"
                    className="w-full p-3"
                    type="text"
                    placeholder="Relation to the child"
                    name={`${fieldName}.relation`}
                    control={control}
                    register={register}
                  />
                  <CustomSelect
                    name={`${fieldName}.gender`}
                    label="Gender"
                    options={GENDER_TYPE}
                    control={control}
                    register={register}
                  />
                </div>
              </div>
              {/* <div className="flex justify-between pl-[12%] pr-[16%]">
                <div className="w-4/12 flex flex-col ">
                  {detailsSection.length === index + 1 && (
                    <button
                      className="text-[#00858E] text-right w-[70%] mx-auto my-4 text-sm"
                      onClick={addDetailsSection}
                      type="button"
                    >
                      + Add Another Contact
                    </button>
                  )}
                </div>
                <div
                  className="w-4/12 flex flex-col"
                >
                  {detailsSection.length !== 1 && (
                    <button
                      type="button"
                      className="cursor-pointer text-right text-[#00858E] my-2 text-sm"
                      onClick={() =>
                        handleRemove(index, "emergencyContactDetails")
                      }
                    >
                      Remove
                    </button>
                  )}
                  {/* {index > 0 && (
                    <button
                      type="button"
                      className="cursor-pointer text-right text-[#00858E] my-2"
                      onClick={() =>
                        handleRemove(index, "emergencyContactDetails")
                      }
                    >
                      Remove 
                    </button>
                  )} 
                </div>
              </div> */}

              {/* <div className="flex justify-center items-center gap-4 w-[60%]">
                {index > 0 && (
                  <button
                    type="button"
                    className="cursor-pointer text-right text-[#3a70e2]"
                    onClick={() =>
                      handleRemove(index, "emergencyContactDetails")
                    }
                  >
                    Remove
                  </button>
                )}
                <button
                  className="text-blue-b1 text-right w-[70%] mx-auto mb-4"
                  onClick={addDetailsSection}
                  type="button"
                >
                  + Add Another Contact
                </button>
              </div> */}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default EmergencyContactDetails;
