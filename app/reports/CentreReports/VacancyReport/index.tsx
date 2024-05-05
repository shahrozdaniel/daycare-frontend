import React, { useEffect, useState } from "react";
import { User, columns } from "./columns";
import VacancyTable from "./VacancyTable";
import { vacancyReportList } from "@/services/childrenActionServices";
import { Date_time_conversion } from "@/utils/utilityFunctions";



const HealthReport = () => {


  const [childEnrollData, setChildEnrollData] = useState<any>([]);

  const enrolledChildlistlist = async () => {
    let res;
    try {
      res = await vacancyReportList();
      if (res?.success) {
        setChildEnrollData(res?.data);
      }
    } catch (error) { }
  };

useEffect(()=>{
  enrolledChildlistlist()
},[])

  let enrolledData: any = [];
  let exportPendingData: any = []
  childEnrollData?.map((e: any) => {

    enrolledData.push({
      id: e?.id,
      child_id: e?.child_id,
      parent_id: e?.parent_id,
      childname: e?.childname,
      classroom: e?.classroomname,
      ParentName: `${e?.first_name} ${e?.last_name}`,
      date:e?.graduationDate ? Date_time_conversion(e?.graduationDate) : "-",
    });
    exportPendingData.push({
      id: e?.id,
      child_id: e?.child_id,
      parent_id: e?.parent_id,
      childname: e?.childname,
      classroom: e?.classroomname,
      ParentName: `${e?.first_name} ${e?.last_name}`,
      date:e?.graduationDate ? Date_time_conversion(e?.graduationDate) : "-",
    });
  });
  return (
    <>
      <VacancyTable columns={columns} data={enrolledData} exportData={exportPendingData}/>
    </>
  );
};

export default HealthReport;
