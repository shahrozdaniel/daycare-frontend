"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { User, columns } from "./columns";
import { TableContainer } from "@/app/feesManagement/Common.styled";
import UserTable from "@/app/feesManagement/components/UserTable";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Modal from "@/components/common/Modal/Modal";
import AddAgeGroup from "@/app/feesManagement/ModalComponent/AddAgeGroup";
import { tutionPlanList } from "@/services/feeManagement";

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  //   data: TData[];
}

export default function AgeGroupBased() {
  const [data, setData] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [ageGroup, setAgeGroup] = useState(false);
  const [editData, setEditDta] = useState<any>([])
  const [edit, setEdit] = useState<boolean>(false)

  const planList = async () => {
    let res;
    try {
      res = await tutionPlanList()
      if (res?.success) {
        let plan: any = []
        res?.data?.AGE_GROUP_BASED?.map((ele: any) => {
          console.log(ele)
          plan.push({ id: ele?.id, plantype: ele?.planType, amount: ele?.planDetails?.feesDetails?.amount, classroomId: ele?.planDetails?.classroomId, classroomName: "", taxAmount: ele?.planDetails?.taxAmount, reloadtable: planList, status: ele?.status, planName: ele?.planDetails?.planName, maxAge: ele?.planDetails?.maxAge, minAge: ele?.planDetails?.minAge, totalData: ele, setEditDta: setEditDta, helperModalOpen: setAgeGroup, modalOpen: setModalOpen })
        })
        setData(plan)
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    planList()
  }, [])

  const { control } = useForm<FormData>();


  //this function will open the modal
  const openModal = (modalValue: string) => {
    if (modalValue === "AddAgeGroupModal") {
      setAgeGroup(true);
    }
    setModalOpen(true);
  };

  // this function will close the modal
  const closeModal = (modalValue: string) => {
    if (modalValue === "AddAgeGroupModal") {
      setAgeGroup(false);
      setEditDta([])
    }
    setModalOpen(false);
  };

  return (
    <>
      <div className="w-full">
        <div className="text-blue-b1 w-full flex items-center justify-end  gap-3">
          <div
            onClick={() => openModal("AddAgeGroupModal")}
            className="text-[#3a70e2] cursor-pointer font-sans text-[16px] font-medium "
          >
            + Add Age Group Plan
          </div>
          <div className="border-[1px] flex items-center justify-center w-fit md:gap-2 lg:gap-3 md:py-1 lg:py-1 md:pl-2 lg:pl-3 md:pr-2 lg:pr-5 rounded-sm border-blue-b1">
            <Image
              src={"/images/export.png"}
              alt="export"
              width={15}
              height={15}
            />
            <span className="md:text-sm lg:text-xl">Export</span>
          </div>
        </div>
      </div>
      <TableContainer>
        <UserTable columns={columns} data={data} />
      </TableContainer>
      {modalOpen && ageGroup && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"AddAgeGroupModal"}
          >
            <AddAgeGroup control={control}
              cancelText={"Cancel"}
              AddText={"Add"}
              closeModal={closeModal}
              reloadTable={planList}
              editData={editData}
              edit={edit}
              setEdit={setEdit} />
          </Modal>
        </div>
      )}
    </>
  );
}
