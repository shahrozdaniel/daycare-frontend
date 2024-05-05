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
import {
  FormContainer,
  FormButton,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import {
  HeaderContainer,
  ModalDetailsContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";

interface FormData {
  // Define your form values
  mySwitch: boolean;
}
interface props {
  closeModal?: any;
  submitFormDocs?: any;
  editableData?: any;
  setEdit: any;
  edit?: any;
}

const AddDocument: React.FC<props> = ({
  closeModal,
  submitFormDocs,
  editableData,
  setEdit,
  edit,
}) => {
  const { control, handleSubmit, register, setValue, watch } =
    useForm<FormData>();
  console.log("editableData", editableData);
  let Id: any = new Date().getTime();
  const [docName, setDocName] = useState<any>("");
  const [docLabel, setDocLabel] = useState<any>("");
  const [file, setFile] = useState<any>(null);
  const [docType, setDocType] = useState<any>("");
  const [docDesc, setDocDesc] = useState<any>("");
  const [id, setid] = useState<any>(Id);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setDocName(editableData?.documentName);
    setDocLabel(editableData?.documentLabel);
    setDocType(editableData?.documentType);
    setDocDesc(editableData?.description);
    setFile(editableData?.file);
    setid(editableData?.id);
    if (Object.keys(editableData).length > 0) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [editableData]);

  const submitForm = async () => {
    let formBody = new FormData();
    formBody.append("documentName", docName ? docName : "");
    formBody.append("documentType", docType ? docType : "");
    formBody.append("documentLabel", docLabel ? docLabel : "");
    formBody.append("description", docDesc ? docDesc : "");
    formBody.append("file", file);
    formBody.append("id", Id);
    if (docName && file && docType) {
      submitFormDocs(formBody);
      closeModal();
    } else {
      toast.error("Please fill the required field");
    }
  };

  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
            {edit ? "Edit Document" : "Add Document"}
          </div>
          <button
            type="button"
            className="flex self-end mb-2"
            onClick={closeModal}
          >
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        <FormContainer>
          <div className="w-full">
            <div className="flex items-center justify-center gap-y-5 gap-x-4 mt-2 text-grey-g1">
              <div className="w-6/12 flex flex-col gap-y-5 gap-x-4">
                <CustomInput
                  type="text"
                  label=""
                  name=""
                  control={control}
                  placeholder="Document Name"
                  onChange={(e: any) => setDocName(e?.target?.value)}
                  value={docName}
                  required
                />
                {/* <br /> */}
              </div>
              <div className="w-6/12 flex flex-col gap-x-4 gap-y-5">
                <CustomInput
                  type="text"
                  label=""
                  name=""
                  control={control}
                  placeholder="Document type"
                  onChange={(e: any) => setDocType(e?.target?.value)}
                  value={docType}
                  required
                />
                {/* <br /> */}
              </div>
            </div>
            <div className="mt-5">
              <CustomInput
                type="text"
                label=""
                name=""
                control={control}
                placeholder="Document label"
                onChange={(e: any) => setDocLabel(e?.target?.value)}
                value={docLabel}
              />
              <br />
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
            <div className="flex justify-center">
              {/* <DocumentUpload name="uploadDoc" label="Upload Document" control={control} /> */}
              <div className={`p-3 flex items-center gap-2`}>
                <Image
                  src={"/images/txt.png"}
                  width={30}
                  height={30}
                  alt="Upload Document"
                  onClick={handleButtonClick}
                />
                <label className="block text-sm font-medium text-blue-b1">
                  {"Upload Document"} <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e: any) => setFile(e.target.files[0])}
                  accept=".docx,.pdf"
                />
                <br />
              </div>
            </div>
            {file && (
              <div className="block text-sm font-medium text-blue-b1 flex justify-center ">
                Document Name :{" "}
                {file?.name
                  ? file?.name
                  : editableData?.file &&
                    editableData.file.split("/")?.length > 0 &&
                    decodeURIComponent(
                      editableData.file.split("/")[
                        editableData.file.split("/").length - 1
                      ]
                    )}
              </div>
            )}
          </div>
        </FormContainer>

        {/* <FormButton>
          <div className="flex justify-end self-end items-centern gap-[16px] mr-[5%] py-3">
            <CancelButton onClick={closeModal}>{"Cancel"}</CancelButton>
            <AddButton onClick={submitForm}>{"Save"}</AddButton>
          </div>
        </FormButton> */}
        <FormButton>
          <FormContainer>
            <div className="flex justify-end self-end items-end gap-[16px] ">
              <CancelButton onClick={closeModal}>Cancel</CancelButton>
              <AddButton type="submit" onClick={submitForm}>
                Save
              </AddButton>
            </div>
          </FormContainer>
        </FormButton>
      </ModalDetailsContainer>
      <ToastContainer />
    </>
  );
};

export default AddDocument;
