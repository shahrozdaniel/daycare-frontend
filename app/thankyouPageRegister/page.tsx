"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ThankyouPageRegister() {
  return (
    <div className="justify-center items-center flex h-screen bg-[#EEFCFC] bg-no-repeat bg-cover">
      <div className="max-w-[583px] bg-[#ffffff] py-[35px] mx-auto my-0 justify-center items-center rounded-[25px]  w-full flex flex-col gap-[15px]">
        <div className=" text-[30px] font-medium leading-[38px]  text-center">
          Thank You!
        </div>
        <div>
          <Image src={"/images/img1.png"} alt="" width={200} height={70} />
        </div>
        <div className=" text-[15px] font-medium leading-[38px]  text-center">
          Thank you for registering your Daycare to Cooddle. Please check your
          mail to setup your password.
        </div>
      </div>
    </div>
  );
}
