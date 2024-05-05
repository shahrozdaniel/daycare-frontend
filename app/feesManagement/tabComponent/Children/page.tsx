"use client";
import React, { useState } from "react";
import { TableContainer } from "../../Common.styled";
import { ColumnDef } from "@tanstack/react-table";
import UserTable from "../../components/UserTable";
import { User, columns } from "./columns";
import Image from "next/image";
import Modal from "@/components/common/Modal/Modal";
import AddInvoice from "../../ModalComponent/AddInvoice";
import { useForm } from "react-hook-form";

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  //   data: TData[];
}

export default function Children() {
  const data: User[] = [
    {
      id: "1",
      childName: "Henry",
      balance: "Amount Due",
      credit: "Advance Amount",
      classroom: "Days/Week",
      tutionPlan: "Tution Plan Name",
      action: "string",
    },
    {
      id: "1",
      childName: "Henry",
      balance: "Amount Due",
      credit: "Advance Amount",
      classroom: "Days/Week",
      tutionPlan: "Tution Plan Name",
      action: "string",
    },
    {
      id: "1",
      childName: "Henry",
      balance: "Amount Due",
      credit: "Advance Amount",
      classroom: "Days/Week",
      tutionPlan: "Tution Plan Name",
      action: "string",
    },
    {
      id: "1",
      childName: "Henry",
      balance: "Amount Due",
      credit: "Advance Amount",
      classroom: "Days/Week",
      tutionPlan: "Tution Plan Name",
      action: "string",
    },
    {
      id: "1",
      childName: "Henry",
      balance: "Amount Due",
      credit: "Advance Amount",
      classroom: "Days/Week",
      tutionPlan: "Tution Plan Name",
      action: "string",
    },
  ];

  const { control } = useForm<FormData>();

  const [modalOpen, setModalOpen] = useState(false);
  const [invoice, setInvoice] = useState(false);

  //this function will open the modal
  const openModal = (modalValue: string) => {
    if (modalValue === "AddInvoiceModal") {
      setInvoice(true);
    }
    setModalOpen(true);
  };

  // this function will close the modal
  const closeModal = (modalValue: string) => {
    if (modalValue === "AddInvoiceModal") {
      setInvoice(false);
    }
    setModalOpen(false);
  };

  return (
    <>
      <div className="w-full">
        <div className="text-blue-b1 w-full flex items-center justify-end  gap-3">
          <div
            onClick={() => openModal("AddInvoiceModal")}
            className="text-[#3a70e2] cursor-pointer font-sans text-[16px] font-medium "
          >
            + Add Invoice
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

      <UserTable columns={columns} data={[]} />

      {modalOpen && invoice && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"AddInvoiceModal"}
          >
            {/* <AddInvoice control={control} /> */}
          </Modal>
        </div>
      )}
    </>
  );
}
