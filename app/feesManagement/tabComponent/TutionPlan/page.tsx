"use client"
import React, { useEffect, useState } from "react";
import ClassroomBased from "./ClassroomBased/page";
import IndividualPlan from "./IndividualPlan/page";
import AgeGroupBased from "./AgeGroupBased/page";
import RegistrationFees from "./RegistrationFees/page";
import { tutionPlanList } from "@/services/feeManagement";

const TutionPlan = () => {
  const [selectedReport, setSelectedReport] =
    useState<string>("Registration Fees");

  const renderReportComponent = () => {
    switch (selectedReport) {
      case "Registration Fees":
        return <RegistrationFees />;
      case "Classroom Based":
        return <ClassroomBased />;
      case "Individual Plan":
        return <IndividualPlan />;
      case "Age Group Based":
        return <AgeGroupBased />;
      default:
        return null;
    }
  };
 
  const reportOptions: string[] = [
    "Registration Fees",
    "Classroom Based",
    "Individual Plan",
    "Age Group Based",
  ];

  return (
    <>
      <section className="mt-4 flex gap-4">
        {reportOptions.map((option) => (
          <div
            key={option}
            className={`text-${selectedReport === option ? "blue-b1" : "black-b1"
              } text-sm border-[1px] border-${selectedReport === option ? "blue-b1" : "grey-text"
              } rounded-md px-8 py-1 w-fit hover:text-white hover:bg-blue-b1 cursor-pointer`}
            onClick={() => setSelectedReport(option)}
          >
            {option}
          </div>
        ))}
      </section>
      {renderReportComponent()}
    </>
  );
};

export default TutionPlan;
