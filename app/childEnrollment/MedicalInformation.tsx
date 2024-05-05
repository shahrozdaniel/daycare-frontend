import React, { useState, useEffect } from "react";
import RadioInput from "@/components/common/RadioInput";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { FieldValues, UseFormRegister } from "react-hook-form";
import DocumentUpload from "@/components/common/DocumentUpload";
import Textarea from "@/components/common/Textarea";
import Image from "next/image";
import ImmunisationDocument from "./components/ImmunisationDocument";
 
interface MedicalInformationProps {
  control: any;
  data: any;
  register: any;
  setValue: any;
  setIsChildAnaphylactic: any;
  isChildAnaphylactic: any;
  showallergyfile?:any
  setShowAllergyFile?:any
  //   register: UseFormRegister<FormData>;
}

const MedicalInformation: React.FC<MedicalInformationProps> = ({
  control,
  register,
  setValue,
  data,
  setIsChildAnaphylactic,
  isChildAnaphylactic,
  showallergyfile,
  setShowAllergyFile
}) => {
  // const [showallergyfile, setShowAllergyFile] = useState(false);
  useEffect(() => {
    if (data) {
      setValue("medication", data.medication_details.medication);
      setValue("allergies", data.allergy_details.allergies);
      setValue("medicalInfoId", data.id);
    }
  }, [data]);
  return (
    <>
      <div className="flex justify-center items-center mb-4">
        <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/medical-detail.svg"}
            alt="Logo"
            width={24}
            height={24}
            className="object-contain "
          />
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Medical Information
          </h1>
        </div>
      </div>
      <div className="w-[68%] mx-auto mt-8 flex flex-col gap-y-1 gap-x-4">
        <Textarea
          name="allergies"
          label="Allergies:"
          control={control}
          register={register}
          placeholder="List of the Allergies(if any)"
        />
        {/* <DocumentUpload
          name="doc"
          label="Upload Document"
          control={control}
          className="flex self-end"
        /> */}
        <Textarea
          name="medication"
          label="Medication:"
          control={control}
          placeholder="List of all Medications"
          register={register}
        />

        <div className="w-fit flex md:flex-col lg:flex-row items-start md:gap-5 lg:gap-20 mb-8 mt-4 ">
          <h2>Is the child Anaphylactic?</h2>
          <div className="flex flex-row gap-5">
            <input
              type="radio"
              name="childAnaphylactic"
              onChange={(e: any) => {
                setIsChildAnaphylactic(true);
                setShowAllergyFile(true);
              }}
              checked={isChildAnaphylactic}
            />
            <label>Yes</label>
            <input
              type="radio"
              name="childAnaphylactic"
              onChange={(e: any) => {
                setIsChildAnaphylactic(false);
                setShowAllergyFile(false);
              }}
              checked={!isChildAnaphylactic}
            />
            <label>No</label>
            {/* <input
              type="radio"
              name="parentIsCustodian"
              onChange={(e: any) => setisCustdion(null)}
              checked={custudian === null ? true : false}
            />
            <label>Not required</label> */}
          </div>
        </div>
        {showallergyfile && (
          <div className="w-fit mx-auto flex jsutify-center items-center">
            {" "}
            <ImmunisationDocument
              name="allergy_file"
              label="Upload Document"
              control={control}
              className="flex"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MedicalInformation;
