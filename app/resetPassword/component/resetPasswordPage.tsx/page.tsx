"use client";
import React from "react";
import Image from "next/image";
import { ResendEmailBody, resendEmail } from "../../resetPasswordApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CustomInput from "@/components/common/CustomInput";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPasswordPage() {
  const { register, handleSubmit, control } = useForm<ResendEmailBody>({});

  const router = useRouter();
  // form submit handler
  const onFormSubmit: SubmitHandler<ResendEmailBody> = async (
    data: ResendEmailBody
  ) => {
    const res = await resendEmail(data, router, toast);
    console.log({ data });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="grid grid-cols-2 h-screen bg-[url('/images/login-image.jpg')] bg-contain bg-left"
      >
        {/* <Image src={login_image} alt='laughing-child' width="800" height="50"/> */}
        <div className=""></div>
        <div className="border-2 bg-[#EEFCFC] flex flex-col items-center justify-center gap-7">
          <Image
            src={"/images/coodle.png"}
            height="50"
            width="170"
            alt="coodle image"
          />
          <div className="bg-[#FFFFFF] [box-shadow:0px_8px_32px_0px_#00000014] flex flex-col items-center justify-center gap-7 rounded-xl max-w-[486px] max-h-[456px] h-full w-full">
            <span className="w-[330px] h-[38px] text-[30px] font-medium leading-[38px] tracking-normal text-center">
              Reset Password
            </span>
            <div className=" flex flex-col text-center px-5 w-full justify-center items-center ">
              <div className="w-[75%]">
                <CustomInput
                  label=""
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  control={control}
                  className="h-full"
                  register={register}
                />
              </div>
              <p className="text-blue-600 font-sans text-[14px] font-normal leading-[157.143%] text-center px-5 pt-2">
                Reset link will be shared to the above email address.
              </p>
            </div>

            <button
              type="submit"
              className="bg-[#00858E] w-[328px] h-[48px] top-[697px] left-[868px] p-[8px] rounded-[6px]"
            >
              <span className="text-[16px] text-[#FFFFFF] font-medium leading-[24px] tracking-normal text-center">
                SEND
              </span>
            </button>
            <Link href={"/"}>
              <p className="text-[#3A70E2] font-sans text-[14px] leading-[22px] tracking-normal text-left">
                Back to Login
              </p>
            </Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
