"use client";
import React, { useEffect, useState } from "react";
import { MainPageContainer } from "../mainPage.styled";
import UserTable from "../../daycareManagement/components/UserTable";
import { User, columns } from "../../daycareManagement/coulmns";
import { getDashboardDetailsApi } from "@/services/dashboardServices";
import { useGlobalContext } from "@/app/context/store";
import { ToastContainer } from "react-toastify";
export default function DashboardComponent() {
  const [dashboardval, setDashboardVal] = useState<any>([]);
  const { globalSettings } = useGlobalContext();
  const data: User[] = [
    {
      id: "1",
      classroom: "Toddler ",
      educator: "1",
      children: "10",
      educatorName: "Jack",
      childrenName: "Jack",
    },
    {
      id: "2",
      classroom: "Toddler ",
      educator: "1",
      children: "10",
      educatorName: "Jack",
      childrenName: "Jack",
    },
    {
      id: "3",
      classroom: "Toddler ",
      educator: "1",
      children: "10",
      educatorName: "Jack",
      childrenName: "Jack",
    },
    {
      id: "4",
      classroom: "Toddler ",
      educator: "1",
      children: "10",
      educatorName: "Jack",
      childrenName: "Jack",
    },
    {
      id: "5",
      classroom: "Toddler ",
      educator: "1",
      children: "10",
      educatorName: "Jack",
      childrenName: "Jack",
    },
  ];
  const getDashboardDetails = async () => {
    let res = await getDashboardDetailsApi();
    console.log("res", res);
    let arrdata = res?.details?.map((item: any, index: any) => {
      return {
        id: index,
        classroom: item.classroom,
        logo: item.classroom.logo,
        classroomType: item.classroom.classroom_type,
        educatorCount: item.educators?.length || 0,
        childrenCount: item.childrens?.length || 0,
        educators: item.educators || null,
        childrens: item.childrens || null,
      };
    });

    let data = {
      ...res,
      table: arrdata,
    };

    setDashboardVal(data);
  };

  useEffect(() => {
    getDashboardDetails();
  }, []);
  console.log("dashboard val", dashboardval);
  return (
    <>
      <MainPageContainer
        style={{
          backgroundColor: globalSettings?.backgroundColour || "#ECF2F4",
          margin: 0,
          minHeight: "88%",
        }}
      >
        <div className="bg-white p-5 rounded-2xl">
          <div className="flex justify-center items-center w-full sm:flex-wrap md:flex-wrap lg:flex-nowrap ">
            {/* <div className=" border-2 w-full max-w-[350px] text-center flex justify-center items-center h-full min-h-[180px]">
              <div className="mx-0 my-auto flex flex-col justify-center items-center gap-1 w-52 ">
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[24px] font-medium">
                  Invoices
                </div>
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[16px] font-medium">
                  Paid - Due
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <div className="bg-[#eefcfc] font-[DM_Sans] text-[16px] font-medium p-2">
                    0
                  </div>
                  <div className="bg-[#ffebee] font-[DM_Sans] text-[16px] font-medium p-2 ">
                    0
                  </div>
                </div>
              </div>
            </div> */}
            <div className=" border-2 w-full  text-center flex justify-center items-center h-full min-h-[180px]">
              <div className="mx-0 my-auto flex flex-col justify-center items-center gap-1 w-52">
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[24px] font-medium">
                  Staff
                </div>
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[16px] font-medium">
                  Present vs Absent
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <div className="bg-[#eefcfc] font-[DM_Sans] text-[16px] font-medium p-2">
                    {dashboardval?.staff?.present || 0}
                  </div>
                  <div className="bg-[#ffebee] font-[DM_Sans] text-[16px] font-medium p-2">
                    {dashboardval?.staff?.absent || 0}
                  </div>
                </div>
              </div>
            </div>
            <div className=" border-2 w-full  text-center flex justify-center items-center h-full min-h-[180px]">
              <div className="mx-0 my-auto flex flex-col justify-center items-center gap-1 w-52">
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[24px] font-medium">
                  Children
                </div>
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[16px] font-medium">
                  Enrolled vs Registered
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <div className="bg-[#eefcfc] font-[DM_Sans] text-[16px] font-medium p-2">
                    {dashboardval?.children?.enrolled.enrollmentcount || 0}
                  </div>
                  <div className="bg-[#ffebee] font-[DM_Sans] text-[16px] font-medium p-2">
                    {dashboardval?.children?.registered.registrationcount || 0}
                  </div>
                </div>
              </div>
            </div>
            <div className=" border-2 w-full  text-center flex justify-center items-center h-full min-h-[180px]">
              <div className="mx-0 my-auto flex flex-col justify-center items-center gap-1 w-52">
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[24px] font-medium">
                  Child Attendance
                </div>
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[16px] font-medium">
                  Present vs Absent
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <div className="bg-[#eefcfc] font-[DM_Sans] text-[16px] font-medium p-2">
                    {dashboardval?.child_attendence?.present || 0}
                  </div>
                  <div className="bg-[#ffebee] font-[DM_Sans] text-[16px] font-medium p-2">
                    {dashboardval?.child_attendence?.absent || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <UserTable columns={columns} data={dashboardval?.table || []} />
        </div>
      </MainPageContainer>
      <ToastContainer />
    </>
  );
}
