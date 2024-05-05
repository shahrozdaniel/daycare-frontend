import React from "react";
import { MainPageContainer } from "./mainPage.styled";
import UserTable from "../components/UserTable";
import Navbar from "@/components/common/Navbar";
import { User, columns } from "../coulmns";
export default function Page() {
  const data: User[] = [
    {
      id: "1",
      classroom: "Toodler",
      educator: "1",
      children: "10",
      educatorName: "Jack",
      childrenName: "Jack",
    },
    {
      id: "2",
      classroom: "Toodler",
      educator: "1",
      children: "10",
      educatorName: "Jack",
      childrenName: "Jack",
    },
    {
      id: "3",
      classroom: "Toodler",
      educator: "1",
      children: "10",
      educatorName: "Jack",
      childrenName: "Jack",
    },
    {
      id: "4",
      classroom: "Toodler",
      educator: "1",
      children: "10",
      educatorName: "Jack",
      childrenName: "Jack",
    },
    {
      id: "5",
      classroom: "Toodler",
      educator: "1",
      children: "10",
      educatorName: "Jack",
      childrenName: "Jack",
    },
  ];

  return (
    <>
      <MainPageContainer>
        <div className="flex justify-center items-center w-full sm:flex-wrap md:flex-wrap lg:flex-nowrap">
          <div className=" border-2 w-full max-w-[350px] text-center flex justify-center items-center h-full min-h-[180px]">
            <div className="mx-0 my-auto flex flex-col justify-center items-center gap-1 w-52 ">
              <div className="text-[#4b4b4b] font-[DM_Sans] text-[24px] font-medium">
                Inbox
              </div>
              <div className="text-[#4b4b4b] font-[DM_Sans] text-[16px] font-medium">
                Unread - Need Reply
              </div>
              <div className="flex gap-4 justify-center items-center">
                <div className="bg-[#eefcfc] font-[DM_Sans] text-[16px] font-medium p-2">
                  12
                </div>
                <div className="bg-[#ffebee] font-[DM_Sans] text-[16px] font-medium p-2 ">
                  15
                </div>
              </div>
            </div>
          </div>
          <div className=" border-2 w-full max-w-[350px] text-center flex justify-center items-center h-full min-h-[180px]">
            <div className="mx-0 my-auto flex flex-col justify-center items-center gap-1 w-52">
              <div className="text-[#4b4b4b] font-[DM_Sans] text-[24px] font-medium">
                Staff
              </div>
              <div className="text-[#4b4b4b] font-[DM_Sans] text-[16px] font-medium">
                Assigned vs Unassigned
              </div>
              <div className="flex gap-4 justify-center items-center">
                <div className="bg-[#eefcfc] font-[DM_Sans] text-[16px] font-medium p-2">
                  12
                </div>
                <div className="bg-[#ffebee] font-[DM_Sans] text-[16px] font-medium p-2">
                  15
                </div>
              </div>
            </div>
          </div>
          <div className=" border-2 w-full max-w-[350px] text-center flex justify-center items-center h-full min-h-[180px]">
            <div className="mx-0 my-auto flex flex-col justify-center items-center gap-1 w-52">
              <div className="text-[#4b4b4b] font-[DM_Sans] text-[24px] font-medium">
                Children
              </div>
              <div className="text-[#4b4b4b] font-[DM_Sans] text-[16px] font-medium">
                Enrolled vs Registered
              </div>
              <div className="flex gap-4 justify-center items-center">
                <div className="bg-[#eefcfc] font-[DM_Sans] text-[16px] font-medium p-2">
                  12
                </div>
                <div className="bg-[#ffebee] font-[DM_Sans] text-[16px] font-medium p-2">
                  15
                </div>
              </div>
            </div>
          </div>
          <div className=" border-2 w-full max-w-[350px] text-center flex justify-center items-center h-full min-h-[180px]">
            <div className="mx-0 my-auto flex flex-col justify-center items-center gap-1 w-52">
              <div className="text-[#4b4b4b] font-[DM_Sans] text-[24px] font-medium">
                Child Attendance
              </div>
              <div className="text-[#4b4b4b] font-[DM_Sans] text-[16px] font-medium">
                Present vs Absent
              </div>
              <div className="flex gap-4 justify-center items-center">
                <div className="bg-[#eefcfc] font-[DM_Sans] text-[16px] font-medium p-2">
                  12
                </div>
                <div className="bg-[#ffebee] font-[DM_Sans] text-[16px] font-medium p-2">
                  15
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserTable columns={columns} data={data} />
      </MainPageContainer>
    </>
  );
}
