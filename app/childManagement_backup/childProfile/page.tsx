"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityContainer,
  ActivityDetails,
  ActivityInfo,
  ButtonInfo,
  CalendarContainer,
  DailyReportContainer,
  Description,
  FormContainer,
  FormDetails,
  HeaderBar,
  IconContainer,
  ImgContainer,
  InfoContainer,
  NameTimeDetails,
  ProfileButtons,
  ProfileContainer,
  ProfileDescription,
  ProfileDetails,
  ProfileInfo,
  ProfileName,
  TagContainer,
} from "../../dailyReports/dailyReport.styled";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { DatePickerComponent } from "@/components/ui/datePicker";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getChildprofileDetail } from "@/services/childrenActionServices";
import { string } from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import Loo from "@/app/dailyReports/ModalComponents/Loo";
import Modal from "@/components/common/Modal/Modal";
import ChildPersonalDetails from "./childEditModal/ChildPersonalDetails";
import {
  Date_formator_YYYY_MM_DD,
  Date_formator_mmm_dd_yyyy,
  capitalizeFirstLetter,
  createFullAddress,
  disableActionIfHoliday,
  disableActionIfNotWorkingDay,
  formatDateWithUTC,
  formatPhoneNumber,
  isDateGreaterThanOrEqualToToday,
} from "@/utils/utilityFunctions";
import DoctorInfo from "./childEditModal/DoctorInfo";
import OtherDetails from "./childEditModal/OtherDetails";
import EmergencyContact from "./childEditModal/EmergencyContact";
import MedicalInfo from "./childEditModal/MedicalInfo";
import Parentupdate from "./childEditModal/Parentupdate";
import Immunazationtable from "./Immunazationtable";
import { Router } from "next/router";
import CheckInModalChild from "./childEditModal/CheckInModalChild";
import MoveRoomModal from "./childEditModal/MoveRoomModal";
import { classroomlist } from "@/app/classroomManagement/classroomManagentAPI";
import { ChevronLeft, Download, Plus } from "lucide-react";
import DocModal from "./childEditModal/DocModal";
import moment from "moment";
import { useGlobalContext } from "@/app/context/store";
import Link from "next/link";
import Icon from "@/public/svgs/icons";
import CheckOutModalChild from "./childEditModal/CheckOutModalChild";

