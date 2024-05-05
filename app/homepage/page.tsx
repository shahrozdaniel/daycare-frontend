import React from "react";
import "../../app/globals.css";
import Image from "next/image";

const index = () => {
  const sidebarOptions = [
    "Dashboard",
    "Child Registration",
    "Class Management",
    "Staff Management",
    "DayCare Setting",
    "Fees Management",
    "User Management",
    "Food Management",
    "Activity Management",
    "Notification",
    "Reports",
    "Customer Support",
    "Subscription",
    "Compliance",
  ];

  return (
    <main className="h-screen">
      <div className="w-[20%] h-[87.7%] bg-[#EEFCFC] flex flex-col justify-around">
      {sidebarOptions.map((item, index) => {
        return <p className="text-[20px] font-medium leading-[28px] tracking-normal text-left px-6" key={index}>
          + {item}
        </p>
      })}
      </div>
    </main>
  );
};

export default index;
