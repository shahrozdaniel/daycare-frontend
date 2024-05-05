"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import RadioInput from "@/components/common/RadioInput";
import CircularSwitch from "@/components/common/CircularSwicth";
import {
  dayCareSetting,
  dayCareSettingDetails,
} from "@/services/dayCareSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/components/common/Button";
import { useGlobalContext } from "../context/store";
import {
  FREQUENCY_HOURS,
  NOTIFICATION_START,
  UPTO_HOURS,
} from "@/utils/constants";
interface FormData {
  // Define your form values
  mySwitch: boolean;
}

const SafeArrivalSetting = () => {
  const { permission, IsAdmin } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions;
  const { control, handleSubmit, register, setValue, watch } = useForm<any>();

  const switchValue = watch("mySwitch");
  const [days, setDays] = useState<any>("");

  const [disable, setIsdisable] = useState<boolean>(false)

  const isDisablePermisson = () => {
    if (IsAdmin) {
      setIsdisable(false)
    }
    if (userPermission?.setting?.add_edit === false) {
      setIsdisable(true)
    }
  }
  useEffect(() => {
    isDisablePermisson()
  }, [IsAdmin, permission])

  const options = [
    { value: 1, label: "Everyday" },
    { value: 2, label: "Weekly" },
    { value: 3, label: "Twice a Day" },
  ];

  const settingDetails = async () => {
    let res;
    try {
      res = await dayCareSettingDetails();
      if (res?.success) {
        const { interval_per_min, upto_hours, notification_starts } =
          res?.dayCareSetting?.safe_arrivals;
        setValue("frequency", interval_per_min);
        setValue("uptoHours", upto_hours);
        setValue("notification", notification_starts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    settingDetails();
  }, []);

  const submitForm = async (data: any) => {
    let body = {
      safe_arrival: {
        interval_per_min: data.frequency,
        upto_hours: data.uptoHours,
        notification_starts: data.notification,
      },
    };
    let res;
    try {
      res = await dayCareSetting("safearrival", body);
      if (res?.success) {
        settingDetails();
        toast.success(res?.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("watch", watch("frequency"));
  return (
    <>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2">
        Safe Arrival Setting
      </h1>
      <hr /> */}
      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Safe Arrival Setting
          </h1>
        </div>
      </div>

      <form
        className="w-[70%] mx-auto mt-6 flex flex-col gap-5 items-center"
        onSubmit={handleSubmit(submitForm)}
      >

        <div className="w-full flex flex-col gap-y-3">
          <div className="flex flex-row gap-y-5 gap-x-4 w-full">
            <div className="flex flex-col justify-start items-start text-black-b1 w-full">
              <div className="w-[240px] py-1">Frequency </div>
              <CustomSelect
                name="frequency"
                label="Frequency"
                options={FREQUENCY_HOURS}
                control={control}
                register={register}
                // error={errors?.menuType}
                disabled={disable}
              />

            </div>
            <div className="flex flex-col justify-start items-start text-black-b1 w-full">
              <div className="w-[240px] py-1">Up to hours </div>

              <CustomSelect
                name="uptoHours"
                label="Up to hours"
                options={UPTO_HOURS}
                control={control}
                register={register}
                // error={errors?.menuType}
                disabled={disable}

              />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start text-black-b1 w-[48.5%]">
            <div className="w-[240px] py-1">Notification starts at </div>
            <CustomSelect
              name="notification"
              label="Notification start"
              options={NOTIFICATION_START}
              control={control}
              register={register}
              // error={errors?.menuType}
              disabled={disable}

            />
          </div>
        </div>




        <div className="flex gap-4 md:mx-auto lg:mr-[0%] w-fit mb-4">
          {(IsAdmin || userPermission?.setting?.add_edit) && (
            <Button type="submit" className="">
              Save
            </Button>
          )}
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default SafeArrivalSetting;
