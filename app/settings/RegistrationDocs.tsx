"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import DocsTable from "./components/DocsTable";
import { columns, DocumentProperties } from "./components/columns";
import Modal from "@/components/common/Modal/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import AddDocument from "./components/AddDocument";
import {
  dayCareSettingDetails,
  dayCareSettingDocs,
  dayCareSettingDocsDelete,
  dayCareSettingDocsUpdate,
} from "@/services/dayCareSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { flattenBy, flexRender } from "@tanstack/react-table";
import { useGlobalContext } from "../context/store";
import { ConfirmationModal } from "@/components/common/Modal/ConfirmationModal";

const RegistrationDocs = () => {
  const { permission, IsAdmin } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [docData, setDocData] = useState<any>([]);
  const [editableData, setEditableData] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [isDelete, setIsdelete] = useState<boolean>(false)
  const [deleteData, setDeleteData] = useState<any>('')

  useEffect(() => {
    settingDetails();
  }, []);

  const settingDetails = async () => {
    let Data: any = [];
    let res;
    try {
      res = await dayCareSettingDetails();
      if (res?.success) {
        let doc = res?.dayCareSetting?.registration_documents?.document;
        console.log("doc", doc);
        doc?.map((ele: any) => {
          Data?.push({
            id: ele?.id,
            description: ele?.description ? ele?.description : "",
            documentLabel: ele?.documentLabel ? ele?.documentLabel : "",
            documentName: ele?.documentName ? ele?.documentName : "",
            documentType: ele?.documentType ? ele?.documentType : "",
            file: ele?.file,
            reloadTale: settingDetails,
            editableData: editableData,
            setEditableData: setEditableData,
            open: modalOpen,
            setopen: setModalOpen,
            setIsdelete: setIsdelete,
            setDeleteData: setDeleteData
          });
        });
      }
      setDocData(Data);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (modalValue: string) => {
    setModalOpen(true);
  };

  const closeModal = (modalValue: string) => {
    setModalOpen(false);
    setEditableData([]);
  };

  const submitFormDocs = async (formBody: any) => {
    // console.log(edit)
    let res;
    try {
      if (edit) {
        res = await dayCareSettingDocsUpdate(editableData?.id, formBody);
      } else {
        res = await dayCareSettingDocs(formBody);
      }
      if (res?.success) {
        toast.success(res?.message);
        settingDetails();
      } else {
        toast.error("something went wrong");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response);
    }
  };
  const handleDelete = async () => {
    let res;
    try {
      res = await dayCareSettingDocsDelete(deleteData);
      if (res?.success) {
        toast.success(res?.message);
        settingDetails();
        setIsdelete(false)
      } else toast.error("Something Went wrong");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      {/* <h1 className="text-center mb-2 text-black-b1 mt-2">Registration Docs</h1>
      <hr /> */}
      <div className="flex justify-center items-center relative">
        <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Registration Docs
          </h1>
        </div>
      </div>

      <div className="w-4/6 mx-auto mt-6">
      {(IsAdmin || userPermission?.setting?.add_edit) && <p
          className="flex gap-2 justify-end mb-3 text-blue-b1 cursor-pointer text-sm"
          onClick={() => openModal("Open")}
        >
          <Plus
            className="text-blue-b1 cursor-pointer"
          />
          Add Document
        </p>}
        {docData?.length > 0 && <DocsTable columns={columns({IsAdmin,userPermission})} data={docData} />}
      </div>
      {modalOpen && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"AddDocument"}
          >
            {(IsAdmin || userPermission?.setting?.add_edit) && (
              <AddDocument
                closeModal={closeModal}
                submitFormDocs={submitFormDocs}
                editableData={editableData}
                setEdit={setEdit}
                edit={edit}
              />
            )}
          </Modal>
        </div>
      )}
      <ToastContainer />
      {isDelete && (
        <ConfirmationModal
          title={'Registration Document'}
          content={'Are you sure you want to delete?'}
          modalOpen={isDelete}
          handleConfirm={handleDelete}
          closeModal={() => setIsdelete(false)}
        />
      )}
    </>
  );
};

export default RegistrationDocs;
