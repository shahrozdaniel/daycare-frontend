import { X } from "lucide-react";
import React, { useState } from "react";
interface TableSwitchType {
  activeTab: string;
  handleTabClick: (value: string) => void;
  setChatOpen: (value: boolean) => void;
}
const TabSwitch: React.FC<TableSwitchType> = ({
  activeTab,
  handleTabClick,
  setChatOpen,
}) => {
  return (
    <div className="flex justify-between items-center pr-2 pl-3 w-full">
      <div className="flex gap-5 items-center my-2">
        <button
          className={`font-sans  text-[16px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer ${
            activeTab === "Parent" ? "  text-white" : "text-[#DDDBDB]"
          }`}
          onClick={() => handleTabClick("Parent")}
        >
          Parents
        </button>

        <button
          className={` text-[16px] font-medium leading-[20px] tracking-normal flex items-center justify-center cursor-pointer text-shadow ${
            activeTab === "Staff" ? "  text-white" : "text-blue-100"
          }` }
          onClick={() => handleTabClick("Staff")}
        >
          Staff
        </button>
      </div>
      <div className="cursor-pointer mr-1" onClick={() => setChatOpen(false)}>
        {" "}
        <X size={25} color="white" />
      </div>
      <style>{`
      .text-shadow {
        text-shadow: 0px 4px 4px gray;
    }
      `}</style>
    </div>
  );
};

export default TabSwitch;
