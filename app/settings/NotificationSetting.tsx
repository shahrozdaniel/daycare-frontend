"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CircularSwitch from "@/components/common/CircularSwicth";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import Button from "@/components/common/Button";
import {
  dayCareSetting,
  dayCareSettingDetails,
} from "@/services/dayCareSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../context/store";

interface FormData {
  // Define your form values
  mySwitch: boolean;
}

const NotificationSetting = () => {
  const { permission, IsAdmin } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions;

  const { control, handleSubmit, setValue, watch, register } =
    useForm<FormData>();

  let switchValue = watch("mySwitch");

  const [mailDriver, setmailDriver] = useState<any>("");
  const [smtpusername, setsmtpUserName] = useState<any>("");
  const [smtpPort, setSmtport] = useState<any>("");
  const [smtphost, setSmtpHost] = useState<any>("");
  const [smtpPassword, setsmtpPassword] = useState<any>("");
  const [connectonSec, setConnectonSec] = useState<any>("");
  const [mailSenderName, setMailSenderName] = useState<any>("");
  const [data, setData] = useState<any>("");
  const [val, setVal] = useState<any>(false);
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

  const settingDetails = async () => {
    let res;
    try {
      res = await dayCareSettingDetails();
      if (res?.success) {
        setData(res?.dayCareSetting?.email_settings);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    settingDetails();
  }, []);
  useEffect(() => {
    setmailDriver(data?.mail_driver);
    setsmtpUserName(data?.mail_username);
    setSmtport(data?.mail_port);
    setSmtpHost(data?.mail_host);
    setsmtpPassword(data?.mail_password);
    setConnectonSec(data?.mail_encryption);
    setMailSenderName(data?.mail_sender_name);
    setVal(data?.enable_setting);
  }, [data]);

  const submitForm = async () => {
    let body = {
      email_settings: {
        enable_setting: val ? val : false,
        mail_driver: mailDriver,
        mail_host: smtphost,
        mail_username: smtpusername,
        mail_password: smtpPassword,
        mail_port: smtpPort,
        mail_encryption: connectonSec,
        mail_sender_name: mailSenderName,
      },
    };
    let res;
    try {
      res = await dayCareSetting("emailSettings", body);
      // console.log(res)
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2">
        Notification Setting
      </h1>
      <hr /> */}
      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Notification Setting
          </h1>
        </div>
      </div>

      <form>
        <div className="w-4/6 mx-auto mt-6">
          <div className="flex w-2/3 ml-3 justify-between mb-8">
            <h2 className="text-black-b1">Enable daycare email setting?</h2>
            {/* <CircularSwitch
              label="My Switch"
              checked={switchValue || false}
              onChange={(isChecked) => setValue("mySwitch", isChecked)}
              id="signin"

            /> */}
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e: any) => setVal(e?.target?.checked)}
                checked={val}
                disabled={IsAdmin ? false : !userPermission?.setting?.add_edit}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex gap-y-5 gap-x-4">
            <div className="flex flex-col gap-y-5 gap-x-4 w-[50%]">
              <CustomInput
                label=""
                type="text"
                placeholder="Mail Sender Name"
                name="mail_sender_name"
                control={control}
                onChange={(e: any) => setMailSenderName(e.target.value)}
                value={mailSenderName}
                disabled = {disable}
              />
              <CustomInput
                label=""
                type="text"
                placeholder="Mail Driver"
                name="mail_driver"
                control={control}
                onChange={(e: any) => setmailDriver(e.target.value)}
                value={mailDriver}
                disabled = {disable}
              />
              <CustomInput
                label=""
                type="text"
                placeholder="SMTP Username"
                name="mail_host"
                control={control}
                onChange={(e: any) => setsmtpUserName(e.target.value)}
                value={smtpusername}
                disabled = {disable}
              />
              <CustomInput
                label=""
                type="text"
                placeholder="SMTP Port"
                name="mail_username"
                control={control}
                onChange={(e: any) => setSmtport(e.target.value)}
                value={smtpPort}
                disabled = {disable}
              />
            </div>
            <div className="flex flex-col gap-y-5 gap-x-4 w-[50%]">
              <CustomInput
                label=""
                type="text"
                placeholder="SMTP Host"
                name="mail_port"
                control={control}
                onChange={(e: any) => setSmtpHost(e.target.value)}
                value={smtphost}
                disabled = {disable}
              />
              <CustomInput
                label=""
                type="text"
                placeholder="SMTP Password"
                name="mail_password"
                control={control}
                onChange={(e: any) => setsmtpPassword(e.target.value)}
                value={smtpPassword}
                disabled = {disable}
              />
              <CustomSelect
                name="mail_encryption"
                label="Connection Security"
                options={[
                  { value: "", label: "Select connection security" },
                  { value: "TLS", label: "TLS" },
                  { value: "SSL", label: "SSL" },
                ]}
                control={control}
                // register={register}
                onChange={(e: any) => setConnectonSec(e.target.value)}
                value={connectonSec}
                disabled = {disable}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 md:mx-auto lg:mr-[17%] w-fit mt-2 mb-4">
          {(IsAdmin || userPermission?.setting?.add_edit) && (
            <Button type="button" form="blue" className="" onClick={submitForm}>
              Save
            </Button>
          )}
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default NotificationSetting;
