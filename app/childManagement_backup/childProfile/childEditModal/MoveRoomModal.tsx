import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";
import React, { useState } from "react";
// import CommonFormToggleComponent from "./commonFormToggle/commonFormToggle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomMoveRoomsRecords } from "@/app/classroomActions/components/classroomValidationSchema";
import CommonFormToggleComponent from "@/app/classroomActions/components/commonFormToggle/commonFormToggle";
import { classRoomACtionCreate } from "@/services/classroomActionServices";
import {
  FormButton,
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import Image from "next/image";
// import { classroomMoveRoomsRecords } from "./classroomValidationSchema";
interface useFormType {
  // image: File;
  time: string;
  classroom: string;
  addNotes?: string;
}
interface props {
  submitClassRoomAction: any;
  data?: any;
  id: any;
  closeModal: any;
  getChildData: any;
}

const MoveRoomModal: React.FC<any> = ({
  data,
  id,
  closeModal,
  getChildData,
  enrollment_id,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<useFormType>({
    resolver: yupResolver(classroomMoveRoomsRecords),
  });

  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    // console.log(data)
    let childDetails = [{ childId: id, enrollmentId: enrollment_id }];
    let formbody = new FormData();

    let body = {
      time: data?.time,
      classroom: data?.classroom,
      addNotes: data?.addNotes,
    };
    formbody.append("childDetails", JSON.stringify(childDetails));
    formbody.append("MoveRooms", JSON.stringify(body));

    let res;
    try {
      res = await classRoomACtionCreate("11", formbody);
      if (res?.success) {
        toast.success("Child has successfully moved to a different room");
        closeModal();
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
            Move Rooms
          </div>

          <button type="button" className="" onClick={closeModal}>
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        {/* <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              <label className="font-size[7px]">Date & Time</label>
              <input type="datetime-local" name="checkIn" className="rounded-[20px] bg-[#F5F5F5] p-2" placeholder="Date & Time" onChange={(e) => setDateTime(e.target.value)} />
            </div> */}
        <FormContainer>
          <div className="w-full flex flex-col items-center gap-y-5 gap-x-4 my-4">
            <div className="w-full flex gap-y-5 gap-x-4">
              <div className="flex-col w-full">
                <CustomInput
                  label=""
                  type="time"
                  placeholder="Time"
                  name="time"
                  control={control}
                  className="p-2"
                  register={register}
                  error={errors?.time}
                  required
                />
              </div>
              <div className="flex-col w-full">
                <CustomInput
                  label=""
                  type="text"
                  placeholder="classroom"
                  name="classroom"
                  control={control}
                  className="p-2"
                  register={register}
                  error={errors?.classroom}
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
            />
          </div>
        </FormContainer>
        <FormButton>
          <FormContainer>
            <div className="flex justify-end self-end items-end gap-[16px] ">
              <Button
                type="button"
                form="white"
                className=""
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button type="submit" form="blue" className="">
                Add
              </Button>
            </div>
          </FormContainer>
        </FormButton>
        <ToastContainer />
      </ModalDetailsContainer>
    </form>
  );
};

export default MoveRoomModal;
