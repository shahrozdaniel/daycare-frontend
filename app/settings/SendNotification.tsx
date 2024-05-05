"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CircularSwitch from "@/components/common/CircularSwicth";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import { Button } from "@/components/ui/button";
import {
    dayCareSetting,
    dayCareSettingDetails,
} from "@/services/dayCareSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../context/store";
import { TwoInputContainer } from "../reports/Common.styled";

interface FormData {
    // Define your form values
    mySwitch: boolean;
}

const SendNotification = () => {
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
        // settingDetails();
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
            <h1 className="text-center mb-2 text-black-b1 mt-2">
                Send Notification
            </h1>
            <hr />
            <form>
                <div className="w-4/6 mx-auto mt-6">
                    <div className="m-2">
                        <TwoInputContainer>
                            <CustomInput
                               
                                label=""
                                type="text"
                                placeholder="Notification Template"
                                name="mail_sender_name"
                                control={control}
                                onChange={(e: any) => setMailSenderName(e.target.value)}
                                value={mailSenderName}
                            />

                            <CustomInput
                        
                                label=""
                                type="text"
                                placeholder="Notification Title"
                                name="mail_driver"
                                control={control}
                                onChange={(e: any) => setmailDriver(e.target.value)}
                                value={mailDriver}
                            />
                        </TwoInputContainer>
                    </div>
                    <div className="m-2">
                        <TwoInputContainer>
                            <CustomInput
                                
                                label=""
                                type="text"
                                placeholder="Description"
                                name="mail_host"
                                control={control}
                                onChange={(e: any) => setsmtpUserName(e.target.value)}
                                value={smtpusername}
                            />
                        </TwoInputContainer>
                    </div>
                    <div className="m-2">
                        <TwoInputContainer>
                            <CustomSelect
                                
                                name=""
                                label="Send To"
                                options={[
                                    { value: "", label: "Select" },
                                    { value: "TLS", label: "mail@mail.com" },
                                    { value: "SSL", label: "hotmail@mail.com" },
                                ]}
                                control={control}
                                // register={register}
                                onChange={(e: any) => setConnectonSec(e.target.value)}
                                value={connectonSec}
                            />
                            <CustomInput
                               
                                label=""
                                type="text"
                                placeholder="Content"
                                name="mail_port"
                                control={control}
                                onChange={(e: any) => setSmtpHost(e.target.value)}
                                value={smtphost}
                            />
                        </TwoInputContainer>
                    </div>
                </div>
                <div className="flex gap-4 md:mx-auto lg:mr-[8%] w-fit my-10">
                    {(IsAdmin || userPermission?.setting?.add_edit) && (
                        <>
                            <Button
                                type="button"
                                form="white"
                                className="bg-whit hover:text-white hover:border-none text-[#00858e] border border-[#00858e] rounded-lg"
                            >
                                Schedule
                            </Button>
                            <Button
                                type="submit"
                                form="blue"
                                className="bg-[#00858e]"
                            // onClick={submitForm}
                            >
                                Send Now
                            </Button>
                        </>
                    )}
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default SendNotification;
