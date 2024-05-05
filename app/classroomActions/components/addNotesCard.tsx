import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";
import React, { useLayoutEffect, useState } from "react";
import CommonFormToggleComponent from "./commonFormToggle/commonFormToggle";
import CustomSelect from "@/components/common/CustomSelect";
import { classroomCatogery } from "@/app/classroomManagement/classroomManagentAPI";
import { NotesType } from "@/app/Dropdowns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomAddNotes } from "./classroomValidationSchema";
import UploadImageComponent from "./uploadImageComponent";
interface useFormType {
  // image: File;
  noteTypes: string;
  addNotes: string;
}
interface props {
  submitClassRoomAction: any;
}

const AddNotesCard: React.FC<props> = ({ submitClassRoomAction }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<any>({ resolver: yupResolver(classroomAddNotes) });

  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    // console.log(data);
    let body = {
      notesRecord: {
        noteTypes: data?.noteTypes,
        addNotes: data?.addNotes,
      },
    };
    let files = data.files;
    let res;
    try {
      res = await submitClassRoomAction("10", body, files);
      if (res?.success) {
        toast.success("Notes Added Successfully");
        reset();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <CommonFormToggleComponent headerText="Add Notes for selected children">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              <label className="font-size[7px]">Date & Time</label>
              <input type="datetime-local" name="checkIn" className="rounded-[20px] bg-[#F5F5F5] p-2" placeholder="Date & Time" onChange={(e) => setDateTime(e.target.value)} />
            </div> */}
          <div className="flex flex-col gap-[20px]">
            <div className="flex justify-center  w-full">
              <UploadImageComponent control={control} name="files" />
            </div>
            <div className="w-full flex gap-[24px]">
              <div className="flex-col w-full">
                <CustomSelect
                  options={NotesType}
                  name="noteTypes"
                  control={control}
                  className=""
                  register={register}
                  error={errors?.noteTypes}
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

export default AddNotesCard;
