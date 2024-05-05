import React, { useEffect, useState } from "react";
import AllergyTable from "../Allergies/AlleryTable";
import ImmunisationTable from "./ImmunisationTable";
import { User, columns } from "./columns";
import { immunasationDetailsOfChild } from "@/services/report";



const ImmunisationReports: React.FC<any> = ({ selectedOption, selectedReport }) => {
  const [data, setData] = useState<any>([])
  const getImmunasationDetails = async () => {
    let res;
    try {
      res = await immunasationDetailsOfChild()
      if (res?.success) {
        let immuArr: any = []
        let immunasationData = res?.data
        immunasationData?.map((ele: any) => {
          immuArr.push({ id: ele?.child_id, enrollmentId: ele?.enrollment_id, ageRange: ele?.age, childName: `${ele?.first_name} ${ele?.last_name}`, associatedClass: ele?.name, lastImmunisation: ele?.vaccination_date?.split('T')?.[0], status: `${ele?.is_active == 1 ? 'Active' : 'Inactive'}` })
        })
        setData(immuArr)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getImmunasationDetails()
  }, [])
  return (
    <>
      <div className="flex justify-between gap-[24px] flex-wrap my-5">
        <div className="flex-col gap-2  w-[262px] max-w-full shadow-tablelayoutshadow text-center justify-center align-items-center">
          <div className="text-[#4b4b4b] font-sans text-[12px] font-medium">
            Total number of children
          </div>
          <div className="text-[#4b4b4b] font-sans text-[40px] font-medium">
            {data?.length}
          </div>
        </div>
      </div>
      <ImmunisationTable columns={columns} data={data} selectedOption={selectedOption} selectedReport={selectedReport}  />
    </>
  );
};

export default ImmunisationReports;
