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
    <div className="h-9 w-[5rem] border-b-[1px] flex gap-10">
      <button
        className={` w-[80px] text-[14px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer ${
          activeTab === "waitlist"
            ? "border-b-2 border-solid border-[#00858E] bg-[#EEFCFC] text-button-color"
            : ""
        }`}
        onClick={() => handleTabClick("educator")}
      >
        Educator
      </button>
      {/* <div
        className={`w-[80px] text-black2 text-[14px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer ${
          activeTab === "enrolled"
            ? "border-b-2 border-solid border-[#00858E] bg-[#EEFCFC]"
            : ""
        }`}
        onClick={() => handleTabClick("child")}
      >
        Child
      </div> */}
    </div>
  );
};

export default TableSwitch;
