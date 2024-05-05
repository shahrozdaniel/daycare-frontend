"use client";

import React, { FC, useState } from "react";

interface SettingSidebarProps {
  selectedOption: string;
  setSelectedOption: any;
}

const SettingSidebar: FC<SettingSidebarProps> = ({
  setSelectedOption,
  selectedOption,
}) => {
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const settings = [
    "Centre Setting",
    "Classroom Setting",
    "Fees Setting",
    "Health Screening",
    "Holiday List",
    "Registration Docs",
    "Login Setting",
    "Notification Setting",
    "Add On Setting",
    "Safe Arrival Setting",
    "Location & Cleaning Staff",
  
    // "Send Notification"
  ];

  return (
    <div 
      className=" col-span-1 p-4 h-full overflow-scroll hide-scroll
        [box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px] bg-white rounded-2xl"
    >
      <ul
        className=" flex flex-col items-center lg:justify-around md:gap-[12px]  "
      >
        {settings.map((setting, index) => (
          <li
            key={index}
            className={`flex items-center h-fit relative cursor-pointer ${selectedOption === setting ? "selected flex-col" : ""
              }`}
          >
            <span
              className={`text-${selectedOption === setting
                ? "button-color bg-blue-b3"
                : "black-b1"
                } w-full font-sans lg:text-[18px] md:text-[12px] md:text-center font-medium p-2`}
              onClick={() => handleOptionClick(setting)}
            >
              {setting}
            </span>
            {index < settings.length - 1 && selectedOption === setting && (
              <div className="border-b-[2px] border-solid border-button-color w-[90%] mx-auto self-center"></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingSidebar;
