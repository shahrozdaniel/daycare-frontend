import React, { useEffect, useState } from "react";
import { User, columns } from "./columns";
import BirthdayTable from "./BirthdayTable";
import { childEnrollmetnList } from "@/services/childrenActionServices";
import { Date_time_conversion } from "@/utils/utilityFunctions";

const Birthday: React.FC<any> = ({ selectedOption, selectedReport }) => {
  const [data, setData] = useState<any>([]);
  const enrolledChildlistlist = async () => {
    let res;
    try {
      let status = "1";
      res = await childEnrollmetnList(status);
      if (res?.success) {
        let dataArr: any = [];
        res?.data?.map((e: any) => {
          // console.log(e);
          dataArr.push({
            id: e?.id,
            child_id: e?.child_id,
            parent_id: e?.parent_id,
            childName: e?.child?.name,
            associatedClass: e?.classroom_name,
            ParentName: `${e?.parent?.first_name} ${e?.parent?.last_name}`,
            date: Date_time_conversion(e?.created_at),
            checkin: e?.attendance ? e?.attendance?.check_in : null,
            checkout: e?.attendance ? e?.attendance.check_out : null,
            allergy: e?.child?.allergy_details,
            phoneNo: e?.parent?.phone_no,
            dateBirth: e?.child?.dob,
          });
        });
        setData(dataArr);
      }
    } catch (error) {}
  };
  useEffect(() => {
    enrolledChildlistlist();
  }, []);
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
      <BirthdayTable
        columns={columns}
        data={data}
        selectedOption={selectedOption}
        selectedReport={selectedReport}
      />
    </>
  );
};

export default Birthday;
