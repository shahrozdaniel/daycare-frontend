"use client";

import { useState } from "react";
import DailyTable from "./DailyTable";
import MonthlyTable from "./MonthlyTable";
import YearlyTable from "./YearlyTable";
import { columns, Compliance } from "./columns";

const data: Compliance[] = [
  {
    name: "Cleaning & Sanitisation",
    dateUpdated: new Date(),
    download: "",
    view: "view",
    status: "Mark Checked",
  },
];

const Page = () => {

  const [selectedOption, setSelectedOption] = useState<string>('Daily');

  const renderSettingComponent = () => {
    switch (selectedOption) {
      case 'Daily':
        return <DailyTable columns={columns} data={data} />;
      case 'Monthly':
        return <MonthlyTable columns={columns} data={data} />;
      case 'Yearly':
        return <YearlyTable columns={columns} data={data} />;
      default:
        return null;
    }
  };

  const modules : string[] = [
    'Daily',
    'Monthly',
    'Yearly'
  ]; 

  return (
    <main className="p-4 h-[87.8%]">
      <section
        className="[box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px] h-full
            text-[#FFFFFF] p-6 overflow-auto
            "
      >
        <div className="flex">
        {modules.map((module) => (
            <div className="flex items-center h-fit relative flex-col cursor-pointer" key={module}>
              <span
                className={`text-button-color ${selectedOption === module && 'bg-blue-b3'} text-center text-[14px] font-medium leading-[20px] tracking-normal p-2 w-[80px] ${selectedOption === module ? 'selected' : ''}`}
                onClick={() => setSelectedOption(module)}
              >
                {module}
              </span>
              {selectedOption === module && (
                <div className="border-b-[2px] border-solid border-button-color w-4/5 mx-auto self-center"></div>
              )}
            </div>
          ))}
          <div className="w-10"></div>
        </div>
        {renderSettingComponent()}
      </section>
    </main>
  );
};

export default Page;
