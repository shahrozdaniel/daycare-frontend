"use client"
import React, { useState } from "react";
import SubsidisedChildren from "./SubsidisedChildren/page";
import SubsidyProgram from "./SubsidyProgram/page";

const SubsidyManagement = () => {
  const [selectedReport, setSelectedReport] =
    useState<string>("Subsidy Program");

  const renderReportComponent = () => {
    switch (selectedReport) {
      case "Subsidy Program":
        return <SubsidyProgram />;
      case "Subsidised Children":
        return <SubsidisedChildren />;
      default:
        return null;
    }
  };

  const reportOptions: string[] = ["Subsidy Program", "Subsidised Children"];

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

export default SubsidyManagement;
