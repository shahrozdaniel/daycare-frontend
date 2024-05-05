import { DatePickerComponent } from "@/components/ui/datePicker";
import { Separator } from "@/components/ui/separator";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";
import React, { useState } from "react";
import CommonFormToggleComponent from "./commonFormToggle/commonFormToggle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomCheckIn } from "./classroomValidationSchema";
interface useFormType {
  Notes: string;
}
interface props {
  submitClassRoomAction: any;
}

const CheckInCard: React.FC<props> = ({ submitClassRoomAction }) => {
 
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<any>({ resolver: yupResolver(classroomCheckIn) });
 
  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    try {
      const body: any = {
        status: "1",
        checkIn: data?.checkIn,
        checkInNote: data?.checkInNote,
      };
      let res;
      res = await submitClassRoomAction("1", body);
      if (res?.success) {
        toast.success("CheckIn Time successfully added");
        reset();
        window.location.reload();
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div>
      <CommonFormToggleComponent headerText="Check In to selected children">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center  gap-[24px]">
            <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              {/* <label className="font-size[7px]">Date & Time</label> */}
              {/* <input
                type="datetime-local"
                name="checkIn"
                className="rounded-[20px] bg-[#F5F5F5] p-4"
                placeholder="Date & Time"
                onChange={(e) => setDateTime(e.target.value)}
              /> */}
              <CustomInput
                label="Check In Time"
                type="time"
                // placeholder="Notes"
                name="checkIn"
                control={control}
                className="rounded-[20px] bg-[#F5F5F5] p-2"
                register={register}
                error={errors?.checkIn}
                // onChange={handleTimeChange}
                required
              />
            </div>
            <div className="md:w-[100%] lg:w-[50%]">
              <CustomInput
                label="Check In Note"
                type="text"
                placeholder="Notes"
                name="checkInNote"
                control={control}
                className="rounded-[20px] bg-[#F5F5F5] p-2"
                register={register}
                error={errors?.checkInNote}
                required
              />
            </div>
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

export default CheckInCard;
