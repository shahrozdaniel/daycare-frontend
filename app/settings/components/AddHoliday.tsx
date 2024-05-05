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
import { HOLIDAY_TYPE } from "@/app/Dropdowns";
import { date } from "yup";
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
  setEdit?: any;
}

const AddHoliday: React.FC<props> = ({
  closeModal,
  submitFormDocs,
  setEdit,
}) => {
  const [holidayName, setHolidayName] = useState<string>("");
  const [holidayType, setHolidayType] = useState<string>("");
  const [radio, setRadio] = useState<boolean>(false);
  const [date1, setDate1] = useState<any>("");
  const [date2, setDate2] = useState<any>("");
  const [validation, setValidation] = useState<boolean>(false);

  useEffect(() => {
    if (setEdit) {
      setHolidayName(setEdit?.name || "");
      setHolidayType(setEdit?.type || "");
      setRadio(setEdit?.dates?.dates?.length > 1 ? true : false);
      setDate1(setEdit?.dates?.dates[0] || "");
      setDate2(setEdit?.dates?.dates[1] || "");
    }
  }, [setEdit]);

  const submitForm = async () => {
    if (
      holidayName === "" ||
      holidayType === "" ||
      date1 === "" ||
      (radio && date2 === "")
    ) {
      setValidation(true);
    } else {
      if (date1 && date2) {
        const from = new Date(date1);
        const to = new Date(date2);
        if (from > to) {
          toast.error("From date should  be less than to date");
          return;
        }
      }
      let formBody = {
        name: holidayName,
        Date: {
          dates: date2 ? [date1, date2] : [date1],
        },
        type: holidayType,
      };
      submitFormDocs(formBody);
      closeModal();
      setHolidayName("");
      setHolidayType("");
      setRadio(false);
      setDate1("");
      setDate2("");
    }
  };

  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
            Add Holiday
          </div>
          <button
            type="button"
            className="flex self-end mb-2"
            onClick={closeModal}
          >
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>

        <FormContainer>
          <div className="w-full mx-auto gap-y-5">
            <div className=" flex flex-row items-center gap-y-5 gap-x-4">
              <div className="w-1/2">
                <CustomInput
                  type="text"
                  name="holidayName"
                  placeholder="Holiday Name"
                  onChange={(e: any) => setHolidayName(e.target.value)}
                  value={holidayName}
                  required={true}
                  error={
                    validation &&
                    holidayName === "" &&
                    "Holiday Name is required"
                  }
                />
              </div>
              <div className="w-1/2 mt-1">
                <CustomSelect
                  name="holidayType"
                  label="Holiday Type"
                  options={HOLIDAY_TYPE}
                  onChange={(e: any) => setHolidayType(e?.target?.value)}
                  value={holidayType}
                  required={true}
                  error={
                    validation &&
                    holidayType === "" &&
                    "Holiday Type is required"
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-y-5 mt-1">
              <div className="flex flex-row justify-between items-center gap-y-5 gap-x-4 my-3">
                <div className=" flex flex-row items-center gap-y-5 gap-x-4 w-1/2">
                  <input
                    id="single"
                    type="radio"
                    name={`radioOption`}
                    checked={radio === false}
                    onChange={(e: any) => {
                      setRadio(false);
                      setDate2("");
                    }}
                  />
                  <label htmlFor={`single`}>Single Day</label>

                  <input
                    id="Multi"
                    type="radio"
                    name={`radioOption`}
                    checked={radio === true}
                    onChange={(e: any) => setRadio(true)}
                  />
                  <label htmlFor="Multi">Multiple Day</label>
                </div>

                {!radio && (
                  <div className="w-1/2">
                    <CustomInput
                      type="date"
                      name="Date"
                      placeholder="Date"
                      onChange={(e: any) => setDate1(e?.target?.value)}
                      value={date1}
                      required={true}
                      error={
                        validation && date1 === "" && "This feild is required"
                      }
                    />
                  </div>
                )}
              </div>

              {radio && (
                <div className="flex flex-row gap-y-5 gap-x-4">
                  <CustomInput
                    type="date"
                    name="From"
                    placeholder="From"
                    onChange={(e: any) => setDate1(e?.target?.value)}
                    value={date1}
                    required={true}
                    error={
                      validation && date1 === "" && "This feild is required"
                    }
                  />
                  <CustomInput
                    type="date"
                    name="To"
                    placeholder="To"
                    onChange={(e: any) => setDate2(e?.target?.value)}
                    value={date2}
                    required={true}
                    error={
                      validation &&
                      radio &&
                      date2 === "" &&
                      "This feild  is required"
                    }
                  />
                </div>
              )}
            </div>
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
            <div className="flex justify-end self-end items-end gap-[16px]">
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

export default AddHoliday;
