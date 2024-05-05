import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";
import React, { useState } from "react";
import CommonFormToggleComponent from "./commonFormToggle/commonFormToggle";
import CustomSelect from "@/components/common/CustomSelect";
import { Supplies } from "@/app/Dropdowns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomSuppliesReport } from "./classroomValidationSchema";
interface useFormType {
  // image: File;
  toiletType: string;
  addNotes: string;
}
interface props {
  submitClassRoomAction: any;
}

const AddRequestSuppliesCard: React.FC<props> = ({ submitClassRoomAction }) => {
  const [time, setTime] = useState<string>("");
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<any>({ resolver: yupResolver(classroomSuppliesReport) });

  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    // console.log(data)
    let body = {
      suppliesRecord: {
        supplies: data?.supplies,
        addNotes: data?.addNotes,
      },
    };
    // console.log(body)

    let res;
    try {
      res = await submitClassRoomAction("9", body);
      if (res?.success) {
        toast.success("Supplies successfully added");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <CommonFormToggleComponent headerText="Request Supplies for selected children">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center  gap-[24px]">
            {/* <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              <label className="font-size[7px]">Date & Time</label>
              <input type="datetime-local" name="checkIn" className="rounded-[20px] bg-[#F5F5F5] p-2" placeholder="Date & Time" onChange={(e) => setDateTime(e.target.value)} />
            </div> */}
              <div className="w-full flex flex-row items-center  gap-[24px]">
                {/* <input type="time"  onChange={(e)=>setTime(e.target.value)} className="rounded-[20px] bg-[#F5F5F5] p-2 w-[100%] mb-2 "placeholder="time" name="time"/> */}
                <div className="flex-col w-full">
                  <CustomSelect
                  label="Supplies"
                    options={Supplies}
                    name="supplies"
                    control={control}
                    className=""
                    register={register}
                    error={errors?.supplies}
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

export default AddRequestSuppliesCard;
