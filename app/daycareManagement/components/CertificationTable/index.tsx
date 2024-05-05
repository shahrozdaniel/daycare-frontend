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
import { certificationcolumn } from "./certificationcolumn";
import AddCertification from "../ModalComponents/AddCertificationModal";
import {
  createCertificationEducator,
  getEducatorByStaffId,
  updateCertificationDocumentEducator,
} from "@/services/User-management-API";
import { handleUnauthorizedError } from "@/utils/utilityFunctions";
import { useRouter } from "next/navigation";
import path from "path";
import { useGlobalContext } from "@/app/context/store";

const CertificationTable = ({ staffId }: any) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [docData, setDocData] = useState<any>([]);
  const [editmodalopen, setEditModalOpen] = useState<boolean>(false);

  const [editableData, setEditableData] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const methods = useForm<any>({
    // shouldUnregister: false,
    // resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const { certifEdit } = useGlobalContext();
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
  let router = useRouter();
  const openModal = (modalValue: string) => {
    setModalOpen(true);
  };

  const openEditModal = (modalValue: string) => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditModalOpen(false);
    certifEdit[1]([]);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
    setModalOpen(false);
    certifEdit[1]([]);
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

  const submitRecorddocs = async (data: any) => {
    console.log("form submitted docs record", data);
    if (certifEdit[0].length !== 0) {
      let id = staffId;
      let recordid = data.get("id");
      // Assuming formData is your FormData object

      try {
        let response = await updateCertificationDocumentEducator(
          recordid,
          id,
          data
        );
        if (response?.success) {
          toast.success(
            response?.message || "Certification documents successfully updated"
          );

          closeEditModal();
          getRecordsDocument();

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
        let response = await createCertificationEducator(data, id);
        if (response?.success) {
          toast.success(
            response?.message || "Certification documents successfully added"
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
  console.log("certif edit", certifEdit[0]);
  const getRecordsDocument = async () => {
    try {
      // let paramsconfig = {
      //   staffId: "36",
      // };
      let id = staffId;
      let response = await getEducatorByStaffId(id);
      if (response?.success) {
        console.log("success resonse get", response);
        let resarray = response.data[0].certifications.certifications.map(
          (item: any) => {
            return {
              id: item.id,
              documentName: path.basename(item.filePath),
              description: item.description,
              documentDate: item.startDate,
              file: item.filePath,
              documentType: item.documentType,
              staffId: staffId,
              openEditModal: openEditModal,
              reloadTable: getRecordsDocument,
              setEditableData: certifEdit[1],
            };
          }
        );
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
          Add Certification
        </p>

        <DocumentTable columns={certificationcolumn} data={docData} />
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
            <AddCertification
              closeModal={closeModal}
              submitFormDocs={submitRecorddocs}
              editableData={certifEdit[0]}
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
            <AddCertification
              closeModal={closeEditModal}
              submitFormDocs={submitRecorddocs}
              editableData={certifEdit[0]}
            />
          </Modal>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default CertificationTable;
