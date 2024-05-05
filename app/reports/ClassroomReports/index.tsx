import React, { useEffect, useState } from "react";
import AttendanceReport from "./AttendanceReport";
import HealthReport from "./HealthReport";
import IncidentReport from "./IncidentReport";
import SleepReport from "./SleepReport";
import { useRouter, useSearchParams } from "next/navigation";

const ClassroomReports: React.FC<any> = ({ selectedOption }) => {
  const [selectedReport, setSelectedReport] =
    useState<string>("Attendance Report");
  const router = useRouter();
  const params = useSearchParams();
  const tab = params?.get("tab");

  useEffect(() => {
    if (tab) {
      const val=tab.split('?')[0]; 
      if(val){
      setSelectedReport(val);
      }
    }
  }, [tab]);

  const renderReportComponent = () => {
    switch (selectedReport) {
      case "Attendance Report":
        return (
          <AttendanceReport
            selectedOption={selectedOption}
            selectedReport={selectedReport}
          />
        );
      case "Health Report":
        return (
          <HealthReport
            selectedOption={selectedOption}
            selectedReport={selectedReport}
          />
        );
      case "Sleep Report":
        return (
          <SleepReport
            selectedOption={selectedOption}
            selectedReport={selectedReport}
          />
        );
      case "Incident Report":
        return (
          <IncidentReport
            selectedOption={selectedOption}
            selectedReport={selectedReport}
          />
        );
      default:
        return null;
    }
  };

  const reportOptions: string[] = [
    "Attendance Report",
    "Health Report",
    "Sleep Report",
    "Incident Report",
  ];

  return (
    <>
      <section className="mt-4 flex gap-4">
        {reportOptions.map((option) => (
          <div
            key={option}
            className={`text-${
              selectedReport === option ? "blue-b1" : "black-b1"
            } text-sm border-[1px] border-${
              selectedReport === option ? "blue-b1" : "grey-text"
            } rounded-md px-8 py-1 w-fit hover:text-white hover:bg-blue-b1 cursor-pointer`}
            onClick={() =>
              router.push(`/reports?set=${selectedOption}&tab=${option}`)
            }
          >
            {option}
          </div>
        ))}
      </section>
      {renderReportComponent()}
    </>
  );
};

export default ClassroomReports;
