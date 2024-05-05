import React, { useEffect, useState } from "react";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { GENDER_TYPE } from "@/app/Dropdowns";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import { EdituserMangementemergencydetails } from "@/services/User-management-API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  formatPhoneNumber,
  handleUnauthorizedError,
} from "@/utils/utilityFunctions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FormButton,
  FormContainer,
  ScrollableFormContainer,
  HeaderContainer,
  ModalDetailsContainer,
} from "@/app/feesManagement/ModalComponent/Common.styled";
import CustomFormattedNumberInput from "@/components/common/CustomFormattedNumberInput";
interface EducatorEmergencyProps {
  control?: any;
  userData?: any;
  closeModal?: any;
  getUserDetailsData?: any;
  tab?: string;
  // or use proper type for control based on your setup
  //   register: any;
}

const EditEmergency: React.FC<EducatorEmergencyProps> = ({
  userData,
  closeModal,
  getUserDetailsData,
  tab,
}) => {
  let router = useRouter();

  const currentValidationSchema: any = yup.object({
    contacts: yup.array().of(
      yup.object().shape({
        contactNumber: yup
          .string()
          .nullable()
          .test("is-numeric", "Only numbers are allowed", (value) => {
            if (!value) return true; // Skip validation if the value is empty
            return /^[0-9\s~`!@#$%^&*()-_+={}[\]|;:'",./<>?]*$/.test(value); // Check if value contains only numeric characters
          })
          .test(
            "is-ten-digits",
            "Contact number must be 10 digits",
            (value) => {
              if (value === null || value === undefined || value.trim() === "")
                return true;
              const numericValue = value.replace(/\D/g, "");
              return numericValue.length === 10;
            }
          ),

        relation: yup
          .string()
          .matches(
            /^[a-zA-Z]*$/,
            "Invalid characters. Use only alphabetical characters."
          ),
        firstName: yup
          .string()
          .matches(
            /^[a-zA-Z]*$/,
            "Invalid characters. Use only alphabetical characters."
          ),
        lastName: yup
          .string()
          .matches(
            /^[a-zA-Z]*$/,
            "Invalid characters. Use only alphabetical characters."
          ),
        preferredName: yup
          .string()
          .matches(
            /^[a-zA-Z]*$/,
            "Invalid characters. Use only alphabetical characters."
          ),
      })
    ),
  });
  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(currentValidationSchema),
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
    reset,
    formState: { errors },
  } = methods;
  const [detailssection, setDetailsSection] = useState<number[]>([1]);
  const [currentIndex, setCurrentIndex] = useState<any>([]);
  const [formError, setFormError] = useState<any>();
  const addDetailsSection = () => {
    setDetailsSection((prevSections: any) => [
      ...prevSections,
      prevSections.length + 1,
    ]);
  };
  const handleRemove = (
    index: number,
    statename: any,
    setStateName: any,
    fieldName: any
  ) => {
    let filtercontact = watch(fieldName)?.filter((item: any, id: number) => {
      return id !== index;
    });

    setValue(fieldName, filtercontact);
    let removeItems = [...statename];
    removeItems.splice(index, 1);
    setStateName(removeItems);
    setCurrentIndex(removeItems);
  };
  let id = userData?.usersDetails?.userId;
  let emgDetails = userData?.otherInfo?.emergency_details?.contacts;
  // setting the State by api Data
  // useEffect(() => {
  //   setFristName(emgDetails?.firstName);
  //   setlastName(emgDetails?.lastName);
  //   setPrefredName(emgDetails?.preferredName);
  //   setRrelation(emgDetails?.relation);
  //   setPhone(emgDetails?.contactNumber);
  //   setgender(emgDetails?.gender);
  // }, [emgDetails]);

  useEffect(() => {
    if (emgDetails) {
      let tempData = {
        emergencyDetails: emgDetails,
      };

      Object.entries(tempData).map((item) => {
        if (item[0] === "emergencyDetails") {
          setDetailsSection(
            item[1].length > 0
              ? Array.from({ length: item[1].length }, (_, index) => index + 1)
              : [1]
          );

          item[1].forEach((val: any, id: number) => {
            setValue(`contacts[${id}].firstName`, val.firstName);
            setValue(`contacts[${id}].lastName`, val.lastName);
            setValue(`contacts[${id}].preferredName`, val.preferredName);
            setValue(`contacts[${id}].relation`, val.relation);
            setValue(
              `contacts[${id}].contactNumber`,
              formatPhoneNumber(val.contactNumber)
            );
            setValue(`contacts[${id}].gender`, val.gender);
          });
        }
      });
    }
  }, [emgDetails]);

  const containsNumber = (input: any) => {
    return /\d/.test(input);
  };

  //checking the formError data  to show error messages or not
  const hasValues = () => {
    for (const key in formError) {
      if (Object.prototype.hasOwnProperty.call(formError, key)) {
        const nestedObject = formError[key];
        for (const nestedKey in nestedObject) {
          if (
            Object.prototype.hasOwnProperty.call(nestedObject, nestedKey) &&
            nestedObject[nestedKey]
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // submiting the Edited Form
  const submitData = async (data: any) => {
    await trigger();

    if (hasValues()) return;

    const finalData: any = {
      contacts: data && data?.contacts?.slice(0, currentIndex.length),
    };
    let body = {
      emergencyContactDetails: currentIndex?.length > 0 ? finalData : data,
    };
    let res;
    try {
      res = await EdituserMangementemergencydetails(id, body);
      if (res?.success) {
        if (data?.contacts?.length > 1) {
          toast?.success("Emergency contact details added successfully");
        } else {
          toast?.success("Emergency Details submited");
        }
        getUserDetailsData();
        closeModal();
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        handleUnauthorizedError(router);
      }
      if (error.response.data.error) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error(error.response?.data?.message);
      }
    }
  };
  console.log(errors);

  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer className="z-20">
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
            {tab ? "User" : " Educator"} Emergency Contact Details
          </div>

          <button type="button" className="" onClick={closeModal}>
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        <ScrollableFormContainer>
          <FormContainer>
            <form className="w-full relative my-1 gap-y-5">
              <div className="flex-col w-full max-w-[826px] mx-auto items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center gap-y-5">
                  {detailssection?.map((item: any, index: any) => {
                    const fieldName = `contacts[${index}]`;
                    return (
                      <div key={index} className="w-full gap-y-5 gap-x-4">
                        <div className="flex gap-y-5 gap-x-4 justify-start items-center">
                          {" "}
                          {index == 0 && (
                            <button
                              className="text-right text-[#00858E] my-2 text-sm"
                              onClick={addDetailsSection}
                              type="button"
                            >
                              + Add Another Contact
                            </button>
                          )}
                          {index > 0 && (
                            <span
                              className="cursor-pointer text-right text-[#00858E] my-2 text-sm"
                              onClick={() =>
                                handleRemove(
                                  index,
                                  detailssection,
                                  setDetailsSection,
                                  "emergencyDetail"
                                )
                              }
                            >
                              Remove
                            </span>
                          )}
                          <p>{watch(`${fieldName}.doc`)?.name}</p>
                        </div>
                        <div className="flex gap-y-5 gap-x-4 w-full mb-5">
                          <CustomInput
                            className="w-full p-3"
                            divclass="w-full"
                            label=""
                            type="text"
                            placeholder="First Name"
                            name={`${fieldName}.firstName`}
                            control={control}
                            register={register}
                            error={
                              errors?.contacts &&
                              (errors.contacts as any)?.[index]?.firstName
                            }
                          />
                          <CustomInput
                            className="w-full p-3"
                            divclass="w-full"
                            label=""
                            type="text"
                            placeholder="Last Name"
                            name={`${fieldName}.lastName`}
                            control={control}
                            register={register}
                            error={
                              errors?.contacts &&
                              (errors.contacts as any)?.[index]?.lastName
                            }
                          />
                        </div>
                        <div className="flex gap-x-4 gap-y-5 w-full mb-5">
                          <CustomInput
                            className="w-full p-3"
                            divclass="w-full"
                            label=""
                            type="text"
                            placeholder="Preferred Name (if any)"
                            name={`${fieldName}.preferredName`}
                            control={control}
                            register={register}
                            error={
                              errors?.contacts &&
                              (errors.contacts as any)?.[index]?.preferredName
                            }
                          />
                          <CustomInput
                            className="w-full p-3"
                            divclass="w-full"
                            label=""
                            type="text"
                            placeholder="Relation"
                            name={`${fieldName}.relation`}
                            control={control}
                            register={register}
                            error={
                              errors?.contacts &&
                              (errors.contacts as any)?.[index]?.relation
                            }
                          />
                        </div>
                        <div className="flex gap-x-4 gap-y-5 w-full mb-5">
                          {/* <CustomInput
                        className="w-full p-3"
                        divclass="w-full"
                        label=""
                        type="text"
                        placeholder="Contact Number"
                        name={`${fieldName}.contactNumber`}
                        control={control}
                        error={
                          errors?.emergencyDetail &&
                          (errors.emergencyDetail as any)[index]?.contactNumber
                        }
                        register={register}
                      /> */}
                          <CustomFormattedNumberInput
                            label=""
                            divclass="w-full"
                            className="w-full p-3"
                            type="text"
                            placeholder="Contact Number"
                            name={`${fieldName}.contactNumber`}
                            control={control}
                            error={
                              errors?.contacts &&
                              (errors.contacts as any)?.[index]?.contactNumber
                            }
                            register={register}
                            watch={watch}
                            setValue={setValue}
                          />
                          <CustomSelect
                            label="Gender"
                            options={GENDER_TYPE}
                            control={control}
                            name={`${fieldName}.gender`}
                            register={register}
                          />
                        </div>
                        {/* <div className="flex gap-3 justify-between items-center">
                    {" "}
                    <button
                      className="text-right text-[#3a70e2]"
                      onClick={addDetailsSection}
                      type="button"
                    >
                      + Add Another
                    </button>
                    <p>{watch(`${fieldName}.doc`)?.name}</p>
                  </div> */}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <div className="flex justify-end self-end items-center gap-[16px] bg-[#f5f5f5] py-2 lg:px-44 md:px-4 max-[1285px]:px-8">
          <AddButton type="submit" onSubmit={handleSubmit(submitData)}>
            {"Save"}
          </AddButton>
          <CancelButton onClick={closeModal} type="button">
            {"Cancel"}
          </CancelButton>
        </div> */}
            </form>
          </FormContainer>
        </ScrollableFormContainer>
        <FormButton>
          <FormContainer>
            <div className="flex justify-end self-end items-end gap-[16px] ">
              <CancelButton onClick={closeModal} type="button">
                {"Cancel"}
              </CancelButton>
              <AddButton type="button" onClick={handleSubmit(submitData)}>
                {"Save"}
              </AddButton>
            </div>
          </FormContainer>
        </FormButton>
      </ModalDetailsContainer>
      <ToastContainer />
    </>
  );
};

export default EditEmergency;
