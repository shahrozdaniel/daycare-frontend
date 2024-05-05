import React, { useEffect, useState } from "react";
import RadioInput from "@/components/common/RadioInput";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { FieldValues, UseFormRegister } from "react-hook-form";
import DocumentUpload from "@/components/common/DocumentUpload";
import ImmunisationDocument from "./components/ImmunisationDocument";
import path from "path";
import CustomDateInput from "@/components/common/DateInput";
import Image from "next/image";
import { Plus } from "lucide-react";
import Modal from "@/components/common/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
// import { ImmunizationColumn } from "./components/ImmunisationColumn";
// import ImmuneTable from "./components/ImmuneTable";
import AddImmune from "./components/AddImmune";
import { ApiInstance } from "@/utils/ApiInstance";
import { getApiBody, getAuthToken } from "@/components/common/Utils";
import { multiStepChildEnrollment } from "./childEnrolmentAPI";
import moment from "moment";
import { ImmunizationColumn } from "./components/ImmunizationColumn";
import ImmuneTable from "./components/ImmuneTable";
import { childImmunazationEdit } from "@/services/childrenActionServices";
interface ImmunisationDetailsProps {
  control: any;
  register: any;
  setValue: any;
  data: any;
  errors: any;
  fetchData?: any;
  childId?: any;
  //   register: UseFormRegister<FormData>;
}

const ImmunisationDetails: React.FC<ImmunisationDetailsProps> = ({
  control,
  register,
  setValue,
  data,
  errors,
  fetchData,
  childId,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [immuneData, setImmuneData] = useState<any>();
  const [editableData, setEditableData] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);

  const closeModal = (modalValue: string) => {
    setModalOpen(false);
    setEditableData([]);
  };

  const handleSubmit = async (
    immuneName: any,
    immuneDate: any,
    document: any,
    id: any
  ) => {
    let res;

    try {
      if (edit) {
        const formBody = new FormData();
        formBody.append("vaccinationType", immuneName);
        formBody.append("vaccinationDate", immuneDate);
        formBody.append("immunisationDocuments", document);
        formBody.append("id", id);

        res = await childImmunazationEdit(formBody, editableData.id);
      } else {
        const originalDate = moment(immuneDate);
        const data = {
          // id:register.vaccinationId ? register.vaccinationId : "",
          vaccination_type: immuneName,
          vaccination_date: originalDate.format("YYYY-MM-DD"),
        };

        const body = getApiBody(data, 2);
        // body.append("immunisationDocuments", document);

        res = await multiStepChildEnrollment(body, childId);
      }
      if (res?.success) {
        toast.success(res?.message);
        await fetchData(childId);
      } else {
        toast.error("something went wrong");
      }
    } catch (error: any) {
      // console.log(error);
      toast.error(error?.response);
    }
  };

  const refetchData = async () => {
    await fetchData(childId);
  };
  useEffect(() => {
    const newData =
      data.length > 0 &&
      data.map((item: any) => ({
        reloadTale: refetchData,
        editableData: editableData,
        setEditableData: setEditableData,
        open: modalOpen,
        setopen: setModalOpen,
        ...item,
      }));

    setImmuneData(newData);
    console.log("data", data);
    if (data) {
      data.map((item: any, index: number) => {
        setValue("vaccinationType", item.type);
        setValue("vaccinationDate", item.vaccination_date);
        setValue("vaccinationDoc", item.document);
        setValue("vaccinationId", item.id);
      });
    }
  }, [data]);
  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <div className="flex justify-center items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/assets-detail.svg"}
            alt="Logo"
            width={24}
            height={24}
            className="object-contain "
          />
          <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Immunization Details
          </h1>
        </div>
      </div>

      <div>
        <div className="w-4/6 mx-auto mt-6">
          <p
            className="flex gap-2 justify-end mb-3 text-blue-b1 cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <Plus className="text-blue-b1 cursor-pointer text-sm" /> Add Document
          </p>
          {immuneData?.length > 0 && (
            <ImmuneTable columns={ImmunizationColumn} data={immuneData} />
          )}
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
              <AddImmune
                closeModal={closeModal}
                handleOnSubmit={handleSubmit}
                editableData={editableData}
                setEdit={setEdit}
                refetchData={refetchData}
                edit = {edit}
              />
            </Modal>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ImmunisationDetails;
