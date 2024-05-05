"use client";
import { GENDER_TYPE, LANGUAGE_TYPE } from "@/app/Dropdowns";
import {
  ModalInputContainer,
} from "@/app/reports/Common.styled";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";

import {
  childProfileImageEdit,
  childemgContactEdit,
  childpersonalEdit,
} from "@/services/childrenActionServices";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import { Date_formator_YYYY_MM_DD, capitalizeAfterSpace } from "@/utils/utilityFunctions";
import Image from "next/image";
import {
  FormButton,
  FormContainer,
  HeaderContainer,
  ModalDetailsContainer,
  ScrollableFormContainer,
  TwoInputContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import {
  AddButton,
  CancelButton,
} from "@/components/common/Modal/Modal.styled";

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
  const [join, setJoin] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [genderError, setGenderError] = useState<string>("");
  const [languageError, setLanguageError] = useState<string>("");
  const [dobError, setDobError] = useState<string>("");
  const [joinError, setJoinError] = useState<string>("");
  

  const [image, setImage] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  useEffect(() => {
    let childDetails = data;

    setFirstName(capitalizeAfterSpace(childDetails?.first_name));
    setLastName(capitalizeAfterSpace(childDetails?.last_name));
    setPreFredName(childDetails?.preferred_name);
    setGender(childDetails?.gender);
    setLanguage(childDetails?.language);
    setDob(childDetails?.dob);
    setImage(childDetails?.photo);
    setJoin(childDetails?.joining_date);
  }, []);

  const validate = () => {
    let valid = true;
    if (!firstName) {
      setFirstNameError("First name is required.");
      valid = false;
    } else if (!firstName.match(/^[a-zA-Z0-9 ]+$/)) {
      setFirstNameError("Invalid characters. Use only alphabetical characters.");
      valid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Last name is required.");
      valid = false;
    }else if (!lastName.match(/^[a-zA-Z0-9 ]+$/)) {
      setLastNameError("Invalid characters. Use only alphabetical characters.");
      valid = false;
    } else {
      setLastNameError("");
    }

    if (!gender) {
      setGenderError("Gender is required.");
      valid = false;
    } else {
      setGenderError("");
    }

    if (!language) {
      setLanguageError("Language is required.");
      valid = false;
    } else {
      setLanguageError("");
    }

    if (!dob) {
      setDobError("Date of Birth is required.");
      valid = false;
    } else {
      setDobError("");
    }

    if (!join) {
      setJoinError("Date of joining is required.");
      valid = false;
    } else {
      setJoinError("");
    }


    return valid;
  };

  const submitForm = async () => {
    if (!validate()) {
      return;
    }
    let DateOfBirth = new Date(dob);
    let DateofJoining = new Date(join);
    DateofJoining.setMonth(DateofJoining.getMonth() - 6);
      if (DateOfBirth > DateofJoining) {
        toast.error(
          "Date of joining must be at least 6 months after date of birth."
        );
        return;
      }

    let body = {
      childFirstName: firstName,
      childLastName: lastName,
      childNickName: preFredName,
      childDob: Date_formator_YYYY_MM_DD(dob),
      startDate: Date_formator_YYYY_MM_DD(join),
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
    <ModalDetailsContainer>
      <HeaderContainer>
        <div className="font-[DM_Sans] font-medium mx-auto text-[1.25rem] text-[#4b4b4b]">
          Child Personal Details
        </div>

        <button type="button" className="" onClick={closeModal}>
          {" "}
          <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
        </button>
      </HeaderContainer>
      
      <ScrollableFormContainer>
      <FormContainer>
        <div className="w-full relative">
          <div className="mx-auto flex flex-col items-center justify-center mb-8 mt-4">
            <label className="text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e: any) => setImage(e.target.files[0])}
                // value={image}
              />
              <div className="w-[140px] h-[140px] mx-auto rounded-full bg-[linear-gradient(0deg,_#E1E1E1,_#E1E1E1),linear-gradient(0deg,_#F5F5F5,_#F5F5F5)] flex flex-col items-center justify-center border-[1px] border-[solid] border-[#E1E1E1] cursor-pointer">
                {image ? (
                  <Image
                    src={
                      typeof image !== "string"
                        ? URL.createObjectURL(image)
                        : image
                    }
                    alt="Preview"
                    width={50}
                    height={50}
                    className="w-full h-full object-fit rounded-full"
                  />
                ) : (
                  <>
                    <Image
                      src={"/svgs/User.svg"}
                      alt="Logo"
                      width={30}
                      height={30}
                      className="w-[1.5rem] h-[1.5rem] object-contain mb-2 "
                    />
                    <span className="text-center font-dm-sans text-[#00858E] text-[0.75rem] font-medium">
                      Upload Picture
                    </span>
                  </>
                )}
              </div>
            </label>
          </div>
          <form>
            <div className="flex-col w-full mx-auto items-center justify-center gap-6 ">
              <div className="w-full flex flex-col items-center justify-center gap-y-5">
                <ModalInputContainer>
                  <CustomInput
                    type="text"
                    name=""
                    label=""
                    placeholder="First Name"
                    onChange={(e: any) => setFirstName(e?.target?.value)}
                    value={firstName}
                    error={firstNameError}
                    required
                  />
                  <CustomInput
                    type="text"
                    name=""
                    label=""
                    placeholder="Last Name"
                    onChange={(e: any) => setLastName(e?.target?.value)}
                    value={lastName}
                    error={lastNameError}
                    required
                  />
                </ModalInputContainer>

                <ModalInputContainer>
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
                    error={genderError}
                    required
                  />
                </ModalInputContainer>

                <ModalInputContainer>
                  <CustomInput
                    type="date"
                    name=""
                    label=""
                    placeholder="Date Of Birth"
                    onChange={(e: any) => setDob(e?.target?.value)}
                    value={dob}
                    error={dobError}
                    required
                  />
                  <CustomInput
                    type="date"
                    name="startDate"
                    label=""
                    placeholder="Date Of Joining"
                    onChange={(e: any) => setJoin(e?.target?.value)}
                    value={join}
                    required
                    error={joinError}
                  />
                </ModalInputContainer>
                <ModalInputContainer>
                  <CustomSelect
                    name=""
                    options={LANGUAGE_TYPE}
                    label="Language"
                    onChange={(e: any) => setLanguage(e.target.value)}
                    value={language}
                    error={languageError}
                    required
                  />
                </ModalInputContainer>
              </div>
            </div>
          </form>
        </div>
      </FormContainer>
      </ScrollableFormContainer>

      <FormButton>
        <FormContainer>
          <div className="flex justify-end self-end items-end gap-[16px]">
            <CancelButton onClick={closeModal}>{"Cancel"}</CancelButton>
            <AddButton type="button" onClick={submitForm}>
              {"Save"}
            </AddButton>
          </div>
        </FormContainer>
      </FormButton>
      <ToastContainer />
    </ModalDetailsContainer>
  );
};

export default ChildPersonalDetails;