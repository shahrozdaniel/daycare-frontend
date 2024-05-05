import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";
import React, { useState } from "react";
import CommonFormToggleComponent from "./commonFormToggle/commonFormToggle";
import CustomSelect from "@/components/common/CustomSelect";
import { SleepCheck } from "@/app/Dropdowns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomSleepRecords } from "./classroomValidationSchema";
import { error } from "console";
import { Checkbox } from "@/components/ui/checkbox";
interface useFormType {
  // image: File;
  startTime: string;
  endTime: string;
  sleepCheck: string;
  DoNotSleep: string;
  addNotes: string;
}
interface props {
  submitClassRoomAction: any;
}

const AddSleepRecord: React.FC<props> = ({ submitClassRoomAction }) => {
  const [time, setTime] = useState<string>("");
  const [endtime, setEndTime] = useState<string>("");

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch
  } = useForm<any>({ resolver: yupResolver(classroomSleepRecords) });

  const sleepCheck = watch('sleepCheck')
  console.log(sleepCheck)
  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    // console.log(data)
    let body = {
      sleepRecord: {
        startTime: data?.startTime,
        endTime: data?.endTime,
        sleepCheck: data?.sleepCheck ? data?.sleepCheck : '',
        DoNotSleep: data?.DoNotSleep,
        addNotes: data?.addNotes,
      },
    };
    let res;

    try {
      res = await submitClassRoomAction("6", body);
      if (res?.success) {
        toast.success("Sleep Time successfully added");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <CommonFormToggleComponent headerText="Add sleep time to selected children">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              <label className="font-size[7px]">Date & Time</label>
              <input type="datetime-local" name="checkIn" className="rounded-[20px] bg-[#F5F5F5] p-2" placeholder="Date & Time" onChange={(e) => setDateTime(e.target.value)} />
            </div> */}

          <div className="flex flex-col items-center  gap-[24px]">
            <div className="flex gap-[15px] w-full">
              <div className="flex-col w-full">
                <CustomInput
                  label="Start Time"
                  type="time"
                  placeholder="Start Time"
                  name="startTime"
                  control={control}
                  className="p-2"
                  register={register}
                  error={errors?.startTime}
                  required
                />
              </div>
              <div className="flex-col w-full">
                <CustomInput
                  label="End Time"
                  type="time"
                  placeholder="End Time"
                  name="endTime"
                  control={control}
                  className="p-2"
                  register={register}
                  error={errors?.endTime}
                  required
                />
              </div>
            </div>
            <div className="flex gap-[15px] w-full">
              <div className="flex-col w-full">
                <CustomSelect
                  label="Sleep Check"
                  name="sleepCheck"
                  control={control}
                  className=""
                  register={register}
                  options={SleepCheck}
                  error={errors?.sleepCheck}
                  required
                />
              </div>
              <div className="flex-col w-full">
                {/* <CustomInput
                      label=""
                      type="text"
                      placeholder="Do Not Sleep "
                      name="DoNotSleep"
                      control={control}
                      className="p-2"
                      register={register}
                      error={errors?.DoNotSleep}
                    /> */}
                {sleepCheck === 'Other' ?
                  <label className="flex items-center space-x-2 bg-input_bg rounded-[20px] w-full h-full px-2 justify-between">
                    <span className="text-[#707070] text-base">{`Didn't Sleep`}</span>
                    <input
                      type="checkbox"
                      {...register("DoNotSleep")}
                      className="form-checkbox text-blue-600"
                    />
                  </label> : ""}

              </div>
            </div>
            <CustomInput
              label=""
              type="text"
              placeholder="Add Notes"
              name="addNotes"
              control={control}
              className="p-2"
              register={register}
              error={errors?.addNotes}
              required
            />

          </div>
          <div className="flex justify-end w-full gap-6 mt-[20px]">
            <Button type="button" form="white" className="">
              Cancel
            </Button>
            <Button type="submit" form="blue" className="">
              Add
            </Button>
          </div>
        </form>
      </CommonFormToggleComponent>
      <ToastContainer />
    </div>
  );
};

export default AddSleepRecord;
