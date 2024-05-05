import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";
import React, { useEffect, useState } from "react";
import CommonFormToggleComponent from "./commonFormToggle/commonFormToggle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomMoveRoomsRecords } from "./classroomValidationSchema";
import { classroomlist } from "@/app/classroomManagement/classroomManagentAPI";
import CustomSelect from "@/components/common/CustomSelect";
import { useSearchParams } from "next/navigation";
interface useFormType {
  // image: File;
  time: string;
  classroom: string;
  addNotes: string;
}
interface props {
  submitClassRoomAction: any;
}

const AddMoodCard: React.FC<props> = ({ submitClassRoomAction }) => {
  const [classroomData, setClassroomData] = useState<
    { value: string; label: string }[]
  >([]);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue
  } = useForm<useFormType>({
    resolver: yupResolver(classroomMoveRoomsRecords),
  });


  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    // console.log(data)
    let body = {
      MoveRooms: {
        time: data?.time,
        classroom: data?.classroom,
        addNotes: data?.addNotes,
      },
    };
    let res;
    try {
      res = await submitClassRoomAction("11", body);
      if (res?.success) {
        toast.success("Moove Rooms successfully added");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const getclassroomlist = async () => {
    let res;
    try {
      res = await classroomlist();
      if (res?.success) {
        const newArray = res?.data?.list.map((item: any, index: number) => ({
          label: item.classroomName,
          value: item.classroomId,
        }));
        const newArrayWithSelect = [
          { value: "", label: "Select classroom" },
          ...newArray,
        ];

        setClassroomData(newArrayWithSelect);
        // setclassroomData(res?.data?.list);
        // setPgination(res?.['data']?.['pagination'])
      }
      // console.log(res);
    } catch (error) { }
  };

  useEffect(() => {
    getclassroomlist();
  }, []);
  return (
    <div>
      <CommonFormToggleComponent headerText="Add move rooms selected children">
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
                {/* <CustomInput
                      label=""
                      type="text"
                      placeholder="classroom"
                      name="classroom"
                      control={control}
                      className="p-2"
                      register={register}
                      error={errors?.classroom}
                      required
                    /> */}

                <CustomSelect
                  name="classroom"
                  label="Classroom"
                  options={classroomData}
                  control={control}
                  className="p-2"
                  register={register}
                  required={true}
                  error={errors.classroom}
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

export default AddMoodCard;
