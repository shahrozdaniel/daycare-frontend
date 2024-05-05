"use client";
import ImmunisationDocument from "@/app/childEnrollment/components/ImmunisationDocument";
import { FormButton } from "@/app/feesManagement/ModalComponent/Common.styled";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
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
import { ToastContainer, ToastContentProps, toast } from "react-toastify";

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

    !vactype
      ? toast.error("Please select a vaccination type.")
      : !file
      ? toast.error("Please upload a file.")
      : !vacDate && toast.error("Please select a vaccination date.");

    let res: {
      success: any;
      message:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | ((props: ToastContentProps<unknown>) => React.ReactNode)
        | null
        | undefined;
    };
    try {
      res = await childImmunazation(id, body);
      if (res?.success) {
        setTimeout(() => {
          toast.success(res?.message);
        }, 1000);
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
        {/* <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
            Child Immunization Details
          </div>
        </HeaderContainer> */}
        <HeaderContainer>
          <div className="font-[DM_Sans] font-medium mx-auto text-[1.25rem] text-[#4b4b4b]">
            Child Immunization Details
          </div>

          <button type="button" className="" onClick={closeModal}>
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
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
            <div className="flex flex-row gap-y-5 gap-x-4">
              <CustomSelect
                className="rounded-[20px] bg-[#F5F5F5] "
                name="vaccinationType"
                label="Vaccination Name"
                options={[
                  { value: "", label: "Select Vaccination Name" },
                  { value: "immunisation", label: "Immunization" },
                  { value: "vaccine", label: "vaccine" },
                ]}
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
        </FormContainer>

        <FormButton>
          <FormContainer>
            <div className="flex justify-end self-end items-end gap-[16px]">
              <CancelButton type="button" onClick={closeModal}>
                Cancel
              </CancelButton>
              <AddButton type="button" onClick={submitForm}>
                Save
              </AddButton>
            </div>
          </FormContainer>
        </FormButton>
        <ToastContainer />
      </ModalDetailsContainer>
    </>
  );
};

export default DocModal;
