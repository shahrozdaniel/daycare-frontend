"use client";
import ImmunisationDocument from "@/app/childEnrollment/components/ImmunisationDocument";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "@/app/reports/Common.styled";
import CustomInput from "@/components/common/CustomInput";
import Document from "@/components/common/Document";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import { childImmunazation } from "@/services/childrenActionServices";
import { Date_formator_YYYY_MM_DD } from "@/utils/utilityFunctions";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const DocModal: React.FC<any> = ({ closeModal, id, reloadTable }) => {
  const [vactype, setvacType] = useState<any>("");
  const [file, setFile] = useState<any>(null);
  const [vacDate, setVacDate] = useState<any>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const submitForm = async () => {
    let body = new FormData();

    body.append("immunisationDocuments", file);
    body.append("vaccinationDate", vacDate);
    body.append("vaccinationType", vactype);

    let res;
    try {
      res = await childImmunazation(id, body);
      if (res?.success) {
        toast.success(res?.message);
        reloadTable();
        closeModal();
      }
    } catch (error) {
      toast.error("some thing went wrong");
    }
  };
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
            Child Immunization Details
          </div>
        </HeaderContainer>
        <FormContainer>
          {/* <div className="flex justify-center mt-5">
                        <div className={`p-3 flex items-center gap-2`}>
                            <Image
                                src={"/images/txt.png"}
                                width={30}
                                height={30}
                                alt="Upload Document"
                                onClick={handleButtonClick}
                            />
                            <label className="block text-sm font-medium text-blue-b1">{'Upload Document'}</label>
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={(e: any) => setFile(e.target.files[0])}
                            />
                            <br />
                        </div>
                    </div>
                    {file && <div className="block text-sm font-medium text-blue-b1 flex justify-center ">Doc : {file?.name}</div>} */}
          <TwoInputContainer className="flex-col">
            <div className="flex flex-row gap-2">
              {" "}
              <CustomInput
                type="text"
                name=""
                label=""
                placeholder="Vaccination Type"
                onChange={(e: any) => setvacType(e?.target?.value)}
                value={vactype}
              />
              <CustomInput
                type="date"
                name=""
                label=""
                placeholder="Vaccination Date"
                onChange={(e: any) => setVacDate(e?.target?.value)}
                value={vacDate}
              />
            </div>

       
              <Document
                name="vaccinationDoc"
                label="Choose file to upload"
                className="flex"
                handleChange={(e: any) => setFile(e)}
              />
          
          </TwoInputContainer>

          <ModalButton>
            <CancelButton onClick={closeModal}>{"Cancel"}</CancelButton>
            <AddButton type="button" onClick={submitForm}>
              {"Add"}
            </AddButton>
          </ModalButton>
        </FormContainer>

        <ToastContainer />
      </ModalDetailsContainer>
    </>
  );
};

export default DocModal;
