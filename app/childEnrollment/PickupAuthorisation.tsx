import React, { useState } from "react";
import RadioInput from "@/components/common/RadioInput";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { FieldValues, UseFormRegister } from "react-hook-form";
import DocumentUpload from "@/components/common/DocumentUpload";
import { GENDER_TYPE } from "../Dropdowns";

interface PickupAuthorisationProps {
  control: any;
  //   register: UseFormRegister<FormData>;
}

const PickupAuthorisation: React.FC<PickupAuthorisationProps> = ({ control }) => {
  const [val, setVal] = useState<string>("");

  const options = [
    { value: "option1", label: "Yes" },
    { value: "option2", label: "No" },
    // Add more options as needed
  ];

  return (
    <>
      <h1 className='text-center mb-2 text-black-b1 mt-2'>Pickup Authorization(Optional)</h1>
      <hr/>
      <section className="mt-4">
        <span className="px-[17%] mb-4">Personal Details 1 :</span>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="w-4/12 flex flex-col gap-2">
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="First Name"
              name="firstName"
              control={control}
            />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Preferred Name (if any)"
              name="preferredName"
              control={control}
            />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="number"
              placeholder="Contact Number"
              name="lastName"
              control={control}
            />
          </div>
          <div className="w-4/12 flex flex-col gap-2">
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Last Name"
              name="lastName"
              control={control}
            />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Relation to the child"
              name="relationTochild"
              control={control}
            />
              <CustomSelect
                name="gender"
                label="Gender"
                options={GENDER_TYPE}
                control={control}
              />
          </div>
        </div>
        {/* <div className="text-blue-b1 text-right w-[70%] mx-auto mb-4">+ Add Another Contact</div> */}
        <span className="px-[17%] mb-4">Address :</span>
        <div className="flex flex-col items-center mt-4">
            <CustomInput
              className="w-[70%] p-3 "
              label=""
              type="text"
              placeholder="Address Line 1"
              name="addressLine1"
              control={control}
            />
            <CustomInput
              className="w-[70%] p-3"
              label=""
              type="text"
              placeholder="Address Line 2"
              name="addressLine2"
              control={control}
            />
        </div>
        <div className="flex items-center justify-center gap-6 mt-2">
          <div className="w-4/12 flex flex-col gap-2">
          <CustomSelect
              name="city"
              label="City"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
            <CustomSelect
              name="country"
              label="Country"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
          </div>
          <div className="w-4/12 flex flex-col gap-2">
            <CustomSelect
              name="state"
              label="State/Province"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
              ]}
              control={control}
            />
            <CustomInput
              label=""
              divclass="w-full"
              className="w-full p-3"
              type="text"
              placeholder="Postal Code"
              name="pincode"
              control={control}
            />
          </div>
        </div>
        </section>
    </>
  )
};

export default PickupAuthorisation;
