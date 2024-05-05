"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownContainer,
  FeesDetails,
  FeesManagementContainer,
  LeftStatTitle,
  LoaderFeesContainer,
  RightStatTitle,
} from "./feesManagement.styles";
import SwitchFees from "@/components/common/SwitchFees";
import CustomSelect from "@/components/common/CustomSelect";
import { Progress } from "@/components/common/Progress";
import { CircularProgress } from "@/components/common/ProgressRounded";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Invoices from "./tabComponent/Invoices/page";
import Children from "./tabComponent/Children/page";
import DiscountManagement from "./tabComponent/DiscountManagement/page";
import FeesManagement from "./tabComponent/FeesManagement/page";
import TutionPlan from "./tabComponent/TutionPlan/page";
import SubsidyManagement from "./tabComponent/SubsidyManagement/page";
import { getDiscountList } from "@/services/discountManagementServices";

const Page: React.FC = () => {
  const { control } = useForm<FormData>();

  const [selectedOption, setSelectedOption] = useState<string>("Invoices");

  const renderReportComponent = () => {
    switch (selectedOption) {
      // case "Fees Dashboard":
      //   return <FeesManagement />;
      case "Invoices":
        return <Invoices />;
      // case "Children":
      //   return <Children />;
      case "Tution Plan":
        return <TutionPlan />;
      case "Discount Management":
        return <DiscountManagement />;
      case "Subsidy Management":
        return <SubsidyManagement />;
      default:
        return null;
    }
  };

  const reportOptions: string[] = [
    // "Fees Dashboard",
    "Invoices",
    // "Children",
    "Tution Plan",
    "Discount Management",
    "Subsidy Management",
  ];

  return (
    <>
      <main className="p-4 h-[87.8%]">
        <section
          className="[box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px] h-full
            text-[#FFFFFF] p-6 overflow-auto
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
                  onClick={() => setSelectedOption(option)}
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