interface ChildDetailsProps {
  // or use proper type for control based on your setup
}
const ChildProfile = () => {
  const { control, handleSubmit } = useForm<FormData>();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Perform any actions with the submitted form data
  };

  const [childPersonal, setChildPersonal] = useState<boolean>(false);
  const [parenetDetails, setparentDetails] = useState<boolean>(false);
  const [Immunization, setImmunization] = useState<boolean>(false);
  const [medical, setmedical] = useState<boolean>(false);
  const [emergencyContact, setEmergencyContact] = useState<boolean>(false);
  const [loading, setLoader] = useState<boolean>(false);
  const [emergencydoctor, setEmergencydoctor] = useState<boolean>(false);
  const [other, setOther] = useState<boolean>(false);
  const [checkInModal, setCheckInModal] = useState<boolean>(false);
  const [checkOutModal, setCheckOutModal] = useState<boolean>(false);
  const [moveChild, setMoveChild] = useState<boolean>(false);

  const [totalChildData, setTotalChilData] = useState<any>([]);
  const [childParentData, setChildParentData] = useState<any>([]);
  const [emergencyDetails, setEmergencyDetail] = useState<any>([]);
  const [open, setopen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("Child Details");

  const searchParams = useSearchParams();
  const router = useRouter();
  const getUnixTime = (date: any) => {
    let inputDate = date;
    let dateObject = new Date(inputDate);
    let unixTimestamp = dateObject.getTime() / 1000;
    return unixTimestamp;
  };
  // let joinignDateunix = getUnixTime(totalChildData?.joining_date)
  let joinignDateunix = moment(totalChildData?.joining_date);
  let currentDate = new Date();
  let todayunixTime = Date_formator_YYYY_MM_DD(currentDate);
  // let todayDateUnix = getUnixTime(todayunixTime);
  let todayDateUnix = moment();

  let child_Id: any = searchParams?.get("child_id");
  let enrollment_id: any = searchParams?.get("enrollment_id");

  const getChildData = async () => {
    let res;
    try {
      if (child_Id) {
        setLoader(true);
        res = await getChildprofileDetail(child_Id);
      }
      // console.log(res)
      setLoader(false);
      if (res?.success) {
        setTotalChilData(res?.data);
        let parentsData = res?.data?.parents;
        let emrgency_details = parentsData?.filter((parentsData: any) => {
          return parentsData?.is_emergency_contact;
        });
        setEmergencyDetail(emrgency_details);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (totalChildData) {
      const parent = totalChildData?.parents?.filter((item: any) => {
        return item.is_emergency_contact !== true;
      });
      setChildParentData(parent);
    }
  }, [totalChildData]);
  useLayoutEffect(() => {
    getChildData();
  }, []);

  const handleRoute = () => {
    router.push(`/childActivity/${child_Id}`);
  };
  const incidentreportdetailarr = [
    {
      key: "Incident Name",
      value: "",
    },
    {
      key: "Educator Present",
      value: "",
    },
    {
      key: "Notified to Parent",
      value: "",
    },
  ];

  const handleCheckIn = () => {
    setCheckInModal(true);
  };
  const handleCheckout = () => {
    setCheckOutModal(true);
  };
  const handleMove = () => {
    setMoveChild(true);
  };

  const { globalHolidayList, globalSettings } = useGlobalContext();
  const name = disableActionIfHoliday(globalHolidayList);
  const workingDay =
    globalSettings.workingDays &&
    disableActionIfNotWorkingDay(globalSettings.workingDays);

  const filename = totalChildData?.medical_information?.[0].allergy_file
    ? totalChildData?.medical_information?.[0].allergy_file?.substring(
      totalChildData?.medical_information?.[0].allergy_file?.lastIndexOf(
        "/"
      ) + 1
    )
    : null;

  const tabs: string[] = [
    "Child Details",
    "Medical Details",
    // "Incident Report",
  ];

  const renderItem = (name: string, value: any, className?: string) => {
    return (
      <>
        <div className="grid grid-cols-10 py-1">
          <span className="font-[400]  col-span-2 text-sm text-[#4b4b4b]">
            {name}
          </span>
          <p
            className={`font-[500] col-span-8 text-[#323232] flex gap-3 ${className}`}
          >
            <span>:</span> <span>{value}</span>
          </p>
        </div>
      </>
    );
  };
  const renderIcon = (name: string, value: any) => {
    return (
      <>
        <div className="flex justify-start items-center gap-4 py-1">
          <Icon type={name} />

          <p className="font-sans text-black text-[16px]">{value}</p>
        </div>
      </>
    );
  };

  const childHasAllergy = () => {
    const allergy = totalChildData?.medical_information?.flatMap((ele: any) => {
      if (ele?.allergy_details?.allergies) {
        return ele?.allergy_details?.allergies;
      } else {
        return [];
      }
    });
    return allergy?.length > 0;
  };
  //Attendence check
  const attendance = totalChildData && totalChildData?.attendance;

  return (
    <div
      style={{ backgroundColor: globalSettings?.backgroundColour || "#ECF2F4" }}
      className="min-h-screen"
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <DailyReportContainer
          style={{
            backgroundColor: globalSettings?.backgroundColour || "#ECF2F4",
            boxShadow: "none",
            margin: 0,
          }}
          className="md:flex md:flex-col md:justify-center md:items-center lg:flex-row  lg:items-center min-h-[89%]"
        >
          <ProfileContainer className="bg-white relative">
            <div
              className="flex items-center absolute left-2 top-0 cursor-pointer"
              onClick={() => router.back()}
            >
              <ChevronLeft color="#8E8E8E" size={32} />
              <div className="text-[1.25rem] py-2 px-1 text-[#4B4B4B] font-sans font-[500]">
                Back
              </div>
            </div>
            <ProfileDetails>
              <ImgContainer className={"mt-5"}>
                <Image
                  src={
                    totalChildData?.photo
                      ? totalChildData?.photo
                      : "/svgs/no-image.svg"
                  }
                  width={112}
                  height={112}
                  alt="coodle image"
                  className="w-[112px] h-[112px] rounded-full object-cover"
                />
                {/* <img
                src={
                  "https://aiims.s3.ap-south-1.amazonaws.com/public/daycare/child/profile/2.jpg"
                }
                alt=""
              /> */}
              </ImgContainer>
              <ProfileInfo>
                {totalChildData?.first_name && (
                  <p className="text-[#4B4B4B] leading-5 font-sans text-[20px] font-medium mt-2 capitalize">
                    {`${totalChildData?.first_name} ${totalChildData?.last_name}`}
                  </p>
                )}
                <TagContainer>
                  {childHasAllergy() && (
                    <div className="flex justify-between">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="bg-[#FFDCC9] text-[#D41A00] font-sans text-[12px] font-[500] rounded-lg px-2 cursor-pointer mt-3	">
                              Allergy
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#FFDCC9] p-5 w-[200px]">
                            {totalChildData?.medical_information?.map(
                              (ele: any, ind: any) => {
                                return (
                                  <p className="font-sans text-black" key={ind}>
                                    {ele?.allergy_details?.allergies}
                                  </p>
                                );
                              }
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                  {/* <div className="bg-[#FFF2EE] rounded-e-sm text-[#EC2D30] font-sans text-[12px] font-medium p-2 cursor-pointer	">
                  Important Info
                </div> */}
                </TagContainer>
                <div className="w-3/5  flex flex-row justify-between gap-2 mt-5 mr-10">
                  <Image
                    src={
                      totalChildData?.classroom_details?.logo
                        ? totalChildData?.classroom_details?.logo !== "null"
                          ? totalChildData?.classroom_details?.logo
                          : "/svgs/no-image.svg"
                        : "/svgs/no-image.svg"
                    }
                    width={40}
                    height={37}
                    alt="coodle image"
                    className="w-[40px] h-[35px] rounded-full object-cover"
                  />

                  <div className="w-full flex flex-col px-2">
                    <p className="text-[#0000004D] font-sans text-[12px] font-medium">
                      Classroom
                    </p>
                    <p className="text-[#4B4B4B] font-sans text-[16px] font-medium ">
                      {totalChildData?.classroom_details
                        ? totalChildData?.classroom_details?.name
                        : null}
                    </p>
                  </div>
                </div>
              </ProfileInfo>
              {/* {joinignDateunix.isSameOrAfter(todayDateUnix) ? (
            ) null: null} */}

              {isDateGreaterThanOrEqualToToday(totalChildData?.joining_date) &&
                totalChildData?.enrollments?.status === 1 && (
                  <div>
                    {!name &&
                      !workingDay &&
                      totalChildData &&
                      totalChildData?.classroom_details?.status === 1 &&
                      (!attendance?.check_in || !attendance?.check_out) && (
                        <button
                          className="w-[200px] mx-auto mt-5 py-2 bg-[#12A321] flex flex-row items-center justify-center gap-2 rounded-md text-[#FFFFFF] font-semibold font-sans text-[16px]"
                          onClick={
                            (attendance && attendance?.check_in) === null &&
                              (attendance && attendance?.check_out) === null
                              ? handleCheckIn
                              : handleCheckout
                          }
                        >
                          <Image
                            src={"/svgs/right-arrows.svg"}
                            width={15}
                            height={17}
                            alt="n"
                          />
                          {(attendance && attendance?.check_in) === null &&
                            (attendance && attendance?.check_out) === null
                            ? "Check-in"
                            : "Check-out"}

                          {/* {attendance &&
                            attendance?.check_in === null &&
                            attendance?.check_out === null &&
                            "Check-in"}
                          {attendance &&
                            attendance?.check_in !== null &&
                            attendance?.check_out === null &&
                            "Check-out"} */}
                        </button>
                      )}

                    {attendance &&
                      attendance?.check_in &&
                      attendance &&
                      attendance?.check_out == null && (
                        <button
                          className="w-[200px] mx-auto border-2 border-[#FE632F] mt-2 py-2  bg-[#FFFFFF] flex flex-row items-center justify-center gap-2 font-semibold rounded-md text-[#FE632F]  font-sans text-[16px]"
                          onClick={handleMove}
                        >
                          <Image
                            src={"/svgs/arrow-icon.svg"}
                            width={15}
                            height={17}
                            alt="n"
                          />
                          Move child
                        </button>
                      )}

                    {attendance && attendance?.check_in && (
                      <button
                        className="w-[200px] mx-auto py-2 mt-2  border-2 border-[#3A70E2] bg-[#FFFFFF] flex flex-row items-center justify-center gap-2 font-semibold rounded-md text-[#3A70E2]  font-sans text-[16px]"
                        onClick={handleRoute}
                      >
                        <Image
                          src={"/svgs/mulative.svg"}
                          width={20}
                          height={20}
                          alt="n"
                        />
                        View Reports
                      </button>
                    )}
                  </div>
                )}

              {/*  Profile Button for View , checking  */}
              {/* <ProfileButtons>
              <ButtonInfo>
                <IconContainer>
                  <Image
                    src={"/svgs/eye-icon.svg"}
                    width={16}
                    height={16}
                    alt="eye image"
                  />
                </IconContainer>
                <p className="text-[#3A70E2] font-sans text-[16px] font-normal">
                  View Profile
                </p>
              </ButtonInfo>

              <ButtonInfo>
                <IconContainer>
                  {" "}
                  <Image
                    src={"/svgs/right-arrow.svg"}
                    width={16}
                    height={16}
                    alt="right arrow image"
                  />
                </IconContainer>
                <p className="text-[#3A70E2] font-sans text-[16px] font-normal">
                  Move
                </p>
              </ButtonInfo>

              <ButtonInfo>
                <IconContainer>
                  {" "}
                  <Image
                    src={"/svgs/right-arrow.svg"}
                    width={16}
                    height={16}
                    alt="right arrow image"
                  />
                </IconContainer>
                <p className="text-[#3A70E2] font-sans text-[16px] font-normal">
                  Check-in
                </p>
              </ButtonInfo>
            </ProfileButtons> */}
            </ProfileDetails>
          </ProfileContainer>
          <ProfileDescription className="scroll bg-white rounded-3xl">
            <section
              className=" h-full
            text-[#FFFFFF] p-5 bg-white rounded-2xl
            "
            >
              <div className="flex  justify-between bg-[#F7F7F7] ">
                <div className="flex flex-row gap-12">
                  {tabs.map((option) => (
                    <div
                      className="flex items-center h-fit relative flex-col cursor-pointer"
                      key={option}
                    >
                      <span
                        className={`text-[#4b4b4b] ${selectedTab === option &&
                          "bg-blue-b3 text-button-color"
                          } text-center text-[16px] font-medium leading-[26px] tracking-normal p-2 `}
                        onClick={() => setSelectedTab(option)}
                      >
                        {option}
                      </span>
                      {selectedTab === option && (
                        <div className="border-b-[2px] border-solid border-button-color w-full mx-auto self-center"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className=" cursor-pointer flex gap-2 items-center justify-center w-fit p-1 rounded-sm mr-5">
                  <Image
                    src={"/images/export.png"}
                    alt="export"
                    width={20}
                    height={20}
                  />
                  <span className=" text-[blue] text-sm">Export</span>
                </div>
              </div>

              <Accordion
                type="multiple"
                defaultValue={[
                  "item-1",
                  "item-2",
                  "item-3",
                  "item-4",
                  "item-5",
                  "item-6",
                  "item-7",
                  "item-8",
                ]}
              >
                {selectedTab === "Child Details" && (
                  <>
                    <div className="flex flex-row w-full gap-5">
                      <div className="w-1/2 mb-7">
                        <AccordionItem
                          value="item-1"
                          // [box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px]
                          className="my-5  rounded-2xl border-2  [box-shadow:rgba(226,_226,_226,_1)_0px_2px_6px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px]"
                        >
                          {" "}
                          <HeaderBar>
                            <AccordionTrigger className="hover:no-underline">
                              {" "}
                              <p className="text-[#000000]  font-sans text-[16px] font-[500]">
                                Child Details
                              </p>
                            </AccordionTrigger>

                            <Icon
                              type={"edit"}
                              onClick={() => setChildPersonal(true)}
                            />
                          </HeaderBar>
                          <AccordionContent className="bg-white rounded-lg">
                            <div className="pl-6 font-sans text-[16px]">
                              {renderItem(
                                " First Name",
                                capitalizeFirstLetter(
                                  totalChildData?.first_name
                                )
                              )}
                              {renderItem(
                                " Last Name",
                                capitalizeFirstLetter(totalChildData?.last_name)
                              )}
                              {renderItem(" Gender", totalChildData?.gender)}
                              {renderItem(
                                "  Class Name",
                                totalChildData?.classroom_details
                                  ? totalChildData?.classroom_details?.name
                                  : null
                              )}
                              {renderItem("Language", totalChildData?.language)}
                              <hr className="h-[1px] mr-5 my-2 bg-[#8E8E8E] " />

                              {renderItem(
                                "  Date of Birth",
                                totalChildData?.dob
                                  ? formatDateWithUTC(totalChildData?.dob)
                                  : ""
                              )}
                              {renderItem(
                                " Date of Joinig",
                                totalChildData?.joining_date
                                  ? formatDateWithUTC(
                                    totalChildData?.joining_date
                                  )
                                  : ""
                              )}

                              {/* <div className="grid grid-cols-2">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Age"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.age}
                    </p>
                  </div> */}
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                          value="item-2"
                          className="my-5  rounded-2xl border-2  [box-shadow:rgba(226,_226,_226,_1)_0px_2px_6px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px]"
                        >
                          {" "}
                          <HeaderBar>
                            <AccordionTrigger className="hover:no-underline">
                              {" "}
                              <p className="text-[#000000]  font-sans text-[16px] font-medium">
                                Parents Details
                              </p>
                            </AccordionTrigger>
                            <Icon
                              type={"edit"}
                              onClick={() => setparentDetails(!parenetDetails)}
                            />
                          </HeaderBar>
                          <AccordionContent className="bg-white rounded-lg ">
                            <div className="pl-6 font-sans text-[16px]">
                              <div className="flex items-center gap-3">
                                {" "}
                                <p className="font-sans text-[#4b4b4b] font-medium text-[16px]">
                                  Is Custodian?
                                </p>
                                <p className="font-sans text-black  text-lg">
                                  {childParentData?.[0]?.is_custodian
                                    ? "Yes"
                                    : "No"}
                                </p>
                              </div>
                              <div className="font-sans text-[#00858e] font-medium py-2">
                                {childParentData?.[0]?.is_custodian
                                  ? "Custodian Details"
                                  : "Parent 1 Details "}
                                :
                              </div>
                              {renderItem(
                                "Full Name",
                                `${capitalizeFirstLetter(
                                  childParentData?.[0]?.first_name
                                ) || ""
                                }
                                    ${capitalizeFirstLetter(
                                  childParentData?.[0]?.last_name
                                ) || ""
                                }`,
                                "capitalize"
                              )}
                              {renderItem(
                                "Relation",
                                childParentData?.[0]?.relation
                              )}
                              {renderItem(
                                "Gender",
                                childParentData?.[0]?.gender
                              )}
                              <div className="flex flex-col justify-start items-start">
                                {renderIcon(
                                  "phone",
                                  formatPhoneNumber(
                                    childParentData?.[0]?.phone_no
                                  )
                                )}
                                {renderIcon(
                                  "mail",
                                  childParentData?.[0]?.email
                                )}
                                {childParentData?.[0]?.address &&
                                  renderIcon(
                                    "home",
                                    childParentData?.[0]?.address &&
                                    createFullAddress(
                                      childParentData?.[0]?.address
                                    )
                                  )}
                              </div>
                              <hr className="h-[2px] mr-5 my-2 bg-[#8E8E8E] " />{" "}
                            </div>

                            {!childParentData?.[0]?.is_custodian &&
                              !childParentData?.[1]?.is_emergency_contact && (
                                <div className="pl-6 font-sans text-[16px]">
                                  <div className="font-sans text-[#00858e] font-medium py-2">
                                    Parent 2 Details :
                                  </div>

                                  {childParentData?.[1]?.first_name &&
                                    renderItem(
                                      "Full Name",
                                      `${childParentData?.[1]?.first_name} ${totalChildData?.parents?.[1]?.last_name}`,
                                      "capitalize"
                                    )}
                                  {childParentData?.[1]?.relation &&
                                    renderItem(
                                      "Relation",
                                      childParentData?.[1]?.relation
                                    )}
                                  {childParentData?.[1]?.gender &&
                                    renderItem(
                                      "Gender",
                                      childParentData?.[1]?.gender
                                    )}

                                  {childParentData?.[1]?.phone_no && (
                                    <div className="flex justify-start items-center gap-4 py-1">
                                      <Icon type="phone" />
                                      <p className="font-sans text-black text-[16px]">
                                        {formatPhoneNumber(
                                          childParentData?.[1]?.phone_no
                                        )}
                                      </p>
                                    </div>
                                  )}

                                  {childParentData?.[1]?.email && (
                                    <div className="flex justify-start items-center gap-4 py-1">
                                      <Icon type="mail" />
                                      <p className="font-sans text-black text-[16px]">
                                        {childParentData?.[1]?.email}
                                      </p>
                                    </div>
                                  )}

                                  {childParentData?.[1]?.address && (
                                    <div className="flex justify-start items-center gap-4 py-1">
                                      <Icon type="home" />
                                      <p className="font-sans text-black text-[16px]">
                                        {childParentData?.[1]?.address &&
                                          createFullAddress(
                                            childParentData?.[1]?.address
                                          )}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                          </AccordionContent>
                        </AccordionItem>
                      </div>
                      <div className="w-1/2 ">
                        <AccordionItem
                          value="item-5"
                          className="my-5 rounded-2xl  border-2  [box-shadow:rgba(226,_226,_226,_1)_0px_2px_6px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px]"
                        >
                          {" "}
                          <HeaderBar>
                            <AccordionTrigger className="hover:no-underline">
                              {" "}
                              <p className="text-[#000000]  font-sans text-[16px] font-medium">
                                Emergency Contact Details
                              </p>
                            </AccordionTrigger>
                            <Icon
                              type={"edit"}
                              onClick={() =>
                                setEmergencyContact(!emergencyContact)
                              }
                            />
                          </HeaderBar>
                          <AccordionContent className="bg-white rounded-lg ">
                            {emergencyDetails.length > 0 &&
                              emergencyDetails.map(
                                (item: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      className="pl-6 font-sans text-[16px]"
                                    >
                                      <div className="flex flex-row  justify-start gap-4 items-start py-2">
                                        <p className="font-sans text-[#4b4b4b] font-medium text-[16px]">
                                          Authorization to pickup the child?
                                        </p>
                                        <p className="font-sans text-black text-[16px]">
                                          {item?.is_pickup_authorized
                                            ? "Yes"
                                            : "No"}
                                        </p>
                                      </div>

                                      {item?.first_name &&
                                        renderItem(
                                          "Full Name",
                                          `${item?.first_name || ""} ${item?.last_name || ""
                                          }`,
                                          "capitalize"
                                        )}
                                      {item?.gender &&
                                        renderItem("Gender", item?.gender)}
                                      {item?.relation &&
                                        renderItem("Relation", item?.relation)}
                                      {item?.language &&
                                        renderItem("Language", item?.language)}
                                      {/* <div className="flex flex-col justify-start items-center">
                        <p className="font-sans text-grey-text font-medium text-sm">
                          {"Last Name"}
                        </p>
                        <p className="font-sans text-black text text-lg">
                          {totalChildData?.parents?.[0]?.last_name
                            ? totalChildData?.parents?.[0]?.last_name
                            : ""}
                        </p>
                      </div> */}
                                      {(emergencyDetails?.phone_no ||
                                        emergencyDetails?.alternate_phone_no) &&
                                        renderIcon(
                                          "phone",
                                          formatPhoneNumber(
                                            emergencyDetails?.phone_no
                                          ) ||
                                          formatPhoneNumber(
                                            emergencyDetails?.alternate_phone_no
                                          )
                                        )}

                                      {emergencyDetails?.email &&
                                        renderIcon(
                                          "mail",
                                          emergencyDetails?.email
                                        )}

                                      {emergencyDetails?.address &&
                                        renderIcon(
                                          "home",
                                          `${emergencyDetails?.address?.street?.trim()
                                            ? emergencyDetails?.address
                                              ?.street + ","
                                            : ""
                                          }${emergencyDetails?.address?.city_name
                                          } , ${emergencyDetails?.address
                                            ?.state_name
                                          } , ${emergencyDetails?.address
                                            ?.country_name
                                          }`
                                        )}
                                    </div>
                                  );
                                }
                              )}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                          value="item-6"
                          className="my-5  rounded-2xl  border-2  [box-shadow:rgba(226,_226,_226,_1)_0px_2px_6px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px]"
                        >
                          {" "}
                          <HeaderBar>
                            <AccordionTrigger className="hover:no-underline">
                              {" "}
                              <p className="text-[#000000]  font-sans text-[16px] font-medium">
                                Emergency Doctor Details
                              </p>
                            </AccordionTrigger>
                            <Icon
                              type={"edit"}
                              onClick={() => setEmergencydoctor(true)}
                            />
                          </HeaderBar>
                          <AccordionContent className="bg-white rounded-lg ">
                            <div className="pl-6 pb-6">
                              {totalChildData?.emergency_doctors?.[0]
                                ?.first_name &&
                                renderItem(
                                  "Full Name",
                                  `${totalChildData?.emergency_doctors?.[0]
                                    ?.first_name || ""
                                  } ${totalChildData?.emergency_doctors?.[0]
                                    ?.last_name || ""
                                  }`,
                                  "capitalize"
                                )}
                              {(totalChildData?.emergency_doctors?.[0]
                                ?.phone_no ||
                                totalChildData?.emergency_doctors?.[0]
                                  ?.alternate_phone_no) &&
                                (renderIcon(
                                  "phone",
                                  formatPhoneNumber(
                                    totalChildData?.emergency_doctors[0]
                                      ?.phone_no
                                  )
                                ) ||
                                  totalChildData?.emergency_doctors?.[0]
                                    ?.alternate_phone_no)}
                              {totalChildData?.emergency_doctors?.[0]?.email &&
                                renderIcon(
                                  "mail",
                                  totalChildData?.emergency_doctors?.[0]?.email
                                )}

                              {totalChildData?.emergency_doctors?.[0]
                                ?.address &&
                                (totalChildData?.emergency_doctors?.[0]?.address
                                  .city_name ||
                                  totalChildData?.emergency_doctors?.[0]
                                    ?.address.street ||
                                  totalChildData?.emergency_doctors?.[0]
                                    ?.address?.state_name ||
                                  totalChildData?.emergency_doctors?.[0]
                                    ?.address?.country_name) &&
                                renderIcon(
                                  "doctor",
                                  `${totalChildData?.emergency_doctors?.[0]
                                    ?.address?.street
                                    ? totalChildData.emergency_doctors[0]
                                      .address.street + ","
                                    : ""
                                  }${totalChildData?.emergency_doctors?.[0]
                                    ?.address?.city_name
                                    ? totalChildData?.emergency_doctors?.[0]
                                      ?.address?.city_name + ","
                                    : ""
                                  }${totalChildData?.emergency_doctors?.[0]
                                    ?.address?.state_name
                                    ? totalChildData?.emergency_doctors?.[0]
                                      ?.address?.state_name + ","
                                    : ""
                                  }${totalChildData?.emergency_doctors?.[0]
                                    ?.address?.country_name
                                    ? totalChildData?.emergency_doctors?.[0]
                                      ?.address?.country_name + ","
                                    : ""
                                  }${totalChildData?.emergency_doctors?.[0]
                                    ?.address?.postal_code
                                    ? totalChildData?.emergency_doctors?.[0]
                                      ?.address?.postal_code + ","
                                    : ""
                                  }`
                                )}

                              {/* <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Country"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors &&
                        totalChildData?.emergency_doctors?.[0]?.address
                          ?.country_name}
                    </p>
                  </div> */}
                              {/* <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Province"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors &&
                        totalChildData?.emergency_doctors?.[0]?.address
                          ?.state_name}
                    </p>
                  </div> */}
                              {/* <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"City"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors &&
                        totalChildData?.emergency_doctors?.[0]?.address
                          ?.city_name}
                    </p>
                  </div> */}
                              {/* <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Postal Code"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors &&
                        totalChildData?.emergency_doctors?.[0]?.address
                          ?.postal_code}
                    </p>
                  </div> */}

                              {/* <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {'Relation'}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors[0]?.relation || '---'}
                    </p>
                  </div> */}
                              {/* {childdetailsarr.map((item, index) => (
                  ))} */}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </div>
                    </div>
                  </>
                )}

                {selectedTab === "Medical Details" && (
                  <>
                    <AccordionItem
                      value="item-4"
                      className="my-5 rounded-2xl mt-3 border-2  [box-shadow:rgba(226,_226,_226,_1)_0px_2px_6px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px]"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger className="hover:no-underline">
                          {" "}
                          <p className="text-[#000000] font-sans text-[16px] font-medium">
                            Medical Information
                          </p>
                        </AccordionTrigger>
                        <Button
                          variant={"ghost"}
                          onClick={() => setmedical(!medical)}
                        >
                          <Image
                            src={"/svgs/edit-icon.svg"}
                            width={24}
                            height={24}
                            alt=""
                          />{" "}
                          <p className="text-[#3a70e2] ml-1 font-[DM_Sans] text-sm font-normal cursor-pointer">
                            Edit
                          </p>
                        </Button>
                      </HeaderBar>
                      <AccordionContent className="bg-white rounded-lg ">
                        <div className="py-2 px-6">
                          <div className="flex flex-col justify-start items-start pb-4">
                            <p className="font-sans text-[#b3b3b3] font-medium text-[14px]">
                              Allergies
                            </p>
                            <p className="font-sans text-[#4b4b4b] text-[16px]">
                              {totalChildData?.medical_information?.[0]
                                ?.allergy_details?.allergies ||
                                "No allergies found"}
                            </p>
                          </div>

                          <div className="flex flex-col justify-start items-start pb-4">
                            <p className="font-sans text-[#b3b3b3] font-medium text-[14px]">
                              Medication
                            </p>
                            <p className="font-sans text-[#4b4b4b] text-[16px]">
                              {totalChildData?.medical_information?.[0]
                                ?.medication_details?.medication
                                ? totalChildData?.medical_information?.[0]
                                  ?.medication_details?.medication
                                : "No medication found"}
                            </p>
                          </div>

                          <div className="flex flex-col justify-start items-start pb-4">
                            <p className="font-sans text-[#b3b3b3] font-medium text-[14px]">
                              Is the child anaphylactic?
                            </p>
                            <p className="font-sans text-[#4b4b4b] text-[16px]">
                              {totalChildData?.medical_information?.[0]
                                ?.is_child_anaphylactic
                                ? "Yes"
                                : "No"}
                            </p>
                          </div>

                          {totalChildData?.medical_information?.[0]
                            .is_child_anaphylactic && (
                              <div className="w-full flex flex-col items-start justify-start gap-2">
                                <Link
                                  href={
                                    totalChildData?.medical_information?.[0]
                                      .allergy_file || ""
                                  }
                                  target=""
                                >
                                  <div style={{display:"flex"}}>
                                    <Image
                                      src={"/svgs/pdf-icon.svg"}
                                      width={24}
                                      height={24}
                                      alt=""
                                    />{" "}
                                    <Download className="text-grey-g1 cursor-pointer mx-2" />
                                  </div>
                                  <p>{decodeURIComponent(filename)}</p>
                                </Link>
                              </div>
                            )}

                          {/* <div className="flex items-center gap-4 ">
                    <Image
                      src={"/svgs/pdf-icon.svg"}
                      alt=""
                      width={32}
                      height={32}
                    />

                    <p className="text-[#4B4B4B] font-sans text-xl font-medium leading-[26px]">
                      Immunization Document
                    </p>
                  </div> */}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-3"
                      className="my-5 rounded-2xl mt-3 border-2  [box-shadow:rgba(226,_226,_226,_1)_0px_2px_6px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px]"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger className="hover:no-underline">
                          {" "}
                          <p className="text-[#000000] font-sans text-[16px] font-medium">
                            Immunization Details
                          </p>
                        </AccordionTrigger>
                        <p
                          className="flex gap-2 justify-end items-center mb-3 text-blue-b1 cursor-pointer m-5 mt-2 text-sm"
                          onClick={() => setopen(true)}
                        >
                          <Plus className="text-blue-b1 cursor-pointer" />
                          Add Document
                        </p>
                        {/* <Button variant={"ghost"} onClick={() => setImmunization(true)}>
                  <Image
                    src={"/svgs/edit-icon.svg"}
                    width={24}
                    height={24}
                    alt=""
                  />{" "}
                  <p
                    className="text-[#3a70e2] font-[DM_Sans] text-[16px] font-normal cursor-pointer"
                    onClick={() => setImmunization(true)}
                  >
                    Add
                  </p>
                </Button> */}
                      </HeaderBar>
                      <AccordionContent className="bg-white rounded-lg ">
                        <Immunazationtable
                          id={child_Id}
                          data={totalChildData}
                          getChildData={getChildData}
                          setImmunization={setImmunization}
                          Immunization={Immunization}
                          open={open}
                          setopen={setopen}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </>
                )}

                {selectedTab === "Incident Report" && (
                  <>
                    <AccordionItem
                      value="item-8"
                      className="my-5 rounded-2xl mt-3 border-2  [box-shadow:rgba(226,_226,_226,_1)_0px_2px_6px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px]"
                    >
                      {" "}
                      <HeaderBar>
                        <AccordionTrigger className="hover:no-underline">
                          {" "}
                          <p className="text-[#000000] font-sans text-[16px] font-medium">
                            Incident Report
                          </p>
                        </AccordionTrigger>
                        <Button
                          variant={"ghost"}
                          className="flex justify-center items-center"
                        >
                          <Plus className="text-blue-b1 cursor-pointer text-sm" />
                          <p
                            className="text-[#3a70e2] font-[DM_Sans] text-sm font-normal cursor-pointer"
                            onClick={() => {
                              router.push(
                                `/reports?set=Classroom Reports&tab=Incident Report?true`
                              );
                            }}
                          >
                            Add Incident
                          </p>
                        </Button>
                      </HeaderBar>
                      <AccordionContent className="bg-white rounded-lg ">
                        <div className="grid grid-cols-3 gap-[61px] p-10">
                          {incidentreportdetailarr.map((item, index) => (
                            <div
                              className="flex flex-col justify-start items-start"
                              key={index}
                            >
                              <p className="font-sans font-medium text-[#4b4b4b] text-[16px]">
                                {item.key}
                              </p>
                              <p className="font-sans text-black text-[#333333] text-sm">
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </>
                )}
                {/* other Details  */}
                {/* <AccordionItem value="item-7" className="pt-5">
              {" "}
              <HeaderBar>
                <AccordionTrigger className="hover:no-underline">
                  {" "}
                  <p className="text-[#00000099] font-sans text-[18px] font-medium">
                    Other Details
                  </p>
                </AccordionTrigger>
                <Button variant={"ghost"} onClick={() => setOther(!other)}>
                  <Image
                    src={"/svgs/edit-icon.svg"}
                    width={24}
                    height={24}
                    alt=""
                  />{" "}
                  <p className="text-[#3a70e2] font-[DM_Sans] text-[16px] font-normal cursor-pointer">
                    Edit
                  </p>
                </Button>
              </HeaderBar>
              <AccordionContent className="bg-white rounded-lg ">
                <div className="p-10">
                  <div className="flex flex-col justify-start items-start pb-4">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      Does child use diaper?
                    </p>
                    <p className="font-sans text-black text-lg">Yes</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem> */}
              </Accordion>
            </section>
          </ProfileDescription>
        </DailyReportContainer>
      )}

      {/*  Edit Modals  */}
      {childPersonal && (
        <div className="bg-white">
          <Modal
            modalOpen={childPersonal}
            closeModal={() => setChildPersonal(!childPersonal)}
          >
            <ChildPersonalDetails
              data={totalChildData}
              id={child_Id}
              closeModal={() => setChildPersonal(!childPersonal)}
              getChildData={getChildData}
            />
          </Modal>
        </div>
      )}
      {parenetDetails && (
        <div>
          <Modal
            modalOpen={parenetDetails}
            closeModal={() => setparentDetails(!parenetDetails)}
          >
            <Parentupdate
              data={childParentData}
              id={child_Id}
              closeModal={() => setparentDetails(!parenetDetails)}
              getChildData={getChildData}
            />
          </Modal>
        </div>
      )}
      {open && (
        <div>
          <Modal modalOpen={open} closeModal={() => setopen(!open)}>
            <DocModal
              closeModal={() => setopen(!open)}
              id={child_Id}
              reloadTable={getChildData}
            />
          </Modal>
        </div>
      )}
      {/* {Immunization && (
        <div>
          <Modal
            modalOpen={Immunization}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={() => setImmunization(!Immunization)}
            modalName={"LooModal"}
          >
            <ChildPersonalDetails />
          </Modal>
        </div>
      )} */}
      {medical && (
        <div>
          <Modal modalOpen={medical} closeModal={() => setmedical(!medical)}>
            <MedicalInfo
              data={totalChildData}
              id={child_Id}
              closeModal={() => setmedical(!medical)}
              getChildData={getChildData}
            />
          </Modal>
        </div>
      )}
      {emergencyContact && (
        <div>
          <Modal
            modalOpen={emergencyContact}
            closeModal={() => setEmergencyContact(!emergencyContact)}
          >
            <EmergencyContact
              data={totalChildData}
              id={child_Id}
              closeModal={() => setEmergencyContact(!emergencyContact)}
              getChildData={getChildData}
              emergencyDetails={emergencyDetails[0]}
            />
          </Modal>
        </div>
      )}
      {emergencydoctor && (
        <div>
          <Modal
            modalOpen={emergencydoctor}
            closeModal={() => setEmergencydoctor(!emergencydoctor)}
          >
            <DoctorInfo
              data={totalChildData}
              id={child_Id}
              closeModal={() => setEmergencydoctor(!emergencydoctor)}
              getChildData={getChildData}
            />
          </Modal>
        </div>
      )}
      {other && (
        <div>
          <Modal modalOpen={other} closeModal={() => setOther(!other)}>
            <OtherDetails
              data={totalChildData}
              id={child_Id}
              closeModal={() => setOther(!other)}
              getChildData={getChildData}
            />
          </Modal>
        </div>
      )}
      {checkInModal && (
        <div>
          <Modal
            modalOpen={checkInModal}
            closeModal={() => setCheckInModal(!checkInModal)}
          >
            {/* <CheckInModalChild closeModal={() => setCheckInModal(!checkInModal)} modalOpen={checkInModal} /> */}
            <CheckInModalChild
              data={totalChildData}
              id={child_Id}
              closeModal={() => setCheckInModal(!checkInModal)}
              getChildData={getChildData}
              enrollment_id={enrollment_id}
            />
          </Modal>
        </div>
      )}
      {checkOutModal && (
        <div>
          <Modal
            modalOpen={checkOutModal}
            closeModal={() => setCheckOutModal(!checkOutModal)}
          >
            {/* <CheckInModalChild closeModal={() => setCheckInModal(!checkInModal)} modalOpen={checkInModal} /> */}
            <CheckOutModalChild
              data={totalChildData}
              id={child_Id}
              closeModal={() => setCheckOutModal(!checkOutModal)}
              getChildData={getChildData}
              enrollment_id={enrollment_id}
            />
          </Modal>
        </div>
      )}
      {moveChild && (
        <div>
          <Modal
            modalOpen={moveChild}
            closeModal={() => setMoveChild(!moveChild)}
          >
            {/* <CheckInModalChild closeModal={() => setCheckInModal(!checkInModal)} modalOpen={checkInModal} /> */}
            <MoveRoomModal
              data={totalChildData}
              id={child_Id}
              closeModal={() => setMoveChild(!moveChild)}
              getChildData={getChildData}
              enrollment_id={enrollment_id}
            />
          </Modal>
        </div>
      )}
      <style>{`
      /* For webkit-based browsers (Chrome, Safari) */
      .scroll::-webkit-scrollbar {
        
        width: 10px;
       border-radius:20px;
      }
      
      .scroll::-webkit-scrollbar-thumb {
        background-color: gray;
         /* Set the color of the scrollbar thumb */
      }
      
      .scroll::-webkit-scrollbar-track {
      //  background-color: #f1f1f1; /* Set the color of the scrollbar track */
      }
      


     
      
      `}</style>
    </div>
  );
};

export default ChildProfile;
