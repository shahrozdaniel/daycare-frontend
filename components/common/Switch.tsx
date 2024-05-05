"use client";
import React from "react";

const Switch: React.FC = () => {
  return (
    <div className="h-9 w-[15rem] border-b-[1px] flex">
      <div className="w-10"></div>
      <div className="bg-[#EEFCFC] w-[80px] text-button-color text-[14px] font-medium leading-[20px] tracking-normal flex items-center justify-center">
        Educator
      </div>
      <div className="w-[80px] text-black2  text-[14px] font-medium leading-[20px] tracking-normal flex items-center justify-center">
        Parent
      </div>
      <div className="w-10"></div>
    </div>
  );
};

export default Switch;
