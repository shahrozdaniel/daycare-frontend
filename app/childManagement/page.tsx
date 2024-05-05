"use client";
import React, { useLayoutEffect, useState } from "react";
import Switch from "@/components/common/Switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import UserTable from "../userManagement/components/UserTable";
import { tableColumn } from "./components/tableColumns";
import ChildManagementTable from "./components/childManagementTable";
import TableSwitch from "./components/tabSwitch";
import { enrolledTableColumn } from "./components/enrolledTableColumn";
import { childManagementApi } from "./childManagementApi";
import {
  childEnrollmetnList,
  childPendingList,
  childRegistrationList,
} from "@/services/childrenActionServices";
import {
  Date_time_conversion,
  getAMPMTime,
  time_conversion,
} from "@/utils/utilityFunctions";
import { useSearchParams } from "next/navigation";
import { pendingColoum } from "./components/waitListColum";
export type waitlistTableType = {
  id: number;
  ChildName: any;
  Classroom: string;
  ParentName: string;
  RegistrationDate: Date;
  joiningdate: string;
  earliestaval: string;
  status: string;
  reloadTable?: any
};

export type enrolledTableType = {
  id: number;
  childname: any;
  classroom: string;
  parentname: string;
  child_id: number;
  date: Date;
  checkin: string;
  checkout: string;
  reloadTable?: any
};

