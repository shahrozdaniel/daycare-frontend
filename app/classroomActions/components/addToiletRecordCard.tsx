import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";
import React, { useState } from "react";
import CommonFormToggleComponent from "./commonFormToggle/commonFormToggle";
import CustomSelect from "@/components/common/CustomSelect";
import { ToiletType } from "@/app/Dropdowns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomLooBreakReport } from "./classroomValidationSchema";
interface useFormType {
  // image: File;
  startTime: string;
  toiletType: string;
  addNotes: string;
}
interface props {
  submitClassRoomAction: any;
}

const AddToiletRecord: React.FC<props> = ({ submitClassRoomAction }) => {
  const [time, setTime] = useState<string>("");
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<useFormType>({ resolver: yupResolver(classroomLooBreakReport) });

  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    // console.log(data)
    let body = {
      toiletRecord: {
        startTime: data?.startTime,
        toiletType: data?.toiletType,
        addNotes: data?.addNotes,
      },
    };
    let res;
    try {
      res = await submitClassRoomAction("7", body);
      if (res?.success) {
        toast.success("Loo breaks successfully added");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <CommonFormToggleComponent headerText="Add Loo Break for selected children">
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              <label className="font-size[7px]">Date & Time</label>
              <input type="datetime-local" name="checkIn" className="rounded-[20px] bg-[#F5F5F5] p-2" placeholder="Date & Time" onChange={(e) => setDateTime(e.target.value)} />
            </div> */}
              <div className="w-full flex flex-col items-center  gap-[24px]">
                <div className="flex w-full gap-[15px]">
                  <div className="flex-col w-full">
                    <CustomInput
                      label="Time"
                      type="time"
                      placeholder="Time"
                      name="startTime"
                      control={control}
                      className="p-2"
                      register={register}
                      error={errors?.startTime}
                      required
                    />
                  </div>
                  <div className="flex-col w-full">
                    <CustomSelect
                      label="Toilet Type"
                      name="toiletType"
                      control={control}
                      className=""
                      register={register}
                      options={ToiletType}
                      error={errors?.toiletType}
                      required
                    />
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

export default AddToiletRecord;
