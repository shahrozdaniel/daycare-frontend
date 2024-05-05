"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import ChildDetails from "../ChildDetails";
import ParentDetails from "../ParentDetails";
import Button from "@/components/common/Button";
import ImmunisationDetails from "../ImmunisationDetails";
import MedicalInformation from "../MedicalInformation";
import EmergencyContactDetails from "../EmergencyContactDetails";
import EmergencyDoctorDetails from "../EmergencyDoctorDetails";
import PickupAuthorisation from "../PickupAuthorisation";
import DietaryInformation from "../DietaryInformation";
import SleepArrangements from "../SleepArrangements";
import OtherDetails from "../OtherDetails";
import PhysicalRequirement from "../PhysicalRequirement";
import PaymentDetails from "../PaymentDetails";
import {
  getEnrollmentById,
  multiStepChildEnrollment,
} from "../childEnrolmentAPI";
import { classroomlist } from "@/app/classroomManagement/classroomManagentAPI";
import { get_Country_State_city } from "@/services/UtilityApis";
import { yupResolver } from "@hookform/resolvers/yup";
import { enrollValidationSchema } from "../components/validationSchema";
import {
  getChildDetailBody,
  getDietaryInformationBody,
  getEmergencyContact,
  getEmergencyDoctor,
  getImmunisationBody,
  getMedicalBody,
  getOtherDetailsBody,
  getParentDetailBody,
  getPhysicalRequirementBody,
  getSleepArrangementBody,
} from "../components/formBody";
import {
  getApiBody,
  getCurrentStage,
  getStageName,
} from "@/components/common/Utils";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useGlobalContext } from "@/app/context/store";

interface FormData {
  image: File;
}
interface Root {
  registration_id: number;
  child_id: number;
  parent_id: number;
  daycare_id: number;
  childcare_type: string;
  classroom_type: string;
  enrollment_type: string;
  start_date: string;
  referral_code: any;
  created_by: number;
  status: number;
  created_at: string;
  updated_at: string;
  child: Child;
  daycare: Daycare;
  enrollment: any;
}

interface Child {
  id: number;
  first_name: string;
  last_name: string;
  preferred_name: string;
  dob: string;
  photo: any;
  language: string;
  gender: string;
  age: string;
  parent_id: number;
  is_active: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  parents: Parent[];
  vaccinations: any;
  medical_information: any;
  emergency_doctors: any;
  other_details: any;
}

interface Parent {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  preferred_name: string;
  phone_no: string;
  alternate_phone_no: any;
  gender: string;
  email: string;
  address_id: number;
  relation: string;
  occupation: string;
  is_custodian: boolean;
  language: any;
  is_primary: any;
  is_emergency_contact: any;
  is_pickup_authorized: any;
  is_active: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  address: Address;
}

interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  longitude: any;
  lattitude: any;
  created_at: string;
  updated_at: string;
}

