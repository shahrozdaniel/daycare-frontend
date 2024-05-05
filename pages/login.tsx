import React from "react";
import "../app/globals.css";
import Image from "next/image";
import login_image from "../public/images/login-image.png";

const login = () => {
  return (
    <main className="grid grid-cols-2 h-screen bg-[url('/images/login-image.png')]  bg-left">
      {/* <Image src={login_image} alt='laughing-child' width="800" height="50"/> */}
      <div className=""></div>
      <div className="border-2 bg-[#EEFCFC] flex flex-col items-center justify-center gap-7">
        <Image
          src={"/images/coodle.png"}
          height="50" 
          width="170"
          alt="coodle image"
        />
        <div className="bg-[#FFFFFF] [box-shadow:0px_8px_32px_0px_#00000014] flex flex-col items-center justify-evenly gap-6 p-16 p- rounded-xl">
          <span className="w-[316px] h-[38px] top-[352px] left-[870px] text-[30px] font-medium leading-[38px] tracking-normal text-right">
            Login to your account 
          </span>
          <input
            className="w-[328px] h-[56px]  rounded-[20px] bg-[#F5F5F5] p-4"
            placeholder="Enter Username"
          />
          <input
            className="w-[328px] h-[56px]  rounded-[20px] bg-[#F5F5F5] p-4"
            placeholder="Enter Password"
          />
          <p className="text-[#3A70E2] font-sans text-[14px] leading-[22px] tracking-normal text-left">
            Forgot Password?
          </p>
          <button className="bg-[#00858E] w-[328px] h-[48px] top-[697px] left-[868px] p-[8px] rounded-[6px]">
            <span className=" text-[16px] text-[#FFFFFF] font-medium leading-[24px] tracking-normal text-center">
              Login
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default login;
