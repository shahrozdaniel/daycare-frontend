"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { User, columns } from "./columns";
import { TableContainer } from "@/app/feesManagement/Common.styled";
import UserTable from "@/app/feesManagement/components/UserTable";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal/Modal";
import AddSubsidyChild from "@/app/feesManagement/ModalComponent/AddSubsidyChild";
import Image from "next/image";

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  //   data: TData[];
}

export default function SubsidisedChildren() {
  const data: User[] = [
    {
      id: "1",
      childName: "Subsidy Name",
      subsidyProgram: "Subsidy Provider",
      startDate: "12/12/2023",
      amount: "1200",
      action: "string",
    },
    {
      id: "1",
      childName: "Subsidy Name",
      subsidyProgram: "Subsidy Provider",
      startDate: "12/12/2023",
      amount: "1200",
      action: "string",
    },
    {
      id: "1",
      childName: "Subsidy Name",
      subsidyProgram: "Subsidy Provider",
      startDate: "12/12/2023",
      amount: "1200",
      action: "string",
    },
    {
      id: "1",
      childName: "Subsidy Name",
      subsidyProgram: "Subsidy Provider",
      startDate: "12/12/2023",
      amount: "1200",
      action: "string",
    },
    {
      id: "1",
      childName: "Subsidy Name",
      subsidyProgram: "Subsidy Provider",
      startDate: "12/12/2023",
      amount: "1200",
      action: "string",
    },
  ];

  const { control } = useForm<FormData>();

  const [modalOpen, setModalOpen] = useState(false);
  const [subsidisedChildren, setSubsidisedChildren] = useState(false);

  //this function will open the modal
  const openModal = (modalValue: string) => {
    if (modalValue === "AddNewSubsidy") {
      setSubsidisedChildren(true);
    }
    setModalOpen(true);
  };

  // this function will close the modal
  const closeModal = (modalValue: string) => {
    if (modalValue === "AddNewSubsidy") {
      setSubsidisedChildren(false);
    }
    setModalOpen(false);
  };
  return (
    <>
      <div className="w-full">
        <div className="text-blue-b1 w-full flex items-center justify-end  gap-3">
          <div
            onClick={() => openModal("AddNewSubsidy")}
            className="text-[#3a70e2] cursor-pointer font-sans text-[16px] font-medium "
          >
            + Add Subsidy to Child
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
      {modalOpen && subsidisedChildren && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"setSubsidisedChildren"}
          >
            <AddSubsidyChild control={control} />
          </Modal>
        </div>
      )}
    </>
  );
}
