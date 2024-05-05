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
import { Plus } from "lucide-react";
import DocModal from "./childEditModal/DocModal";
import moment from "moment";

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
  const [emergencydoctor, setEmergencydoctor] = useState<boolean>(false);
  const [other, setOther] = useState<boolean>(false);
  const [checkInModal, setCheckInModal] = useState<boolean>(false);
  const [moveChild, setMoveChild] = useState<boolean>(false);

  const [totalChildData, setTotalChilData] = useState<any>([]);
  const [emergencyDetails, setEmergencyDetail] = useState<any>([]);
  const [open, setopen] = useState<boolean>(false)

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

  // console.log(totalChildData?.joining_date, todayunixTime, joinignDateunix, todayDateUnix)
  // console.log('todayunixTime', joinignDateunix < todayDateUnix);

  let child_Id: any = searchParams?.get("child_id");
  let enrollment_id: any = searchParams?.get("enrollment_id");

  const getChildData = async () => {
    let res;
    try {
      if (child_Id) {
        res = await getChildprofileDetail(child_Id);
      }
      // console.log(res)
      if (res?.success) {
        setTotalChilData(res?.data);
        let parentsData = res?.data?.parents;
        let emrgency_details = parentsData?.filter((parentsData: any) => {
          return parentsData?.is_emergency_contact;
        });
        setEmergencyDetail(emrgency_details[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  // console.log("total child data", totalChildData);
  const handleCheckIn = () => {
    setCheckInModal(true);
  };
  const handleMove = () => {
    setMoveChild(true);
  };

  function isDateGreaterThanOrEqualToToday(dateString: any) {
    const givenDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);

    let GivenUnix = Math.floor(givenDate.getTime() / 1000)
    let todayunix = Math.floor(today.getTime() / 1000)
    console.log('today',todayunix,'givenDate',GivenUnix , GivenUnix <= todayunix)
    return (GivenUnix <= todayunix);
  }

  return (
    <div className="bg-[url('/images/classroom-background.png')] ">
      <Button type="button" onClick={() => router.back()} className="mx-2 my-2">
        {"<- Back"}
      </Button>
      <DailyReportContainer className="md:flex md:flex-col md:justify-center md:items-center lg:flex-row  lg:items-center ">
        <ProfileContainer className="bg-white border-2 border-[#D3E4E6] ">
          <ProfileDetails>
            <ImgContainer>
              <Image
                src={
                  totalChildData?.photo
                    ? totalChildData?.photo
                    : "/svgs/no-image.svg"
                }
                width={204}
                height={204}
                alt="coodle image"
                className="w-[204px] h-[204px] rounded-full object-cover"
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
                <p className="text-[#4B4B4B] leading-5 font-sans text-[24px] font-medium mt-2 capitalize">
                  {`${totalChildData?.first_name} ${totalChildData?.last_name}`}
                </p>
              )}
              <TagContainer>
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
                            console.log(ele?.allergy_details?.allergies);
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
                {/* <div className="bg-[#FFF2EE] rounded-e-sm text-[#EC2D30] font-sans text-[12px] font-medium p-2 cursor-pointer	">
                  Important Info
                </div> */}
              </TagContainer>
              <div className="w-1/2  flex flex-row justify-between mt-5 mr-10">
                <Image
                  src={
                    totalChildData?.classroom_details?.logo
                      ? totalChildData?.classroom_details?.logo
                      : "/svgs/no-image.svg"
                  }
                  width={60}
                  height={60}
                  alt="coodle image"
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />

                <div className="ml-4">
                  <p className="text-[#0000004D] font-sans text-[14px] font-medium">
                    Classroom
                  </p>
                  <p className="text-[#4B4B4B] font-sans text-[20px] font-medium">
                    {totalChildData?.classroom_details
                      ? totalChildData?.classroom_details?.name
                      : null}
                  </p>
                </div>
              </div>
            </ProfileInfo>
            {/* {joinignDateunix.isSameOrAfter(todayDateUnix) ? (
            ) null: null} */}

            {isDateGreaterThanOrEqualToToday(totalChildData?.joining_date) && <div>
              <button
                className="w-[250px] mt-3 py-2 bg-[#12A321] flex flex-row items-center justify-center gap-2 rounded-md text-[#FFFFFF] font-semibold font-sans text-[16px]"
                onClick={handleCheckIn}
              >
                <Image
                  src={"/svgs/right-arrows.svg"}
                  width={15}
                  height={17}
                  alt="n"
                />
                Check-in
              </button>

              <button
                className="w-[250px] border border-[#FE632F] mt-1 py-2  bg-[#FFFFFF] flex flex-row items-center justify-center gap-2 font-semibold rounded-md text-[#FE632F]  font-sans text-[16px]"
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

              <button
                className="w-[250px] py-2 mt-1  border border-[#3A70E2] bg-[#FFFFFF] flex flex-row items-center justify-center gap-2 font-semibold rounded-md text-[#3A70E2]  font-sans text-[16px]"
                onClick={handleRoute}
              >
                <Image
                  src={"/svgs/mulative.svg"}
                  width={15}
                  height={17}
                  alt="n"
                />
                View Reports
              </button>
            </div>}

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
        <ProfileDescription className="scroll rounded-lg">
          {/* <CalendarContainer>
            {" "}
            <DatePickerComponent
              label=""
              name="DailyReport"
              control={control}
            />
          </CalendarContainer> */}
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
            <AccordionItem value="item-1" className="bg-white rounded-2xl">
              {" "}
              <HeaderBar>
                <AccordionTrigger className="hover:no-underline">
                  {" "}
                  <p className="text-[#00000099]  font-sans text-[18px] font-medium">
                    Child Details
                  </p>
                </AccordionTrigger>
                <Button variant={"ghost"}>
                  <Image
                    src={"/svgs/edit-icon.svg"}
                    width={24}
                    height={24}
                    alt=""
                  />{" "}
                  <p
                    className="text-[#3a70e2] font-sans text-[16px] font-normal cursor-pointer"
                    onClick={() => setChildPersonal(true)}
                  >
                    Edit
                  </p>
                </Button>
              </HeaderBar>
              <AccordionContent className="bg-white rounded-lg">
                <div className="grid grid-cols-4 gap-[61px] p-10 ">
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"First Name"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.first_name}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Last Name"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.last_name}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Class"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.classroom_details
                        ? totalChildData?.classroom_details?.name
                        : null}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Language"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.language}
                    </p>
                  </div>
                  {/* <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Age"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.age}
                    </p>
                  </div> */}
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Date Of Birth"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {Date_formator_mmm_dd_yyyy(totalChildData?.dob)}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Date of Joinig"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.joining_date}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Gender"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.gender}
                    </p>
                  </div>

                  {/* {childdetailsarr.map((item, index) => (
                  ))} */}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="mt-5 bg-white rounded-2xl">
              {" "}
              <HeaderBar>
                <AccordionTrigger className="hover:no-underline">
                  {" "}
                  <p className="text-[#00000099] font-sans text-[18px] font-medium">
                    Parents Details
                  </p>
                </AccordionTrigger>
                <Button variant={"ghost"}>
                  <Image
                    src={"/svgs/edit-icon.svg"}
                    width={24}
                    height={24}
                    alt=""
                  />{" "}
                  <p
                    className="text-[#3a70e2] font-[DM_Sans] text-[16px] font-normal cursor-pointer"
                    onClick={() => setparentDetails(!parenetDetails)}
                  >
                    Edit
                  </p>
                </Button>
              </HeaderBar>
              <AccordionContent className="bg-white rounded-lg ">
                <div className="flex flex-col items-start justify-start p-10 gap-[20px]">
                  <div>
                    {" "}
                    <p className="font-sans text-grey-text font-medium text-sm">
                      Is Custodian?
                    </p>
                    <p className="font-sans text-black  text-lg">
                      {" "}
                      {totalChildData?.parents?.[0]?.is_custodian
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className=" text-sm text-[rgba(0, 0, 0, 0.80)]">
                      <h2 style={{ fontWeight: "600" }}>
                        {totalChildData?.parents?.[0]?.is_custodian
                          ? "Custodian Details"
                          : "Parent 1 Personal Details"}{" "}
                        :
                      </h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[61px]">
                    <div className="flex flex-col justify-start items-start">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"First Name"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {totalChildData?.parents?.[0]?.first_name
                          ? totalChildData?.parents?.[0]?.first_name
                          : ""}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Last Name"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {totalChildData?.parents?.[0]?.last_name
                          ? totalChildData?.parents?.[0]?.last_name
                          : ""}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Email"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {totalChildData?.parents?.[0]?.email}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Phone Number"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {totalChildData?.parents?.[0]?.phone_no}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Relation To Child"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {totalChildData?.parents?.[0]?.relation}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {"Gender"}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {totalChildData?.parents?.[0]?.gender}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Address"}
                    </p>
                    {totalChildData?.parents && (
                      <p className="font-sans text-black text text-lg">
                        {totalChildData?.parents?.[0]?.address &&
                          `${totalChildData?.parents?.[0]?.address?.street} , ${totalChildData?.parents?.[0]?.address?.city_name} , ${totalChildData?.parents?.[0]?.address?.state_name} , ${totalChildData?.parents?.[0]?.address?.country_name}`}
                      </p>
                    )}
                  </div>
                  <hr />
                  {!totalChildData?.parents?.[0]?.is_custodian && (
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <div className="text-sm text-[rgba(0, 0, 0, 0.80)]">
                          <h2 style={{ fontWeight: "600" }}>
                            Parent 2 Personal Details :
                          </h2>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-[61px]">
                        <div className="flex flex-col justify-start items-start">
                          <p className="font-sans text-grey-text font-medium text-sm">
                            {"First Name"}
                          </p>
                          <p className="font-sans text-black text text-lg">
                            {totalChildData?.parents?.[1]?.first_name}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <p className="font-sans text-grey-text font-medium text-sm">
                            {"Last Name"}
                          </p>
                          <p className="font-sans text-black text text-lg">
                            {totalChildData?.parents?.[1]?.last_name}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <p className="font-sans text-grey-text font-medium text-sm">
                            {"Email"}
                          </p>
                          <p className="font-sans text-black text text-lg">
                            {totalChildData?.parents?.[1]?.email}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <p className="font-sans text-grey-text font-medium text-sm">
                            {"Phone Number"}
                          </p>
                          <p className="font-sans text-black text text-lg">
                            {totalChildData?.parents?.[1]?.phone_no}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <p className="font-sans text-grey-text font-medium text-sm">
                            {"Relation To Child"}
                          </p>
                          <p className="font-sans text-black text text-lg">
                            {totalChildData?.parents?.[1]?.relation}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <p className="font-sans text-grey-text font-medium text-sm">
                            {"Gender"}
                          </p>
                          <p className="font-sans text-black text text-lg">
                            {totalChildData?.parents?.[1]?.gender}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col justify-start items-start">
                        <p className="font-sans text-grey-text font-medium text-sm">
                          {"Address"}
                        </p>
                        {totalChildData?.parents?.[1] && (
                          <p className="font-sans text-black text text-lg">
                            {`${totalChildData?.parents?.[1]?.address?.street} , ${totalChildData?.parents?.[1]?.address?.city_name} , ${totalChildData?.parents?.[1]?.address?.state_name} , ${totalChildData?.parents?.[1]?.address?.country_name}`}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="mt-5 bg-white rounded-2xl">
              {" "}
              <HeaderBar>
                <AccordionTrigger className="hover:no-underline">
                  {" "}
                  <p className="text-[#00000099] font-sans text-[18px] font-medium">
                    Immunization Details
                  </p>
                </AccordionTrigger>
                <p className="flex gap-2 justify-end mb-3 text-blue-b1 cursor-pointer m-5 mt-2" onClick={() => setopen(true)} >
                    <Plus className="text-blue-b1 cursor-pointer" />Add Document</p>
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

            <AccordionItem value="item-4" className="mt-5 bg-white rounded-2xl">
              {" "}
              <HeaderBar>
                <AccordionTrigger className="hover:no-underline">
                  {" "}
                  <p className="text-[#00000099] font-sans text-[18px] font-medium">
                    Medical Information
                  </p>
                </AccordionTrigger>
                <Button variant={"ghost"} onClick={() => setmedical(!medical)}>
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
                      Allergies
                    </p>
                    <p className="font-sans text-black text-lg">
                      {
                        totalChildData?.medical_information?.[0]
                          ?.allergy_details?.allergies
                      }
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start pb-4">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      Medication
                    </p>
                    <p className="font-sans text-black text-lg">
                      {
                        totalChildData?.medical_information?.[0]
                          ?.medication_details?.medication
                      }
                    </p>
                  </div>
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

            <AccordionItem value="item-5" className="mt-5 bg-white rounded-2xl">
              {" "}
              <HeaderBar>
                <AccordionTrigger className="hover:no-underline">
                  {" "}
                  <p className="text-[#00000099] font-sans text-[18px] font-medium">
                    Emergency Contact Details
                  </p>
                </AccordionTrigger>
                <Button
                  variant={"ghost"}
                  onClick={() => setEmergencyContact(!emergencyContact)}
                >
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
                      Authorization to pickup the child?
                    </p>
                    <p className="font-sans text-black text-lg">
                      {emergencyDetails?.is_pickup_authorized ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-[61px] px-10 pb-10">
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"First Name"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {emergencyDetails?.first_name}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Last Name"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {emergencyDetails?.last_name}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Phone Number"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {emergencyDetails?.phone_no ||
                        emergencyDetails?.alternate_phone_no}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="mt-5 bg-white rounded-2xl">
              {" "}
              <HeaderBar>
                <AccordionTrigger className="hover:no-underline">
                  {" "}
                  <p className="text-[#00000099] font-sans text-[18px] font-medium">
                    Emergency Doctor Details
                  </p>
                </AccordionTrigger>
                <Button
                  variant={"ghost"}
                  onClick={() => setEmergencydoctor(true)}
                >
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
                <div className="grid grid-cols-4 gap-[61px] p-10">
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"First Name"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors?.[0]?.first_name}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Last Name"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors?.[0]?.last_name}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Phone Number"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors?.[0]?.phone_no ||
                        totalChildData?.emergency_doctors?.[0]
                          ?.alternate_phone_no}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Email"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors?.[0]?.email}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Street"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors?.[0]?.address?.street}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Country"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors?.[0]?.address?.country_name}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Province"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors?.[0]?.address?.state_name}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"City"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors?.[0]?.address?.city_name}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-sans text-grey-text font-medium text-sm">
                      {"Postal Code"}
                    </p>
                    <p className="font-sans text-black text text-lg">
                      {totalChildData?.emergency_doctors?.[0]?.address?.postal_code}
                    </p>
                  </div>
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

            <AccordionItem value="item-8" className="mt-5 bg-white rounded-2xl">
              {" "}
              <HeaderBar>
                <AccordionTrigger className="hover:no-underline">
                  {" "}
                  <p className="text-[#00000099] font-sans text-[18px] font-medium">
                    Incident Report
                  </p>
                </AccordionTrigger>
                <Button variant={"ghost"}>
                  <p className="text-[#3a70e2] font-[DM_Sans] text-[16px] font-normal cursor-pointer">
                    + View All Incidents
                  </p>
                </Button>
              </HeaderBar>
              <AccordionContent className="bg-white rounded-lg ">
                <div className="grid grid-cols-4 gap-[61px] p-10">
                  {incidentreportdetailarr.map((item, index) => (
                    <div
                      className="flex flex-col justify-start items-start"
                      key={index}
                    >
                      <p className="font-sans text-grey-text font-medium text-sm">
                        {item.key}
                      </p>
                      <p className="font-sans text-black text text-lg">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ProfileDescription>
      </DailyReportContainer>

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
              data={totalChildData}
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
              emergencyDetails={emergencyDetails}
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
        width: 8px;
       border-radius:20px;
      }
      
      .scroll::-webkit-scrollbar-thumb {
        background-color: #4B4B4B;
         /* Set the color of the scrollbar thumb */
      }
      
      .scroll::-webkit-scrollbar-track {
      //  background-color: #f1f1f1; /* Set the color of the scrollbar track */
      }
      


      .sc-dmlpXa{
        border:1px solid rgba(0, 0, 0, 0.20);
      }
      
      `}</style>
    </div>
  );
};

export default ChildProfile;
