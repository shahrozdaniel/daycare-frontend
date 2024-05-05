

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
// import { classroomMoveRoomsRecords } from "./classroomValidationSchema";
interface useFormType {
    // image: File;
    time: string;
    classroom: string;
    addNotes: string;
}
interface props {
    submitClassRoomAction: any;
    data?: any
    id: any
    closeModal: any
    getChildData: any
}

const MoveRoomModal: React.FC<any> = ({
    data,
    id,
    closeModal,
    getChildData,
    enrollment_id
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
        let childDetails = [{ "childId": id, "enrollmentId": enrollment_id }]
        let formbody = new FormData()

        let body = {
            time: data?.time,
            classroom: data?.classroom,
            addNotes: data?.addNotes,
        };
        formbody.append('childDetails', JSON.stringify(childDetails))
        formbody.append('MoveRooms', JSON.stringify(body))

        let res;
        try {
            res = await classRoomACtionCreate("11", formbody);
            if (res?.success) {
                toast.success("Moove Rooms successfully added");
                closeModal()
            }
        } catch (error: any) {
            toast.error(error.response.data.error);
        }
    };
    return (
        <div>
            <CommonFormToggleComponent headerText="Move Rooms">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              <label className="font-size[7px]">Date & Time</label>
              <input type="datetime-local" name="checkIn" className="rounded-[20px] bg-[#F5F5F5] p-2" placeholder="Date & Time" onChange={(e) => setDateTime(e.target.value)} />
            </div> */}
                    <div className="w-full flex flex-col items-center  gap-[24px]">
                        <div className="w-full flex gap-[15px]">
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
                            required
                        />
                    </div>
                    <div className="flex justify-end w-full gap-6 mt-[20px]">
                        <Button type="button" form="white" className="" onClick={closeModal}>
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

export default MoveRoomModal;
