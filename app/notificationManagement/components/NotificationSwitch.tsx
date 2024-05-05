"use client";
import React from "react";

const NotificationSwitch: React.FC = () => {
  return (
    <div className="h-9 w-[15rem] border-b-[1px] flex">
      <div className="w-10"></div>
      <div className="bg-[#EEFCFC] w-[80px] text-button-color text-[14px] font-medium leading-[20px] tracking-normal flex items-center justify-center">
        Notification
      </div>
      <div className="w-4"></div>
      <div className="text-button-color text-[14px] font-medium leading-[20px] tracking-normal flex items-center justify-center">
        Email Template
      </div>
    </div>
  );
};

export default NotificationSwitch;
