import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CommonFormToggleComponent from "./commonFormToggle/commonFormToggle";
import CustomSelect from "@/components/common/CustomSelect";
import { classroomCatogery } from "@/app/classroomManagement/classroomManagentAPI";
import { Domain } from "@/app/Dropdowns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomActivity } from "./classroomValidationSchema";
import UploadImageComponent from "./uploadImageComponent";
import TagDevelopmentComponent from "./tagDevelopment";
import { useSearchParams } from "next/navigation";
import { getEventData } from "@/services/CalendarManagementServices";

interface useFormType {
  // image: File;
  // classroomCategory: string;
  Domain: string;
  Skill: string;
  Indicators: string;
  description: string;
}
interface props {
  submitClassRoomAction: any;
  clasRoomType: string
}

const AddActivityCard: React.FC<props> = ({ submitClassRoomAction, clasRoomType }) => {
  const [classRoomCatogery, setClassroomCatogery] = useState<any>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currentOption, setCurrentOption] = useState<string | undefined>(
    undefined
  );
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<any>({ resolver: yupResolver(classroomActivity) });
  const searchParam = useSearchParams()
  const catogeryId = searchParam?.get('categoryId')

  const [clasroomId, setClassroomid] = useState<any>(catogeryId)

  const [activityData, setActivityData] = useState<any>([])
  const [data, setData] = useState<any>([])
  let thisMonth = new Date().getMonth()
  let today = new Date().getDate()

  const EventData = async () => {
    let res;
    try {
      res = await getEventData(thisMonth + 1, catogeryId)
      if (res?.success) (
        setActivityData(res?.data?.[today].activity)
        // setActivityData(res?.data?.[today]?.activity)
        // console.log(res?.data?.[today]?.menu)
        // setmenu(res?.data?.[today]?.menu)
        // setActivityData(res?.data?.[today])

        // setActiovityData(res?.data)
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    EventData()
  }, [])

  const getClassRoomList = async () => {
    let res;
    try {
      res = await classroomCatogery();
      if (res?.success) {
        let clssroomname: any = [{ value: "", label: "Classrooms Type" }];
        res.data?.map((e: any) => {
          clssroomname?.push({
            value: e?.classroomCategoryId,
            label: e?.classroomCategoryName,
          });
        });
        setClassroomCatogery(clssroomname);
      } else {
        // console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    getClassRoomList();

  }, [clasRoomType]);


  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    let body = {
      tagDevelopmentSkill: {
        classroomCategory: data?.classroomCategory || clasroomId,
        Domain: data?.Domain,
        Skill: data?.Skill,
        Indicators: data?.Indicators,
      },
      description: data?.description,
    };
    let files = data.files;
    // console.log(body)
    let res;
    try {
      res = await submitClassRoomAction("2", body, files);
      if (res?.success) {
        toast.success("Activities successfully added");
        reset();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };



  return (
    <div>
      <CommonFormToggleComponent headerText="Add Activity to selected children">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex  w-full gap-[24px]">
            {/* <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              <label className="font-size[7px]">Date & Time</label>
              <input type="datetime-local" name="checkIn" className="rounded-[20px] bg-[#F5F5F5] p-2" placeholder="Date & Time" onChange={(e) => setDateTime(e.target.value)} />
            </div> */}

            <div className="w-full flex flex-col items-center gap-[24px]">

              <UploadImageComponent control={control} name="files" />

              <div className="flex gap-[15px] w-full">
                <div className="flex-col w-full">
                  <CustomSelect
                    name="classroomCategory"
                    label="Classroom Type"
                    className="rounded-[20px] bg-[#F5F5F5] "
                    options={classRoomCatogery}
                    control={control}
                    // register={register}
                    value={clasroomId}
                    onChange={(e: any) => setClassroomid(e?.target?.value)}
                    error={errors?.classroomCategory}
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
                    required
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
                    required
                  />
                </div>

                <div className="flex-col w-full">
                  <CustomSelect
                    label="Indicators"
                    name="Indicators"
                    options={[
                      { value: "", label: "Indicator" },
                      { value: "Indicator 1", label: "Indicator 1" },
                      { value: "Indicator 2", label: "Indicator 2" },
                    ]}
                    control={control}
                    register={register}
                    error={errors?.Indicators}
                    required
                  />
                </div>
              </div>
              <CustomInput
                label=""
                type="text"
                placeholder="Add Description"
                name="description"
                control={control}
                className="p-2"
                register={register}
                error={errors?.description}
                required
              />

              {/* <TagDevelopmentComponent
                  control={control}
                  register={register}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  currentOption={currentOption}
                  setCurrentOption={setCurrentOption}
                /> */}

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

export default AddActivityCard;
