import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CommonFormToggleComponent from "./commonFormToggle/commonFormToggle";
import CustomSelect from "@/components/common/CustomSelect";
import { Level, Mood } from "@/app/Dropdowns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomMoodRecords } from "./classroomValidationSchema";
import UploadImageComponent from "./uploadImageComponent";
import { classroomCatogery } from "@/app/classroomManagement/classroomManagentAPI";
import { Domain } from "@/app/Dropdowns";
import { useSearchParams } from "next/navigation";
interface useFormType {
  // image: File;
  mood: string;
  Level: string;
  addNotes: string;
  tagDevelopmentSkill: string;
}
interface props {
  submitClassRoomAction: any;
}

const AddMoodCard: React.FC<props> = ({ submitClassRoomAction }) => {
  const [classRoomCatogery, setClassroomCatogery] = useState<any>([]);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<any>({ resolver: yupResolver(classroomMoodRecords) });

  const searchParam = useSearchParams()
  const catogeryId = searchParam?.get('categoryId')
  const [classRoomId, setClassRoomId] = useState<any>()

  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    // console.log(data)
    let body = {
      moodRecord: {
        mood: data?.mood,
        Level: data?.Level,
        addNotes: data?.addNotes,
      },
      tagDevelopmentSkill: {
        classroomCategory: data?.classroomCategory || classRoomId,
        Domain: data?.Domain,
        Skill: data?.Skill,
        Indicators: data?.Indicators,
      },
    };
    let files = data.files;
    let res;
    try {
      res = await submitClassRoomAction("8", body, files);
      if (res?.success) {
        toast.success("Mood successfully added");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const getClassRoomList = async () => {
    let res;
    try {
      res = await classroomCatogery();
      if (res?.success) {
        // console.log(res);
        setClassroomCatogery(res?.["data"]);
      } else {
        // console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    getClassRoomList();
  }, []);
  let clssroomname: any = [{ value: "", label: "Classrooms" }];
  classRoomCatogery?.map((e: any) => {
    clssroomname?.push({
      value: e?.classroomCategoryId,
      label: e?.classroomCategoryName,
    });
  });
  return (
    <div>
      <CommonFormToggleComponent headerText="Add Mood for selected children">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center  gap-[24px]">
            {/* <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              <label className="font-size[7px]">Date & Time</label>
              <input type="datetime-local" name="checkIn" className="rounded-[20px] bg-[#F5F5F5] p-2" placeholder="Date & Time" onChange={(e) => setDateTime(e.target.value)} />
            </div> */}
            <div className="w-full flex flex-col items-center  gap-[24px]">
              <div>
                <UploadImageComponent control={control} name="files" />
              </div>
              <div className="flex w-full gap-[15px]">
                <div className="flex-col w-full">
                  <CustomSelect
                    label="Mood"
                    name="mood"
                    options={Mood}
                    control={control}
                    className=""
                    register={register}
                    error={errors?.mood}
                    required
                  />
                </div>
                <div className="flex-col w-full">
                  <CustomSelect
                    label="Level"
                    options={Level}
                    name="Level"
                    control={control}
                    className=""
                    register={register}
                    error={errors?.Level}
                    required
                  />
                </div>
              </div>
              <div className="flex w-full gap-[15px]">
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
              <div className="flex flex-col w-full gap-[10px]">
                <div className="flex gap-[15px]">
                  <div className="flex-col w-full">
                    <CustomSelect
                      name="classroomCategory"
                      label="Classroom Section"
                      className="rounded-[20px] bg-[#F5F5F5] "
                      options={clssroomname}
                      control={control}
                      // register={register}
                      // error={errors?.classroomCategory}
                      onChange={(e: any) => setClassRoomId(e?.target.value)}
                      value={catogeryId}
                      required
                    />
                  </div>
                  <div className="flex-col w-full">
                    <CustomSelect
                      label="Domain"
                      name="Domain"
                      options={Domain}
                      control={control}
                      className=""
                      register={register}
                      error={errors?.Domain}
                    // required
                    />
                  </div>
                </div>
                <div className="flex gap-[15px] w-full">
                  <div className="flex-col w-full">
                    <CustomSelect
                      label="Skill"
                      name="Skill"
                      options={[
                        { value: "", label: "Skill" },
                        { value: "skill_1", label: "Skill 1" },
                        { value: "skill_2", label: "Skill 2" },
                        { value: "skill_3", label: "Skill 3" },
                        { value: "skill_4", label: "Skill 4" },
                      ]}
                      control={control}
                      className=""
                      register={register}
                      error={errors?.Skill}
                    // required
                    />
                  </div>

                  <div className="flex-col w-full">
                    <CustomInput
                      label=""
                      type="text"
                      placeholder="Indicator"
                      name="Indicators"
                      control={control}
                      className="p-2 "
                      register={register}
                      error={errors?.Indicators}
                    />
                  </div>
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

export default AddMoodCard;
