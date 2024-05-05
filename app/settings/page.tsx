"use client";

import React, { useEffect, useState } from "react";
import CenterSetting from "./CenterSetting";
import Button from "@/components/common/Button";
import SettingSidebar from "./components/SettingSidebar";
import ClassroomSetting from "./ClassroomSetting";
import FeeSetting from "./FeeSetting";
import HealthScreening from "./HealthScreening";
import RegistrationDocs from "./RegistrationDocs";
import LoginSetting from "./LoginSetting";
import NotificationSetting from "./NotificationSetting";
import AddOnSetting from "./AddOnSetting";
import HolidaySetting from "./HolidaySetting";
import SafeArrivalSetting from "./SafeArrivalSetting";
import { useGlobalContext } from "../context/store";
import Rooms from "./Rooms";
import SendNotification from "./SendNotification";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const { IsAdmin, globalSettings } = useGlobalContext();
  const router = useRouter();
  const params = useSearchParams();
  const tab = params?.get("set");

  const [selectedOption, setSelectedOption] =
    useState<string>("Centre Setting");
  useEffect(() => {
    if (tab) {
      setSelectedOption(tab);
    }
  }, [tab]);

  const renderSettingComponent = () => {
    switch (selectedOption) {
      case "Centre Setting":
        return <CenterSetting />;
      case "Classroom Setting":
        return <ClassroomSetting />;
      case "Fees Setting":
        return <FeeSetting />;
      case "Health Screening":
        return <HealthScreening />;
      case "Holiday List":
        return <HolidaySetting />;
      case "Registration Docs":
        return <RegistrationDocs />;
      case "Login Setting":
        return <LoginSetting />;
      case "Notification Setting":
        return <NotificationSetting />;
      case "Add On Setting":
        return <AddOnSetting />;
      case "Safe Arrival Setting":
        return <SafeArrivalSetting />;
      case "Location & Cleaning Staff":
        return <Rooms />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{ backgroundColor: globalSettings?.backgroundColour || "#2E3F3F" }}
    >
      <section
        style={{
          backgroundColor: globalSettings?.backgroundColour || "#2E3F3F",
        }}
        className={`grid grid-cols-5 gap-4 h-[89.2%] w-full lg:p-4 md:p-2 fixed`}
      >
        <SettingSidebar
          setSelectedOption={(val: string) => {
            router.push(`/settings?set=${encodeURIComponent(val)}`);
          }}
          selectedOption={selectedOption}
        />
        <div
          className="flex flex-col col-span-4 overflow-y-auto
        [box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px]
         overflow-x-hidden bg-white rounded-2xl 
      "
        >
          {renderSettingComponent()}
          {/* <div className="flex gap-4 md:mx-auto lg:mr-[17%] w-fit mt-2 mb-4">
            <Button type="submit" form="blue" className="">
              Save
            </Button>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Page;
