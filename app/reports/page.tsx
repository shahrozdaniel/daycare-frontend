"use client";
import { useEffect, useState } from "react";
import CentreReports from "./CentreReports";
import ChildReports from "./ChildReports";
import ClassroomReports from "./ClassroomReports";
import StaffReports from "./StaffReports";
import { useGlobalContext } from "../context/store";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Child Reports");
  const { globalSettings } = useGlobalContext();

  const router = useRouter();
  const params = useSearchParams();
  const tab = params?.get("set");
 
  
  useEffect(() => {
    if (tab) {
      setSelectedOption(tab);
    }
  }, [tab]);

  const renderReportComponent = () => {
    switch (selectedOption) {
      case "Child Reports":
        return <ChildReports selectedOption={selectedOption} />;
      case "Classroom Reports":
        return <ClassroomReports selectedOption={selectedOption} />;
      case "Centre Reports":
        return <CentreReports selectedOption={selectedOption}/>;
      case "Staff Reports":
        return <StaffReports />;
      default:
        return null;
    }
  };

  const reportOptions: string[] = [
    "Child Reports",
    "Classroom Reports",
    "Centre Reports",
    "Staff Reports",
  ];

  return (
    <>
      <main
        className="p-4 min-h-[89%]"
        style={{
          backgroundColor: globalSettings?.backgroundColour || "#ECF2F4",
        }}
      >
        <section
          className="[box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px] h-full
            text-[#FFFFFF] p-6 overflow-auto bg-white rounded-2xl
            "
        >
          <div className="flex gap-5">
            {reportOptions.map((option) => (
              <div
                className="flex items-center h-fit relative flex-col cursor-pointer"
                key={option}
              >
                <span
                  className={`text-button-color ${
                    selectedOption === option && "bg-blue-b3"
                  } text-center text-[14px] font-medium leading-[20px] tracking-normal p-2 ${
                    selectedOption === option ? "selected" : ""
                  }`}
                  onClick={() => router.push(`/reports?set=${option}`)}
                >
                  {option}
                </span>
                {selectedOption === option && (
                  <div className="border-b-[2px] border-sodivd border-button-color w-4/5 mx-auto self-center"></div>
                )}
              </div>
            ))}
          </div>
          {renderReportComponent()}
        </section>
      </main>
    </>
  );
};

export default Page;
