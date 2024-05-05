import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import Button from "@/components/common/Button";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CommonFormToggleComponent from "./commonFormToggle/commonFormToggle";
import { ToastContainer, toast } from "react-toastify";
import CustomSelect from "@/components/common/CustomSelect";
import { classroomCatogery } from "@/app/classroomManagement/classroomManagentAPI";
import { FoodType, Quantity } from "@/app/Dropdowns";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomFoodType } from "./classroomValidationSchema";
import ImageUpload from "@/components/common/ImageUpload";
import UploadImageComponent from "./uploadImageComponent";
import { useParams, useSearchParams } from "next/navigation";
import { getAuthToken } from "@/components/common/Utils";
import { getEventData } from "@/services/CalendarManagementServices";

interface useFormType {
  // image: File;
  // foodType: string;
  quantity: string;
  // foodMenu: string;
}
interface props {
  submitClassRoomAction: any;
}

const AddMealCard: React.FC<props> = ({ submitClassRoomAction }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<useFormType>({ resolver: yupResolver(classroomFoodType) });

  const searchParam = useSearchParams()
  const catogeryId = searchParam?.get('categoryId')
  const [foodMenu, setFoodMenu] = useState<any>('')
  const [foodTypeselect, setfoodTypeselect] = useState<any>('')

  let thisMonth = new Date().getMonth()
  let today = new Date().getDate()
  // let today = 3
  const [menu, setmenu] = useState([])

  const eventData = async () => {
    let res;
    try {
      res = await getEventData(thisMonth + 1, catogeryId)
      if (res?.success) {
        console.log(res?.data?.[today]?.menu)
        setmenu(res?.data?.[today]?.menu)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    eventData()
  }, [])
  let mealType: any = []
  let menuItem: any = []

  menu?.map((meal: any) => {
    mealType?.push({ value: meal?.meal_type, label: meal?.meal_type })
  })
  const onSubmit: SubmitHandler<useFormType> = async (data: any) => {
    // console.log(data)
    let body = {
      foodRecord: {
        foodType: foodMenu,
        quantity: data?.quantity,
        foodMenu: foodTypeselect,
      },
    };
    let files = data.files;
    // console.log(body)
    let res;
    try {
      res = await submitClassRoomAction("4", body, files);
      if (res?.success) {
        toast.success("Meals successfully added");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
const handleSetmeu = (e: any) => {
    setFoodMenu(e?.target?.value)
    let fooditem: any = menu?.filter((ele: any) => ele?.meal_type === foodTypeselect)
    // console.log('fooditem', fooditem?.[0]?.food_items)
    setfoodTypeselect(fooditem?.[0]?.food_items ? fooditem?.[0]?.food_items?.toString() : '')

  }
  return (
    <div>
      <CommonFormToggleComponent headerText="Add Meal to selected children">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-row items-center  gap-[24px]">
            {/* <div className="md:w-[100%] lg:w-[50%]">
              {" "}
              <label className="font-size[7px]">Date & Time</label>
              <input type="datetime-local" name="checkIn" className="rounded-[20px] bg-[#F5F5F5] p-2" placeholder="Date & Time" onChange={(e) => setDateTime(e.target.value)} />
            </div> */}
            <div className=" w-full">
              <div className="w-full flex flex-col items-center  gap-[24px]">
                <div>
                  <UploadImageComponent control={control} name="files" />
                </div>
                <div className="flex gap-[15px] w-full">
                  <div className="flex-col w-full">
                    <CustomSelect
                      label="Food Type"
                      options={FoodType}
                      name="foodType"
                      control={control}
                      className="w-full"
                      // register={register}
                      // error={errors?.foodType}
                      onChange={(e: any) => handleSetmeu(e)}
                      required
                    />
                  </div>
                  <div className="flex-col w-full">
                    <CustomSelect
                      label="Quantity"
                      options={Quantity}
                      name="quantity"
                      control={control}
                      className="w-full"
                      register={register}
                      error={errors?.quantity}
                      required
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex-col w-full">
                    <CustomInput
                      label=""
                      type="text"
                      placeholder="Food Menu"
                      name="foodMenu"
                      control={control}
                      className="p-2"
                      // register={register}
                      value={foodTypeselect}
                      onChange={(e: any) => setfoodTypeselect(e?.target?.value)}
                      // error={errors?.foodMenu}
                      required
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

export default AddMealCard;
