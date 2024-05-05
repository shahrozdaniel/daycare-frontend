import React, { useEffect, useState } from "react";
import RadioInput from "@/components/common/RadioInput";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { FieldValues, UseFormRegister } from "react-hook-form";
import DocumentUpload from "@/components/common/DocumentUpload";
import Image from "next/image";

interface SleepArrangementsProps {
  control: any;
  handleAddNapTime: any;
  data: any;
  addnaptime: any;
  register: any;
  setValue: any;
  handleRemoveTime: any;
  setAddNapTime: any;
  handleSkip: any;
  activeStep: number;
  error:any;

  //   register: UseFormRegister<FormData>;
}

const SleepArrangements: React.FC<SleepArrangementsProps> = ({
  control,
  handleAddNapTime,
  addnaptime,
  data,
  register,
  setValue,
  handleRemoveTime,
  setAddNapTime,
  handleSkip,
  activeStep,
  error
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
        napCount: data[0]?.sleep_arrangement_details?.nap_count,
        napDuration: data[0]?.sleep_arrangement_details?.nap_duration,
        id: data[0].id,
      };

      // setAddNapTime((prev: any) => [
      //   data[0]?.sleep_arrangement_details?.nap_times.length,
      // ]);
      setAddNapTime(
        data[0]?.sleep_arrangement_details?.nap_times.length > 0
          ? Array.from(
              { length: data[0]?.sleep_arrangement_details?.nap_times.length },
              (_, index) => index + 1
            )
          : [1]
      );

      data[0]?.sleep_arrangement_details?.nap_times?.map(
        (item: any, index: number) => {
          const fieldName = `sleepArrangment[${index}]`;
          setValue(`${fieldName}.napTime`, item);
        }
      );

      Object.entries(tempData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [data]);
  return (
    <section className="flex gap-[48px]justify-center items-center flex-col">
      <div className="flex justify-center items-center mb-4">
        <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/sleep-detail.svg"}
            alt="Logo"
            width={24}
            height={24}
            className=" object-contain "
          />
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Sleep Arrangements (Optional)
          </h1>
        </div>
      </div>
      {/* Rest of your code */}

      <div className="w-3/4  md:w-3/4 lg:w-2/3 ">
        <span className="mb-[8px] flex justify-start text-center">
        How many naps does your child typically take each day?{" "}
        </span>
        <CustomInput
          className="w-full p-3"
          label=""
          type="number"
          placeholder="Specify Number"
          name="napCount"
          register={register}
          control={control}
          error={error.napCount}
        />
      </div>

      <div className="w-3/4 md:w-3/4 lg:w-2/3 mt-5">
        <span className=" mx-auto flex justify-start mb-[8px] text-center">
        At what time does the child usually take a nap?
        </span>
        {addnaptime?.map((item: any, index: number) => {
          const fieldName = `sleepArrangment[${index}]`;
          return (
            <div className="w-full flex flex-col" key={index}>
              <CustomInput
                className="w-full p-3"
                label=""
                type="time"
                placeholder="Nap Time"
                name={`${fieldName}.napTime`}
                control={control}
                register={register}
              />

              <div className="flex justify-between w-full">
                <div>
                  {addnaptime.length === index + 1 && (
                    <button
                      className="text-[#00858E] my-2 text-sm"
                      type="button"
                      onClick={handleAddNapTime}
                    >
                      + Add another time
                    </button>
                  )}
                </div>

                <div className="pr-2">
                  {addnaptime.length !== 1 && (
                    <button
                      className="text-[#00858E] my-2 text-right text-sm"
                      type="button"
                      onClick={() => handleRemoveTime(index, "sleepArrangment")}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-3/4 md:w-3/4 lg:w-2/3 ">
        <span className=" mx-auto  flex justify-start  mb-[8px] text-center">
          How long does the child usually nap?
        </span>
        <CustomInput
          className="w-full p-3"
          label=""
          type="number"
          placeholder="Specify Number"
          name="napDuration"
          control={control}
          register={register}
          error={error.napDuration}
        />
      </div>
    </section>
  );
};

export default SleepArrangements;
