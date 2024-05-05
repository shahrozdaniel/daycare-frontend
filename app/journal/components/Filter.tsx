"use client";
import React, { ReactNode, useState } from "react";

import CustomSelect from "@/components/common/CustomSelect";
import CustomInput from "@/components/common/CustomInput";

export const Filter: React.FC<any> = ({
  date,
  setDate,
  childData,
  setChildId,
  childId,
  classroomData,
  setSelectedClass,
  selectedClass,
}) => {
  return (
    <>
      <div className="flex justify-between mt-4">
        <div className="flex justify-start items-center py-4 w-full">
          <div className="relative flex m-2 w-[14%]">
            <CustomSelect
              name=""
              label="Select Classroom"
              options={classroomData}
              onChange={(e: any) => setSelectedClass(e?.target?.value)}
              value={selectedClass}
            />
          </div>
          <div className="relative flex m-2 w-[14%]">
            <CustomSelect
              name=""
              label="Select Children"
              options={childData}
              onChange={(e: any) => setChildId(e?.target?.value)}
              value={childId}
            />
          </div>
          <div className="m-2 w-[14%]">
            <CustomInput
              name=""
              placeholder="Select Date"
              value={date}
              type="date"
              onChange={(e: any) => setDate(e?.target?.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
