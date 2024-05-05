import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";
import React, { useState } from "react";
import CommonFormToggleComponent from "./commonFormToggle/commonFormToggle";
import CustomSelect from "@/components/common/CustomSelect";
import { FluidType, Quantity } from "@/app/Dropdowns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomFluidReport } from "./classroomValidationSchema";
interface useFormType {
  // image: File;
  fluidType: string;
  addNotes: string;
  quantity: string;
}
interface props {
  submitClassRoomAction: any;
}

const AddRecordFluidCard: React.FC<props> = ({ submitClassRoomAction }) => {
  const [time, setTime] = useState<string>("");
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<any>({ resolver: yupResolver(classroomFluidReport) });

  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    // console.log(data)
    let body = {
      fluidRecord: {
        fluidType: data?.fluidType,
        intakeTime: data?.intakeTime,
        quantity: data?.quantity,
        addNotes: data?.addNotes,
      },
    };

    let res;
    try {
      res = await submitClassRoomAction("3", body);
      if (res?.success) {
        toast.success("Fluid successfully added");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <CommonFormToggleComponent headerText="Record Fluid for selected children">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center  gap-[24px]">
            {/* <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              <label className="font-size[7px]">Date & Time</label>
              <input type="datetime-local" name="checkIn" className="rounded-[20px] bg-[#F5F5F5] p-2" placeholder="Date & Time" onChange={(e) => setDateTime(e.target.value)} />
            </div> */}
              <div className="w-full flex flex-col items-center  gap-[24px]">
                <div className="w-full flex gap-[15px]">
                  <div className="flex-col w-full">
                    <CustomSelect
                      label="Fluid Type"
                      options={FluidType}
                      name="fluidType"
                      control={control}
                      className=""
                      register={register}
                      error={errors?.fluidType}
                      required
                    />
                  </div>
                  <div className="flex-col w-full">
                    <CustomInput
                      label="Intake Time"
                      type="time"
                      name="intakeTime"
                      control={control}
                      className=""
                      register={register}
                      error={errors?.intakeTime}
                      required
                    />
                  </div>
                </div>
                <div className="w-full flex gap-[15px]">
                  <div className="flex-col w-full">
                  <CustomSelect
                      options={Quantity}
                      label="Quantity"
                      name="quantity"
                      control={control}
                      className="p-2"
                      register={register}
                      error={errors?.quantity}
                      required
                    />
                    
                  </div>
                  <div className="flex-col w-full">
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
                </div>
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

export default AddRecordFluidCard;
