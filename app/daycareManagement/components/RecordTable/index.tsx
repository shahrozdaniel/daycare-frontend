"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Modal from "@/components/common/Modal/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
// import AddDocument from "./components/AddDocument";
import {
  dayCareSettingDetails,
  dayCareSettingDocs,
  dayCareSettingDocsUpdate,
} from "@/services/dayCareSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { flattenBy, flexRender } from "@tanstack/react-table";
import DocumentTable from "../../components/DocumentTable";
import { documentcolumns } from "../../components/DocumentTable/documentcolumn";
import AddRecord from "../ModalComponents/AddRecordModal";
import FormModal from "@/components/common/FormModal";
import {
  createEducatorRecord,
  getEducatorByStaffId,
  getEducatorRecord,
  updateRecordDocument,
} from "@/services/User-management-API";
import { handleUnauthorizedError } from "@/utils/utilityFunctions";
import { useRouter } from "next/navigation";
import path from "path";
import { useGlobalContext } from "@/app/context/store";

const RecordTable = ({ staffId }: any) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editmodalopen, setEditModalOpen] = useState<boolean>(false);
  const [docData, setDocData] = useState<any>([]);
  const [editableData, setEditableData] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const { recordedit } = useGlobalContext();
  let router = useRouter();
  const methods = useForm<any>({
    // shouldUnregister: false,
    // resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = methods;

  const openModal = (modalValue: string) => {
    setModalOpen(true);
  };

  const openEditModal = (modalValue: string) => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditModalOpen(false);
    recordedit[1]([]);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
    setModalOpen(false);
    recordedit[1]([]);
  };
  const addrecordformsubmit = async (data: any) => {
    // console.log(edit)
    console.log("data", data);
    // let res;
    // try {
    //   if (edit) {
    //     res = await dayCareSettingDocsUpdate(editableData?.id, formBody);
    //   } else {
    //     res = await dayCareSettingDocs(formBody);
    //   }
    //   if (res?.success) {
    //     toast.success(res?.message);
    //   } else {
    //     toast.error("something went wrong");
    //   }
    // } catch (error: any) {
    //   console.log(error);
    //   toast.error(error?.response);
    // }
  };
  console.log("description", watch("description"));

  const submitRecorddocs = async (data: any) => {
    if (recordedit[0].length !== 0) {
      let id = staffId;
      let recordid = data.get("id");
      // Assuming formData is your FormData object

      try {
        let response = await updateRecordDocument(recordid, id, data);
        if (response?.success) {
          closeEditModal();
          getRecordsDocument();
          toast.success(
            response?.message || "Record documents successfully updated"
          );
          console.log("success resonse", response);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          handleUnauthorizedError(router);
        }
        if (error.response.data.error) {
          toast.error(error.response?.data?.error);
        } else {
          toast.error(error.response?.data?.message);
        }
      }
    } else {
      let id = staffId;
      try {
        let response = await createEducatorRecord(data, id);
        if (response?.success) {
          toast.success(
            response?.message || "Record documents successfully added"
          );

          getRecordsDocument();
          closeModal();
          console.log("success resonse", response);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          handleUnauthorizedError(router);
        }
        if (error.response.data.error) {
          toast.error(error.response?.data?.error);
        } else {
          toast.error(error.response?.data?.message);
        }
      }
    }
  };

  const getRecordsDocument = async () => {
    try {
      // let paramsconfig = {
      //   staffId: "36",
      // };
      let id = staffId;
      let response = await getEducatorByStaffId(id);
      if (response?.success) {
        console.log("success resonse get", response);
        let resarray = response.data[0].records.record.map((item: any) => {
          return {
            id: item.id,
            documentName: path.basename(item.file),
            description: item.description,
            file: item.file,
            staffId: staffId,
            openEditModal: openEditModal,
            reloadTable: getRecordsDocument,
            setEditableData: recordedit[1],
          };
        });
        console.log("resarray", resarray);
        setDocData(resarray);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        handleUnauthorizedError(router);
      }
      if (error.response?.data?.error) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error(error.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    if (staffId) {
      getRecordsDocument();
    }
  }, [staffId]);
  return (
    <>
      <div className="w-full mx-auto">
        <p
          className="flex gap-2 justify-end mb-3 text-blue-b1 cursor-pointer"
          onClick={() => openModal("Open")}
        >
          <Plus
            className="text-blue-b1 cursor-pointer"
            onClick={() => openModal("Open")}
          />{" "}
          Add Document
        </p>

        <DocumentTable columns={documentcolumns} data={docData} />
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
            <AddRecord
              closeModal={closeModal}
              submitFormDocs={submitRecorddocs}
              editableData={recordedit[0]}
            />
          </Modal>
        </div>
      )}

      {editmodalopen && (
        <div>
          <Modal
            modalOpen={editmodalopen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeEditModal}
            modalName={"AddDocument"}
          >
            <AddRecord
              closeModal={closeEditModal}
              submitFormDocs={submitRecorddocs}
              editableData={recordedit[0]}
            />
          </Modal>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default RecordTable;
