"use client";
import Link from "next/link";
import React, { useState } from "react";

const SwitchFees: React.FC = () => {
  return (
    <div className="h-9 w-[15rem] w-full gap-[32px]  flex justify-between">
      <div className="bg-[#EEFCFC] text-[#00858E] px-2 text-button-color text-[14px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer">
        Fees Dashboard
      </div>

      <Link href="/feesManagement/tabComponent/Invoices">
        <div className="text-[#4b4b4b] text-[14px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer">
          Invoices
        </div>
      </Link>
      <Link href="/feesManagement/tabComponent/Children">
        <div className="text-[#4b4b4b]   text-[14px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer">
          Children
        </div>
      </Link>
      <div className=" text-[#4b4b4b]  text-[14px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer">
        Tuition Plan
      </div>
      <Link href="/feesManagement/tabComponent/DiscountManagement">
        <div className=" text-[#4b4b4b]  text-[14px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer">
          Discount Management
        </div>
      </Link>
      <div className=" text-[#4b4b4b]  text-[14px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer">
        Subsidy Management
      </div>
      <div className="w-10"></div>
    </div>
  );
};

export default SwitchFees;
