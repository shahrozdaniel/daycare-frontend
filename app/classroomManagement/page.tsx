"use client";
import React, { useLayoutEffect, useState } from "react";
import TabSwitch from "./components/tabSwitch";
import Counter from "./components/Counter";
import { Classroom, columns } from "./tableColumns/columns";
import Table from "./components/ClassroomTable";
import { classroomlist } from "./classroomManagentAPI";
import Modal from "@/components/common/Modal/Modal";
import Popup from "./components/Popup";
import { ToastContainer } from "react-toastify";
import {
  ModalOverlay,
  ModalChildrenContainer,
  ModalComponentContainer,
  ModalButton,
  CancelButton,
} from "@/components/common/Modal/Modal.styled";
// import {
//   AddButton,
//   CancelButton,
//   ModalButton,
//   ModalChildrenContainer,
//   ModalComponentContainer,
//   ModalOverlay,
// } from ;
const Page = () => {
  const [classroomData, setclassroomData] = useState<any>([]);
  const [pagestate, setPageState] = useState(1);
  const [editData, setEditData] = useState<any>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popup, setPopup] = useState<any>();
  const getclassroomlist = async () => {
    let res;
    try {
      res = await classroomlist();
      if (res?.success) {
        setclassroomData(res?.data?.list);
        // setPgination(res?.['data']?.['pagination'])
      }
    } catch (error) {}
  };

  useLayoutEffect(() => {
    getclassroomlist();
  }, []);

  let tableData: any = [];
  classroomData?.map((e: any) => {
    tableData.push({
      id: e?.classroomId,
      name: e?.classroomName,
      ageRange: e?.ageRange,
      educatorRatio: e?.educatorRatio,
      childEnrolled: e?.noOfChildEnrolled,
      classroomType: e?.classroomType,
      educators: e?.educators,
      logo: e?.logo,
      status: e?.status == 1 ? "Active" : "Inactive",
      popup: setPopup,
      showPopup: setShowPopup,
    });
  });
  console.log(popup, "popup");

  const [activeTab, setActiveTab] = useState("classroom"); // Default active tab

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
      <div className="p-4 bg-[#2E3F3F] px-[45px] py-[30px] min-h-screen h-auto">
        <section
          className="[box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px] min-h-[35em]
            text-[#FFFFFF] p-6 overflow-auto bg-white rounded-2xl 
            "
        >
          <div className="flex  lg:flex-row lg:items-center lg:justify-start md:flex-col md:justify-center md:items-center">
            <div className="w-[400px]">
              <TabSwitch
                activeTab={activeTab}
                handleTabClick={handleTabClick}
              />
            </div>
            <div className="flex gap-5">
              <Counter />
            </div>
          </div>
          <Table
            columns={columns}
            data={tableData}
            pagestate={pagestate}
            setPageState={setPageState}
          />
        </section>
      </div>
      {showPopup && (
        <ModalOverlay>
          <ModalComponentContainer>
            <ModalChildrenContainer>
              {<Popup closeModal={() => setShowPopup(false)} data={popup} />}
            </ModalChildrenContainer>
          </ModalComponentContainer>
        </ModalOverlay>
      )}
      <ToastContainer />
    </div>
  );
};

export default Page;
