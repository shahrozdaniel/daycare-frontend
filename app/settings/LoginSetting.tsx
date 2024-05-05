"use client"

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CircularSwitch from "@/components/common/CircularSwicth";
import Button from "@/components/common/Button";
import { dayCareSetting, dayCareSettingDetails } from "@/services/dayCareSetting";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'
import { useGlobalContext } from "../context/store";
import { TwoInputContainer } from "../reports/Common.styled";

interface FormData {
  // Define your form values
  mySwitch: boolean;
}

const LoginSetting = () => {
  const { permission, IsAdmin } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions
  const { control, handleSubmit, setValue, watch } = useForm<FormData>();

  const [val, setVal] = useState<any>(false);


  // Handle form submission
  // const onSubmit: SubmitHandler<FormData> = (data) => {
  //   // Perform any actions with the submitted form data
  //   console.log("Form Data:", data);
  // };
  const settingDetails = async () => {
    let res;
    try {
      res = await dayCareSettingDetails()
      if (res?.success) {
        setVal(res?.dayCareSetting?.enable_2fa_auth)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    settingDetails()
  }, [])
  console.log(val)
  const submitForm = async () => {

    let body = {
      enable_2fa_auth: val
    }
    let res;
    try {
      res = await dayCareSetting('2fa', body)
      // console.log(res)
      if (res?.success) {
        toast.success(res?.message)
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2">Login Setting</h1>
      <hr /> */}
      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Login Setting
          </h1>
        </div>
      </div>

      <div style={{ width: "50%", margin: "5% auto 0 auto", }}>
        <div className="">
          <div className="flex w-2/3 justify-between mb-8">
            <h2 className="text-black-b1">Enable 2FA authentication?
            </h2>
            <label className="switch">
              <input type="checkbox" onChange={(e: any) => setVal(e?.target?.checked)} checked={val} disabled={IsAdmin ? false : !userPermission?.setting?.add_edit}/>
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-4 md:mx-auto lg:mr-[17%] w-fit mt-2 mb-4">
        {
          (IsAdmin || userPermission?.setting?.add_edit) && <Button type="button" form="blue" className="" onClick={submitForm}>
            Save
          </Button>}
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginSetting;
