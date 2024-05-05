"use client";
import { GENDER_TYPE, LANGUAGE_TYPE } from "@/app/Dropdowns";
import {
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  TwoInputContainer,
} from "@/app/reports/Common.styled";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import {
  childProfileImageEdit,
  childemgContactEdit,
  childpersonalEdit,
} from "@/services/childrenActionServices";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import { Date_formator_YYYY_MM_DD } from "@/utils/utilityFunctions";
import Image from "next/image";

const ChildPersonalDetails: React.FC<any> = ({
  data,
  id,
  closeModal,
  getChildData,
}) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [preFredName, setPreFredName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [dob, setDob] = useState<string>("");

  const [image, setImage] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  console.log("data----------->", data);
  useEffect(() => {
    let childDetails = data;
    setFirstName(childDetails?.first_name);
    setLastName(childDetails?.last_name);
    setPreFredName(childDetails?.preferred_name);
    setGender(childDetails?.gender);
    setLanguage(childDetails?.language);
    setDob(childDetails?.dob);
    setImage(childDetails?.photo);
  }, []);

  const submitForm = async () => {
    let body = {
      childFirstName: firstName,
      childLastName: lastName,
      childNickName: preFredName,
      childDob: Date_formator_YYYY_MM_DD(dob),
      childLanguage: language,
      childGender: gender,
      // "childcareType": "1",
      // "classroomType": "2"
    };
    let res;
    try {
      res = await childpersonalEdit(id, body);
      if (res?.success) {
        fileUpload();
        toast.success(res?.message);
        getChildData();
        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast.error("some thing went Wrong");
    }
  };
  const fileUpload = async () => {
    let body = new FormData();
    body.append("photo", image);
    try {
      let res = await childProfileImageEdit(id, body);
      if (res?.success) {
        toast.success("Child Profile updated");
        getChildData();
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
            Child Personal Details
          </div>
        </HeaderContainer>
        <FormContainer>
          {/* <input type='file' onChange={(e: any) => setFile(e?.target?.files[0])} /> */}
          <div className="mx-auto w-fit flex flex-col items-center justify-center mb-8 mt-4">
            <label className="text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e: any) => setImage(e.target.files[0])}
                // value={image}
              />
              <div className="w-[140px] h-[140px] rounded-full bg-[linear-gradient(0deg,_#E1E1E1,_#E1E1E1),linear-gradient(0deg,_#F5F5F5,_#F5F5F5)] flex flex-col items-center justify-center border-[1px] border-[solid] border-[#E1E1E1] cursor-pointer">
                <Image
                  src={image ? image : "/images/avatar.png"}
                  alt="Preview"
                  width={50}
                  height={50}
                  className="w-full h-full object-cover rounded-full mt-2"
                  onClick={handleButtonClick}
                />
              </div>
            </label>
          </div>
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
            <CustomSelect
              name=""
              options={GENDER_TYPE}
              label="Gender"
              onChange={(e: any) => setGender(e.target.value)}
              value={gender}
            />
          </TwoInputContainer>
          <TwoInputContainer>
            <CustomInput
              type="date"
              name=""
              label=""
              placeholder="Date Of Birth"
              onChange={(e: any) => setDob(e?.target?.value)}
              value={dob}
            />
            <CustomSelect
              name=""
              options={LANGUAGE_TYPE}
              label="Language"
              onChange={(e: any) => setLanguage(e.target.value)}
              value={language}
            />
          </TwoInputContainer>
        </FormContainer>

        <ModalButton>
          <CancelButton onClick={closeModal}>{"cancel"}</CancelButton>
          <AddButton type="button" onClick={submitForm}>
            {"Add"}
          </AddButton>
        </ModalButton>
        <ToastContainer />
      </ModalDetailsContainer>
    </>
  );
};

export default ChildPersonalDetails;
