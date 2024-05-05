import React, { useState } from "react";
interface TableSwitchType {
  activeTab: string;
  handleTabClick: (value: string) => void;
}
const TableSwitch: React.FC<TableSwitchType> = ({
  activeTab,
  handleTabClick,
}) => {
  return (
    <div className="h-9 w-[30rem] border-b-[1px] flex gap-10">
      <button
        className={`w-[80px] text-[16px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer 
        ${
          activeTab === "notification"
            ? "border-b-2 border-solid border-[#00858E] bg-[#EEFCFC] text-button-color"
            : "text-neutral-950"
        }`}
        onClick={() => handleTabClick("notification")}
      >
        Notification
      </button>
      <button
        className={`w-[200px] text-[16px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer 
        ${
          activeTab === "notificationHistory"
            ? "border-b-2 border-solid border-[#00858E] bg-[#EEFCFC] text-button-color"
            : "text-neutral-950"
        }`}
        onClick={() => handleTabClick("notificationHistory")}
      >
        Notification History
      </button>
      <div
        className={`w-[140px] text-[16px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer 
        ${
          activeTab === "emailTemplate"
            ? "border-b-2 border-solid border-[#00858E] bg-[#EEFCFC] text-button-color"
            : "text-neutral-950"
        }`}
        onClick={() => handleTabClick("emailTemplate")}
      >
        Email Template
      </div>
    </div>
  );
};

export default TableSwitch;
