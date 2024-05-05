import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";
import React, { useLayoutEffect, useState } from "react";
import CommonFormToggleComponent from "./commonFormToggle/commonFormToggle";
import CustomSelect from "@/components/common/CustomSelect";
import { classroomCatogery } from "@/app/classroomManagement/classroomManagentAPI";
import { HealthStatus, Observations, Observations_fine } from "@/app/Dropdowns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomHealthRecords } from "./classroomValidationSchema";
// import { watch } from "fs";
interface useFormType {
  // image: File;
  healthStatus: string;
  observations: string;
  addNotes: string;
}
interface props {
  submitClassRoomAction: any;
}

const AddHealthRecordCard: React.FC<props> = ({ submitClassRoomAction }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch 
  } = useForm<useFormType>({ resolver: yupResolver(classroomHealthRecords) });

  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    // console.log(data)
    let body = {
      healthRecord: {
        healthStatus: data?.healthStatus,
        observations: data?.observations,
        addNotes: data?.addNotes,
      },
    };
    // console.log(body)

    let res;
    try {
      res = await submitClassRoomAction("5", body);
      if (res?.success) {
        toast.success("Health Records successfully added");
        reset();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const health_status = watch('healthStatus')
  console.log(health_status)

  // console.log(health_status)
  return (
    <div>
      <CommonFormToggleComponent headerText="Add Health Record for selected children">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center  gap-[24px]">
            {/* <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              <label className="font-size[7px]">Date & Time</label>
              <input type="datetime-local" name="checkIn" className="rounded-[20px] bg-[#F5F5F5] p-2" placeholder="Date & Time" onChange={(e) => setDateTime(e.target.value)} />
            </div> */}
              <div className="w-full flex flex-col items-center  gap-[24px]">
                <div className="flex gap-[15px] w-full">
                  <div className="flex-col w-full">
                    <CustomSelect
                      label="health Status"
                      name="healthStatus"
                      className="rounded-[20px] bg-[#F5F5F5] "
                      options={HealthStatus}
                      control={control}
                      register={register}
                      error={errors?.healthStatus}
                      required
                    />
                  </div>
                  <div className="flex-col w-full">
                    <CustomSelect
                      label="Observations"
                      name="observations"
                      className="rounded-[20px] bg-[#F5F5F5]"
                      options={health_status === 'Fine' ? Observations_fine : Observations}
                      control={control}
                      register={register}
                      error={errors?.observations}
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

export default AddHealthRecordCard;
