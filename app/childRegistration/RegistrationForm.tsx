"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/common/Button";
import RadioInput from "@/components/common/RadioInput";
import DocumentUpload from "@/components/common/DocumentUpload";
import ImageUpload from "@/components/common/ImageUpload";
import CustomInput from "@/components/common/CustomInput";
import { DatePickerComponent } from "@/components/ui/datePicker";
import CustomSelect from "@/components/common/CustomSelect";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChildRegistrationProfile,
  childEdit,
  childRegistration,
  programTypeAll,
} from "./childregestrationAPI";
import { classroomCatogery } from "../classroomManagement/classroomManagentAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegistrationSchema } from "./childRegistrationValidation";
import { get_Country_State_city } from "@/services/UtilityApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getEnrollmentById } from "../childEnrollment/childEnrolmentAPI";
import { GENDER_TYPE } from "../Dropdowns";
import moment from "moment";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  disableActionIfHoliday,
  formatPhoneNumber,
} from "@/utils/utilityFunctions";
import { useGlobalContext } from "../context/store";
import { ChevronLeft } from "lucide-react";

interface FormData {
  //   child Data
  childFirstName: string;
  childLastName: string;
  childPreferredName: string;
  age: string;
  childLanguage: string;
  ChildGender: string;

  // parent Data
  city: string;
  state: string;
  postalCode: string;
  country: string;
  parentFirstName: string;
  parentLastName: string;
  parentPreferredName: string;
  parentRelationToChild: string;
  parentEmail: string;
  parentContact: string;
  parentOccupation: string;
  parentGender: string;

  // childcareType: string;
  classroomType: string;
  enrollmentType: string;
  days: [];
  // startDate: doj,
}

const RegistrationForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const currentValidationSchema: any = RegistrationSchema[activeStep];

  const {
    control,
    handleSubmit,
    register,
    setError,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(currentValidationSchema) });
  const { globalSettings } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [custudian, setCustudian] = useState<any>(false);
  const [classRoomCatogery, setClassroomCatogery] = useState<any>([]);
  const [prograamName, setPrograamName] = useState<any>([]);

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [dob, setDOb] = useState<string>("");
  const [doj, setDoj] = useState<string>("");
  const [errobj, setErroObj] = useState<boolean>(false);
  const [custudian1, setCustudian1] = useState<any>(false);
  const [countrylist, setCountrylist] = useState<any>([
    { value: "", label: "Country" },
  ]);
  const [Statelist, setStatelist] = useState<any>([
    { value: "", label: "Province" },
  ]);
  const [citylist, setCitylist] = useState<any>([{ value: "", label: "City" }]);
  const [DOJerror, setDOJerror] = useState<any>(false);
  const [totalChildDetails, setTotalChildDetails] = useState<any>({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  let countryCode = watch("country");
  let stateCode = watch("state");
  let CityCode = watch("city");

  const searchParams = useSearchParams();
  let router = useRouter();
  let Child_id = searchParams?.get("child_id");
  let view = searchParams?.get("view");
  const [disbale, setDisable] = useState<boolean>(
    Child_id && view ? true : false
  );
  const getClassRoomList = async () => {
    let res;
    try {
      res = await classroomCatogery();
      if (res?.success) {
        setClassroomCatogery(res?.["data"]);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getALlPrograam = async () => {
    let res;
    try {
      res = await programTypeAll();
      if (res?.success) {
        setPrograamName(res?.["data"]);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    getClassRoomList();
  }, []);

  let clssroomname: any = [{ value: "", label: "Classrooms Type" }];
  classRoomCatogery?.map((e: any) => {
    clssroomname?.push({
      value: e?.classroomCategoryId,
      label: e?.classroomCategoryName,
    });
  });
  let programNameall: any = [{ value: "", label: "Programme Type" }];
  prograamName?.map((e: any) => {
    programNameall?.push({
      value: e?.classroomCategoryId,
      label: e?.classroomCategoryName,
    });
  });

  const uploadImage = async (body: any, childID: string) => {
    let res;
    try {
      res = await ChildRegistrationProfile(body, childID);
      if (res?.success) {
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleStepClick = async (index: number) => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setActiveStep(index);
    }
  };

  useEffect(() => {
    const formattedNumber = formatPhoneNumber(watch("parentContact"));
    formattedNumber && setValue("parentContact", formattedNumber);
  }, [watch("parentContact")]);
  useEffect(() => {
    const formattedNumber = formatPhoneNumber(watch("parentContact2"));
    formattedNumber && setValue("parentContact2", formattedNumber);
  }, [watch("parentContact2")]);

  const handleCheckboxChange = (day: string) => {
    setSelectedDays((prevSelectedDays: any) => {
      prevSelectedDays = prevSelectedDays || [];
      // Check if the day is already selected
      const isDaySelected = prevSelectedDays?.includes(day);

      // If the day is selected, remove it from the array; otherwise, add it
      const updatedSelectedDays = isDaySelected
        ? prevSelectedDays.filter((selectedDay: any) => selectedDay !== day)
        : [...prevSelectedDays, day];

      setSelectAllChecked(updatedSelectedDays.length === 5);

      return updatedSelectedDays;
    });
  };

  const handleSelectAllChange = (isChecked: any) => {
    setSelectAllChecked(isChecked);

    if (isChecked) {
      setSelectedDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
    } else {
      setSelectedDays([]);
    }
  };
  let dateOfBirth = watch("childDob");
  const futureDate = new Date(dateOfBirth);
  futureDate.setMonth(futureDate.getMonth() + 6);
  let disbaleJoiningDate = moment(futureDate)?.format("YYYY-MM-DD");

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setIsLoading(true);
    setErroObj(false);
    let formdata = new FormData();
    formdata.append("photo", data.image);
    let normalAddress = [
      {
        addressLine1: data?.street1,
        addressLine2: data?.street2,
        city: data?.city?.toString(),
        state: data?.state?.toString(),
        postalCode: data?.postalCode,
        country: data?.country?.toString(),
        parentFirstName: data?.parentFirstName,
        parentLastName: data?.parentLastName,
        parentPreferredName: data?.parentPreferredName
          ? data?.parentPreferredName
          : "",
        parentRelationToChild: data?.parentRelationToChild,
        parentEmail: data?.parentEmail,
        parentContact: data?.parentContact.replace(/\D/g, ""),
        parentOccupation: data?.parentOccupation,
        parentGender: data?.parentGender,
        parentIsCustodian: custudian,
        parentSequence: 1,
        parentId: totalChildDetails?.child?.parents?.[0].id || null,
      },
      // {
      //   street: `${(data?.street3, data?.street4)}`,
      //   city: data?.city2,
      //   state: data?.state2,
      //   postalCode: data?.postalCode2,
      //   country: data?.country2,
      //   parentFirstName: data?.parentFirstName2,
      //   parentLastName: data?.parentLastName2,
      //   parentPreferredName: data?.parentPreferredName2
      //     ? data?.parentPreferredName2
      //     : "",
      //   parentRelationToChild: data?.parentRelationToChild2,
      //   parentEmail: data?.parentEmail2,
      //   parentContact: data?.parentContact2,
      //   parentOccupation: data?.parentOccupation2,
      //   parentGender: data?.parentGender2,
      //   parentIsCustodian: custudian1,
      // },
    ];
    console.log("custodian case", custudian);
    let custodianAddress: any = custudian
      ? [
          {
            addressLine1: data?.street1,
            addressLine2: data?.street2,
            city: data?.city?.toString(),
            state: data?.state?.toString(),
            postalCode: data?.postalCode,
            country: data?.country?.toString(),
            parentFirstName: data?.parentFirstName,
            parentLastName: data?.parentLastName,
            parentPreferredName: data?.parentPreferredName
              ? data?.parentPreferredName
              : "",
            parentRelationToChild: data?.parentRelationToChild,
            parentEmail: data?.parentEmail,
            parentContact: data?.parentContact.replace(/\D/g, ""),
            parentOccupation: data?.parentOccupation,
            parentGender: data?.parentGender,
            parentSequence: 1,
            parentIsCustodian: custudian,
            parentId: totalChildDetails?.child?.parents?.[0].id || null,
          },
        ]
      : normalAddress;
    let body = {
      parentsAddress: custodianAddress,
      child: {
        childFirstName: data?.childFirstName,
        childLastName: data?.childLastName,
        childPreferredName: data?.childPreferredName
          ? data?.childPreferredName
          : "",
        childDob: data?.childDob,
        // age: data?.age,
        childLanguage: data?.childLanguage,
        ChildGender: data?.ChildGender,
      },
      register: {
        childcareType: "1",
        classroomType: (data?.classroomType).toString(),
        enrollmentType: data?.enrollmentType,
        startDate: data?.startDate,
        days:
          data?.enrollmentType === "Full_Time"
            ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            : selectedDays,
      },
    };
    let parentAddress2: any;
    if (!custudian) {
      parentAddress2 = {
        addressLine1: data?.street3,
        addressLine2: data?.street4,
        city: data?.city2?.toString(),
        state: data?.state2?.toString(),
        postalCode: data?.postalCode2,
        country: data?.country2?.toString(),
        parentFirstName: data?.parentFirstName2,
        parentLastName: data?.parentLastName2,
        parentPreferredName: data?.parentPreferredName2,
        parentRelationToChild: data?.parentRelationToChild2,
        parentEmail: data?.parentEmail2,
        parentContact: data?.parentContact2,
        parentOccupation: data?.parentOccupation2,
        parentGender: data?.parentGender2,
        parentIsCustodian: custudian,
        parentSequence: 2,
        parentId: totalChildDetails?.child?.parents?.[1].id || null,
      };

      // console.log(
      //   "object values check",
      //   Object.keys(parentAddress2).filter(
      //     (key: any) =>
      //       key !== "parentIsCustodian" && parentAddress2[key] !== ""
      //   ).length > 0
      // );
      // if (
      //   Object.values(parentAddress2)?.some(
      //     (value) => value !== ""
      //   )
      // ) {
      //   body.parentsAddress.push(parentAddress2);
      // }

      if (
        Object.keys(parentAddress2).filter(
          (key: any) =>
            key !== "parentIsCustodian" && parentAddress2[key] !== ""
        ).length > 0
      ) {
        body.parentsAddress.push(parentAddress2);
      }
    }

    // Add parentAddress2 if any field is not empty

    console.log("parents address ", body.parentsAddress);
    let DateOfBirth = new Date(data.childDob);
    let sixMonthsAgo = new Date(data?.startDate);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    if (data?.startDate === "" || data?.startDate === "Invalid Date") {
      toast.error("Date of Joining is required");
    } else {
      if (DateOfBirth > sixMonthsAgo) {
        setActiveStep(0);
        toast.error("Date of joining must  be  greater than 6 month");
      } else {
        let res;
        try {
          if (Child_id) {
            if (activeStep === 3) {
              //api for update
              res = await childEdit(totalChildDetails.child_id, body);
              await uploadImage(formdata, totalChildDetails.child_id);
            }
          } else {
            res = await childRegistration(body);
            let childId = res.data.childId;
            await uploadImage(formdata, childId);
          }
          if (res?.success) {
            setTimeout(() => {
              toast.success("Child registered successfully");
            }, 1000);
            router.push("/childManagement");
          }
        } catch (error: any) {
          let errros = error?.response?.data?.error;
          const errorMessageString = errros
            ?.map((error: any) => error.message)
            .join(", ");
          toast.error(errorMessageString);
          toast.error(error.response.data.error);
          console.log(error);
          setIsLoading(false);
        }
      }
    }
    setIsLoading(false);
  };

  //  get Country Data
  const getCountry = async () => {
    let body = {
      country: "",
      state: "",
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let resData = res?.data?.result;
      let Data: any = [{ value: "", label: "Country" }];
      resData?.map((data: any) => {
        Data?.push({ value: data?.id, label: data?.name });
      });
      setCountrylist(Data);
    } catch (error) {
      console.log(error);
    }
  };
  // Get  State Data
  const getState = async () => {
    let body = {
      country: countryCode,
      state: "",
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let resData = res?.data?.result;
      let Data: any = [{ value: "", label: "Province" }];
      resData?.map((data: any) => {
        Data?.push({ value: data?.id, label: data?.name });
      });
      setStatelist(Data);
    } catch (error) {
      console.log(error);
    }
  };
  //  get City Data
  const getCity = async () => {
    let body = {
      country: countryCode,
      state: stateCode,
    };
    let res;
    try {
      res = await get_Country_State_city(body);
      let resData = res?.data?.result;
      let Data: any = [{ value: "", label: "City" }];
      resData?.map((data: any) => {
        Data?.push({ value: data?.id, label: data?.name });
      });
      setCitylist(Data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCountry();
  }, []);
  useEffect(() => {
    if (countryCode) {
      getState();
    }
  }, [countryCode]);
  useEffect(() => {
    if (stateCode && countryCode) {
      getCity();
    }
  }, [stateCode, countryCode]);

  const getRegistredChildById = async () => {
    let res;
    try {
      if (Child_id) {
        res = await getEnrollmentById(Child_id);
      }
      if (res?.success) {
        setTotalChildDetails(res?.details?.registrationDetails);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegistredChildById();
  }, []);
  //   all validation of form
  useEffect(() => {
    if (totalChildDetails) {
      let tempData = {
        childFirstName: totalChildDetails?.child?.first_name,
        childLastName: totalChildDetails?.child?.last_name,
        childPreferredName: totalChildDetails?.child?.preferred_name,
        childDob: totalChildDetails?.child?.dob,
        // age: totalChildDetails?.child?.age,
        childLanguage: totalChildDetails?.child?.language,
        ChildGender: totalChildDetails?.child?.gender,
        //  parent Details
        street1: totalChildDetails?.child?.parents?.[0]?.address?.address_line_1
          ? totalChildDetails?.child?.parents?.[0]?.address?.address_line_1
          : "",
        street2: totalChildDetails?.child?.parents?.[0]?.address?.address_line_2
          ? totalChildDetails?.child?.parents?.[0]?.address?.address_line_2
          : "",
        city: totalChildDetails?.child?.parents?.[0]?.address?.city,
        state: totalChildDetails?.child?.parents?.[0]?.address?.state,
        postalCode:
          totalChildDetails?.child?.parents?.[0]?.address?.postal_code,
        country: totalChildDetails?.child?.parents?.[0]?.address?.country,
        parentFirstName: totalChildDetails?.child?.parents?.[0]?.first_name,
        parentLastName: totalChildDetails?.child?.parents?.[0]?.last_name,
        parentPreferredName:
          totalChildDetails?.child?.parents?.[0]?.preferred_name,
        parentRelationToChild: totalChildDetails?.child?.parents?.[0]?.relation,
        parentEmail:
          totalChildDetails?.child?.parents?.[0]?.email?.toLowerCase(),
        parentContact: totalChildDetails?.child?.parents?.[0]?.phone_no,
        parentOccupation: totalChildDetails?.child?.parents?.[0]?.occupation,
        parentGender: totalChildDetails?.child?.parents?.[0]?.gender,
        parentIsCustodian: totalChildDetails?.child?.parents?.[0]?.is_custodian,
        //  parent 2 Details
        street3: totalChildDetails?.child?.parents?.[1]?.address?.address_line_1
          ? totalChildDetails?.child?.parents?.[1]?.address?.address_line_1
          : "",
        street4: totalChildDetails?.child?.parents?.[1]?.address?.address_line_2
          ? totalChildDetails?.child?.parents?.[1]?.address?.address_line_2
          : "",
        city2: totalChildDetails?.child?.parents?.[1]?.address?.city || "",
        state2: totalChildDetails?.child?.parents?.[1]?.address?.state || "",
        postalCode2:
          totalChildDetails?.child?.parents?.[1]?.address?.postal_code || "",
        country2:
          totalChildDetails?.child?.parents?.[1]?.address?.country || "",
        parentFirstName2:
          totalChildDetails?.child?.parents?.[1]?.first_name || "",
        parentLastName2:
          totalChildDetails?.child?.parents?.[1]?.last_name || "",
        parentPreferredName2:
          totalChildDetails?.child?.parents?.[1]?.preferred_name || "",
        parentRelationToChild2:
          totalChildDetails?.child?.parents?.[1]?.relation || "",
        parentEmail2: totalChildDetails?.child?.parents?.[1]?.email || "",
        parentContact2: totalChildDetails?.child?.parents?.[1]?.phone_no || "",
        parentOccupation2:
          totalChildDetails?.child?.parents?.[1]?.occupation || "",
        parentGender2: totalChildDetails?.child?.parents?.[1]?.gender || "",
        parentIsCustodian2:
          totalChildDetails?.child?.parents?.[1]?.is_custodian || "",
        //  Registration Date
        // classroomType: totalChildDetails?.child,
        // enrollmentType: totalChildDetails?.child,
        // startDate: totalChildDetails?.child,
        classroomType: totalChildDetails?.classroom_type,
        enrollmentType: totalChildDetails?.enrollment_type,
        days: totalChildDetails?.days,
        startDate: totalChildDetails?.start_date,
        image: totalChildDetails?.child?.photo,
      };
      setSelectedDays(tempData?.days);
      setSelectAllChecked(tempData?.days?.length === 5);
      console.log("totalChildDetails", totalChildDetails);
      if (totalChildDetails && Object.keys(totalChildDetails).length > 0) {
        Object.entries(tempData).forEach((key: any) => {
          setValue(key[0], key[1]);
        });
        setCustudian(totalChildDetails?.child?.parents?.[0]?.is_custodian);
      }
    }
  }, [totalChildDetails]);

  useEffect(() => {
    if (totalChildDetails) {
      setValue("city", totalChildDetails?.child?.parents?.[0]?.address?.city);
      setValue(
        "city2",
        totalChildDetails?.child?.parents?.[1]?.address?.city || ""
      );
    }
  }, [citylist, totalChildDetails]);
  useEffect(() => {
    if (totalChildDetails) {
      setValue("state", totalChildDetails?.child?.parents?.[0]?.address?.state);
      setValue(
        "state2",
        totalChildDetails?.child?.parents?.[1]?.address?.state || ""
      );
    }
  }, [Statelist, totalChildDetails]);

  console.log("custudian", custudian);
  const country2 = watch("country");
  const state2 = watch("state");
  const city2 = watch("city");
  const add1 = watch("street1");
  const add2 = watch("street2");
  const pin = watch("postalCode");

  const handleChange = (e: any) => {
    if (e?.target?.checked) {
      setValue("country2", country2);
      setValue("city2", city2);
      setValue("state2", state2);
      setValue("street3", add1);
      setValue("street4", add2);
      setValue("postalCode2", pin);
    } else {
      setValue("country2", "");
      setValue("city2", "");
      setValue("state2", "");
      setValue("street3", "");
      setValue("street4", "");
      setValue("postalCode2", "");
    }
  };
  let todaydate = new Date();

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
      title: "Classroom Details",
      icon1: "/svgs/classroom.svg",
      icon2: "/svgs/classroom-side-icon.svg",
    },
  ];
  console.log("errors", errors);
  return (
    <>
      <section
        style={{
          backgroundColor: globalSettings?.backgroundColour || "#2E3F3F",
        }}
        className="grid md:grid-cols-7 lg:grid-cols-5 xl:grid-cols-9 gap-6 px-10 py-6  fixed h-full w-full"
      >
        {/* side Content */}
        <div className="hide-scroll lg:col-span-2 md:col-span-3 xl:col-span-2 h-[90%] px-4 py-4 bg-white rounded-3xl border-2  border-white overflow-auto font-['DM Sans'] ">
          <ul className=" w-full flex flex-col items-start lg:justify-around md:justify-center gap-4">
            <div className="flex flex-col w-full ">
              <p className="text-center font-medium text-xl text-[#4B4B4B] font-sans">
                Child Registration
              </p>
              <p className="text-center text-[#0C9D61] text-m font-sans">
                {activeStep + 1}/3 Completed
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
          className="flex flex-col lg:col-span-3 md:col-span-4 xl:col-span-7 h-[90%] overflow-auto bg-white  rounded-3xl 
        // [box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px]
         overflow-x-hidden relative
      "
        >
          {activeStep === 0 && (
            <section className="">
              {/* <h1 className="text-center mb-2 text-[#000000]">Child Details</h1> */}
              <div className="flex justify-center items-center relative">
                <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
                  <Image
                    src={"/svgs/child-icon-reg.svg"}
                    alt="Logo"
                    width={24}
                    height={24}
                    className="object-contain "
                  />
                  <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
                    Child Details
                  </h1>
                </div>
                <div
                  className="flex items-center absolute left-2 top-2 cursor-pointer"
                  onClick={() => router.back()}
                >
                  <ChevronLeft color="#8E8E8E" size={32} />
                  <div className="text-[1.25rem] py-2 px-1 text-[#4B4B4B] font-sans font-[500]">
                    Back
                  </div>
                </div>
              </div>
              <div className="mx-auto w-fit flex flex-col items-center justify-center mb-8 mt-4">
                <ImageUpload
                  control={control}
                  name="image"
                  disabled={disbale}
                />
              </div>
              <div className="w-[68%] mx-auto grid grid-cols-2  justify-center gap-y-5 gap-x-4">
                <CustomInput
                  required={true}
                  type="text"
                  placeholder="First Name"
                  name="childFirstName"
                  control={control}
                  disabled={disbale}
                  className="rounded-[20px] bg-[#F5F5F5] p-2"
                  register={register}
                  error={errors?.childFirstName}
                />
                <CustomInput
                  required={true}
                  className="rounded-[20px] bg-[#F5F5F5] p-2"
                  label=""
                  type="text"
                  placeholder="Last Name"
                  name="childLastName"
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.childLastName}
                />
                <CustomInput
                  // required={true}
                  className="rounded-[20px] bg-[#F5F5F5] p-2"
                  type="text"
                  placeholder="Preferred Name"
                  name="childPreferredName"
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.childPreferredName}
                />
                {/* <CustomInput
                  // required={true}
                  className="rounded-[20px] bg-[#F5F5F5]"
                  label="Preferred Name (if any)"
                  type="text"
                  placeholder="Preferred Name (if any)"
                  name="childPreferredName"
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.childPreferredName}
                /> */}
                <CustomSelect
                  required={true}
                  className="rounded-[20px] bg-[#F5F5F5] "
                  name="childLanguage"
                  label="Language"
                  options={[
                    { value: "", label: "Language" },
                    { value: "English", label: "English" },
                    { value: "French", label: "French" },
                    { value: "Other", label: "Other" },
                    // Add more options as needed
                  ]}
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.childLanguage}
                />
                <CustomInput
                  required={true}
                  className="rounded-[20px] bg-[#F5F5F5] p-2"
                  label="Date Of Birth"
                  type="date"
                  max={moment().format("YYYY-MM-DD")}
                  placeholder="Date of Birth"
                  name="childDob"
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.childDob}
                  // error={errors?.age}
                />
                {/* <div className="relative">
                    <input
                      id="input"
                      className="input-cal input-base "
                      type="date"
                      onChange={(e: any) => setDOb(e.target.value)}
                      placeholder="Date of Birth"
                      name="dob"
                    />
                    <label id="label-input">DOB</label>
                  </div> */}
                {/* <span className="text-[red]">
                    {" "}
                    {errobj && (
                      <p>{"Children Should be Grater than 6 month"}</p>
                    )}
                  </span> */}

                <CustomSelect
                  className="rounded-[20px] bg-[#F5F5F5] "
                  name="ChildGender"
                  label="Gender"
                  options={GENDER_TYPE}
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors.ChildGender}
                />
                {/* <div className="w-4/12 flex flex-col gap-5"></div> */}
              </div>
            </section>
          )}
          {/* Parent Details ////////////////////////////////////////////////////////////////////////////////////////////////// */}

          {activeStep === 1 && (
            <>
              <div className="flex justify-center items-center relative">
                <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
                  <Image
                    src={"/svgs/Vector-detail.svg"}
                    alt="Logo"
                    width={24}
                    height={24}
                    className="object-contain "
                  />
                  <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
                    Parent Details
                  </h1>
                </div>
                <div
                  className="flex items-center absolute left-2 top-0 cursor-pointer"
                  onClick={() => router.back()}
                >
                  <ChevronLeft color="#8E8E8E" size={32} />
                  <div className="text-[1.25rem] py-2 px-1 text-[#4B4B4B] font-sans font-[500]">
                    Back
                  </div>
                </div>
              </div>
              <div className="mx-auto w-fit flex md:flex-col lg:flex-row items-center md:gap-5 lg:gap-20 mb-8 mt-4">
                <h2>Is this a custodian case ?:</h2>
                <div className="flex flex-row gap-5">
                  <input
                    type="radio"
                    name="parentIsCustodian"
                    onChange={(e: any) => setCustudian(true)}
                    checked={custudian}
                    aria-disabled={disbale}
                    disabled={disbale}
                  />
                  <label>Yes</label>
                  <input
                    type="radio"
                    name="parentIsCustodian"
                    onChange={(e: any) => setCustudian(false)}
                    checked={!custudian}
                    aria-disabled={disbale}
                    disabled={disbale}
                  />
                  <label>No</label>
                  {/* <input
                  type="radio"
                  name="parentIsCustodian"
                  onChange={(e: any) => setCustudian(null)}
                  checked={custudian === null ? true : false}
                />
                <label>Not required</label> */}
                </div>
              </div>
              <div className="px-[17%]"></div>

              <div className="mx-auto w-fit flex items-center md:gap-10 lg:gap-20 mt-2 mb-2">
                <h2 style={{ fontWeight: "600" }}>
                  {" "}
                  {custudian
                    ? "Custodian Details"
                    : "Parent 1 Personal Details"}{" "}
                  :
                </h2>
              </div>
              <div className="w-[68%] mx-auto grid grid-cols-2  justify-center gap-y-5 gap-x-4">
                <CustomInput
                  required={true}
                  className="rounded-[20px] bg-[#F5F5F5] p-2"
                  label=""
                  type="text"
                  placeholder="First Name"
                  name="parentFirstName"
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.parentFirstName}
                />
                <CustomInput
                  required={true}
                  className="rounded-[20px] bg-[#F5F5F5] p-2"
                  label=""
                  type="text"
                  placeholder="Last Name"
                  name="parentLastName"
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.parentLastName}
                />

                <CustomInput
                  // required={true}
                  className="rounded-[20px] bg-[#F5F5F5] p-2"
                  label=""
                  type="text"
                  placeholder="Preferred Name"
                  name="parentPreferredName"
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.parentPreferredName}
                />

                <CustomSelect
                  required={true}
                  className="rounded-[20px] bg-[#F5F5F5] "
                  name="parentRelationToChild"
                  label="Select Relation to Child"
                  options={[
                    { value: "", label: "Select Relation to Child" },
                    { value: "Father", label: "Father" },
                    { value: "Mother", label: "Mother" },
                    { value: "Other", label: "Other" },
                    // Add more options as needed
                  ]}
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.parentRelationToChild}
                />
                <CustomInput
                  required={true}
                  className="rounded-[20px] bg-[#F5F5F5] p-2"
                  label=""
                  type="email"
                  placeholder="Email Address"
                  name="parentEmail"
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.parentEmail}
                />

                <CustomInput
                  required={true}
                  className="rounded-[20px] bg-[#F5F5F5] p-2"
                  label=""
                  type="text"
                  placeholder="Contact Number"
                  name="parentContact"
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.parentContact}
                />

                <CustomInput
                  // required={true}
                  className="rounded-[20px] bg-[#F5F5F5] p-2"
                  label=""
                  type="text"
                  placeholder="Occupation"
                  name="parentOccupation"
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.parentOccupation}
                />
                <CustomSelect
                  required={true}
                  className="rounded-[20px] bg-[#F5F5F5] "
                  name="parentGender"
                  label="Gender"
                  options={GENDER_TYPE}
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.parentGender}
                />
              </div>
              <div className="mx-auto w-fit flex items-center md:gap-10 lg:gap-20 mt-10 mb-2">
                <h2 style={{ fontWeight: "600" }}>
                  {custudian ? "Custodian Address" : "Parent 1 Address"} :
                </h2>
              </div>
              {/* <span className="px-[17%] mt-4">Parent 1 Address :</span> */}
              <div className="w-full flex flex-col items-center my-4 gap-y-5 gap-x-4 ">
                <div className="w-[68%]">
                  <CustomInput
                    className="rounded-[20px] bg-[#F5F5F5] p-2"
                    label=""
                    type="text"
                    placeholder="Address Line 1"
                    name="street1"
                    control={control}
                    disabled={disbale}
                    register={register}
                    required={true}
                    error={errors?.street1}
                  />
                </div>
                <div className="w-[68%]">
                  <CustomInput
                    className="w-[70%] rounded-[20px] bg-[#F5F5F5] p-2"
                    label=""
                    type="text"
                    placeholder="Address Line 2"
                    name="street2"
                    control={control}
                    disabled={disbale}
                    register={register}
                  />
                </div>
              </div>
              <div className="w-[68%] mx-auto grid grid-cols-2  justify-center gap-y-5 gap-x-4">
                <CustomSelect
                  required={true}
                  className="w-full bg-input_bg rounded-[20px] h-full "
                  name="country"
                  label="Country"
                  control={control}
                  disabled={disbale}
                  register={register}
                  options={countrylist}
                  error={errors?.country}
                />
                <CustomSelect
                  required={true}
                  className="w-full bg-input_bg rounded-[20px] h-full "
                  name="state"
                  label="Province"
                  control={control}
                  disabled={disbale}
                  register={register}
                  options={Statelist}
                  error={errors?.state}
                />

                <CustomSelect
                  required={true}
                  className="w-full bg-input_bg rounded-[20px] h-full "
                  name="city"
                  label="City"
                  control={control}
                  disabled={disbale}
                  register={register}
                  options={citylist}
                  error={errors?.city}
                />
                <CustomInput
                  required={true}
                  className="rounded-[20px] bg-[#F5F5F5] p-2"
                  label=""
                  type="text"
                  placeholder="Postal Code"
                  name="postalCode"
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.postalCode}
                />
              </div>

              {/* //////////////////////////////Parent 2 Details///////////////////////////////////////////// */}
              {!custudian && (
                <>
                  <div className="mx-auto w-fit flex items-center md:gap-10 lg:gap-20 mt-10 mb-2">
                    <h2 style={{ fontWeight: "600" }}>
                      {" "}
                      Parent 2 Personal Details :
                    </h2>
                  </div>
                  <div className="w-[68%] mx-auto grid grid-cols-2  justify-center gap-y-5 gap-x-4">
                    <CustomInput
                      className="rounded-[20px] bg-[#F5F5F5] p-2"
                      label=""
                      type="text"
                      placeholder="First Name"
                      name="parentFirstName2"
                      control={control}
                      disabled={disbale}
                      register={register}
                    />
                    <CustomInput
                      className="rounded-[20px] bg-[#F5F5F5] p-2"
                      label=""
                      type="text"
                      placeholder="Last Name"
                      name="parentLastName2"
                      control={control}
                      disabled={disbale}
                      register={register}
                    />

                    <CustomInput
                      className="rounded-[20px] bg-[#F5F5F5] p-2"
                      label=""
                      type="text"
                      placeholder="Preferred Name"
                      name="parentPreferredName2"
                      control={control}
                      disabled={disbale}
                      register={register}
                    />

                    <CustomSelect
                      className="rounded-[20px] bg-[#F5F5F5] "
                      name="parentRelationToChild2"
                      label="Relation to Child"
                      options={[
                        { value: "", label: "Relation to Child" },
                        { value: "Father", label: "Father" },
                        { value: "Mother", label: "Mother" },
                        { value: "Other", label: "Other" },
                        // Add more options as needed
                      ]}
                      control={control}
                      disabled={disbale}
                      register={register}
                    />
                    <CustomInput
                      className="rounded-[20px] bg-[#F5F5F5] p-2"
                      label=""
                      type="email"
                      placeholder="Email Address"
                      name="parentEmail2"
                      control={control}
                      disabled={disbale}
                      register={register}
                      error={errors?.parentEmail2}
                    />
                    <CustomInput
                      className="rounded-[20px] bg-[#F5F5F5] p-2"
                      label=""
                      type="text"
                      placeholder="Contact Number"
                      name="parentContact2"
                      control={control}
                      disabled={disbale}
                      register={register}
                      error={errors.parentContact2}
                    />
                    <CustomInput
                      className="rounded-[20px] bg-[#F5F5F5] p-2"
                      label=""
                      type="text"
                      placeholder="Occupation"
                      name="parentOccupation2"
                      control={control}
                      disabled={disbale}
                      register={register}
                    />
                    <CustomSelect
                      className="rounded-[20px] bg-[#F5F5F5] "
                      name="parentGender2"
                      label="Gender"
                      options={GENDER_TYPE}
                      control={control}
                      disabled={disbale}
                      register={register}
                    />
                  </div>

                  <div className="mx-auto w-fit flex items-center md:gap-10 lg:gap-20 mt-10 mb-2">
                    <h2 style={{ fontWeight: "600" }}> Parent 2 Address :</h2>
                  </div>
                  <div className="mx-auto w-fit flex  md:gap-3 mt-2 mb-2">
                    <h2 style={{ fontWeight: "600" }}>
                      {" "}
                      Same as parent 1 address :
                    </h2>
                    <input
                      type={"checkbox"}
                      className=""
                      aria-disabled={disbale}
                      disabled={disbale}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full flex flex-col items-center my-4 gap-y-5 gap-x-4">
                    <div className="w-[68%]">
                      <CustomInput
                        className="w-[70%] rounded-[20px] bg-[#F5F5F5] p-2"
                        label=""
                        type="text"
                        placeholder="Address Line 1"
                        name="street3"
                        control={control}
                        disabled={disbale}
                        register={register}
                        // divclass="w-[70%]"
                      />
                    </div>
                    <div className="w-[68%]">
                      <CustomInput
                        className="w-[70%] rounded-[20px] bg-[#F5F5F5] p-2"
                        label=""
                        type="text"
                        placeholder="Address Line 2"
                        name="street4"
                        control={control}
                        disabled={disbale}
                        register={register}
                        // divclass="w-[70%]"
                      />
                    </div>
                  </div>
                  <div className="w-[68%] mx-auto grid grid-cols-2  justify-center gap-y-5 gap-x-4 mt-1">
                    <CustomSelect
                      className="w-full bg-input_bg rounded-[20px] h-full "
                      name="country2"
                      label="Country"
                      control={control}
                      disabled={disbale}
                      register={register}
                      options={countrylist}
                    />
                    <CustomSelect
                      className="w-full bg-input_bg rounded-[20px] h-full "
                      name="state2"
                      label="Province"
                      control={control}
                      disabled={disbale}
                      register={register}
                      options={Statelist}
                    />
                    <CustomSelect
                      className="w-full bg-input_bg rounded-[20px] h-full "
                      name="city2"
                      label="City"
                      control={control}
                      disabled={disbale}
                      register={register}
                      options={citylist}
                    />
                    <CustomInput
                      className="rounded-[20px] bg-[#F5F5F5] p-2"
                      label=""
                      type="text"
                      placeholder="Postal Code"
                      name="postalCode2"
                      control={control}
                      disabled={disbale}
                      register={register}
                    />
                  </div>
                </>
              )}
            </>
          )}
          {/* Classroom Details ////////////////////////////////////////////////////////////////////////////////////////////////// */}

          {activeStep >= 2 && (
            <div className="flex justify-center items-center relative mb-5">
              <div className="flex justify-around items-center border-b-[3px] px-10 py-1 border-[#00858E]">
                <Image
                  src={"/svgs/classroom-fill.svg"}
                  alt="Logo"
                  width={24}
                  height={24}
                  className="object-contain "
                />
                <h1 className="text-center text-xl p-2 text-[#4B4B4B] font-sans font-[500] ml-2">
                  Classroom Details
                </h1>
              </div>
              <div
                className="flex items-center absolute left-2 top-0 cursor-pointer"
                onClick={() => router.back()}
              >
                <ChevronLeft color="#8E8E8E" size={32} />
                <div className="text-[1.25rem] py-2 px-1 text-[#4B4B4B] font-sans font-[500]">
                  Back
                </div>
              </div>
            </div>
          )}
          {activeStep >= 2 && (
            <div className="flex items-center justify-center gap-6 mt-2">
              <div className="w-[68%] flex flex-col justify-start gap-y-5 gap-x-4">
                <div className="flex flex-col gap-y-5 gap-x-4">
                  <CustomSelect
                    required={true}
                    className="rounded-[20px] bg-[#F5F5F5] "
                    name="enrollmentType"
                    label="EnrollmentType"
                    options={[
                      { value: "", label: "Select Enrollment Type" },
                      { value: "Part_Time", label: "Part Time" },
                      { value: "Full_Time", label: "Full Time" },
                      // { value: "Other", label: "Other" },
                      // Add more options as needed
                    ]}
                    control={control}
                    disabled={disbale}
                    error={errors?.enrollmentType}
                    register={register}
                  />
                  {watch("enrollmentType", "") == "Part_Time" && (
                    <>
                      <div className="my-2 flex items-center">
                        <label className="mr-2">Days</label>
                        <div className="flex-shrink-0">
                          <Checkbox
                            id={`checkbox-SelectAll`}
                            checked={selectAllChecked}
                            disabled={disbale}
                            onCheckedChange={(isChecked) =>
                              handleSelectAllChange(isChecked)
                            }
                          />
                          <label
                            htmlFor={`checkbox-SelectAll`}
                            className="text-sm font-medium leading-none ml-1"
                          >
                            Select All
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                        ].map((day, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-3 bg-[#F4FBFB] border border-[#D3E4E6] rounded-[20px] mb-4 my-2"
                          >
                            <label
                              htmlFor={`checkbox-${day}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                            >
                              {day}
                            </label>
                            <div className="flex-shrink-0">
                              <Checkbox
                                id={`checkbox-${day}`}
                                checked={selectedDays?.includes(day)}
                                disabled={disbale}
                                onCheckedChange={() =>
                                  handleCheckboxChange(day)
                                }
                                // disabled={selectAllChecked}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  <CustomSelect
                    required={true}
                    name="classroomType"
                    label="Classroom Type"
                    className="rounded-[20px] bg-[#F5F5F5] "
                    options={clssroomname}
                    control={control}
                    disabled={disbale}
                    register={register}
                    error={errors?.classroomType}
                  />
                </div>
                <CustomInput
                  className="w-[70%] rounded-[20px] bg-[#F5F5F5] p-2"
                  label="Date Of Joining"
                  type="date"
                  placeholder="Date Of Joining"
                  name="startDate"
                  control={control}
                  disabled={disbale}
                  register={register}
                  error={errors?.startDate}
                  min={disbaleJoiningDate}
                  required={true}
                  // divclass="w-[70%]"
                />
                <span className="text-[red]">
                  {" "}
                  {DOJerror && (
                    <p>{"Children Should be Greater than 6 month"}</p>
                  )}
                </span>
              </div>
              {/* */}
            </div>
          )}
          <div
            className={`${
              activeStep !== 0
                ? activeStep === 2
                  ? "lg:pr-36"
                  : "lg:pr-32"
                : "lg:pr-1.5"
            } mt-4`}
          >
            {Child_id && view ? (
              <div className="flex gap-4 md:mx-auto lg:ml-[70%] w-fit mt-2 mb-4">
                <Button
                  type="button"
                  form="white"
                  className="rounded-[6px]"
                  onClick={() => router.push("/childManagement")}
                >
                  Cancel
                </Button>
                {activeStep > 0 && (
                  <Button
                    type="button"
                    form="white"
                    className="rounded-[6px]"
                    onClick={() =>
                      setActiveStep(activeStep > 0 ? activeStep - 1 : 0)
                    }
                  >
                    Back
                  </Button>
                )}

                {activeStep < 2 && (
                  <Button
                    type="button"
                    form="white"
                    className={`${
                      loader
                        ? "bg-gray-500 text-black-b2 border-none text-white"
                        : ""
                    } rounded-[6px]`}
                    onClick={() => {
                      if (!loader) {
                        handleStepClick(activeStep < 2 ? activeStep + 1 : 2);
                      }
                    }}
                  >
                    Next
                  </Button>
                )}

                {/* <Button
                  type="button"
                  form="blue"
                  className="rounded-[16px]"
                  onClick={() => setDisable(false)}
                >
                  Edit
                </Button> */}
              </div>
            ) : (
              <>
                {Child_id && (
                  <div className="flex gap-4 md:mx-auto lg:ml-[70%] w-fit mt-2 mb-4">
                    <Button
                      type="button"
                      form="white"
                      className="rounded-[6px]"
                      onClick={() => router.push("/childManagement")}
                    >
                      Cancel
                    </Button>
                    {activeStep > 0 && (
                      <Button
                        type="button"
                        form="white"
                        className="rounded-[6px]"
                        onClick={() =>
                          setActiveStep(activeStep > 0 ? activeStep - 1 : 0)
                        }
                      >
                        Back
                      </Button>
                    )}

                    {activeStep >= 2 ? (
                      <Button
                        type="submit"
                        form="blue"
                        className="rounded-[6px]"
                        onClick={() => setActiveStep(3)}
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        form="white"
                        className="rounded-[6px]"
                        onClick={() =>
                          //  setActiveStep((prv: number) => prv + 1)
                          handleStepClick(activeStep + 1)
                        }
                      >
                        Next
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}

            {!Child_id && (
              <div className="flex gap-4 md:mx-auto lg:ml-[70%] w-fit mt-2 mb-4">
                <Button
                  type="button"
                  form="white"
                  className="rounded-[6px]"
                  onClick={() => router.push("/childManagement")}
                >
                  Cancel
                </Button>
                {activeStep > 0 && (
                  <Button
                    type="button"
                    form="white"
                    className="rounded-[6px]"
                    onClick={() =>
                      setActiveStep(activeStep > 0 ? activeStep - 1 : 0)
                    }
                  >
                    Back
                  </Button>
                )}

                {activeStep < 2 && (
                  <Button
                    type="button"
                    form="white"
                    className="rounded-[6px]"
                    onClick={() =>
                      // setActiveStep(activeStep < 2 ? activeStep + 1 : 2)
                      handleStepClick(activeStep < 2 ? activeStep + 1 : 2)
                    }
                  >
                    Next
                  </Button>
                )}
                {activeStep === 2 && (
                  <>
                    {isLoading ? (
                      <span className="loader_button"></span>
                    ) : (
                      <Button
                        type="submit"
                        form="blue"
                        className="rounded-[6px]"
                        // onClick={() =>
                        //   setActiveStep(
                        //     activeStep < 2 && !errors ? activeStep + 1 : 2
                        //   )
                        // }
                      >
                        Submit
                      </Button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
};

export default RegistrationForm;
