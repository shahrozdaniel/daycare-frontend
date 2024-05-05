"use client";
import ImmunisationDocument from "@/app/childEnrollment/components/ImmunisationDocument";
import { FormButton } from "@/app/feesManagement/ModalComponent/Common.styled";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import { childMedicalInfoEdit } from "@/services/childrenActionServices";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MedicalInfo: React.FC<any> = ({ data, id, closeModal, getChildData }) => {
  const [allergy, setAllergy] = useState<string>("");
  const [medication, setMedication] = useState<string>("");
  const [isChildAnaphylactic, setIsChildAnaphylactic] = useState<boolean>(false);
  const [showallergyfile, setShowAllergyFile] = useState<boolean>();
  const methods = useForm<any>({
    shouldUnregister: false,
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
    formState: { errors },
    reset,
  } = methods;
  useEffect(() => {
    let MedicalData = data?.medical_information?.[0];
    console.log('MedicalData',MedicalData)
    setAllergy(MedicalData?.allergy_details?.allergies);
    setMedication(MedicalData?.medication_details?.medication);
    setIsChildAnaphylactic(MedicalData?.is_child_anaphylactic);
    setShowAllergyFile(
      MedicalData?.is_child_anaphylactic ? true : false
    );
    setValue("allergy_file", MedicalData?.allergy_file || "");
  }, []);

  const submitForm = async (data: any) => {
    if (isChildAnaphylactic && !data?.allergy_file) {
      toast.error("Please upload the allergy file.");
      return;
    }
    let body = {
      allergies: {
        allergies: allergy,
      },
      medication: {
        medication: medication,
      },
      is_child_anaphylactic: isChildAnaphylactic,
    };

    console.log(body)
    let formdata = new FormData();

    formdata.append("allergies", JSON.stringify(body.allergies));
    formdata.append("medication", JSON.stringify(body.medication));
    formdata.append("is_child_anaphylactic", JSON.stringify(body.is_child_anaphylactic));


    if (isChildAnaphylactic) {
      formdata.append("allergy_file", data.allergy_file);
    }
    let res;
    try {
      res = await childMedicalInfoEdit(id, formdata);
      if (res?.success) {
        // toast.success("Medical Informaion Updated");
        setTimeout(()=>{
          toast.success("Medical Informaion Updated");
        },400)
        getChildData();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ModalDetailsContainer>
      {/* <HeaderContainer>
        <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
          Child Medical Information
        </div>
      </HeaderContainer> */}
      <HeaderContainer>
        <div className="font-[DM_Sans] font-medium mx-auto text-[1.25rem] text-[#4b4b4b]">
          Child Medical Information
        </div>

        <button type="button" className="" onClick={closeModal}>
          {" "}
          <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
        </button>
      </HeaderContainer>
      <FormContainer>
        <TwoInputContainer>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            placeholder="Allergy"
            onChange={(e: any) => setAllergy(e?.target?.value)}
            value={allergy}
          />
        </TwoInputContainer>
        <TwoInputContainer>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            placeholder="Medication"
            onChange={(e: any) => setMedication(e?.target?.value)}
            value={medication}
          />
        </TwoInputContainer>
        <div className="mx-auto w-fit flex md:flex-col lg:flex-row items-center md:gap-5 lg:gap-20 mb-4 mt-4">
          <h2>Is the child anaphylactic?</h2>
          <div className="flex flex-row gap-5">
            <input
              type="radio"
              name="childAnaphylactic"
              onChange={(e: any) => {
                setIsChildAnaphylactic(true);
                setShowAllergyFile(true);
              }}
              checked={isChildAnaphylactic}
            />
            <label>Yes</label>
            <input
              type="radio"
              name="childAnaphylactic"
              onChange={(e: any) => {
                setIsChildAnaphylactic(false);
                setShowAllergyFile(false);
                setValue("allergy_file","")
              }}
              checked={!isChildAnaphylactic}
            />
            <label>No</label>
            {/* <input
              type="radio"
              name="parentIsCustodian"
              onChange={(e: any) => setisCustdion(null)}
              checked={custudian === null ? true : false}
            />
            <label>Not required</label> */}
          </div>
        </div>
        {showallergyfile && (
          <div className="w-fit mx-auto flex jsutify-center items-center">
            {" "}
            <ImmunisationDocument
              name="allergy_file"
              label="Upload Document"
              control={control}
              className="flex"
            />
          </div>
        )}
        {/* <ModalButton>
          <CancelButton onClick={closeModal} type="button">
            {"Cancel"}
          </CancelButton>
          <AddButton type="submit">{"Add"}</AddButton>
        </ModalButton> */}
      </FormContainer>
      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px]">
            <CancelButton type="button" onClick={closeModal}>
              Cancel
            </CancelButton>
            <AddButton type="button" onClick={handleSubmit(submitForm)}>
              Save
            </AddButton>
          </div>
        </FormContainer>
      </FormButton>
      {/* <ToastContainer /> */}
    </ModalDetailsContainer>
  );
};

export default MedicalInfo;