interface Daycare {
  daycare_id: number;
  center_name: string;
  slug: string;
  parent_daycare_id: any;
  email: any;
  phone_no: any;
  working_days: any;
  working_time: any;
  address_id: any;
  program_id: any;
  logo: any;
  daycare_type: any;
  timezone_id: any;
  date_format: any;
  health_screening_id: any;
  status: number;
  created_at: string;
  updated_at: string;
}
const Page: React.FC = () => {
  let router = useRouter();
  const { globalSettings } = useGlobalContext();
  const [allergyfileerror, setAllergyFileError] = useState(false);
  const [activeStep, setActiveStep] = useState<any>(0);
  const [enrollData, setEnrollData] = useState<Root>();
  const [classroomData, setClassroomData] = useState<
    { value: string; label: string }[]
  >([]);
  const currentValidationSchema: any = enrollValidationSchema[activeStep];
  const ref = useRef<HTMLDivElement>(null);
  const [classroomTypeName, setClassroomTypeNmae] = useState<string>("");
  const methods = useForm<any>({
    shouldUnregister: false,
    resolver: yupResolver(currentValidationSchema),
    // mode: "onChange",
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

  const [countrylist, setCountrylist] = useState<any>([
    { value: "", label: "Select Country" },
  ]);
  const [Statelist, setStatelist] = useState<any>([
    { value: "", label: "Select Province" },
  ]);
  const [citylist, setCitylist] = useState<any>([
    { value: "", label: "Select City" },
  ]);

  const [Statelist2, setStatelist2] = useState<any>([
    { value: "", label: "Select Province" },
  ]);
  const [citylist2, setCitylist2] = useState<any>([
    { value: "", label: "Select City" },
  ]);

  // for emergency doctor
  const [emergencycountrylist, setEmergencyCountrylist] = useState<any>([
    { value: "", label: "Select Country" },
  ]);
  const [emergencyStatelist, setEmergencyStatelist] = useState<any>([
    { value: "", label: "Select Province" },
  ]);
  const [emergencycitylist, setEmergencyCitylist] = useState<any>([
    { value: "", label: "Select City" },
  ]);

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [childId, setChildId] = useState<any>();
  const [isCustodian, setIsCustodian] = useState<string>("");
  const [isChildAnaphylactic, setIsChildAnaphylactic] = useState<string>("");
  const [detailssection, setDetailsSection] = useState<number[]>([1]);

  const addDetailsSection = () => {
    setDetailsSection((prevSections) => [
      ...prevSections,
      prevSections.length + 1,
    ]);
  };

  const handleClear = () => {
    reset();
    setCountrylist([{ value: "", label: "Select Country" }]);

    setCitylist([{ value: "", label: "Select City" }]);

    setStatelist2([{ value: "", label: "Select Province" }]);
    setStatelist([{ value: "", label: "Select Province" }]);
    setCitylist([{ value: "", label: "Select City" }]);
    setCitylist2([{ value: "", label: "Select City" }]);
    setEmergencyCountrylist([{ value: "", label: "Select Country" }]);
    setEmergencyCitylist([{ value: "", label: "Select City" }]);
    setEmergencyStatelist([{ value: "", label: "Select Province" }]);
    setSelectedDays([]);
    setIsCustodian("");
  };

  // add nap time
  const [addnaptime, setAddNapTime] = useState<number[]>([1]);
  const [custudian, setisCustdion] = useState<any>(null);
  const [showallergyfile, setShowAllergyFile] = useState(false);

  const handleAddNapTime = () => {
    setAddNapTime((prevSections) => [...prevSections, prevSections.length + 1]);
  };

  const handleRemoveTime = (index: number, fieldName: string) => {
    let filtercontact = watch(fieldName).filter((item: any, id: number) => {
      return id != index;
    });

    setValue(fieldName, filtercontact);

    let removeItems = [...addnaptime];
    removeItems.splice(index, 1);
    setAddNapTime(removeItems);
  }; 
  const handleRemove = (index: number, fieldName: string) => {
    
    let filtercontact = watch(fieldName).filter((item: any, id: number) => {
      return id != index;
    });
    
    setValue(fieldName, filtercontact);

    // let removeItems = [...detailssection];
    // removeItems.splice(index, 1);
    // setDetailsSection(removeItems);
    const updatedDetails = [...detailssection];
    updatedDetails.splice(index, 1);

    // Set the state with the updated array
    setDetailsSection(updatedDetails);
  };

  // const currentValidationSchema: any = enrollValidationSchema[activeStep];

  const handleStepClick = async (index: number) => {
    if (ref.current) {
      ref.current.scrollTop = 0; // Set scroll position to top
    }
    const isStepValid = await trigger();
    const allFormData = getValues();
    let allergyfilehere = false;
    let skipemergencycontact = false;
    let res, body;
    if (isStepValid) {
      const { startDate, endDate } = allFormData;
      if (startDate && endDate) {
        const date1 = new Date(startDate);
        const date2 = new Date(endDate);
        if (date2 < date1) {
          toast.error(" End date cannot be less than start date");
          return;
        }
      }
      if (activeStep == 0) {
        body = getApiBody(
          getChildDetailBody(allFormData, selectedDays),
          activeStep
        );
        //add extra to FormData
        body.append("photo", allFormData.image);

        // setting active status for enrollment
        body.append("status", "0");
      } else if (activeStep == 1) {
        body = getApiBody(
          getParentDetailBody(allFormData, custudian),
          activeStep
        );
      } else if (activeStep == 2) {
        // body = getApiBody(getImmunisationBody(allFormData), activeStep);
        // //add extra to FormData
        // body.append("immunzation_file", allFormData.vaccinationDoc);
        setActiveStep(index + 1);
        next();
        return;
      } else if (activeStep == 3) {
        if (isChildAnaphylactic) {
          if (allFormData.allergy_file) {
            allergyfilehere = false;

            body = getApiBody(
              getMedicalBody(allFormData, isChildAnaphylactic),
              activeStep
            );
            body.append("allergy_file", allFormData.allergy_file);
          } else {
            allergyfilehere = true;
            toast.error("Allergy file is required");
            body = getApiBody(
              getMedicalBody(allFormData, isChildAnaphylactic),
              activeStep
            );
          }
        } else {
          allergyfilehere = false;

          body = getApiBody(
            getMedicalBody(allFormData, isChildAnaphylactic),
            activeStep
          );
        }
        // body.append("allergy_file", allFormData.allergy_file);
      } else if (activeStep == 4) {
        const hasNonEmptyValue = allFormData?.emergencyContactDetails.some(
          (detail: any) =>
            Object.keys(detail).filter(
              (key) =>
                key !== "isPickupAuthorized" &&
                detail[key as keyof typeof detail] !== ""
            ).length > 0
        );

        if (hasNonEmptyValue) {
          skipemergencycontact = false;
          body = getApiBody(getEmergencyContact(allFormData), activeStep);
        } else {
          skipemergencycontact = true;
          setActiveStep(index + 1);
          next();
        }
      } else if (activeStep == 5) {
        body = getApiBody(getEmergencyDoctor(allFormData), activeStep);
      } else if (activeStep == 6) {
        body = getApiBody(getDietaryInformationBody(allFormData), activeStep);
      } else if (activeStep == 7) {
        body = getApiBody(getSleepArrangementBody(allFormData), activeStep);
      } else if (activeStep == 8) {
        body = getApiBody(getOtherDetailsBody(allFormData), activeStep);
      } else if (activeStep == 9) {
        body = getApiBody(getPhysicalRequirementBody(allFormData), activeStep);
      }

      if (allergyfilehere === false && skipemergencycontact === false) {
        try {
          res = await multiStepChildEnrollment(body, childId);
          if (res?.success) {
            if (isLastStep) {
              setTimeout(() => {
                toast.success("Child enrollment form completed successfully");
              }, 1000);
              router.push("/childManagement?enrolled=true");
            } else {
              setActiveStep(index + 1);
              next();
            }
          }
        } catch (error: any) {
          toast?.error(error?.response?.data?.error);
        }
      }
    }
  };

  const fetchEnrollmentById = async (id: any) => {
    const res = await getEnrollmentById(id);
    setEnrollData(res?.details?.registrationDetails);
    setClassroomTypeNmae(res?.details?.registrationDetails?.classroom_type);
  };
  useEffect(() => {
    const slug = window?.location?.pathname;
    if (slug.split("/")[2]) {
      setChildId(slug.split("/")[2]);
      fetchEnrollmentById(slug.split("/")[2]);
    }
  }, [activeStep]);
  const handleStepBack = (index: number) => {
    setActiveStep(index - 1);
    back();
  };
  const handleSkip = (index: number) => {
    setActiveStep(index + 1);
    next();
  };
  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    back,
    next,
    isLastStep,
    goTo,
  } = useMultistepForm([
    <ChildDetails
      control={control}
      register={register}
      key={1}
      data={enrollData}
      setValue={setValue}
      classroomData={classroomData}
      errors={errors}
      setSelectedDays={setSelectedDays}
      selectedDays={selectedDays}
      watch={watch}
    />,
    <ParentDetails
      control={control}
      register={register}
      setValue={setValue}
      countrylists={[countrylist, setCountrylist]}
      statelists={[Statelist, setStatelist]}
      citylists={[citylist, setCitylist]}
      statelist2s={[Statelist2, setStatelist2]}
      citylist2s={[citylist2, setCitylist2]}
      setIsCustodian={setIsCustodian}
      isCustodian={isCustodian}
      key={2}
      data={enrollData?.child?.parents}
      watch={watch}
      errors={errors}
      setisCustdion={setisCustdion}
      custudian={custudian}
    />,
    <ImmunisationDetails
      control={control}
      data={enrollData?.child?.vaccinations || []}
      key={3}
      register={register}
      setValue={setValue}
      fetchData={fetchEnrollmentById}
      childId={childId}
      errors={errors}
    />,
    <MedicalInformation
      control={control}
      register={register}
      setValue={setValue}
      key={4}
      setIsChildAnaphylactic={setIsChildAnaphylactic}
      isChildAnaphylactic={isChildAnaphylactic}
      data={
        enrollData?.child?.medical_information
          ? enrollData?.child?.medical_information[0]
          : null
      }
      showallergyfile={showallergyfile}
      setShowAllergyFile={setShowAllergyFile}
    />,
    <EmergencyContactDetails
      control={control}
      key={5}
      register={register}
      setValue={setValue}
      data={enrollData?.child.parents}
      detailsSection={detailssection}
      setDetailsSection={setDetailsSection}
      addDetailsSection={addDetailsSection}
      handleRemove={handleRemove}
      watch={watch}
      errors={errors}
    />,
    <EmergencyDoctorDetails
      control={control}
      key={6}
      register={register}
      setValue={setValue}
      countrylists={[emergencycountrylist, setEmergencyCountrylist]}
      statelists={[emergencyStatelist, setEmergencyStatelist]}
      citylists={[emergencycitylist, setEmergencyCitylist]}
      watch={watch}
      data={
        enrollData?.child?.emergency_doctors
          ? enrollData?.child?.emergency_doctors[0]
          : null
      }
      errors={errors}
    />,
    // <PickupAuthorisation control={control} key={6} />,
    <DietaryInformation
      control={control}
      key={7}
      activeStep={activeStep}
      register={register}
      setValue={setValue}
      handleSkip={handleSkip}
      data={
        enrollData?.child?.other_details
          ? enrollData?.child?.other_details[0]?.need_dietary_arrangement
            ? enrollData?.child?.other_details
            : null
          : null
      }
    />,

    <SleepArrangements
      control={control}
      key={8}
      activeStep={activeStep}
      handleAddNapTime={handleAddNapTime}
      data={
        enrollData?.child?.other_details
          ? enrollData?.child?.other_details[0]?.need_sleep_arrangement
            ? enrollData?.child?.other_details
            : null
          : null
      }
      addnaptime={addnaptime}
      setAddNapTime={setAddNapTime}
      register={register}
      setValue={setValue}
      handleSkip={handleSkip}
      handleRemoveTime={handleRemoveTime}
      error={errors}
    />,
    // <OtherDetails
    //   control={control}
    //   key={9}
    //   data={
    //     enrollData?.child?.other_details
    //       ? enrollData?.child?.other_details[0]?.need_diaper_arrangement
    //         ? enrollData?.child?.other_details
    //         : null
    //       : null
    //   }
    //   register={register}
    //   setValue={setValue}
    // />,
    <PhysicalRequirement
      control={control}
      key={10}
      data={
        enrollData?.child?.other_details
          ? enrollData?.child?.other_details[0]?.need_physical_arrangement
            ? enrollData?.child?.other_details
            : null
          : null
      }
      register={register}
      setValue={setValue}
    />,
    // <PaymentDetails control={control} key={11} />,
  ]);
  const onSubmit: SubmitHandler<FormData> = (data) => {};

  const stepsui: any = [
    {
      title: "Child Details",
      icon1: "/svgs/child.svg",
      icon2: "/svgs/child.svg",
    },
    {
      title: "Parent Details",
      icon1: "/svgs/parent.svg",
      icon2: "/svgs/parent-fill.svg",
    },
    {
      title: "Immunization Details",
      icon1: "/svgs/immune.svg",
      icon2: "/svgs/immune-fill.svg",
    },
    {
      title: "Medical Information",
      icon1: "/svgs/medical.svg",
      icon2: "/svgs/medical-fill.svg",
    },
    {
      title: "Emergency Contact Details",
      icon1: "/svgs/contact.svg",
      icon2: "/svgs/contact-fill.svg",
    },
    {
      title: "Emergency Doctor Details",
      icon1: "/svgs/doctor.svg",
      icon2: "/svgs/doctor-fill.svg",
    },
    {
      title: "Dietary Information",
      icon1: "/svgs/dietary.svg",
      icon2: "/svgs/dietary-fill.svg",
    },
    {
      title: "Sleep Arrangements",
      icon1: "/svgs/sleep.svg",
      icon2: "/svgs/sleep-fill.svg",
    },
    {
      title: "Physical Requirments",
      icon1: "/svgs/other.svg",
      icon2: "/svgs/other-fill.svg",
    },
  ];

  const getclassroomlist = async () => {
    let res;
    try {
      res = await classroomlist();
      if (res?.success) {
        let filterData = res?.data?.list?.filter((classroom: any) => {
          return (
            classroom?.categoryId == classroomTypeName &&
            parseInt(classroom.noOfChildEnrolled) <
              parseInt(classroom.maxChildrens) &&
            classroom?.status == 1
          );
        });
        const newArray = filterData.map((item: any, index: number) => ({
          label: item.classroomName,
          value: item.classroomId,
        }));
        const newArrayWithSelect = [
          { value: "", label: "Select classroom" },
          ...newArray,
        ];

        setClassroomData(newArrayWithSelect);
        // setclassroomData(res?.data?.list);
        // setPgination(res?.['data']?.['pagination'])
      }
      // console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    getclassroomlist();
  }, [classroomTypeName]);
  return (
    <div
      style={{ backgroundColor: globalSettings?.backgroundColour || "#2E3F3F" }}
    >
      <section
        style={{
          backgroundColor: globalSettings?.backgroundColour || "#2E3F3F",
        }}
        className="grid md:grid-cols-7 lg:grid-cols-5 xl:grid-cols-9 gap-6 px-10 py-6  fixed h-full w-full max-h-[95%] "
      >
        <div className="hide-scroll lg:col-span-2 md:col-span-3 xl:col-span-2 h-[95%] px-4 py-4 bg-white rounded-3xl border-2 border-white overflow-auto font-['DM Sans'] ">
          <ul className=" w-full flex flex-col items-start lg:justify-around md:justify-center gap-4">
            <div className="flex flex-col w-full ">
              <p className="text-center font-medium text-xl text-[#4B4B4B]">
                Enrollment status
              </p>
              <p className="text-center text-[#0C9D61] text-m">
                {activeStep + 1}/9 Completed
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
                    className={`flex w-full px-3 py-3 relative items-center border rounded-lg  before:absolute ${
                      stepsui.length === index + 1
                        ? "before:w-[0px]"
                        : "before:w-[0.2rem] "
                    }  before:z-10 before:h-[80%] ${
                      index === activeStep ||
                      activeStep === stepsui.length - 1 ||
                      isBeforeCurrentStep
                        ? "before:bg-[#0C9D61] bg-[#DBEEE2] border-[#0C9D61]"
                        : "before:bg-neutral-200 border-zinc-200"
                    } before:mt-[75px] before:ml-[14px] `}
                  >
                    <div
                      className={`w-8 h-8 border rounded-full  ${
                        index === activeStep ||
                        activeStep === stepsui.length - 1 ||
                        isBeforeCurrentStep
                          ? "bg-[#0C9D61]"
                          : "bg-[#E1E1E1"
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
                        index === activeStep ||
                        activeStep === stepsui.length - 1 ||
                        isBeforeCurrentStep
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
          ref={ref as any}
          className="hide-scroll flex flex-col lg:col-span-3 md:col-span-4 xl:col-span-7 h-full max-h-[95%] overflow-auto bg-white  rounded-3xl border-2
        // [box-shadow:rgba(50,50,_93,_0.25)_0px_6px_12px-2px,rgba(0,_0,_0,_0.3)_0px_3px_7px-3px]
         overflow-x-hidden
      "
        >
          <div>{/* {currentStepIndex + 1}/{steps.length}{" "} */}</div>
          {step}
          <div className="flex gap-4 justify-end self-end pr-[16%] items-center  w-fit mt-8 mb-3">
            <Button
              type="button"
              form="white"
              className=""
              onClick={() => router.push("/childManagement")}
            >
              Cancel
            </Button>
            {activeStep !== 2 && (
              <Button
                type="button"
                form="white"
                className=""
                onClick={() => handleClear()}
              >
                Clear
              </Button>
            )}
            {/* <Button type="button" form="white" className="">
            Save
          </Button> */}
            {isFirstStep && (
              <Button type="button" onClick={() => handleStepBack(activeStep)}>
                Back
              </Button>
            )}
            {[3, 4, 6, 7].includes(activeStep) && (
              <Button
                type="button"
                form="blue"
                className=""
                onClick={() => handleSkip(activeStep)}
              >
                Skip
              </Button>
            )}
            <Button
              type="button"
              form="blue"
              className=""
              onClick={() => handleStepClick(activeStep)}
            >
              {isLastStep ? "Submit" : "Submit & Continue"}
            </Button>
            {/* Render additional form fields or steps here */}
            {/* Example: <input {...register('fieldName')} /> */}
            {/* {isLastStep && (
            <Button type="submit" form="blue" className="">
              Submit
            </Button>
          )} */}
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
