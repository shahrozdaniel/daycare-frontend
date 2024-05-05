"use client";

import React, { useEffect, useState } from "react";
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

import { useGlobalContext } from "../context/store";
import Button from "@/components/common/Button";
import * as Yup from "yup";
interface FormData {
  // Define your form values
  mySwitch: boolean;
}

const FeeSetting = () => {
  const { permission, IsAdmin } = useGlobalContext();
  console.log('permission', permission)
  let userPermission = permission?.role_detail?.permissions;
  const { control, handleSubmit, register, setValue, watch } = useForm<FormData>();
  const [days, setDays] = useState<any>("");
  const [reminder, setReminder] = useState<any>("");
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

  const validationSchema = Yup.object().shape({
    days: Yup.string().test(
      "is-positive-integer",
      "Days must be a positive integer",
      (value) => {
        if (!value) return true; // Skip validation if the value is empty
        const numericValue = Number(value);
        return Number.isInteger(numericValue) && numericValue > 0;
      }
    ),
  });

  const options = [
    { value: "", label: "Select" },
    { value: "1", label: "Everyday" },
    { value: "2", label: "Weekly" },
    { value: "3", label: "Twice a Day" },
  ];
  const settingDetails = async () => {
    let res;
    try {
      res = await dayCareSettingDetails();
      if (res?.success) {
        console.log(res?.dayCareSetting?.fee_settings?.due_days);
        console.log(res?.dayCareSetting?.fee_settings?.due_reminder);
        setReminder(res?.dayCareSetting?.fee_settings?.due_reminder);
        setDays(res?.dayCareSetting?.fee_settings?.due_days);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    settingDetails();
  }, []);
  const submitForm = async () => {
    try {
      const schema = validationSchema;
      let body = {
        feeSetting: {
          due_days: days,
          due_reminder: reminder,
        },
      };
      await schema.validate({ days }, { abortEarly: false });
      let res = await dayCareSetting("fee", body);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error: any) {
      if (error.name === "ValidationError") {
        error.inner.forEach((err: any) => {
          toast.error(err.message);
        });
      } else {
        console.error(error);
      }
    }
  };
  console.log("days ", days);
  return (
    <>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2">Fee Setting</h1>
      <hr /> */}
      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Fee Setting
          </h1>
        </div>
      </div>

      <div className="w-[70%] mx-auto mt-6">
        <div className=" flex items-center gap-y-5 gap-x-4">
          <div className="flex flex-col justify-start items-start text-black-b1 w-full">
            <div className="w-[240px] py-1">Due Date Setting</div>
            <CustomInput
              className=""
              label=""
              type="text"
              placeholder="Days from Invoice Generation"
              name=""
              control={control}
              onChange={(e: any) => setDays(e?.target?.value)}
              value={days}
              disabled={disable}
            />
          </div>
          <div className="flex  flex-col justify-start items-start text-black-b1 w-full">
            <h2 className="w-[240px] py-1">Due Reminder Schedule</h2>
            <CustomSelect
              options={options}
              name=""
              label="Due Reminder Schedule"
              onChange={(e: any) => setReminder(e?.target?.value)}
              value={reminder}
              disabled={disable}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 md:mx-auto lg:mr-[15%] w-fit mt-8 mb-4">
        {(IsAdmin || userPermission?.setting?.add_edit) && (
          <Button type="button" form="blue" className="" onClick={submitForm}>
            Save
          </Button>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default FeeSetting;
