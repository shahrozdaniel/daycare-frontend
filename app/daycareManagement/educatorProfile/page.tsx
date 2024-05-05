"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import Button from "@/components/common/Button";
import EducatorDetails from "../EducatorDetail";
import EducatorAvailability from "../EducatorAvailability";
import EducatorDocument from "../EducatorDocuments";
import EducatorEmergency from "../EducatorEmergency";
import EducatorOtherDetails from "../EducatorOtherDetails";
import { createStaff } from "../components/Api";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuthToken,
  someAsyncFunctionWithDelay,
} from "@/components/common/Utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEducatorValidationSchema } from "../educatorManagement/validationSchema";

import {
  Date_formator_YYYY_MM_DD,
  handleUnauthorizedError,
} from "@/utils/utilityFunctions";
import Image from "next/image";
import DocumentSection from "../DocumentSection";
import {
  EdituserMangementPersonalDetails,
  createEducatorAvailbility,
  createEmergencyContactUser,
  createOtherDetailsUser,
  createPersonalDetails,
} from "@/services/User-management-API";

interface FormData {
  image: File;
}

const Page: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [detailssection, setDetailsSection] = useState<number[]>([1]);
  const [documentSections, setDocumentSections] = useState<number[]>([0]);
  const [certificationsection, setCertificationSection] = useState<number[]>([
    1,
  ]);
  const [trainingsection, setTrainingSection] = useState<number[]>([1]);
  const currentValidationSchema: any = addEducatorValidationSchema[activeStep];
  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid, isValidating },
  } = methods;
  const [skipped, setSkipped] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [userId, setUserId] = useState("");
  const [classroomData, setClassroomData] = useState<
    { value: string; label: string }[]
  >([]);
  const [countrylist, setCountrylist] = useState<any>([]);
  const [Statelist, setStatelist] = useState<any>([
    { value: "", label: "Select state" },
  ]);
  const [citylist, setCitylist] = useState<any>([
    { value: "", label: "Select City" },
  ]);
  const [availability, setAvailability] = useState<any>({
    Monday: ["10:00 AM", "2:00 PM"],
    Tuesday: ["10:00 AM", "2:00 PM"],
    Wednesday: ["10:00 AM", "2:00 PM"],
    Thursday: ["10:00 AM", "2:00 PM"],
    Friday: ["10:00 AM", "2:00 PM"],
  });
  const [error, setError] = useState<any>({});
  const [availabilityval, setAvailabilityValue] = useState<any>([]);

  let router = useRouter();

  const handleStepClick = async (index: number) => {
    const isStepValid = await trigger();
    let formData = new FormData();
    const allFormData = getValues();

    if (isStepValid) {
      // personal details
      if (activeStep == 0) {
        formData.append("firstName", allFormData.firstName);
        formData.append("lastName", allFormData.lastName);
        formData.append("email", allFormData.email);
        formData.append("phoneNumber", allFormData.number);
        formData.append("dob", Date_formator_YYYY_MM_DD(allFormData?.dob));
        formData.append("gender", allFormData.gender);
        formData.append("address_line_1", allFormData.addressLine1);
        formData.append("address_line_2", allFormData.addressLine2);
        formData.append("city", allFormData.city);
        formData.append("state", allFormData.state);
        formData.append("country", allFormData.country);
        formData.append("pincode", allFormData.pincode);
        formData.append("classroom", allFormData.classroom);
        formData.append("photo", allFormData.image);
        formData.append("employmentType", "1");
        if (userId) {
          console.log("user id here ", userId);
          try {
            let res = await EdituserMangementPersonalDetails(userId, formData);
            if (res?.success) {
              setActiveStep(index + 1);
              next();
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
        } else {
          try {
            let response = await createPersonalDetails(formData);
            if (response?.success) {
              console.log("success resonse", response);
              setStaffId(response.data.staffId);
              setUserId(response.data.userId);
              setActiveStep(index + 1);
              next();
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
        }
      }

      // educator availability
      if (activeStep === 1) {
        setError({}); // Reset errors at the beginning
        let updatedError: any = {};

        // Validate AM and PM in availabilityval
        if (watch("employementtype") === "2") {
          Object.keys(availabilityval).forEach((key) => {
            const value = availabilityval[key];

            if (updatedError[key]) {
              console.log("code comes here in if ", updatedError[key]);
              if (value.some((time: string) => time.includes("AM"))) {
                updatedError[key].push(1);
              }
              if (value.some((time: string) => time.includes("PM"))) {
                updatedError[key].push(2);
              }
            } else {
              updatedError[key] = [];
              console.log("value[1]", value[1] === "");
              if (!value[0]) {
                updatedError[key].push("start-error");
              }
              if (!value[1]) {
                updatedError[key]?.push("end-error");
              }
              if (value.length === 2 && value[0] !== "" && value[1] !== "") {
                delete updatedError[key];
              }
            }
          });
        }
        setError(updatedError);

        // formData.append("employmentType", allFormData.employementtype);
        // formData.append(
        //   "startDate",
        //   Date_formator_YYYY_MM_DD(allFormData.employmentStartDate)
        // );

        // formData.append(
        //   "availability",
        //   JSON.stringify(availabilityval) || JSON.stringify(availability)
        // );
        let availbilitybody = {
          startDate: Date_formator_YYYY_MM_DD(allFormData.employmentStartDate),
          availability:
            availabilityval.length !== 0 ? availabilityval : availability,
          employmentType: allFormData.employementtype,
        };
        if (Object.keys(updatedError).length === 0) {
          try {
            let response = await createEducatorAvailbility(
              availbilitybody,
              staffId
            );
            if (response?.success) {
              // console.log('success resonse',response)

              setActiveStep(index + 1);
              next();
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
        }
      }

      // educator documents
      if (activeStep === 2) {
        setActiveStep(index + 1);
        next();
      }

      // educator emergency contact
      if (activeStep === 3) {
        let contactbody = {
          emergencyContactDetails: {
            contacts: allFormData.emergencyDetail,
          },
        };

        try {
          let response = await createEmergencyContactUser(contactbody, staffId);
          console.log("emergency contact", response);
          if (response.success) {
            console.log("success resonse", response);
            // setStaffId(response.data.staffId);
            setActiveStep(index + 1);
            next();
          }
        } catch (error: any) {
          if (error.response && error.response.status === 401) {
            handleUnauthorizedError(router);
          }
          if (error.response?.data?.error) {
            toast.error(error.response?.data?.error);
          } else {
            toast.error(error.response?.data?.message);
          }
        }
        console.log("data here emer", contactbody);
      }

      //  other details
      if (activeStep === 4) {
        console.log("data here others", allFormData);
        let body = { educatorOtherDetails: allFormData.additionalDetails };
        try {
          let response = await createOtherDetailsUser(body, staffId);
          console.log("emergency createOtherDetailsUser", response);

          if (response?.success) {
            console.log("success resonse", response);
            toast.success("user created");
            router.push("/daycareManagement/educatorManagement");
            setActiveStep(index + 1);
            next();
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
      }
    }
  };
  console.log("availabilityval here", availabilityval);
  const handleStepBack = (index: number) => {
    setActiveStep(index - 1);
    setSkipped(false);
    back();
  };

  const handleSkip = (index: number) => {
    setActiveStep(index + 1);
    next();
  };

  const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } =
    useMultistepForm([
      <EducatorDetails
        control={control}
        key={1}
        register={register}
        setClassroomData={setClassroomData}
        classroomData={classroomData}
        setCitylist={setCitylist}
        citylist={citylist}
        statelist={Statelist}
        setStatelist={setStatelist}
        setCountrylist={setCountrylist}
        countrylist={countrylist}
        watch={watch}
        errors={errors}
        setValue={setValue}
      />,

      <EducatorAvailability
        control={control}
        key={2}
        register={register}
        value={availabilityval}
        setValue={setAvailabilityValue}
        watch={watch}
        errors={errors}
        error={error}
        setError={setError}
      />,

      <DocumentSection
        control={control}
        key={3}
        register={register}
        staffId={staffId}
        watch={watch}
        setValue={setValue}
        documentSections={documentSections}
        setDocumentSections={setDocumentSections}
        certificationsection={certificationsection}
        setCertificationSection={setCertificationSection}
        trainingsection={trainingsection}
        setTrainingSection={setTrainingSection}
      />,
      // <EducatorDocument
      //   control={control}
      //   key={3}
      //   register={register}
      //   watch={watch}
      //   setValue={setValue}
      //   documentSections={documentSections}
      //   setDocumentSections={setDocumentSections}
      //   certificationsection={certificationsection}
      //   setCertificationSection={setCertificationSection}
      //   trainingsection={trainingsection}
      //   setTrainingSection={setTrainingSection}
      // />,
      <EducatorEmergency
        control={control}
        key={4}
        register={register}
        watch={watch}
        errors={errors}
        detailssection={detailssection}
        setDetailsSection={setDetailsSection}
        setValue={setValue}
      />,
      <EducatorOtherDetails
        control={control}
        key={5}
        register={register}
        handleStepBack={handleSkip}
      />,
    ]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    // debugger;
    // Output: "2023-12-07"

    let currentStage = "final submit";
    let formData = new FormData();

    //record details
    let recordDescription = data.records.map((item: any) => item.description);
    let recordFiles = data.records.map((item: any) => item.doc);

    //certif dtails
    let certificationTypearr = data.certification.map(
      (item: any) => item.certificationType
    );
    let certifdate = data.certification.map(
      (item: any) => item.certificationDate
    );
    let certificationdes = data.certification.map(
      (item: any) => item.description
    );
    let certiffiles = data.certification.map((item: any) => item.doc);

    //training dtails
    let trainingdes = data.training.map((item: any) => item.description);
    let trainingfiles = data.training.map((item: any) => item.doc);

    //emergency details
    let emergyfirstname = data.emergencyDetail.map(
      (item: any) => item.firstName
    );
    let emergylastname = data.emergencyDetail.map((item: any) => item.lastName);
    let emergyprefferedname = data.emergencyDetail.map(
      (item: any) => item.prefferedName
    );
    let emergyrelation = data.emergencyDetail.map((item: any) => item.relation);
    let emerycontactnum = data.emergencyDetail.map(
      (item: any) => item.contactNumber
    );
    let emergygender = data.emergencyDetail.map((item: any) => item.gender);

    let body = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.number,
      dob: data.dob === "" ? null : Date_formator_YYYY_MM_DD(data?.dob),
      gender: data.gender,
      street: data.addressLine1 + data.addressLine2,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
      classroom: data.classroom,
      stage: currentStage,
      isDraft: 1,
      employmentType: data.employementtype,
      startDate: Date_formator_YYYY_MM_DD(data?.employmentStartDate),
      // availability: JSON.stringify(availabilityval) || JSON.stringify(availability),
      reportDescription: recordDescription,
      reportFiles: recordFiles || null,
      certificationType: certificationTypearr,
      date: certifdate,
      certification_des: certificationdes,
      certificationFiles: certiffiles || null,
      tranning: trainingdes,
      tranningFiles: trainingfiles || null,
      emgyfirstName: emergyfirstname,
      emgyLastName: emergylastname,
      preferredName: emergyprefferedname,
      relation: emergyrelation,
      contactNumber: emerycontactnum,
      emgygender: emergygender,
      additionalDetails: data.additionalDetails,
    };

    formData.append("firstName", body.firstName);
    formData.append("lastName", body.lastName);
    formData.append("email", body.email);
    formData.append("phoneNumber", body.phoneNumber);
    formData.append("dob", Date_formator_YYYY_MM_DD(data?.dob));
    formData.append("gender", body.gender);
    formData.append("address_line_1", body.addressLine1);
    formData.append("address_line_2", body.addressLine2);
    formData.append("city", body.city);
    formData.append("state", body.state);
    formData.append("country", body.country);
    formData.append("pincode", body.pincode);
    formData.append("classroom", body.classroom);
    formData.append("stage", body.stage);
    formData.append("isDraft", JSON.stringify(body.isDraft));
    formData.append("employmentType", body.employmentType);
    formData.append("startDate", Date_formator_YYYY_MM_DD(body.startDate));

    formData.append(
      "availability",
      JSON.stringify(availabilityval) || JSON.stringify(availability)
    );

    formData.append("photo", data.image);

    body.reportFiles.forEach((reportFile: any, index: any) => {
      formData.append(`reportFiles`, reportFile);
    });

    body.reportDescription.forEach((item: any, index: any) => {
      formData.append(`reportDescription[]`, item);
    });

    body.certificationType.forEach((item: any, index: any) => {
      formData.append(`certificationType[]`, item);
    });

    body.date.forEach((item: any, index: any) => {
      formData.append(`date[]`, item);
    });

    body.certification_des.forEach((item: any, index: any) => {
      formData.append(`certification_des[]`, item);
    });

    body.certificationFiles.forEach((item: any, index: any) => {
      formData.append(`certificationFiles`, item);
    });

    body.tranning.forEach((item: any, index: any) => {
      formData.append(`tranning[]`, item);
    });

    body.tranningFiles.forEach((item: any, index: any) => {
      formData.append(`tranningFiles`, item);
    });

    body.emgyfirstName.forEach((item: any, index: any) => {
      formData.append(`emgyfirstName[]`, item);
    });

    body.emgyLastName.forEach((item: any, index: any) => {
      formData.append(`emgyLastName[]`, item);
    });

    body.preferredName.forEach((item: any, index: any) => {
      formData.append(`preferredName[]`, item);
    });

    body.relation.forEach((item: any, index: any) => {
      formData.append(`relation[]`, item);
    });

    body.contactNumber.forEach((item: any, index: any) => {
      formData.append(`contactNumber[]`, item);
    });

    body.emgygender.forEach((item: any, index: any) => {
      formData.append(`emgygender[]`, item);
    });

    formData.append("additionalDetails", body.additionalDetails);

    // api call happening here

    try {
      let response = await createStaff(formData, router);

      if (response?.success) {
        // console.log('success resonse',response)
        toast.success("user Created");
        router.push("/daycareManagement/educatorManagement");
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

  const stepsui: any = [
    {
      title: "Personal Details",
      icon1: "/svgs/personal.svg",
      icon2: "/svgs/personal.svg",
    },
    {
      title: "Availability",
      icon1: "/svgs/availabitlity.svg",
      icon2: "/svgs/availabitlity-fill.svg",
    },
    {
      title: "Documents",
      icon1: "/svgs/documents.svg",
      icon2: "/svgs/personal.svg",
    },
    {
      title: "Emergency Contact Details",
      icon1: "/svgs/emergencycontact.svg",
      icon2: "/svgs/emergencycontact-fill.svg",
    },
    {
      title: "Other Details",
      icon1: "/svgs/other.svg",
      icon2: "/svgs/other-fill.svg",
    },
  ];
  //
  return (
    <div className="bg-[#2E3F3F]">
      <section className="grid md:grid-cols-7 lg:grid-cols-5 xl:grid-cols-5 px-6 py-3 gap-4 h-[98%] lg:p-4 md:p-2 fixed bg-[#2E3F3F]">
        <div
          className="col-span-1 lg:col-span-2 md:col-span-2 xl:col-span-1 h-full px-4 py-2 bg-white rounded-3xl border-2 border-white font-['DM Sans'] 
        // [box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px]
        max-h-[90%] h-full
      "
        >
          {/* <ul className="h-3/6 flex flex-col items-start lg:justify-around gap-5">
          <li className="flex items-center h-fit relative before:absolute before:w-[0.15rem] before:h-full before:bg-grey-text before:mt-12 before:ml-[4px]">
            <div className="h-3 w-3 bg-grey-text rounded-md"></div>
            <span className="ml-2 text-grey-text  w-4/5">Personal Details</span>
          </li>
          <li className="flex items-center h-fit relative before:absolute before:w-[0.15rem] before:h-full before:bg-grey-text before:mt-12 before:ml-[4px]">
            <div className="h-3 w-3 bg-grey-text rounded-md"></div>
            <span className="ml-2 text-grey-text  w-4/5">Availability</span>
          </li>
          <li className="flex items-center h-fit relative before:absolute before:w-[0.15rem] before:h-full before:bg-grey-text before:mt-12 before:ml-[4px]">
            <div className="h-3 w-3 bg-grey-text rounded-md"></div>
            <span className="ml-2 text-grey-text  w-4/5">Documents</span>
          </li>
          <li className="flex items-center h-fit relative before:absolute before:w-[0.15rem] before:h-full before:bg-grey-text before:mt-12 before:ml-[4px]">
            <div className="h-3 w-3 bg-grey-text rounded-md"></div>
            <span className="ml-2 text-grey-text  w-4/5">
              Emergency Contact Details
            </span>
          </li>
          <li className="flex items-center h-fit relative ">
            <div className="h-3 w-3 bg-grey-text rounded-md"></div>
            <span className="ml-5 text-grey-text  w-4/5">Other Details</span>
          </li>
        </ul> */}

          <ul className="h-full w-full flex flex-col items-start  gap-4 font-['DM Sans'] ">
            <div className="flex flex-col w-full ">
              <p className="text-center font-medium text-xl text-[#4B4B4B]">
                Educator status
              </p>
              <p className="text-center text-[#0C9D61] text-m">
                {activeStep + 1}/5 Completed
              </p>
            </div>
            {stepsui.map(
              (
                step: { title: string; icon1: string; icon2: string },
                index: number
              ) => {
                const isBeforeCurrentStep = index < activeStep;
                return (
                  <li
                    key={index}
                    className={`flex h-16 px-4 w-full relative items-center border rounded-lg before:absolute ${
                      stepsui.length - 1 === index
                        ? "before:w-[0px]"
                        : "before:w-[0.2rem]"
                    } before:z-10 before:h-[80%] ${
                      index === activeStep || isBeforeCurrentStep
                        ? "before:bg-[#0C9D61] bg-[#DBEEE2] border-[#0C9D61]"
                        : "before:bg-neutral-200 border-zinc-200"
                    } before:mt-[80px] before:ml-[14px] `}
                  >
                    <div
                      className={`w-8 h-8 border rounded-full  ${
                        index === activeStep ||
                        activeStep === stepsui.length - 1 ||
                        isBeforeCurrentStep
                          ? "bg-[#0C9D61]"
                          : "bg-neutral-200"
                      } flex items-center justify-center`}
                    >
                      <Image
                        src={
                          index === activeStep ||
                          activeStep === stepsui.length - 1 ||
                          isBeforeCurrentStep
                            ? step.icon2
                            : step.icon1
                        }
                        alt={"complete form"}
                        width={15}
                        height={16}
                        className="mx-auto"
                      />
                    </div>

                    <span
                      className={`ml-4 font-medium text-base leading-5  ${
                        index === activeStep
                          ? "text-[#252525]"
                          : "text-[#4B4B4B]"
                      } w-4/5`}
                    >
                      {step.title}
                    </span>
                  </li>
                );
              }
            )}
          </ul>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="hide-scroll flex flex-col lg:col-span-3 md:col-span-5 xl:col-span-4 bg-white h-full rounded-3xl border-2
        // [box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px]
         overflow-x-hidden max-h-[90%] h-full
      "
        >
          <div>{/* {currentStepIndex + 1}/{steps.length}{" "} */}</div>
          {step}
          <div className="flex gap-4 justify-end w-full max-w-[856px] pr-5 mx-auto my-0 mt-2 mb-4">
            {/* <Button type="button" form="white" className="">
            Clear
          </Button> */}
            {/* <Button type="button" form="white" className="">
            Save
          </Button> */}
            <Button
              type="button"
              onClick={() =>
                router.push("/daycareManagement/educatorManagement")
              }
            >
              Cancel
            </Button>
            {isFirstStep && (
              <Button type="button" onClick={() => handleStepBack(activeStep)}>
                Back
              </Button>
            )}
            {[2, 3].includes(activeStep) && (
              <Button
                type="button"
                form="blue"
                className=""
                onClick={() => handleSkip(activeStep)}
              >
                Skip
              </Button>
            )}
            {!skipped && (
              <Button
                type="button"
                // form="blue"
                className=" mr-4"
                onClick={() => handleStepClick(activeStep)}
              >
                {/* {isLastStep ? "Finish" : "Next"} */}
                {isLastStep ? "Submit" : "Next"}
              </Button>
            )}
            {/* Render additional form fields or steps here */}
            {/* Example: <input {...register('fieldName')} /> */}
            {/* {isLastStep ? (
              <Button type="submit" form="blue" className="mr-4">
                Submit
              </Button>
            ) : null} */}
          </div>
        </form>
        <ToastContainer />
        <style>{`
      .hide-scroll::-webkit-scrollbar {
        display: none;
      }`}</style>
      </section>
    </div>
  );
};

export default Page;
