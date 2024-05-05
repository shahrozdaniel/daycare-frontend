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
import ImmunisationDocument from "./ImmunisationDocument";
import CustomDateInput from "@/components/common/DateInput";
import {
  childImmunazation,
  childImmunazationEdit,
} from "@/services/childrenActionServices";
import { useParams, useSearchParams } from "next/navigation";
import { HeaderContainer } from "@/app/reports/Common.styled";
import { XIcon } from "lucide-react";
import styled from "styled-components";
import {
  FormButton,
  FormContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
interface FormData {
  // Define your form values
  mySwitch: boolean;
}
interface props {
  closeModal?: any;
  handleOnSubmit?: any;
  editableData?: any;
  setEdit: any;
  refetchData?: any;
  edit?: any;
}

const AddImmune: React.FC<props> = ({
  closeModal,
  handleOnSubmit,
  editableData,
  setEdit,
  refetchData,
  edit,
}) => {
  const { control, handleSubmit, register, setValue, watch } =
    useForm<FormData>();
  let Id: any = new Date().getTime();
  const [immuneName, setImmuneName] = useState<any>("");
  const [document, setDocument] = useState<any>("");
  const [immuneDate, setImmuneDate] = useState<any>("");
  const [id, setid] = useState<any>(Id);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setImmuneName(editableData?.type);
    setImmuneDate(editableData?.vaccination_date);
    setDocument(editableData?.document);
    setid(editableData?.id);
    if (Object.keys(editableData).length > 0) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [editableData]);

  // const submitForm = async () => {
  //   handleOnSubmit(immuneName, immuneDate, document, Id);
  //   closeModal();
  // };

  let searchparam = useSearchParams();
  let childid = searchparam?.get("child_id");

  const submit_function = async () => {
    console.log(immuneDate, immuneDate, document);

    let res;
    let body = new FormData();
    body.append("vaccinationDate", immuneDate);
    body.append("vaccinationType", immuneName);
    body.append("immunisationDocuments", document);

    try {
      if (edit) {
        res = await childImmunazationEdit(body, id);
      } else {
        res = await childImmunazation(childid, body);
      }
      if (res?.success) {
        toast.success(res?.message);
        closeModal();
        refetchData();
      } else {
        toast?.error("some thing went");
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  const Title = styled.div`
    font-size: 1.25rem;
    color: #4b4b4b;
    background-color: #eefcfc;
    width: 100%;
    // display: flex;
    // justify-content: center;
    align-items: center;
    padding: 10px 0px 10px 0px;
  `;
  return (
    <ModalDetailsContainer>
      <div className="flex flex-col items-center w-full gap-4">
        <Title className="relative">
          <div className="font-sans font-medium flex justify-center capitalize">
            Immunization Details
          </div>
          <XIcon
            className="absolute right-2 bottom-[10px] cursor-pointer h-7 w-6"
            color="#4b4b4b"
            size={0}
            onClick={closeModal}
          />
        </Title>
        <FormContainer>
          <TwoInputContainer>
            <CustomSelect
              className="rounded-[20px] bg-[#F5F5F5] "
              name="vaccinationType"
              label="Vaccination Name"
              options={[
                { value: "", label: "Select Vaccination Name" },
                { value: "Immunization", label: "Immunization" },
                { value: "Vaccine", label: "Vaccine" },
              ]}
              onChange={(e: any) => setImmuneName(e?.target?.value)}
              value={immuneName}
            />

            <CustomDateInput
              type="date"
              placeholder="Vaccination Date"
              name="vaccinationDate"
              className="rounded-[20px] bg-[#F5F5F5]"
              onChange={(e: any) => setImmuneDate(e?.target?.value)}
              value={immuneDate}
            />
          </TwoInputContainer>
          <div>
            <ImmunisationDocument
              name="vaccinationDoc"
              label="Choose file to upload"
              control={control}
              className="flex"
              handleChange={(name: any) => setDocument(name)}
            />
          </div>
        </FormContainer>
      </div>
      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px] ">
            <CancelButton onClick={closeModal}>{"Cancel"}</CancelButton>
            <AddButton onClick={submit_function}>{"Save"}</AddButton>
          </div>
        </FormContainer>
      </FormButton>
      <ToastContainer />
    </ModalDetailsContainer>
  );
};

export default AddImmune;
