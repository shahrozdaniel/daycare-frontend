import React, { useEffect, useState } from "react";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { Checkbox } from "@/components/ui/checkbox";
import DocumentUpload from "@/components/common/DocumentUpload";
import { ModalDetailsContainer } from "./Common.styled";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddButton,
  CancelButton,
  ModalButton,
} from "@/components/common/Modal/Modal.styled";
import { useForm } from "react-hook-form";
import { Separator } from "@radix-ui/react-separator";
import path from "path";
import moment from "moment";
import { HeaderContainer } from "@/app/reports/Common.styled";
import Image from "next/image";
import { EdituserMangementdocuments } from "@/services/User-management-API";
import { handleUnauthorizedError } from "@/utils/utilityFunctions";
import { useRouter } from "next/navigation";

interface EducatorDocumentProps {
  control: any; // or use proper type for control based on your setup
  userData?: any;
  getUserDetailsData?: any;
  closeModal?: any;
  //   register: any;
  //   watch?: any;
}

const EditDocument: React.FC<EducatorDocumentProps> = ({
  userData,
  getUserDetailsData,
  closeModal,
}) => {
  const methods = useForm<any>({
    shouldUnregister: false,
    // resolver: yupResolver(validationschema),
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
    formState: { errors, dirtyFields, isDirty },
  } = methods;
  const [downloadLink, setDownloadLink] = useState("");
  let router = useRouter();
  const [documentSections, setDocumentSections] = useState<number[]>([1]);

  const [certificationsection, setCertificationSection] = useState<number[]>([
    1,
  ]);
  const [trainingsection, setTrainingSection] = useState<number[]>([1]);

  const addDocumentSection = () => {
    setDocumentSections((prevSections: any) => [
      ...prevSections,
      prevSections.length + 1,
    ]);
  };

  const addCertification = () => {
    setCertificationSection((prevSections: any) => [
      ...prevSections,
      prevSections.length + 1,
    ]);
  };

  const addTrainingSection = () => {
    setTrainingSection((prevSections: any) => [
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
    let filtercontact = watch(fieldName).filter((item: any, id: number) => {
      return id !== index;
    });

    setValue(fieldName, filtercontact);
    let removeItems = [...statename];
    removeItems.splice(index, 1);
    setStateName(removeItems);
  };

  const submitData = async (data: any) => {
    let finalrecord = data.records.filter(
      (item: any) => typeof item.doc !== "object" || item.doc instanceof File
    );

    let finalcertification = data.certification.filter(
      (item: any) => typeof item.doc !== "object" || item.doc instanceof File
    );

    let finaltraining = data.training.filter(
      (item: any) => typeof item.doc !== "object" || item.doc instanceof File
    );
    let formData = new FormData();

    //recprd files
    let recordDescription = finalrecord.map((item: any) => item.description);
    let recordFiles = finalrecord.map((item: any) => item.doc);

    //certif dtails
    let certificationTypearr = finalcertification.map(
      (item: any) => item.certificationType
    );
    let certifdate = finalcertification.map(
      (item: any) => item.certificationDate
    );
    let certificationdes = finalcertification.map(
      (item: any) => item.description
    );
    let certiffiles = finalcertification.map((item: any) => item.doc);

    //training dtails
    let trainingdes = finaltraining.map((item: any) => item.description);
    let trainingfiles = finaltraining.map((item: any) => item.doc);

    // record files
    recordFiles.forEach((reportFile: any, index: any) => {
      formData.append(`reportFiles`, reportFile);
    });

    recordDescription.forEach((item: any, index: any) => {
      formData.append(`reportDescription[]`, item);
    });
    // certificaiton files
    certificationTypearr.forEach((item: any, index: any) => {
      formData.append(`certificationType[]`, item);
    });

    certifdate.forEach((item: any, index: any) => {
      formData.append(`date[]`, item);
    });
    certificationdes.forEach((item: any, index: any) => {
      formData.append(`certification_des[]`, item);
    });

    certiffiles.forEach((item: any, index: any) => {
      formData.append(`certificationFiles`, item);
    });

    // training files
    trainingdes.forEach((item: any, index: any) => {
      formData.append(`tranning[]`, item);
    });

    trainingfiles.forEach((item: any, index: any) => {
      formData.append(`tranningFiles`, item);
    });
    try {
      let id = userData.usersDetails.userId;

      let res = await EdituserMangementdocuments(id, formData);
      if (res?.success) {
        toast.success(res?.message || "success");
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
  useEffect(() => {
    if (userData) {
      let tempData = {
        records: userData.otherInfo.records.record,
        certification: userData.otherInfo.certifications.certifications,
        training: userData.otherInfo.trainings.trannings,
      };

      Object.entries(tempData).map((item, index) => {
        if (item[0] === "records" && item[1]?.length > 0) {
          setDocumentSections(
            item[1].length > 0
              ? Array.from({ length: item[1].length }, (_, index) => index + 1)
              : [1]
          );

          item[1].forEach((val: any, id: number) => {
            let url = val.reportFiles;
            // const extractedFileName = url.substring(url.lastIndexOf("/") + 1);
            // setValue(`records[${id}].docName`, extractedFileName);
            // fetch(url)
            //   .then((response) => response.blob())
            //   .then((blob) => {
            //     // Create a Blob URL for the file content
            //     const blobUrl = window.URL.createObjectURL(blob);

            //     // Set the download link's href attribute
            //     setDownloadLink(blobUrl);
            //   })
            //   .catch((error) =>
            //   );
            setValue(`records[${id}].description`, val.reportDescription);
            setValue(`records[${id}].doc`, val.reportFiles);
            setValue(
              `records[${id}].docName`,
              val.reportFiles ? path.basename(val.reportFiles) : ""
            );
          });
        }

        if (item[0] === "certification" && item[1]?.length > 0) {
          setCertificationSection(
            item[1].length > 0
              ? Array.from({ length: item[1].length }, (_, index) => index + 1)
              : [1]
          );
          item[1].forEach((val: any, id: number) => {
            setValue(
              `certification[${id}].certificationType`,
              val.certificationTypes
            );
            setValue(
              `certification[${id}].certificationDate`,
              moment(val.certificationDates).format("YYYY-MM-DD")
            );
            setValue(`certification[${id}].description`, val.certificationDesc);

            setValue(`certification[${id}].doc`, val.certificationFilesPath);

            setValue(
              `certification[${id}].docName`,
              val.certificationFilesPath
                ? path.basename(val.certificationFilesPath)
                : ""
            );
          });
        }

        if (item[0] === "training" && item[1]?.length > 0) {
          setTrainingSection(
            item[1].length > 0
              ? Array.from({ length: item[1].length }, (_, index) => index + 1)
              : [1]
          );
          item[1].forEach((val: any, id: number) => {
            setValue(`training[${id}].description`, val.tranning);

            setValue(`training[${id}].doc`, val.tranningfilePath);

            setValue(
              `training[${id}].docName`,
              val.tranningfilePath ? path.basename(val.tranningfilePath) : ""
            );
          });
        }
      });
    }
  }, []);
  return (
    <>
      <ModalDetailsContainer>
        <HeaderContainer>
          <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mx-auto">
            Educator Documents
          </div>

          <button type="button" className="flex self-end" onClick={closeModal}>
            {" "}
            <Image src={"/svgs/close-icon.svg"} alt="" width={18} height={18} />
          </button>
        </HeaderContainer>
        <hr />
        {/* <section className="w-full">
          <div className="flex-col p-5 w-full max-w-[826px] mx-auto items-center justify-center gap-6">
            <div className="w-full flex flex-col items-center justify-center gap-2">
              <div className="w-full flex flex-col items-left">
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mb-2">
                  Records:
                </div>
                {documentSections.map((item, index) => {
                  const fieldName = `records[${index}]`;
                  return (
                    <div className="flex-col gap-3 w-full pt-2" key={index}>
                      <div className="relative">
                        <CustomInput
                          className="w-full p-3"
                          label=""
                          type="text"
                          placeholder="Description"
                          name={`${fieldName}.description`}
                          divclass="w-full"
                          control={control}
                          //   register={register}
                        />
                        <div className="absolute top-0 right-0 h-full flex items-center">
                          <DocumentUpload
                            label=""
                            name={`${fieldName}.doc`}
                            control={control}
                            className="h-2.5 w-[50px]"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-between">
                        {" "}
                        <button
                          className="text-right text-[#3a70e2]"
                          onClick={addDocumentSection}
                        >
                          + Add Another
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="w-full flex flex-col items-left">
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mb-2">
                  Certification:
                </div>
                {certificationsection.map((item, index) => {
                  const fieldName = `certification[${index}]`;
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      {" "}
                      <div className="flex gap-3 w-full">
                        <CustomSelect
                          name="certificationType"
                          label=""
                          options={[
                            { value: "", label: "Select Type" },
                            { value: "Post-grad", label: "Post graduation" },
                            { value: "Master", label: "Master" },
                            { value: "Other", label: "Other" },
                            // Add more options as needed
                          ]}
                          control={control}
                          //   register={register}
                        />
                        <div>
                          <CustomInput
                            className="w-full p-3"
                            label=""
                            type="date"
                            placeholder="Date:-"
                            name="Date"
                            control={control}
                            divclass="w-full"
                            //   register={register}
                          />
                        </div>
                      </div>
                      <div className="flex-col  gap-3 w-full">
                        <div className="relative">
                          <CustomInput
                            className="w-full p-3"
                            label=""
                            type="text"
                            placeholder="Description"
                            name="description"
                            control={control}
                            divclass="w-full"
                          />
                          <div className="absolute top-0 right-0 h-full flex items-center">
                            <DocumentUpload
                              label=""
                              name="doc"
                              control={control}
                              className="h-2.5 w-[50px]"
                            />
                          </div>
                        </div>
                        <div className="text-right text-[#3a70e2]">
                          + Add Another
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="w-full flex flex-col items-left">
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mb-2">
                  Training:
                </div>
                <div className="flex-col  gap-3 w-full">
                  <div className="relative">
                    <CustomInput
                      className="w-full p-3"
                      label=""
                      type="text"
                      placeholder="Description"
                      name="description"
                      control={control}
                      divclass="w-full"
                    />
                    <div className="absolute top-0 right-0 h-full flex items-center">
                      <DocumentUpload
                        label=""
                        name="doc"
                        control={control}
                        className="h-2.5 w-[50px]"
                      />
                    </div>
                  </div>
                  <div className="text-right text-[#3a70e2]">+ Add Another</div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <form onSubmit={handleSubmit(submitData)} className="w-full">
          <div className="flex-col p-5 w-full max-w-[826px] mx-auto items-center justify-center gap-6">
            <div className="w-full flex flex-col items-center justify-center gap-2">
              <div className="w-full flex flex-col items-left">
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mb-2">
                  Records:
                </div>
                {documentSections?.map((item: any, index: number) => {
                  const fieldName = `records[${index}]`;

                  return (
                    <div className="flex-col gap-3 w-full pt-2" key={index}>
                      <div className="relative">
                        <CustomInput
                          className="w-full p-3"
                          label=""
                          type="text"
                          placeholder="Description"
                          name={`${fieldName}.description`}
                          divclass="w-full"
                          control={control}
                          register={register}
                        />

                        <div className="absolute top-0 right-0 h-full flex items-center">
                          <DocumentUpload
                            label=""
                            name={`${fieldName}.doc`}
                            control={control}
                            className="h-2.5 w-[50px]"
                          />
                        </div>
                      </div>

                      <div className=" flex justify-end  self-end ">
                        {/* <div className=" flex flex-col w-full ">
                          {documentSections.length === index + 1 && (
                            <button
                              className="text-left my-2 text-[#00858E]"
                              type="button"
                              onClick={addDocumentSection}
                            >
                              + Add Another Records
                            </button>
                          )}
                        </div> */}
                        <p className="">
                          {!isDirty
                            ? watch(`${fieldName}.docName`)
                            : watch(`${fieldName}.doc`)?.name}
                        </p>

                        {/* <a
                          href={downloadLink}
                          download={watch(`records[${index}].docName`)}
                        >
                          Preview
                        </a> */}

                        <div className="flex flex-col">
                          {" "}
                          {/* {documentSections.length > 1 && index > 0 && (
                            <button
                              className="cursor-pointer text- text-[#00858E] my-2"
                              type="button"
                              onClick={() =>
                                handleRemove(
                                  index,
                                  documentSections,
                                  setDocumentSections,
                                  "records"
                                )
                              }
                            >
                              Remove
                            </button>
                          )} */}
                        </div>
                      </div>
                      {/* <div className="flex gap-3 justify-start items-center">
                      {" "}
                      <button
                        className="text-right text-[#3a70e2]"
                        type="button"
                        onClick={addDocumentSection}
                      >
                        + Add Another
                      </button>
                      {index > 0 && <span className="text-[#3a70e2] cursor-pointer">Remove</span>}
                      <p>{watch(`${fieldName}.doc`)?.name}</p>
                    </div> */}
                    </div>
                  );
                })}
              </div>

              <Separator />
              <div className="w-full flex flex-col items-left">
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mb-2">
                  Certification:
                </div>

                {certificationsection?.map((item: any, index: number) => {
                  const fieldName = `certification[${index}]`;
                  return (
                    <div key={index}>
                      <div className="flex gap-3 w-full">
                        <CustomSelect
                          name={`${fieldName}.certificationType`}
                          label=""
                          options={[
                            { value: "", label: "Select Type" },
                            { value: "First_Aid", label: "First Aid" },
                            { value: "CPR", label: "CPR" },
                            {
                              value: "AED_Instructor",
                              label: "AED Instructor",
                            },
                            {
                              value: "CDA",
                              label: "Child Development Associate (CDA)",
                            },
                            {
                              value: "OSHA_Sefty_Certificate",
                              label: "OSHA Safety Certificate",
                            },
                            // Add more options as needed
                          ]}
                          control={control}
                          register={register}
                        />
                        <CustomInput
                          className="w-full p-3"
                          label=""
                          type="date"
                          placeholder="Date:-"
                          name={`${fieldName}.certificationDate`}
                          control={control}
                          divclass="w-full"
                          register={register}
                        />
                      </div>
                      <div className="flex-col  gap-3 w-full mt-3">
                        <div className="relative">
                          <CustomInput
                            className="w-full p-3"
                            label=""
                            type="text"
                            placeholder="Description"
                            name={`${fieldName}.description`}
                            control={control}
                            divclass="w-full"
                            register={register}
                          />
                          <div className="absolute top-0 right-0 h-full flex items-center">
                            <DocumentUpload
                              label=""
                              name={`${fieldName}.doc`}
                              control={control}
                              className="h-2.5 w-[50px]"
                            />
                          </div>
                        </div>
                        {/* <div className="flex gap-3 justify-start items-center">
                        {" "}
                        {index === 0 && <button
                          className="text-right text-[#3a70e2]"
                          onClick={addCertification}
                          type="button"
                        >
                          + Add Another
                        </button>}
                        {index > 0 && <span className="text-[#3a70e2] cursor-pointer">Remove</span>}
                        <p>{watch(`${fieldName}.doc`)?.name}</p>
                      </div> */}
                        <div className="flex justify-end self-end">
                          <p className="">
                            {!isDirty
                              ? watch(`${fieldName}.docName`)
                              : watch(`${fieldName}.doc`)?.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className=" flex flex-col w-[50%] ">
                          {/* {certificationsection.length === index + 1 && (
                            <button
                              className="text-left my-2 text-[#00858E]"
                              type="button"
                              onClick={addCertification}
                            >
                              + Add Another Certification
                            </button>
                          )} */}
                        </div>
                        <div className=" flex flex-col">
                          {" "}
                          {/* {certificationsection?.length > 1 && index > 0 && (
                            <button
                              className="cursor-pointer text- text-[#00858E] my-2"
                              type="button"
                              onClick={() =>
                                handleRemove(
                                  index,
                                  certificationsection,
                                  setCertificationSection,
                                  "certification"
                                )
                              }
                            >
                              Remove
                            </button>
                          )} */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Separator />
              <div className="w-full flex flex-col items-left">
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mb-2">
                  Training:
                </div>
                {trainingsection?.map((item: any, index: number) => {
                  const fieldName = `training[${index}]`;
                  return (
                    <div className="flex-col  gap-3 w-full" key={index}>
                      <div className="relative">
                        <CustomInput
                          className="w-full p-3"
                          label=""
                          type="text"
                          placeholder="Description"
                          name={`${fieldName}.description`}
                          control={control}
                          register={register}
                          divclass="w-full"
                        />
                        <div className="absolute top-0 right-0 h-full flex items-center">
                          <DocumentUpload
                            label=""
                            name={`${fieldName}.doc`}
                            control={control}
                            className="h-2.5 w-[50px]"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end self-end">
                        <p className="">
                          {!isDirty
                            ? watch(`${fieldName}.docName`)
                            : watch(`${fieldName}.doc`)?.name}
                        </p>
                      </div>
                      <div className="flex  justify-between">
                        <div className=" flex flex-col w-[50%] ">
                          {/* {trainingsection.length === index + 1 && (
                            <button
                              className="text-left my-2 text-[#00858E]"
                              type="button"
                              onClick={addTrainingSection}
                            >
                              + Add Another Training
                            </button>
                          )} */}
                        </div>

                        <div className=" flex flex-col">
                          {/* {trainingsection.length > 1 && index > 0 && (
                            <button
                              className="cursor-pointer text- text-[#00858E] my-2"
                              type="button"
                              onClick={() =>
                                handleRemove(
                                  index,
                                  trainingsection,
                                  setTrainingSection,
                                  "training"
                                )
                              }
                            >
                              Remove
                            </button>
                          )} */}
                        </div>
                      </div>

                      {/* <div className="flex gap-3 justify-start items-center">
                      {" "}
                      <button
                        className="text-right text-[#3a70e2]"
                        onClick={addTrainingSection}
                        type="button"
                      >
                        + Add Another
                      </button>
                      {index > 0 && <span className="text-[#3a70e2] cursor-pointer">Remove</span>}
                      <p>{watch(`${fieldName}.doc`)?.name}</p>
                    </div> */}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end self-end items-centern gap-[16px] mt-4">
              <AddButton type="submit">{"Save"}</AddButton>
              <CancelButton onClick={closeModal} type="button">
                {"Cancel"}
              </CancelButton>
            </div>
          </div>
        </form>
      </ModalDetailsContainer>

      <ToastContainer />
    </>
  );
};

export default EditDocument;
