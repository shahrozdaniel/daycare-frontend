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
import { TwoInputContainer } from "@/app/feesManagement/ModalComponent/Common.styled";
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

const AddCertification: React.FC<props> = ({
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
  const [docDate, setDocDate] = useState<any>("");
  const [docDesc, setDocDesc] = useState<any>("");
  const [id, setid] = useState<any>(Id);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const submitForm = async () => {
    let formBody = new FormData();
    // formBody.append('documentName', docName)
    // formBody.append('documentType', docType)
    // formBody.append('documentLable', docLabel)
    formBody.append("description", docDesc);
    formBody.append("startDate", docDate);
    formBody.append("documentType", docType);
    // formBody.append("docName", path.basename(file));
    formBody.append("certifications", file);
    formBody.append("id", id);
    submitFormDocs(formBody);
    // closeModal()
  };

  useEffect(() => {
    if (editableData.length !== 0) {
      setDocName(editableData.documentName);
      setFile(editableData.file);
      setDocDesc(editableData.description);
      setDocType(editableData.documentType);
      setDocDate(editableData.documentDate);
      setid(editableData.id);
      console.log("edit table certif", editableData);
    }
  }, [editableData]);
  return (
    <>
      <h1 className="text-center mb-2 text-black-b1 mt-2">Add Document</h1>
      <hr />
      <div className="w-4/6 flex flex-col gap-2 mx-auto mt-10">
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
        
        <TwoInputContainer>
          <CustomSelect
            name="docType"
            control={control}
            onChange={(e) => setDocType(e.target.value)}
            label=""
            value={docType}
            options={[
              { value: "", label: "Select Type" },
              { value: "First_Aid", label: "First Aid" },
              { value: "CPR", label: "CPR" },
              { value: "AED_Instructor", label: "AED Instructor" },
              {
                value: "CDA",
                label: "Child Development Associate (CDA)",
              },
              {
                value: "OSHA_Sefty_Certificate",
                label: "OSHA Safety Certificate",
              },
              // Add more options as needed
            ]}
          />
          <CustomInput
            className="w-full p-3"
            label=""
            type="date"
            value={docDate}
            placeholder="Date:-"
            name={`certificationDate`}
            onChange={(e) => setDocDate(e.target.value)}
            divclass="w-full"
          />
        </TwoInputContainer>
        <div>
          {" "}
          <CustomInput
            type="text"
            label=""
            name=""
            control={control}
            placeholder="Description"
            onChange={(e: any) => setDocDesc(e?.target?.value)}
            value={docDesc}
          />
        </div>
        <div><Document
          name="image"
          label="Choose file to upload"
          className="flex"
          handleChange={(e: any) => setFile(e)}
        /></div>
      </div>
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

export default AddCertification;
