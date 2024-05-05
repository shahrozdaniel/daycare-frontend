"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import RadioInput from "@/components/common/RadioInput";
import CircularSwitch from "@/components/common/CircularSwicth";
import DocumentUpload from "@/components/common/DocumentUpload";
import UploadImageComponent from "../classroomActions/components/uploadImageComponent";

interface FormData {
    // Define your form values
    mySwitch: boolean;
  }

const RaiseTicket = () => {
  const { control, handleSubmit, register, setValue, watch } = useForm<FormData>();

  const [val, setVal] = useState<string>("");

  const switchValue = watch('mySwitch');

  const options = [
    { value: "option1", label: "No Identification Required" },
    { value: "option2", label: "Name/Initial(Typed)" },
    { value: "option3", label: "Electronic Signature" },
  ];

  return (
    <>
      <h1 className="text-center mb-2 text-black-b1 mt-2">Add Document</h1>
      <hr />
      <div className="w-4/6 mx-auto mt-10">

        <div className="flex items-center justify-center gap-3 mt-2 text-grey-g1">
          <div className="w-6/12 flex flex-col gap-2">
            <CustomSelect
              name="docType"
              label="Category"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
          </div>
          <div className="w-6/12 flex flex-col gap-2">
            <CustomSelect
              name="docLabel"
              label="Topic"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
          </div>
        </div>
        <CustomInput type="text" label="" name="documentName" control={control} placeholder="Problem/Description"/>
        <div className="flex justify-center">
            <UploadImageComponent control={control} name="upload"/>
        </div>
      </div>
    </>
  );
};

export default RaiseTicket;
