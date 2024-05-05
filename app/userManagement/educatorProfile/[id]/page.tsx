"use client";
import React, { useEffect, useState } from "react";
import {
  ActivityContainer,
  ActivityDetails,
  ActivityInfo,
  ButtonInfo,
  Description,
  EducatorManagementContainer,
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
} from "../educatorProfile.styled";
import Image from "next/image";
import { DatePickerComponent } from "@/components/ui/datePicker";
import { useForm } from "react-hook-form";
import DocumentUpload from "@/components/common/DocumentUpload";
import { useParams, useRouter } from "next/navigation";
import {
  capitalizeFirstLetter,
  createFullAddress,
  disableActionIfHoliday,
  disableActionIfNotWorkingDay,
  formatDateWithUTC,
  formatPhoneNumber,
} from "@/utils/utilityFunctions";
import {
  educatorCheckinCheckout,
  getUserDetails,
} from "../../userManagementApi";
import path from "path";
import Modal from "@/components/common/Modal/Modal";
import EditPersonalDetail from "../../ModalComponents/EditPersonalDetail";
import EditAvailability from "../../ModalComponents/EditAvailability";
import EditDocument from "../../ModalComponents/EditDocuments";
import EditEmergency from "../../ModalComponents/EditEmergency";
import EditOtherDetails from "../../ModalComponents/EditOtherDetails";
import format from "date-fns/format";
import { classroomlist } from "@/app/classroomManagement/classroomManagentAPI";
import FormModal from "@/components/common/FormModal";
import EditPersonalDetailModal from "../../components/EditPersonalDetailsModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckOutCheckInValidationSchema } from "@/app/daycareManagement/educatorManagement/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckInModalProfile from "../../ModalComponents/CheckInModalProfile";
import CheckOutModalProfile from "../../ModalComponents/CheckOutModalProfile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RecordTable from "@/app/daycareManagement/components/RecordTable";
import { Separator } from "@/components/ui/separator";
import CertificationTable from "@/app/daycareManagement/components/CertificationTable";
import TrainingTable from "@/app/daycareManagement/components/TrainingTable";
import { ChevronLeft, EditIcon, XIcon } from "lucide-react";
import ImageUpload from "@/components/common/ImageUpload";
import { ChildRegistrationProfile } from "@/app/childRegistration/childregestrationAPI";
import { EdituserMangementPersonalDetails } from "@/services/User-management-API";
import { isDateGreaterThanOrEqualToToday } from "@/utils/utilityFunctions";
import { authuserList, roleList } from "@/services/authpermission";
import { useGlobalContext } from "@/app/context/store";
import { useSearchParams } from "next/navigation";
// import { useSearchParams } from "next/navigation";

