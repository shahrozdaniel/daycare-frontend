import React, { useEffect, useState } from "react";
import StaffTable from "./StaffTable";
import { educatorManagementListApi } from "@/app/daycareManagement/components/educatorManagementApi";
import { Date_time_conversion, getAMPMTime } from "@/utils/utilityFunctions";
import { coloums } from "../columns";



const AttendanceReport = () => {
  const [data, setData] = useState<any>([])
  const getEducatorManagementlist = async () => {
    let res;
    try {
      res = await educatorManagementListApi();
      if (res?.success) {
        let arrdata = res.data.map((item: any, index: any) => {
          return {
            id: item.id,
            educatorName: item?.userData,
            Classroom: item?.classroom,
            RoleName: item.rolename,
            isActive: item?.is_active,
            Date: item.attendance
              ? Date_time_conversion(item.attendance.date)
              : null,
            CheckIn: item.attendance
              ? getAMPMTime(item.attendance.checkInTime)
              : null,
            CheckOut: item.attendance
              ? getAMPMTime(item.attendance.checkOutTime)
              : "--",
            Duration: item.attendance ? item.attendance.duration : null,
            attendence: item?.attendance,
            Incident: "--",
            start_date: item?.start_date,
          };
        });
        setData(arrdata);
      }

    } catch (err: any) {
      console.log(err)
    }
  };
  useEffect(() => {
    getEducatorManagementlist()
  }, [])
  return (
    <>
      <div className="flex justify-between gap-[24px] flex-wrap my-5">
        <div className="flex-col gap-2  w-[262px] max-w-full shadow-tablelayoutshadow text-center justify-center align-items-center">
          <div className="text-[#4b4b4b] font-sans text-[12px] font-medium">
            Total number of educator
          </div>
          <div className="text-[#4b4b4b] font-sans text-[40px] font-medium">
            {data?.length}
          </div>
        </div>
      </div>
      <StaffTable columns={coloums} data={data} />
    </>
  );
};

export default AttendanceReport;
