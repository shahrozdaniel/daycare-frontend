import React from "react";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import Textarea from "@/components/common/Textarea";
import Image from "next/image";

interface EducatorOtherDetailsProps {
  control: any; // or use proper type for control based on your setup
  register: any;
  handleStepBack: (index: number) => void;
}

const EducatorOtherDetails: React.FC<EducatorOtherDetailsProps> = ({
  control,
  register,
  handleStepBack,
}) => {
  return (
    <div>
      <div className="flex flex-row justify-center gap-[50px] items-center">
        {" "}
        {/* <h1 className="text-center self-center mb-2  mt-2 text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
          Educator’s Other details
        </h1>{" "} */}
        <div className="flex justify-center items-center">
          <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
            <Image
              src={"/svgs/educator-other-detail.svg"}
              alt="Logo"
              width={30}
              height={30}
              className="w-[2.24538rem] h-[2.25rem] object-contain"
            />
            <h1 className="text-center text-[1.875rem] p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Educator’s Other details
            </h1>
          </div>
        </div>
        {/* <button onClick={() => handleStepBack(key)}>
          <p className="text-right text-[#3a70e2]">skip</p>
        </button> */}
      </div>

      <hr />
      <section className="">
        <div className="flex-col p-5 w-full max-w-[826px] mx-auto items-center justify-center gap-6">
          <Textarea
            name="additionalDetails"
            label="Additional Details"
            control={control}
            placeholder="Additional Details"
          />
        </div>
      </section>
      {/* <Button>Next</Button> */}
    </div>
  );
};

export default EducatorOtherDetails;
