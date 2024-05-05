"use client";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "@/app/reports/Common.styled";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import { childMedicalInfoEdit } from "@/services/childrenActionServices";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MedicalInfo: React.FC<any> = ({ data, id, closeModal, getChildData }) => {
  const [allergy, setAllergy] = useState<string>("");
  const [medication, setMedication] = useState<string>("");

  useEffect(() => {
    let MedicalData = data?.medical_information?.[0];
    setAllergy(MedicalData?.allergy_details?.allergies);
    setMedication(MedicalData?.medication_details?.medication);
  }, []);
  const submitForm = async () => {
    let body = {
      allergies: {
        allergies: allergy,
      },
      medication: {
        medication: medication,
      },
    };
    let res;
    try {
      res = await childMedicalInfoEdit(id, body);
      if (res?.success) {
        toast.success("Medical Informaion Updated");
        getChildData();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ModalDetailsContainer>
      <HeaderContainer>
        <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
          Child Medical Information
        </div>
      </HeaderContainer>
      <FormContainer>
        <TwoInputContainer>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Allergy"
            onChange={(e: any) => setAllergy(e?.target?.value)}
            value={allergy}
          />
        </TwoInputContainer>
        <TwoInputContainer>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Medication"
            onChange={(e: any) => setMedication(e?.target?.value)}
            value={medication}
          />
        </TwoInputContainer>
      </FormContainer>
      <ModalButton>
        <CancelButton onClick={closeModal}>{"Cancel"}</CancelButton>
        <AddButton type="button" onClick={submitForm}>
          {"Add"}
        </AddButton>
      </ModalButton>
      <ToastContainer />
    </ModalDetailsContainer>
  );
};

export default MedicalInfo;
