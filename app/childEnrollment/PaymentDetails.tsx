import React, { useState } from "react";
import RadioInput from "@/components/common/RadioInput";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { FieldValues, UseFormRegister } from "react-hook-form";
import DocumentUpload from "@/components/common/DocumentUpload";
import Textarea from "@/components/common/Textarea";

interface PaymentDetailsProps {
    control: any;
    //   register: UseFormRegister<FormData>;
  }

const PaymentDetails : React.FC<PaymentDetailsProps> = ({ control }) => {

    const [val, setVal] = useState<string>("");

    const options = [
        { value: "option1", label: "Yes" },
        { value: "option2", label: "No" },
    ]

  return (
    <>
        <h1 className='text-center mb-2 text-black-b1 mt-2'>Payment Details</h1>
        <hr/>
        <div className="mx-auto w-fit flex items-center gap-20 mt-8">
          <h2>Payment Recieved?:</h2>
          <RadioInput
            options={options}
            value={""}
            onChange={(value:any) => setVal(value)}
            // register={register}
            name="radioOption"
          />
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
            <div className="w-4/12">
                <DatePickerComponent name='' label='Start Date' control={control}/>
            </div>
          <div className="w-4/12">
            <CustomSelect
            name="paymentMode"
            label="Mode of Payment"
            options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                // Add more options as needed
            ]}
            control={control}
            />
          </div>
        </div>
        
    </>
  )
}

export default PaymentDetails