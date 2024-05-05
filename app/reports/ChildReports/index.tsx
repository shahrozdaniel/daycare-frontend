import React, { useEffect, useState } from "react";
import Allergies from "./Allergies";
import ImmunisationReports from "./ImmunisationReports";
import Birthday from "./Birthday";
import { CircularProgress } from "@/components/common/ProgressRounded";
import { RightStatTitle } from "@/app/feesManagement/feesManagement.styles";
import { useRouter, useSearchParams } from "next/navigation";

const ChildReports: React.FC<any> = ({ selectedOption }) => {
  const [selectedReport, setSelectedReport] = useState<string>("Allergies");

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
      case "Allergies":
        return (
          <Allergies
            selectedOption={selectedOption}
            selectedReport={selectedReport}
          />
        );
      case "Immunization Reports":
        return (
          <ImmunisationReports
            selectedOption={selectedOption}
            selectedReport={selectedReport}
          />
        );
      case "Birthday":
        return (
          <Birthday
            selectedOption={selectedOption}
            selectedReport={selectedReport}
          />
        );
      default:
        return null;
    }
  };

  const reportOptions: string[] = [
    "Allergies",
    "Immunization Reports",
    "Birthday",
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

export default ChildReports;
