"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { User, columns } from "./columns";
import { TableContainer } from "@/app/feesManagement/Common.styled";
import UserTable from "@/app/feesManagement/components/UserTable";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal/Modal";
import AddClassroomBased from "@/app/feesManagement/ModalComponent/AddClasroomBased";
import Image from "next/image";
import { tutionPlanList } from "@/services/feeManagement";

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  //   data: TData[];
}

export default function ClassroomBased() {
  const [data, setData] = useState([])

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [classroom, setClassroom] = useState<boolean>(false);
  const [editData, setEditDta] = useState<any>([])
  const [edit ,setEdit] = useState<boolean>(false)
  const planList = async () => {
    let res;
    try {
      res = await tutionPlanList()
      if (res?.success) {
        console.log(res?.data?.CLASSROOM_BASED)
        let plan: any = []
        res?.data?.CLASSROOM_BASED?.map((ele: any) => {
          console.log(ele)
          plan.push({ id: ele?.id, plantype: ele?.planType, amount: ele?.planDetails?.feesDetails?.amount, classroomId: ele?.planDetails?.classroomId, taxAmount: ele?.planDetails?.taxAmount, reloadtable: planList, status: ele?.status, planName: ele?.planDetails?.planName, totalData: ele, setEditDta: setEditDta, helperModalOpen: setClassroom, modalOpen: setModalOpen })
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
    if (modalValue === "AddClassroomModal") {
      setClassroom(true);
      setEditDta([])
    }
    setModalOpen(true);
  };

  // this function will close the modal
  const closeModal = (modalValue: string) => {
    if (modalValue === "AddClassroomModal") {
      setClassroom(false);
    }
    setModalOpen(false);
  };
  return (
    <>
      <div className="w-full">
        <div className="text-blue-b1 w-full flex items-center justify-end  gap-3">
          <div
            onClick={() => openModal("AddClassroomModal")}
            className="text-[#3a70e2] cursor-pointer font-sans text-[16px] font-medium "
          >
            + Add Classroom Based
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
      {modalOpen && classroom && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"AddClassroomModal"}
          >
            <AddClassroomBased
              control={control}
              cancelText={"Cancel"}
              AddText={"Add"}
              closeModal={closeModal}
              reloadTable={planList}
              editData={editData}
              edit = {edit}
              setEdit = {setEdit}
            />
          </Modal>
        </div>
      )}
    </>
  );
}