type AddressParams = {
  state: string;
  city: string;
  country: string;
  pincode: string;
  street: string;
};
const Page: React.FC<{ tab?: string }> = ({ tab }) => {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  let searchparam = useSearchParams();
  let admin = searchparam?.get("admin");

  const [userData, setUserData] = useState<any>([]);
  const [otherData, setOtherData] = useState<any>([]);
  const [classroomData, setClassroomData] = useState<
    { value: string; label: string }[]
  >([]);
  const [checkInStatus, setCheckInStatus] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPersonalDetail, setEditPersonalDetail] = useState(false);
  const [editAvailability, setEditAvailability] = useState(false);
  const [editDocument, setEditDocument] = useState(false);
  const [editEmergency, setEditEmergency] = useState(false);
  const [editOtherDetails, setEditOtherDetails] = useState(false);
  const [attendanceId, setAttendanceId] = useState(0);
  const [checkinmodalopen, setCheckInModalOpen] = useState(false);
  const [checkoutmodalopen, setCheckOutModalOpen] = useState(false);
  const [startUnixTime, setStartUnixTime] = useState<any>();
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [roleData, setRoleData] = useState<any>([]);

  //   const router = useRouter();
  //   const { id } = router.query as { id: string };
  // let todayUnixDate = Date.now();
  // const dateObject = new Date(userData?.otherInfo?.start_date);
  // const unixTime = dateObject.getTime();

  let todayUnixDate = Date.now();
  const dateString = userData?.otherInfo?.start_date;
  const dateObject = new Date(dateString);
  const unixTime = dateObject.getTime();

  const { globalHolidayList, globalSettings } = useGlobalContext();
  const holiDayName = disableActionIfHoliday(globalHolidayList);
  const workingDay =
    globalSettings.workingDays &&
    disableActionIfNotWorkingDay(globalSettings.workingDays);

  const params = useParams();

  //this function will open check in modal
  const OpenCheckInModal = () => {
    setCheckInModalOpen(true);
  };

  //this function will close check in modal
  const CloseCheckInModal = () => {
    setCheckInModalOpen(false);
  };

  //this function will open check out modal
  const OpenCheckOutModal = (id: any) => {
    setAttendanceId(id);
    setCheckOutModalOpen(true);
  };

  //this function will close check out modal
  const CloseCheckOutModal = () => {
    setCheckOutModalOpen(false);
  };
  const getUserDetailsData = async () => {
    let res = await getUserDetails(params?.id);
    if (params?.id) {
      try {
        if (res?.success) {
          setUserData(res?.data);
          setOtherData(res?.data.otherInfo);
          let checkatt: any = res?.data.attendance;
          setCheckInStatus(checkatt);
        } else {
          // console.log(res);
        }
      } catch (error: any) {
        if (error.response.status == 404) {
          toast.error(error.response.data.message);
        }
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getUserDetailsData();
  }, [params?.id]);

  //this function will open the modal
  const openModal = (modalValue: string) => {
    if (modalValue === "EditPersonalDetailModal") {
      setEditPersonalDetail(true);
      setEditAvailability(false);
      setEditDocument(false);
      setEditEmergency(false);
      setEditOtherDetails(false);
    }
    if (modalValue === "EditAvailabiltyModal") {
      setEditAvailability(true);
      setEditPersonalDetail(false);
      setEditDocument(false);
      setEditEmergency(false);
      setEditOtherDetails(false);
    }
    if (modalValue === "EditDocumentModal") {
      setEditDocument(true);
      setEditAvailability(false);
      setEditPersonalDetail(false);
      setEditEmergency(false);
      setEditOtherDetails(false);
    }
    if (modalValue === "EditEmergencyModal") {
      setEditEmergency(true);
      setEditDocument(false);
      setEditAvailability(false);
      setEditPersonalDetail(false);
      setEditOtherDetails(false);
    }
    if (modalValue === "EditOtherDetailsModal") {
      setEditOtherDetails(true);
      setEditEmergency(false);
      setEditDocument(false);
      setEditAvailability(false);
      setEditPersonalDetail(false);
    }
    setModalOpen(true);
  };

  // this function will close the modal
  const closeModal = (modalValue: string) => {
    if (modalValue === "EditPersonalDetailModal") {
      setEditPersonalDetail(false);
    }
    if (modalValue === "EditAvailabiltyModal") {
      setEditAvailability(false);
    }
    if (modalValue === "EditDocumentModal") {
      setEditDocument(false);
    }
    if (modalValue === "EditEmergencyModal") {
      setEditEmergency(false);
    }
    if (modalValue === "EditOtherDetailsModal") {
      setEditOtherDetails(false);
    }
    setModalOpen(false);
  };

  let certificationData = otherData?.certifications?.certifications || [];

  const childdetailsarr = [
    {
      key: "First Name",
      value: capitalizeFirstLetter(userData?.usersDetails?.firstName) || null,
    },
    {
      key: "Last Name",
      value: capitalizeFirstLetter(userData?.usersDetails?.lastName) || null,
    },
    {
      key: "Email Address",
      value: userData?.usersDetails?.email || null,
    },
    {
      key: "Phone Number",
      value: formatPhoneNumber(userData?.usersDetails?.phoneNo) || null,
    },
    {
      key: "Date of Birth",
      value: userData?.usersDetails?.dob
        ? formatDateWithUTC(userData?.usersDetails?.dob)
        : null,
    },
    {
      key: "Gender",
      value: userData?.usersDetails?.gender || null,
    },
    {
      key: "Address",
      value: userData?.address ? createFullAddress(userData?.address) : null,
    },
  ];

  const handleCheckInCheckOut = async (action: string) => {
    try {
      let id = params?.id;
      let body = {
        staffId: id,
        actionType: action,
      };
      let res = await educatorCheckinCheckout(body);
      if (res.success) {
        toast.success(res.message);
        // if (res.message === "Check-in successful. !!") {
        //   setCheckInStatus(true);
        // } else {
        //   setCheckInStatus(false);
        // }
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("error", error);
    }
  };

  const getclassroomlist = async () => {
    let res;
    try {
      res = await classroomlist();
      if (res?.success) {
        const newArray = res?.data?.list.map((item: any, index: number) => ({
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
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getclassroomlist();
  }, []);

  const getRole = async () => {
    let res;
    try {
      res = await roleList();
      let data: any = [];
      if (res?.success) {
        res?.roles?.map((ele: any, ind: string) => {
          data?.push({ value: ele?.id, label: ele?.name });
        });
        const dataArr = data.filter((user: any) => user.rolename !== "staff");

        const newArrayWithSelect = [
          { value: "", label: "Select Role" },
          ...dataArr,
        ];
        setRoleData(newArrayWithSelect);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (tab) {
      getRole();
    }
  }, [tab]);

  const handleUpload = async () => {
    const { id }: any = params;
    const formdata = new FormData();
    formdata.append("photo", selectedImage);
    let res;
    // api needed

    // try {
    //   res = await EdituserMangementPersonalDetails(id, formdata);
    //   if (res?.success) {
    //   } else {
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  let checkOutTimeindex: any =
    userData?.attendance?.length && userData?.attendance?.length - 1;
  let checkouttimearr = userData?.attendance?.length
    ? userData?.attendance[checkOutTimeindex]
    : null;

  return (
    <>
      <EducatorManagementContainer
        style={{
          backgroundColor: globalSettings?.backgroundColour || "#ECF2F4",
          margin: 0,
        }}
      >
        <ProfileContainer className="relative">
          <Link href={"/daycareManagement/educatorManagement"}>
            <div className="flex items-center absolute left-2 top-0 cursor-pointer">
              <ChevronLeft color="#8E8E8E" size={32} />
              <div className="text-[1.25rem] py-2 px-1 text-[#4B4B4B] font-sans font-[500]">
                Back
              </div>
            </div>
          </Link>
          <ProfileDetails>
            <ImgContainer className="mt-10">
              {edit ? (
                <div className="flex flex-col justify-center">
                  <ImageUpload
                    control={control}
                    name="image"
                    onSelect={(data: any) => {
                      setSelectedImage(data);
                    }}
                  />
                  <div className="flex gap-2 mt-1">
                    <Button onClick={handleUpload}>Update</Button>
                    <Button onClick={() => setEdit(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Image
                    src={
                      userData?.usersDetails?.photo
                        ? userData?.usersDetails?.photo
                        : "/svgs/no-image.svg"
                    }
                    width={112}
                    height={112}
                    className="w-[112px] h-[112px] rounded-full object-cover"
                    alt="educator-image"
                  />
                </div>
              )}
            </ImgContainer>
            <ProfileInfo>
              {userData ? (
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium mt-3">
                  {userData?.usersDetails?.firstName
                    ? userData?.usersDetails?.firstName +
                    " " +
                    userData?.usersDetails?.lastName
                    : ""}
                </div>
              ) : null}
              <TagContainer>
                {tab === "user"
                  ? null
                  : certificationData?.length === 0
                    ? null
                    : certificationData.map((item: any, index: any) => {
                      return (
                        <div
                          className="bg-[#FFF2EE] rounded-sm text-[#EC2D30] font-[DM_Sans] text-[12px] font-medium p-2 cursor-pointer	"
                          key={index}
                        >
                          {item.documentType}
                        </div>
                      );
                    })}
              </TagContainer>
              <ProfileName>
                <div className="text-[#7f7f7f] font-[DM_Sans] text-[14px] font-medium">
                  {tab === "user" ? "Role" : "Classroom"}
                </div>
                <div className="text-[#4b4b4b] font-[DM_Sans] text-[18px] font-medium capitalize">
                  {tab === "user"
                    ? userData?.usersDetails?.rolename || null
                    : userData?.classroom?.name || null}
                </div>
              </ProfileName>
            </ProfileInfo>
            {userData?.usersDetails?.isActive == 1 &&
              !holiDayName &&
              !workingDay &&
              userData?.usersDetails?.rolename === "educator" && (
                <ProfileButtons>
                  <div>
                    <div>
                      {isDateGreaterThanOrEqualToToday(otherData?.start_date) &&
                        checkouttimearr?.check_out !== null ? (
                        <button
                          className="w-[200px] mx-auto py-2 bg-[#12A321] flex flex-row items-center justify-center gap-2 rounded-md text-[#FFFFFF] font-semibold font-sans text-[16px]"
                          onClick={() => OpenCheckInModal()}
                        >
                          <Image
                            src={"/svgs/right-arrows.svg"}
                            width={15}
                            height={17}
                            alt="n"
                          />
                          Check-In
                        </button>
                      ) : null}
                    </div>

                    {!checkouttimearr?.check_out &&
                      userData?.attendance?.length !== 0 ? (
                      <div>
                        <button
                          className="w-[200px] mx-auto py-2 bg-[#12A321] flex flex-row items-center justify-center gap-2 rounded-md text-[#FFFFFF] font-semibold font-sans text-[16px]"
                          onClick={() => OpenCheckOutModal(checkouttimearr.id)}
                        >
                          <Image
                            src={"/svgs/right-arrows.svg"}
                            width={15}
                            height={17}
                            alt="n"
                          />
                          Check-Out
                        </button>
                      </div>
                    ) : null}
                  </div>
                </ProfileButtons>
              )}
          </ProfileDetails>
        </ProfileContainer>
        <ProfileDescription className="overflow-scroll scrollColor">
          <FormContainer className="mr-5">
            <FormDetails className="bg-white rounded-2xl">
              <HeaderBar>
                <div className="text-[#00000099] font-[DM_Sans] text-[18px] font-medium">
                  Personal Details
                </div>
                <div
                  onClick={() => openModal("EditPersonalDetailModal")}
                  className="text-[#3a70e2] font-[DM_Sans] text-[14px] font-normal cursor-pointer flex items-center gap-1"
                >
                  <Image
                    src={"/svgs/edit-icon.svg"}
                    width={24}
                    height={24}
                    alt="edit image"
                  />
                  Edit
                </div>
              </HeaderBar>
              <div className="grid grid-cols-2 px-10 py-6">
                {childdetailsarr.map((item, index) => (
                  <div
                    className="grid grid-cols-4 items-center gap-0"
                    key={index}
                  >
                    <div className="col-span-1 font-sans text-grey-text font-medium text-sm">
                      {item.key}
                    </div>
                    <div className="col-span-3 font-sans text-black text ">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </FormDetails>

            {tab !== "user" && (
              <>
                <FormDetails className="bg-white rounded-2xl">
                  <HeaderBar>
                    <div className="text-[#00000099] font-[DM_Sans] text-[18px] font-medium">
                      Availability
                    </div>
                    <div
                      onClick={() => openModal("EditAvailabiltyModal")}
                      className="text-[#3a70e2] font-[DM_Sans] text-[14px] font-normal cursor-pointer flex items-center gap-1"
                    >
                      <Image
                        src={"/svgs/edit-icon.svg"}
                        width={24}
                        height={24}
                        alt="edit image"
                      />
                      Edit
                    </div>
                  </HeaderBar>

                  <div className="flex items-center justify-between	mb-10">
                    <InfoContainer>
                      <div className="text-[#0000004D] font-[DM_Sans] text-[14px] font-medium">
                        Start Date
                      </div>
                      <div className="text-[#000000] font-[DM_Sans] font-medium ">
                        {otherData?.start_date
                          ? formatDateWithUTC(otherData?.start_date)
                          : ""}
                      </div>
                    </InfoContainer>
                    <InfoContainer>
                      <div className="text-[#0000004D] font-[DM_Sans] text-[14px] font-medium">
                        Schedule
                      </div>
                      <div className=" flex gap-[5px] text-[#0000004D] font-[DM_Sans] text-[14px] font-medium">
                        {otherData &&
                          otherData?.availability &&
                          Object.keys(otherData.availability).map((day) => (
                            <TagContainer key={day}>
                              <div className="bg-[#FFF2EE] rounded-sm text-[#EC2D30] font-[DM_Sans] text-[12px] font-medium p-2 cursor-pointer	">
                                {day}
                              </div>
                            </TagContainer>
                          ))}
                      </div>
                    </InfoContainer>
                  </div>
                </FormDetails>

                <FormDetails className="bg-white rounded-2xl">
                  <HeaderBar>
                    <div className="text-[#00000099] font-[DM_Sans] text-[18px] font-medium">
                      Documents
                    </div>
                    {/* <div
                  onClick={() => openModal("EditDocumentModal")}
                  className="text-[#3a70e2] font-[DM_Sans] text-[16px] font-normal cursor-pointer flex items-center gap-1"
                >
                  <Image
                    src={"/svgs/edit-icon.svg"}
                    width={24}
                    height={24}
                    alt="edit image"
                  />
                  Edit
                </div> */}
                  </HeaderBar>
                  {/* <div className="flex gap-5 p-4 justify-between">
                <div className="flex flex-col gap-[10px]">
                  <p>Certifications</p>
                  {otherData &&
                    otherData.certifications?.certifications?.map(
                      (item: any, index: any) => {
                        return (
                          <div key={index}>
                            {" "}
                            <div className="flex items-center gap-4 ">
                              <Image
                                src={"/svgs/pdf-icon.svg"}
                                alt=""
                                width={32}
                                height={32}
                              />

                              <p className="text-[#4B4B4B] font-sans text-[18px] font-medium leading-[26px]">
                                {item.certificationFilesPath
                                  ? path.basename(item.certificationFilesPath)
                                  : null}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
                <div className="flex flex-col gap-[10px]">
                  <p>Records</p>
                  {otherData &&
                    otherData?.records?.record.map((item: any, index: any) => {
                      return (
                        <div className="flex items-center gap-4 " key={index}>
                          <Image
                            src={"/svgs/pdf-icon.svg"}
                            alt=""
                            width={32}
                            height={32}
                          />

                          <p className="text-[#4B4B4B] font-sans text-[18px] font-medium leading-[26px]">
                            {item.reportFiles
                              ? path.basename(item.reportFiles)
                              : null}
                          </p>
                        </div>
                      );
                    })}
                </div>

                <div className="flex flex-col gap-[10px]">
                  <p>Training</p>
                  {otherData &&
                    otherData.trainings?.trannings.map(
                      (item: any, index: any) => {
                        return (
                          <div className="flex items-center gap-4 " key={index}>
                            <Image
                              src={"/svgs/pdf-icon.svg"}
                              alt=""
                              width={32}
                              height={32}
                            />

                            <p className="text-[#4B4B4B] font-sans text-[18px] font-medium leading-[26px]">
                              {item.tranningfilePath
                                ? path.basename(item.tranningfilePath)
                                : null}
                            </p>
                          </div>
                        );
                      }
                    )}
                </div>
              </div> */}

                  <>
                    {/* <h1 className="text-center mb-2  mt-2 text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium">
        Educator’s Documents
      </h1>
      <hr /> */}

                    <section className="">
                      <div className="flex-col p-5 w-full  mx-auto items-center justify-center gap-6">
                        <div className="w-full flex flex-col items-center justify-center gap-2">
                          <div className="w-full flex flex-col items-left">
                            <div className="text-[#4b4b4b] font-[DM_Sans] text-[20px] font-medium ">
                              Records:
                            </div>
                            <RecordTable staffId={otherData?.id} />
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

                            <CertificationTable staffId={otherData?.id} />
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

                            <div className="w-full">
                              {" "}
                              <TrainingTable staffId={otherData?.id} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* <Button>Next</Button> */}
                  </>
                </FormDetails>
              </>
            )}

            {admin === 'loggedInuser' && <FormDetails className="bg-white rounded-2xl">
              <HeaderBar>
                <div className="text-[#00000099] font-[DM_Sans] text-[18px] font-medium">
                  Emergency Contact Details
                </div>
                <div
                  onClick={() => openModal("EditEmergencyModal")}
                  className="text-[#3a70e2] font-[DM_Sans] text-[14px] font-normal cursor-pointer flex items-center gap-1"
                >
                  <Image
                    src={"/svgs/edit-icon.svg"}
                    width={24}
                    height={24}
                    alt="edit image"
                  />
                  Edit
                </div>
              </HeaderBar>
              {(!otherData?.emergency_details ||
                otherData?.emergency_details?.length === 0) && (
                  <p className="text-center mt-8">No results found.</p>
                )}
              <div className="flex flex-col gap-2 pl-10 pr-60 pb-6 mt-6">
                {otherData?.emergency_details?.contacts?.map(
                  (emergencyDetail: any, index: number) => {
                    return (
                      <div
                        className={`grid grid-cols-2 gap-4 mb-8 items-start ${otherData?.emergency_details?.contacts?.length > 1 &&
                          "border-b-2"
                          } pb-2 `}
                        key={index}
                      >
                        <div className="grid grid-cols-3 items-center">
                          <p className="font-sans text-grey-text font-medium text-sm">
                            {"First Name"}
                          </p>
                          <p className="font-sans text-black text">
                            {(emergencyDetail.firstName || "") }
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <p className="font-sans text-grey-text font-medium text-sm">
                            {"Last Name"}
                          </p>
                          <p className="font-sans text-black text">
                            {
                              
                              (emergencyDetail.lastName || "")}
                          </p>
                        </div>
                        <div className="flex justify-start items-center">
                          <p className="font-sans text-grey-text font-medium text-sm">
                            {"Contact Number"}
                          </p>
                          <p className="font-sans text-black text mx-4">
                            {formatPhoneNumber(emergencyDetail.contactNumber)}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <p className="font-sans text-grey-text font-medium text-sm">
                            {"Relation to Child"}
                          </p>
                          <p className="font-sans text-black text">
                            {emergencyDetail.relation}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 items-center">
                          <p className="font-sans text-grey-text font-medium text-sm">
                            {"Gender"}
                          </p>
                          <p className="font-sans text-black text">
                            {emergencyDetail.gender}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <p className="font-sans text-grey-text font-medium text-sm">
                            {"Preferred Name"}
                          </p>
                          <p className="font-sans text-black text">
                            {emergencyDetail.preferredName
                              ? emergencyDetail.preferredName
                              : "-"}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </FormDetails>}

            {admin === 'loggedInuser' && <FormDetails className="bg-white rounded-2xl">
              <HeaderBar>
                <div className="text-[#00000099] font-[DM_Sans] text-[18px] font-medium">
                  Other Details
                </div>
                <div
                  onClick={() => openModal("EditOtherDetailsModal")}
                  className="text-[#3a70e2] font-[DM_Sans] text-[14px] font-normal cursor-pointer flex items-center gap-1"
                >
                  <Image
                    src={"/svgs/edit-icon.svg"}
                    width={24}
                    height={24}
                    alt="edit image"
                  />
                  Edit
                </div>
              </HeaderBar>

              <InfoContainer className="mb-10">
                {!otherData?.other_details && (
                  <p className="text-center mt-8">No results found.</p>
                )}
                {otherData?.other_details && (
                  <>
                    <div className="text-[#0000004D] font-[DM_Sans] text-[14px] font-medium">
                      Description
                    </div>
                    <div className="text-[#000000] font-[DM_Sans] text-[18px] font-medium ">
                      {otherData?.other_details}
                    </div>
                  </>
                )}
              </InfoContainer>
            </FormDetails>}

            {/* <FormDetails>
              <HeaderBar>
                <div className="text-[#00000099] font-[DM_Sans] text-[18px] font-medium">
                  Incident Report
                </div>
                <div className="text-[#3a70e2] font-[DM_Sans] text-[16px] font-normal cursor-pointer flex items-center gap-1">
                  + View all incidents
                </div>
              </HeaderBar>

              <div className="flex items-center justify-between	">
                <InfoContainer>
                  <div className="text-[#000000] font-[DM_Sans] text-[18px] font-medium ">
                    Child Name
                  </div>
                  <div className="text-[#0000004D] font-[DM_Sans] text-[14px] font-medium">
                    Lorem
                  </div>
                </InfoContainer>
                <InfoContainer>
                  <div className="text-[#000000] font-[DM_Sans] text-[18px] font-medium ">
                    Incident Title
                  </div>
                  <div className="text-[#0000004D] font-[DM_Sans] text-[14px] font-medium">
                    Incident Date & Date
                  </div>
                </InfoContainer>
                <InfoContainer>
                  <div className="text-[#000000] font-[DM_Sans] text-[18px] font-medium ">
                    Incident Description
                  </div>
                  <div className="text-[#0000004D] font-[DM_Sans] text-[14px] font-medium">
                    Lorem
                  </div>
                </InfoContainer>
              </div>
            </FormDetails> */}
          </FormContainer>
        </ProfileDescription>
        <ToastContainer />
      </EducatorManagementContainer>

      {modalOpen && editPersonalDetail && (
        <div>
          <EditPersonalDetailModal
            modalOpen={modalOpen}
            closeModal={closeModal}
            editPersonalDetail={editPersonalDetail}
            userData={userData}
            getUserDetailsData={getUserDetailsData}
            classroomData={tab ? roleData : classroomData}
            setClassroomData={classroomData}
            tab={tab}
          />
        </div>
      )}

      {modalOpen && editAvailability && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"EditAvailabiltyModal"}
          >
            <EditAvailability
              control={control}
              getUserDetailsData={getUserDetailsData}
              closeModal={closeModal}
              userData={userData}
            />
          </Modal>
        </div>
      )}

      {modalOpen && editDocument && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"EditDocumentModal"}
          >
            <EditDocument
              control={control}
              userData={userData}
              getUserDetailsData={getUserDetailsData}
              closeModal={closeModal}
            />
          </Modal>
        </div>
      )}

      {modalOpen && editEmergency && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"EditEmergencyModal"}
          >
            <EditEmergency
              control={control}
              userData={userData}
              closeModal={closeModal}
              getUserDetailsData={getUserDetailsData}
              tab={tab}
            />
          </Modal>
        </div>
      )}

      {modalOpen && editOtherDetails && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"EditOtherDetailsModal"}
          >
            <EditOtherDetails
              control={control}
              userData={userData}
              closeModal={closeModal}
              getUserDetailsData={getUserDetailsData}
              tab={tab}
            />
          </Modal>
        </div>
      )}

      {checkinmodalopen && (
        <CheckInModalProfile
          closeModal={CloseCheckInModal}
          modalopen={checkinmodalopen}
          staffId={params?.id}
          getUserDetailsData={getUserDetailsData}
        />
      )}

      {checkoutmodalopen && (
        <CheckOutModalProfile
          closeModal={CloseCheckOutModal}
          modalopen={checkoutmodalopen}
          staffId={params?.id}
          attendanceId={attendanceId}
          getUserDetailsData={getUserDetailsData}
          userData={userData.attendance}
        />
      )}
      <style>{`
      /* For webkit-based browsers (Chrome, Safari) */
      .scrollColor::-webkit-scrollbar {
        
        width: 4px;
       border-radius:20px;
      }
      
      .scrollColor::-webkit-scrollbar-thumb {
        background-color: #4b4b4b ;
         /* Set the color of the scrollbar thumb */
      }
      
      .scrollColor::-webkit-scrollbar-track {
      //  background-color: #f1f1f1; /* Set the color of the scrollbar track */
      }
      


     
      
      `}</style>
    </>
  );
};

export default Page;
function uploadImage(formdata: FormData, child_id: any) {
  throw new Error("Function not implemented.");
}
