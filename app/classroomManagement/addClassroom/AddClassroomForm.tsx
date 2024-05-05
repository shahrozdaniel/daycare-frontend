import React, { useEffect, useLayoutEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import ImageUpload from "@/components/common/ImageUpload";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import Button from "@/components/common/Button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  classroomCatogery,
  createClassroom,
  updateClassroom,
} from "../classroomManagentAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import { addClassroomValidationSchema } from "./validationSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadImageComponent from "@/app/classroomActions/components/uploadImageComponent";
import { classroomDetailsById } from "@/services/classroomActionServices";
// interface AddClassroomFormProps {
//   control: any; // or use proper type for control based on your setup
// }

const AddClassroomForm: React.FC = () => {
  const methods = useForm<any>({
    shouldUnregister: false,
    resolver: yupResolver(addClassroomValidationSchema),
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = methods;
  let router = useRouter();
  const [classRoomCatogery, setClassroomCatogery] = useState<any>([]);
  const [schedule, setSchedule] = useState<any>([]);
  const [classroomData, setClassroomData] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const searchParam = useSearchParams();
  let id = searchParam?.get("classroom_id");
  const getClassroomdetails = async () => {
    let res;
    try {
      res = await classroomDetailsById(id);
      if (res?.success) {
        console.log(res?.data);
        setClassroomData(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      getClassroomdetails();
    }
  }, []);

  useEffect(() => {
    if (classroomData) {
      console.log("classroomData", classroomData);
      let tempData = {
        categoryId: classroomData?.categoryId,
        classroomName: classroomData?.classroomName,
        status: classroomData?.status,
        staffRatio: classroomData?.staffRatio,
        maxChildrens: classroomData?.maxChildrens,
        logo: classroomData?.logo,
      };

      Object.entries(tempData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [classroomData]);
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    // console.log(data)
    setLoader(true);
    let formbody = new FormData();
    formbody.append("categoryId", data?.categoryId);
    formbody.append("classroomName", data?.classroomName);
    formbody.append("status", data?.status);
    formbody.append("staffRatio", data?.staffRatio);
    formbody.append("maxChildrens", data?.maxChildrens);
    formbody.append("logo", data?.logo);
    let res;
    try {
      if (id) {
        res = await updateClassroom(id, formbody);
      } else {
        res = await createClassroom(formbody);
      }
      if (res?.success) {
        router?.push("/classroomManagement");
        toast.success(res.message);
      } else {
        // console.log(res);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
      toast.error(error.response.data.message);
    }
    setLoader(false);
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

  let clssroomname: any = [];
  clssroomname.push({ value: "", label: "Select Classroom Type" });
  classRoomCatogery?.map((e: any) => {
    clssroomname?.push({
      value: e?.classroomCategoryId,
      label: e?.classroomCategoryName,
    });
  });

  return (
    <div style={{ height: "100%", maxHeight: "600px" }}>
      <h1 className="text-center mb-2 text-black-b1 mt-2">Add Classroom</h1>
      <hr />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-y-auto h-full
       
         overflow-x-hidden
      "
      >
        <section className="px-8 pt-6">
          {/* Heading */}
          <div className="flex justify-center gap-6">
            <div className="w-4/12 flex flex-col gap-2">
              <div className="flex text-[#7b7b7b] font-[DM_Sans] text-[20px] font-medium pt-4 pl-2 mb-2">
                Classroom Details :
              </div>
            </div>
            <div className="w-4/12 flex flex-col gap-2"></div>
          </div>

          <div className="mt-2 mb-2 flex justify-center gap-6">
            <UploadImageComponent control={control} name="logo" />
          </div>
          <div className="flex justify-center gap-6">
            <div className="w-4/12 flex flex-col gap-5">
              <CustomInput
                type="text"
                placeholder="Name"
                name="classroomName"
                control={control}
                className="rounded-[20px] bg-[#F5F5F5] p-2"
                register={register}
                required
                error={errors?.classroomName}
              />
              <CustomInput
                type="number"
                placeholder="Children Per Educator"
                name="staffRatio"
                control={control}
                required
                className="rounded-[20px] bg-[#F5F5F5] p-2"
                register={register}
                error={errors?.staffRatio}
              />
              <CustomInput
                type="number"
                placeholder="Max Child"
                name="maxChildrens"
                control={control}
                required
                className="rounded-[20px] bg-[#F5F5F5] p-2"
                register={register}
                error={errors?.maxChildrens}
              />
            </div>
            <div className="w-4/12 flex flex-col gap-5">
              <CustomSelect
                name="status"
                label="Status"
                required
                className="rounded-[20px] bg-[#F5F5F5] "
                options={[
                  { value: "", label: "Select Status" },
                  { value: 1, label: "Active" },
                  { value: 2, label: "Inactive" },
                  // Add more options as needed
                ]}
                control={control}
                register={register}
                error={errors?.status}
              />
              <CustomSelect
                name="categoryId"
                label="Classroom Type"
                className="rounded-[20px] bg-[#F5F5F5] "
                options={clssroomname}
                control={control}
                required
                register={register}
                error={errors?.categoryId}
              />
            </div>
          </div>

          {/* Heading */}
          <div className="flex justify-center gap-6">
            {/* <div className='w-4/12 flex flex-col gap-2'>
              <div className='flex text-[#7b7b7b] font-[DM_Sans] text-[20px] font-medium pt-4 pl-2'>
                Classroom Schedule :
              </div>
            </div> */}
            <div className="w-4/12 flex flex-col gap-2"></div>
          </div>
          <div className="flex gap-4 md:mx-auto lg:mx-auto w-fit m-4">
            <Button
              type="button"
              form="white"
              className=""
              onClick={() => router.push("/classroomManagement")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="blue"
              className=""
              // onClick={() => router.push("/classroomManagement")}
            >
              {loader ? <i className="fa fa-spinner fa-spin" /> : "Submit"}
            </Button>
          </div>
        </section>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddClassroomForm;
