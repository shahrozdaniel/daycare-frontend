"use client";
import { GENDER_TYPE, LANGUAGE_TYPE } from "@/app/Dropdowns";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import { childemgContactEdit } from "@/services/childrenActionServices";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./styles.css";
import { formatPhoneNumber } from "@/utils/utilityFunctions";
import Image from "next/image";
import * as Yup from "yup";
import { FormButton } from "@/app/feesManagement/ModalComponent/Common.styled";

const EmergencyContact: React.FC<any> = ({
  data,
  id,
  closeModal,
  getChildData,
  emergencyDetails,
}) => {
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .test("is-numeric", "Only numbers are allowed", (value) => {
        if (!value) return true; // Skip validation if the value is empty
        return /^[0-9\s~`!@#$%^&*()-_+={}[\]|;:'",./<>?]*$/.test(value); // Check if value contains only numeric characters
      })
      .test("is-ten-digits", "Contact number must be 10 digits", (value) => {
        if (value === null || value === undefined || value.trim() === "")
          return true;
        const numericValue = value.replace(/\D/g, "");
        return numericValue.length === 10;
      }),
  });
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [preFredName, setPreFredName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [relaton, setRelation] = useState<string>("");
  const [isCustudian, setIsCustudian] = useState<any>();
  const [language, setLanguage] = useState<string>("");
  const [isEmgCon, setisEmgCon] = useState<boolean>();
  const [isPickupAuth, setispickUpAuth] = useState<boolean>();

  const [emgContId, setEmgContId] = useState<number>();

  useEffect(() => {
    setEmgContId(emergencyDetails?.id);

    setFirstName(emergencyDetails?.first_name);
    setLastName(emergencyDetails?.last_name);
    setPreFredName(emergencyDetails?.preferred_name);
    setPhoneNumber(formatPhoneNumber(emergencyDetails?.phone_no));
    setGender(emergencyDetails?.gender);
    setRelation(emergencyDetails?.relation);
    setEmail(emergencyDetails?.email);
    setisEmgCon(emergencyDetails?.is_emergency_contact);
    setispickUpAuth(emergencyDetails?.is_pickup_authorized);
    setLanguage(emergencyDetails?.language);
    setIsCustudian(emergencyDetails?.is_custodian);
  }, []);

  const submitForm = async () => {
    const emgId = emgContId;

    let body = {
      emergency_contact_details: emgId
        ? [
            {
              id: emgId,
              first_name: firstName,
              last_name: lastName,
              preferred_name: preFredName,
              phone_no: phoneNumber,
              gender: gender,
              email: email,
              relation: relaton,
              is_custodian: isCustudian,
              language: language,
              is_emergency_contact: isEmgCon || true,
              is_pickup_authorized: isPickupAuth,
            },
          ]
        : [
            {
              first_name: firstName,
              last_name: lastName,
              preferred_name: preFredName,
              phone_no: phoneNumber,
              gender: gender,
              email: email,
              relation: relaton,
              is_custodian: isCustudian,
              language: language,
              is_emergency_contact: isEmgCon || true,
              is_pickup_authorized: isPickupAuth,
            },
          ],
    };
    if (isPickupAuth && !firstName) {
      toast.error("Please fill the empty fields");
      return;
    }
    let res;
    try {
      await validationSchema.validate({ phoneNumber }, { abortEarly: false });
      res = await childemgContactEdit(id, body);
      if (res?.success) {
        toast.success(res?.data?.message);
        getChildData();
        closeModal();
      }
    } catch (error: any) {
      if (error.name === "ValidationError") {
        error.inner.forEach((err: any) => {
          toast.error(err.message);
        });
      } else {
        console.error(error);
      }
    }
  };
  console.log("emergcny details", emergencyDetails);
  return (
    <ModalDetailsContainer>
      {/* <HeaderContainer>
        <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
          Child Emergency Contact Details
        </div>
      </HeaderContainer> */}
      <HeaderContainer>
        <div className="font-[DM_Sans] font-medium mx-auto text-[1.25rem] text-[#4b4b4b]">
          Child Emergency Contact Details
        </div>

        <button type="button" className="" onClick={closeModal}>
          {" "}
          <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
        </button>
      </HeaderContainer>
      <FormContainer>
        <TwoInputContainer>
          <CustomInput
            type="text"
            name=""
            label=""
            placeholder="First Name"
            onChange={(e: any) => setFirstName(e?.target?.value)}
            value={firstName}
          />
          <CustomInput
            type="text"
            name=""
            label=""
            placeholder="Last Name"
            onChange={(e: any) => setLastName(e?.target?.value)}
            value={lastName}
          />
        </TwoInputContainer>
        <TwoInputContainer>
          <CustomInput
            type="text"
            name=""
            label=""
            placeholder="Preferred Name"
            onChange={(e: any) => setPreFredName(e?.target?.value)}
            value={preFredName}
          />
          <CustomInput
            type="tel"
            name=""
            label=""
            placeholder="Contact Number "
            onChange={(e: any) =>
              setPhoneNumber(formatPhoneNumber(e?.target?.value))
            }
            value={phoneNumber}
          />
        </TwoInputContainer>
        <TwoInputContainer>
          <CustomSelect
            name=""
            options={GENDER_TYPE}
            label="Gender"
            onChange={(e: any) => setGender(e.target.value)}
            value={gender}
          />

          <CustomInput
            type="email"
            name=""
            label=""
            placeholder="Email"
            onChange={(e: any) => setEmail(e?.target?.value)}
            value={email}
          />
        </TwoInputContainer>
        <TwoInputContainer>
          <CustomSelect
            name=""
            options={LANGUAGE_TYPE}
            label="Language"
            onChange={(e: any) => setLanguage(e.target.value)}
            value={language}
          />

          <CustomInput
            type="text"
            name=""
            label=""
            placeholder="Relation"
            onChange={(e: any) => setRelation(e?.target?.value)}
            value={relaton}
          />
        </TwoInputContainer>
        <div className="w-4/6 mx-auto mt-2">
          <div className="flex w-2/3 ml-3 justify-between mb-4">
            <h2 className="text-black-b1">
              Authorization to pickup the child ?
            </h2>
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e: any) => setispickUpAuth(e?.target?.checked)}
                checked={isPickupAuth}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </FormContainer>
      {/* <div className="mx-auto w-fit flex md:flex-col lg:flex-row items-center md:gap-5 lg:gap-20 mb-8 mt-2">
                <h2>Is this a custodian case ? </h2>
                <div className="flex flex-row gap-5">
                    <input
                        type="radio"
                        name=""
                        onChange={() => setIsCustudian(true)}
                        checked={isCustudian}
                    />
                    <label>Yes</label>
                    <input
                        type="radio"
                        name=""
                        onChange={() => setIsCustudian(false)}
                        checked={!isCustudian}
                    />
                    <label>No</label>
                </div>
            </div>
            <div className="w-4/6 mx-auto mt-2">
                <div className="flex w-2/3 ml-3 justify-between mb-4">
                    <h2 className="text-black-b1">Is this an emergency contact?</h2>
                    <label className="switch">
                        <input type="checkbox" onChange={(e: any) => setisEmgCon(e?.target?.checked)} checked={isEmgCon} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div> */}

      {/* <ModalButton>
        <CancelButton onClick={closeModal}>{"Cancel"}</CancelButton>
        <AddButton type="button" onClick={submitForm}>
          {"Add"}
        </AddButton>
      </ModalButton> */}
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
  );
};

export default EmergencyContact;