import React, { useEffect, useState } from "react";
import EnrollmentReport from "./EnrollmentReport";
import VacancyReport from "./VacancyReport";
import { useRouter, useSearchParams } from "next/navigation";

const CentreReports: React.FC<any> = ({ selectedOption }) => {
  const [selectedReport, setSelectedReport] =
    useState<string>("Enrollment Report");
  const router = useRouter();
  const params = useSearchParams();
  const tab = params?.get("tab");

  useEffect(() => {
    if (tab) {
      setSelectedReport(tab);
    }
  }, [tab]);

  const renderReportComponent = () => {
    switch (selectedReport) {
      case "Enrollment Report":
        return <EnrollmentReport />;
      case "Vacancy Report":
        return <VacancyReport />;
      default:
        return null;
    }
  };

  const reportOptions: string[] = ["Enrollment Report", "Vacancy Report"];

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

export default CentreReports;
