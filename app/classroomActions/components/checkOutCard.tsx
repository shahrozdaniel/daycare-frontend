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
import { classroomCheckOut } from "./classroomValidationSchema";
interface useFormType {
  status: string;
  checkOut: string;
  checkOutNote: string;
}
interface props {
  submitClassRoomAction: any;
}

const CheckOutCard: React.FC<props> = ({ submitClassRoomAction }) => {
  const [dateTime, setDateTime] = useState<string>();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<any>({ resolver: yupResolver(classroomCheckOut) });
  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    const body: any = {
      status: "1",
      checkOut: data?.checkOut,
      checkOutNote: data?.checkOutNote,
    };
    // submitClassRoomAction("12", body);
    let res;
    try {
      res = await submitClassRoomAction("12", body);
      if (res?.success) {
        toast.success("Checkout Time successfully added");
        reset();
      }
    } catch (err: any) {
      console.log("check in ", err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div>
      <CommonFormToggleComponent headerText="Check Out to selected children">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center  gap-[24px]">
            <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              {/* <label className="font-size[7px]">Date & Time</label> */}
              <CustomInput
                label="Check Out Time"
                type="time"
                placeholder="Check Out Time"
                name="checkOut"
                control={control}
                className="rounded-[20px] bg-[#F5F5F5] p-2"
                register={register}
                error={errors?.checkOut}
                required
              />
            </div>
            <div className="md:w-[100%] lg:w-[50%]">
              <CustomInput
                label="check out Note"
                type="text"
                placeholder="Notes"
                name="checkOutNote"
                control={control}
                className="rounded-[20px] bg-[#F5F5F5] p-2"
                register={register}
                error={errors?.checkOutNote}
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
    </div>
  );
};

export default CheckOutCard;