const ChildManagementCard = () => {
  let searchparam = useSearchParams();
  let enrolledactive = searchparam?.get("enrolled");

  const [activeTab, setActiveTab] = useState(
    enrolledactive ? "enrolled" : "pending"
  );
  const [childManagementData, setChildManagementData] = useState<any>([]);
  const [childEnrollData, setChildEnrollData] = useState<any>([]);
  const [childpendingData, setChildpendingData] = useState<any>([]);


  // const enrolledData: enrolledTableType[] = [
  // {
  //   id: 1,
  //   childname: "efwef",
  //   classroom: "Toddler",
  //   parentname: "Casey jimiez",
  //   date: new Date(),
  //   checkin: "",
  //   checkout: "checkout",
  // },
  // ];
  // Default active tab

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  //  child Registration List
  const getChildManagementlist = async () => {
    let res;
    try {
      res = await childRegistrationList();
      if (res?.success) {
        // console.log(res?.data)
        setChildManagementData(res?.data);
      }
      // console.log(res);
    } catch (error) { }
  };
  //   child enrollment List
  const enrolledChildlistlist = async () => {
    let res;
    try {
      res = await childEnrollmetnList();
      if (res?.success) {
        // console.log(res?.data)
        setChildEnrollData(res?.data);
      }
      // console.log(res);
    } catch (error) { }
  };
  const pendingChildlistlist = async () => {
    let res;
    try {
      res = await childPendingList();
      if (res?.success) {
        // console.log(res?.data)
        setChildpendingData(res?.data);
      }
      // console.log(res);
    } catch (error) { }
  };
  useLayoutEffect(() => {
    getChildManagementlist();
    enrolledChildlistlist();
    pendingChildlistlist()
  }, [activeTab]);

  let tableData: any = [];
  childManagementData?.map((e: any) => {
    tableData.push({
      id: e?.registration_id,
      child_id: e?.child_id,
      parent_id: e?.parent_id,
      ChildName: e?.child || null,
      Classroom: e?.classroom_name,
      ParentName: `${e?.child?.parents?.first_name} ${e?.child?.parents?.last_name}`,
      RegistrationDate: Date_time_conversion(e?.created_at),
      joiningdate: Date_time_conversion(e?.start_date),
      earliestaval: e?.earliestaval ? e?.earliestaval : "--",
      status: e?.status == 1 ? "Profile Pending" : "Approved",
      phoneNo: e?.child?.parents?.phone_no
    });
  });
  let PendingData: any = [];
  childpendingData?.map((e: any) => {
    // console.log(e?.child_id)
    PendingData.push({
      id: e?.registration_id,
      child_id: e?.child_id,
      parent_id: e?.parent_id,
      ChildName: e?.child || null,
      Classroom: e?.classroom_name,
      ParentName: `${e?.child?.parents?.first_name} ${e?.child?.parents?.last_name}`,
      RegistrationDate: Date_time_conversion(e?.created_at),
      joiningdate: Date_time_conversion(e?.start_date),
      earliestaval: e?.earliestaval ? e?.earliestaval : "--",
      status: e?.status == 0 ? "Approval Pending" : "Approval Rejected",
      statusId: e?.status,
      reloadTable: pendingChildlistlist,
      phoneNo: e?.child?.parents?.phone_no
    });
  });

  let enrolledData: any = [];
  childEnrollData?.map((e: any) => {

    enrolledData.push({
      id: e?.id,
      child_id: e?.child_id,
      parent_id: e?.parent_id,
      childname: e?.child,
      classroom: e?.classroom_name,
      ParentName: `${e?.parent?.first_name} ${e?.parent?.last_name}`,
      date: Date_time_conversion(e?.created_at),
      checkin: e?.attendance ? e?.attendance?.check_in : null,
      checkout: e?.attendance ? e?.attendance.check_out : null,
      allergy: e?.child?.allergy_details,
      phoneNo: e?.parent?.phone_no
    });
  });
  console.log('childpendingData', childpendingData)

  return (
    <div className=" bg-[#2E3F3F]  px-[45px] py-[30px] min-h-screen h-auto">
      <div className="flex lg:flex-row lg:items-center lg:justify-start md:flex-col md:justify-center md:items-center " >
        <div className="w-full">
          <TableSwitch activeTab={activeTab} handleTabClick={handleTabClick} />
        </div>
        {/* <Tabs defaultValue="Waitlist" className="w-[400px]">
          <TabsList className="bg-white border-b border-solid border-[#f7f7f7] rounded-none">
            <TabsTrigger
              value="Waitlist"
              className="hover:bg-[#eefcfc] focus:bg-[#eefcfc] active:bg-[#eefcfc] hover:text-[#00858e] focus:text-[#00858e] active:text-[#00858e] "
            >
              Waitlist
            </TabsTrigger>
            <TabsTrigger
              value="Enrolled"
              className="hover:bg-[#eefcfc] focus:bg-[#eefcfc] active:bg-[#eefcfc] hover:text-[#00858e] focus:text-[#00858e] active:text-[#00858e]"
            >
              Enrolled
            </TabsTrigger>
            <TabsTrigger
              value="Pending"
              className="hover:bg-[#eefcfc] focus:bg-[#eefcfc] active:bg-[#eefcfc] hover:text-[#00858e] focus:text-[#00858e] active:text-[#00858e]"
            >
              Pending
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Waitlist">waitlist</TabsContent>
          <TabsContent value="Enrolled">enrolled</TabsContent>
          <TabsContent value="Pending">pending</TabsContent>
        </Tabs> */}
        {/* <div className="flex gap-5">
          <div className="flex justify-between items-center gap-4 px-[34px] py-[13px] w-[220px] rounded-xl bg-[#E4F2FF] ">
            <div className="flex flex-col items-center ">
              <div className="w-[24px] h-[24px] rounded-full bg-blue-500 flex items-center justify-center">
                <Image
                  src={"/svgs/info-icon.svg"}
                  width={14}
                  height={14}
                  alt=""
                />
              </div>
              <p className="text-blue-500 text-center font-dm-sans text-xs font-medium">
                Stat 01
              </p>
            </div>
            <div className="border-[2px] border-solid border-[#3B82F6] h-full"></div>
            <p className="text-blue-500 text-center font-sans text-4xl font-medium leading-[38px]">
              50
            </p>
          </div>

          <div className="flex justify-between items-center gap-4 px-[34px] py-[13px] w-[220px] rounded-xl bg-[#E5F5EC] ">
            <div className="flex flex-col items-center ">
              <div className="w-[24px] h-[24px] rounded-full bg-[#47B881] flex items-center justify-center">
                <Image
                  src={"/svgs/success-icon.svg"}
                  width={14}
                  height={14}
                  alt=""
                />
              </div>
              <p className="text-[#47B881] text-center font-dm-sans text-xs font-medium">
                Stat 02
              </p>
            </div>
            <div className="border-[2px] border-solid border-[#47B881] h-full"></div>
            <p className="text-[#47B881] text-center font-sans text-4xl font-medium leading-[38px]">
              50
            </p>
          </div>

          <div className="flex justify-between items-center gap-4 px-[34px] py-[13px] w-[220px] rounded-xl bg-[#FFF7E1] ">
            <div className="flex flex-col items-center ">
              <div className="w-[24px] h-[24px] rounded-full bg-[#FFAD0D] flex items-center justify-center">
                <Image
                  src={"/svgs/time-icon.svg"}
                  width={14}
                  height={14}
                  alt=""
                />
              </div>
              <p className="text-[#FFAD0D] text-center font-dm-sans text-xs font-medium">
                Stat 03
              </p>
            </div>
            <div className="border-[2px] border-solid border-[#FFAD0D] h-full"></div>
            <p className="text-[#FFAD0D] text-center font-sans text-4xl font-medium leading-[38px]">
              50
            </p>
          </div>
        </div> */}
      </div>

      <div className="bg-white rounded-br-2xl rounded-bl-2xl min-h-[32em]">
        {activeTab === "waitlist" && (
          <ChildManagementTable columns={tableColumn} data={tableData} />
        )}
        {activeTab === "enrolled" && (
          <ChildManagementTable
            columns={enrolledTableColumn}
            data={enrolledData}
          />
        )}
        {activeTab === "pending" && (
          <ChildManagementTable columns={pendingColoum} data={PendingData} />
        )}
      </div>
    </div>
  );

  // return <ChildProfile />;
};

export default ChildManagementCard;
