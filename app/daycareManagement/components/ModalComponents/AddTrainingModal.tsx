"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import RadioInput from "@/components/common/RadioInput";
import CircularSwitch from "@/components/common/CircularSwicth";
import DocumentUpload from "@/components/common/DocumentUpload";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import Image from "next/image";
import { dayCareSettingDocs } from "@/services/dayCareSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import path from "path";
import Document from "@/components/common/Document";

interface FormData {
  // Define your form values
  mySwitch: boolean;
}
interface props {
  closeModal?: any;
  submitFormDocs?: any;
  editableData?: any;
  setEdit?: any;
}

const AddTraining: React.FC<props> = ({
  closeModal,
  submitFormDocs,
  editableData,
  setEdit,
}) => {
  const { control, handleSubmit, register, setValue, watch } = useForm<any>();
  let Id: any = new Date().getTime();
  const [docName, setDocName] = useState<any>("");
  const [docLabel, setDocLabel] = useState<any>("");
  const [file, setFile] = useState<any>(null);
  const [docType, setDocType] = useState<any>("");
  const [docDesc, setDocDesc] = useState<any>("");
  const [id, setid] = useState<any>(Id);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = (e: any) => {
    fileInputRef.current?.click();
  };

  const submitForm = async () => {
    let formBody = new FormData();
    // formBody.append('documentName', docName)
    // formBody.append('documentType', docType)
    // formBody.append('documentLable', docLabel)
    formBody.append("description", docDesc);
    // formBody.append("docName", path.basename(file));

    formBody.append("trainings", file);

    formBody.append("id", id);
    submitFormDocs(formBody);
    // closeModal()
  };

  useEffect(() => {
    if (editableData.length !== 0) {
      setDocName(editableData.documentName);
      setFile(editableData.file);
      setDocDesc(editableData.description);
      setid(editableData.id);
      console.log("edit table", editableData);
    }
  }, [editableData]);
  return (
    <>
      <h1 className="text-center mb-2 text-black-b1 mt-2">
        {editableData.length !== 0 ? "Save" : "Add"} Training
      </h1>
      <hr />
      <div className="w-4/6 mx-auto mt-10 flex flex-col gap-4">
        <div className="flex items-center justify-center gap-3 mt-2 text-grey-g1">
          {/* <div className="w-6/12 flex flex-col gap-2">
            <CustomInput
              type="text"
              label=""
              name=""
              control={control}
              placeholder="Document Name"
              onChange={(e: any) => setDocName(e?.target?.value)}
              value={docName}
            />
            <br />
          </div> */}
          {/* <div className="w-6/12 flex flex-col gap-2">
            <CustomInput
              type="text"
              label=""
              name=""
              control={control}
              placeholder="Document type"
              onChange={(e: any) => setDocType(e?.target?.value)}
              value={docType}
            />
            <br />
          </div> */}
        </div>
        {/* <CustomInput
          type="text"
          label=""
          name=""
          control={control}
          placeholder="Document label"
          onChange={(e: any) => setDocLabel(e?.target?.value)}
          value={docLabel}
        /> */}
      
       
      </div>
      <div className="w-4/6 mx-auto  flex flex-col gap-4">
      <CustomInput
          type="text"
          label=""
          name=""
          control={control}
          placeholder="Description"
          onChange={(e: any) => setDocDesc(e?.target?.value)}
          value={docDesc}
        />
        <Document
          name="image"
          label="Choose files to upload"
          className="flex"
          handleChange={(e: any) => setFile(e)}
        /></div>
      <div className="mt-5">
        <ModalButton>
          <CancelButton onClick={closeModal}>{"cancel"}</CancelButton>
          <AddButton type="button" onClick={submitForm}>
            {"Save"}
          </AddButton>
        </ModalButton>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddTraining;
