import React, { useState } from "react";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { Checkbox } from "@/components/ui/checkbox";
import DocumentUpload from "@/components/common/DocumentUpload";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import RecordTable from "./components/RecordTable";
import CertificationTable from "./components/CertificationTable";
import TrainingTable from "./components/TrainingTable";

interface EducatorDocumentProps {
  control: any; // or use proper type for control based on your setup
  register: any;
  watch?: any;
  setValue?: any;
  documentSections: any;
  setDocumentSections: any;
  certificationsection: any;
  setCertificationSection: any;
  trainingsection: any;
  setTrainingSection: any;
  staffId: string | number;
}

const DocumentSection: React.FC<EducatorDocumentProps> = ({
  control,
  register,
  watch,
  setValue,
  documentSections,
  setDocumentSections,
  certificationsection,
  setCertificationSection,
  trainingsection,
  setTrainingSection,
  staffId,
}) => {
  // const [documentSections, setDocumentSections] = useState<number[]>([0]);
  // const [certificationsection, setCertificationSection] = useState<number[]>([
  //   1,
  // ]);
  // const [trainingsection, setTrainingSection] = useState<number[]>([1]);

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
    // console.log('documentSections---->', statename)
    // console.log('index', index)
    // console.log('statename', setStateName)
    let filtercontact = watch(fieldName).filter((item: any, id: number) => {
      return id !== index;
    });

    setValue(fieldName, filtercontact);
    let removeItems = [...statename];
    removeItems.splice(index, 1);
    setStateName(removeItems);
  };
  console.log("documentSections", documentSections);
  return (
    <>
      {/* <h1 className="text-center mb-2  mt-2 text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
        Educator’s Documents
      </h1>
      <hr /> */}
      <div className="flex justify-center items-center">
        <div className="flex justify-around items-center border-b-2 px-10 py-1 border-[#00858E]">
          <Image
            src={"/svgs/educator-document-detail.svg"}
            alt="Logo"
            width={30}
            height={30}
            className="w-[2.24538rem] h-[2.25rem] object-contain"
          />
          <h1 className="text-center text-[1.875rem] p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
            Educator’s Documents
          </h1>
        </div>
      </div>
      <section className="">
        <div className="flex-col p-5 w-full max-w-[826px] mx-auto items-center justify-center gap-6">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <div className="w-full flex flex-col items-left">
              <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mb-2">
                Records:
              </div>
              <RecordTable staffId={staffId} />
              {/* {documentSections?.map((item: any, index: number) => {
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

                    <div className=" flex justify-between ">
                      <div className=" flex flex-col w-full ">
                        {documentSections.length === index + 1 && (
                          <button
                            className="text-left my-2 text-[#00858E]"
                            type="button"
                            onClick={addDocumentSection}
                          >
                            + Add Another Records
                          </button>
                        )}
                      </div>
                      <p className="mr-4 my-2">
                        {watch(`${fieldName}.doc`)?.name}
                      </p>

                      <div className="flex flex-col">
                        {" "}
                        {documentSections.length !== 1 && (
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
                        )}
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
                    </div> 
                  </div>
                );
              })} */}
            </div>

            <Separator />
            <div className="w-full flex flex-col items-left">
              <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mb-2">
                Certification:
              </div>

              {/* {certificationsection?.map((item: any, index: number) => {
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
                          { value: "AED_Instructor", label: "AED Instructor" },
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
                      </div> 
                    </div>
                    <div className="flex  justify-between">
                      <div className=" flex flex-col w-[50%] ">
                        {certificationsection.length === index + 1 && (
                          <button
                            className="text-left my-2 text-[#00858E]"
                            type="button"
                            onClick={addCertification}
                          >
                            + Add Another Certification
                          </button>
                        )}
                      </div>
                      <p className="mr-4 my-2">
                        {watch(`${fieldName}.doc`)?.name}
                      </p>

                      <div className=" flex flex-col">
                        {" "}
                        {certificationsection.length !== 1 && (
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
                        )}
                      </div>
                    </div>
                  </div>
                );
              })} */}

              <CertificationTable staffId={staffId} />
            </div>
            <Separator />
            <div className="w-full flex flex-col items-left">
              <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mb-2">
                Training:
              </div>
              {/* {trainingsection?.map((item: any, index: number) => {
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

                    <div className="flex  justify-between">
                      <div className=" flex flex-col w-[50%] ">
                        {trainingsection.length === index + 1 && (
                          <button
                            className="text-left my-2 text-[#00858E]"
                            type="button"
                            onClick={addTrainingSection}
                          >
                            + Add Another Training
                          </button>
                        )}
                      </div>
                      <p className="mr-4 my-2">
                        {watch(`${fieldName}.doc`)?.name}
                      </p>

                      <div className=" flex flex-col">
                        {trainingsection.length !== 1 && (
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
                        )}
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
                    </div> 
                  </div>
                );
              })} */}
              <TrainingTable staffId={staffId} />
            </div>
          </div>
        </div>
      </section>
      {/* <Button>Next</Button> */}
    </>
  );
};

export default DocumentSection;
