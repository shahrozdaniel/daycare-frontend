"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { User, columns } from "./columns";
import { TableContainer } from "@/app/feesManagement/Common.styled";
import UserTable from "@/app/feesManagement/components/UserTable";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal/Modal";
import AddIndividualPlan from "@/app/feesManagement/ModalComponent/AddIndividualPlan";
import { tutionPlanList } from "@/services/feeManagement";

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  //   data: TData[];
}

export default function IndividualPlan() {
  const [modalOpen, setModalOpen] = useState(false);
  const [individualPlan, setIndividualPlan] = useState(false);
  const [editData, setEditDta] = useState<any>([])
  const [edit, setEdit] = useState<boolean>(false)
  const [data, setData] = useState([])

  const planList = async () => {
    let res;
    try {
      res = await tutionPlanList()
      if (res?.success) {
        let plan: any = []
        console.log(res?.data?.INDIVIDUAL)
        res?.data?.INDIVIDUAL?.map((ele: any) => {
          console.log(ele)
          plan.push({ id: ele?.id, plantype: ele?.planType, amount: ele?.planDetails?.feesDetails?.amount, childId: ele?.planDetails?.childId, childName: `${ele?.planDetails?.childDetails?.firstName} ${ele?.planDetails?.childDetails?.lastName}`, taxAmount: ele?.planDetails?.taxAmount, reloadtable: planList, status: ele?.status, planName: ele?.planDetails?.planName, totalData: ele, setEditDta: setEditDta, helperModalOpen: setIndividualPlan, modalOpen: setModalOpen })
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
    if (modalValue === "AddIndividualModal") {
      setIndividualPlan(true);
    }
    setModalOpen(true);
  };

  // this function will close the modal
  const closeModal = (modalValue: string) => {
    if (modalValue === "AddIndividualModal") {
      setIndividualPlan(false);
      setEditDta([])
    }
    setModalOpen(false);
  };

  return (
    <>
      <div className="w-full">
        <div className="text-blue-b1 w-full flex items-center justify-end  gap-3">
          <div
            onClick={() => openModal("AddIndividualModal")}
            className="text-[#3a70e2] cursor-pointer font-sans text-[16px] font-medium "
          >
            + Add Individual Tution Plan
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
      {modalOpen && individualPlan && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"AddIndividualModal"}
          >
            <AddIndividualPlan control={control} closeModal={closeModal} reloadTable={planList} edit={edit} setEdit={setEdit} editData = {editData} />
          </Modal>
        </div>
      )}
    </>
  );
}
