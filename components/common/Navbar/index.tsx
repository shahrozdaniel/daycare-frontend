"use client";
import React, { useEffect, useRef, useState } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { signOut } from "firebase/auth";
import Button from "@/components/common/Button";
import { auth } from "../Utils/firebase";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Modal from "../Modal/Modal";
import IncidentModal from "@/app/reports/ClassroomReports/IncidentReport/IncidentModal";
import { useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "./styles.css";
import { checkHasPermission } from "@/utils/permission";
import { useGlobalContext } from "@/app/context/store";
import { getloggedInuserPermission } from "@/services/authpermission";
import { AuthContextProvider } from "@/app/context/AuthContext";
import { ChatContextProvider } from "@/app/context/ChatContext";
import Chat from "../chat";
import Icon from "@/public/svgs/icons";
import NavItems from "./NavItems";
import moment from "moment";
import { disableActionIfHoliday } from "@/utils/utilityFunctions";

export default function Navbar() {
  const pathname = usePathname();
  let router = useRouter();
  // let navigate  = useNavigate()
  // alert(pathname)
  const { control } = useForm<FormData>();
  const { globalSettings, roledata, globalHolidayList } = useGlobalContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [incident, setIncident] = useState(false);
  const [permissionArr, setpermissionArr] = useState<any[]>([]);
  const [roleName, setRoleName] = useState<string>("");
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [permission, setPermission] = useState<any>([])
  let token = window?.localStorage?.getItem("token");

  const handleRoute = () => {
    router.push("/notificationManagement");
  }
  //this function will open the modal
  const openModal = (modalValue: string) => {
    if (modalValue === "Add Incident") {
      setIncident(true);
    }

    setModalOpen(true);
  };

  // this function will close the modal
  const closeModal = (modalValue: string) => {
    if (modalValue === "Add Incident") {
      setIncident(false);
    }

    setModalOpen(false);
  };

  const handlelogOut = () => {
    // window.localStorage.clear();
    // signOut(auth)
    //   .then(() => { })
    //   .catch((error: any) => {
    //     // An error happened.
    //     console.log(error);
    //   });
    router.push("/");
    // setShowProfile(false);
  };

  const handleViewProfile = () => {
    setShowProfile(false);
    router.push(
      `/userManagement/${roledata?.role_detail?.roleName == "staff"
        ? "educatorProfile"
        : "userProfile"
      }/${roledata?.user_detail?.userId}`
    );
  };

  const loggedInPermission = async () => {
    let res;
    try {
      res = await getloggedInuserPermission();

      if (res?.success) {
        setRoleName(res?.data?.role_detail?.roleName);
        let permissionObject = res?.data?.role_detail?.permissions;
        setPermission(permissionObject)
        let allowPermission = Object.entries(permissionObject)
          .filter(([name, permissions]: any) => permissions.view)
          .map(([name]) => name);
        setpermissionArr(allowPermission);
      }
    } catch (error: any) {
      console.log(error?.response?.data?.error);
    }
  };
  useEffect(() => {
    loggedInPermission();
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  // console.log(permissionArr);

  const checkPermission = (permissionname: string) => {
    // console.log("roleName", roleName);
    if (roleName == "admin") return true;
    let allow = permissionArr?.includes(permissionname);
    if (allow) {
      return true;
    } else {
      return false;
    }
  };

  function checkPermissionAllowEdit(key: any) {
    if (roleName == "admin") return true;
    if (permission?.hasOwnProperty(key)) {
      if (permission[key].hasOwnProperty('add_edit')) {
        return permission?.[key].add_edit;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  const components: { title: string; href: string; icon: string, permission?: string }[] = [
    // {
    //   title: "Allergy List",
    //   href: "/reports",
    // },
    {
      title: "Add Child",
      href: "/childRegistration",
      icon: "/images/kid.png",
      // permission: "child_management",
    },
    {
      title: "Add Educator",
      href: "/daycareManagement/educatorProfile",
      icon: "/images/staff.png",
      // permission: "user",
    },
    // {
    //   title: "Compliance",
    //   href: "/complianceManagement",
    // },
    {
      title: "Add User",
      href: "#",
      // href: "/daycareManagement/userProfile?user=user",
      icon: "/images/man.png",
      // permission: "user",
    },
    {
      title: "Add Class",
      href: "/classroomManagement/addClassroom",
      icon: "/images/class.png",
      // permission: "classroom_management",
    },
    {
      title: "Add Food / Activity",
      href: "/calendarManagement",
      icon: "/images/food.png",
      // permission: "planing_forecasting",
    },
    {
      title: "Add Incident",
      href: "/reports?set=Classroom%20Reports&tab=Incident%20Report",
      icon: "/images/incident.png",
      // permission: "report_management",
    },
    // {
    //   title: "Daycare Setting",
    //   href: "/settings",
    // },
    // {
    //   title: "Classroom Actions",
    //   href: "/classroomActions",
    // },
    // {
    //   title: "Subscription Details",
    //   href: "/subscriptionManagement",
    // },
    // {
    //   title: "Notification Management",
    //   href: "/notificationManagement",
    // },
    // {
    //   title: "Classroom Calendar",
    //   href: "/calendarManagement",
    // },
    // {
    //   title: "Ticket Management",
    //   href: "/ticketManagement",
    // },
    // {
    //   title: "Add Incident",
    //   href: "/reports",
    // },

    // {
    //   title: "Reports",
    //   href: "/reports",
    // },
    // {
    //   title: "Fees Management",
    //   href: "/feesManagement",
    // },
  ];

  const General: {
    title: string;
    href: string;
    icon: string;
    // permission?: any;
  }[] = [
      {
        title: "Dashboard",
        href: "/dashboard",
        // href: `${roleName == "admin" ? "/adminDashboard" : "/dashboard"}`,
        icon: "dashboard",
        // permission: "dashboard",
      },
      {
        title: "Admin Dashboard",
        href: "/adminDashboard",
        icon: "dashboard",
        // permission: "dashboard",
      },
      {
        title: "Child Management",
        href: "/childManagement",
        icon: "childManagement",
        // permission: "child_management",
      },
      {
        title: "Planning & Forecasting",
        href: "/calendarManagement",
        icon: "planning",
        // permission: "planing_forecasting",
      },
      {
        title: "Class Management",
        href: "/classroomManagement",
        icon: "classManagement",
        // permission: "classroom_management",
      },
      {
        title: "User Management",
        href: "/daycareManagement/educatorManagement",
        icon: "userManagement",
        // permission: "user",
      },
      {
        title: "Classroom Actions",
        href: "/classroomActions",
        icon: "classroomAction",
        // permission: "classroom_action",
      },
    ];
  const Settings: {
    title: string;
    href: string;
    icon: string;
    // permission?: any;
  }[] = [
      {
        title: "Daycare Settings",
        href: "/settings",
        icon: "daycareSetting",
        // permission: "setting",
      },

      {
        title: "Notifications",
        href: "/notificationManagement",
        icon: "notification",
        // permission: "notification_management",
      },
      {
        title: "Roles and Permission",
        href: "/roleManagement",
        icon: "rolesAndPermission",
        // permission: "admin",
      },
    ];
  const Management: {
    title: string;
    href: string;
    icon: string;
    // permission?: any;
  }[] = [
      {
        title: "Subscription Management",
        href: "/subscriptionManagement",
        icon: "subscribe",
        // permission: "subscription",
      },
      {
        title: "Compliance Management",
        href: "/complianceManagement",
        icon: "compliance",
        // permission: "compliance",
      },
      {
        title: "Fees Management",
        href: "/feesManagement",
        icon: "feesManagement",
        // permission: "fee",
      },
      {
        title: "Reports Management",
        href: "/reports",
        icon: "reports",
        // permission: "report_management",
      },
    ];

  const handlePermission = (arr: any) => {
    const data = arr.filter((item: any) => {
      if (permissionArr.includes(item.permission)) {
        return true;
      }
    });
    // console.log(data);

    if (data.length > 0 || roleName === "admin") {
      return true;
    } else {
      return false;
    }
  };

  const handleSafeArrival = () => {
    let isTrue = false;
    const now = moment();
    const today = moment().format('dddd');
    const holiday = disableActionIfHoliday(globalHolidayList);
    if (holiday) {
      return;
    }

    if (globalSettings?.workingDays) {
      const keys = Object.keys(globalSettings?.workingDays);
      keys.forEach((key) => {
        if (key === today) {
          const workingDayStart = globalSettings.workingDays[key][0];
          const workingDayEnd = globalSettings.workingDays[key][1];
          if (+workingDayStart.hour || +workingDayStart.minute) {
            const timeString = `${workingDayStart.hour}:${workingDayStart.minute} ${workingDayStart.meridian}`;
            const endString = `${workingDayEnd.hour}:${workingDayEnd.minute} ${workingDayEnd.meridian}`;
            const start = moment(timeString, "hh:mm A");
            const dayCareEnd = moment(endString, "hh:mm A");
            if (globalSettings?.safe_arrivals?.notification_starts) {
              start.add(globalSettings.safe_arrivals.notification_starts, 'minutes');
            }
            let end = moment(start).add(globalSettings?.safe_arrivals?.upto_hours, 'hours');
            if (dayCareEnd.isBefore(end)) {
              end = dayCareEnd;
            }
            if (now.isBetween(start, end)) {
              isTrue = true;
            }
          }
        }
      });
    }
    return isTrue;
  }

  handleSafeArrival();

  return pathname === "/" ||
    pathname === "/resetPassword" ||
    pathname === "/register/passwordSetup" ||
    pathname === "/register" ||
    pathname === "/thankyouPageRegister" ||
    pathname === "/thankyouPage" ||
    pathname === "/verifyOtp" ? null : (
    <>
      <nav className="w-full h-[80px] bg-[#EEFCFC] flex justify-between items-center px-6">
        <div className="flex items-center gap-5 md:gap-2">
          {" "}
          <Sheet>
            <SheetTrigger asChild>
              <button>
                {" "}
                <Image
                  src={"/images/menu.png"}
                  width="25"
                  height="100"
                  alt="menu"
                />
              </button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className={`
                   bg-[white]  border-solid rounded-b-[5rem] 
               p-10 max-h-[83%] md:max-h-[100%] w-[70%] overflow-scroll hide-scroll`}
            >
              {/* {permissionArr.length > 0 || roleName === "admin" ? ( */}
                <>
                  {/* {handlePermission(General) && ( */}
                    <NavItems
                      title={"General"}
                      arr={General}
                      // checkPermission={(item: string) => checkPermission(item)}
                      className={`bg-[#FFF6F0] hover:border-2 hover:border-[#FFB9A2]
                       
                    `}
                    />
                  {/* // )} */}
                  {/* {handlePermission(Management) && ( */}
                    <NavItems
                      title={"Management"}
                      titleClassName={"left-[-40px] top-[57px]"}
                      arr={Management}
                      // checkPermission={(item: string) => checkPermission(item)}
                      className={`  
                         bg-[#F1FFF0] hover:border-2 hover:border-[#49D994]
                    `}
                    />
                  {/* // )} */}

                  {/* {handlePermission(Settings) && ( */}
                    <NavItems
                      title={"Settings"}
                      arr={Settings}
                      // checkPermission={(item: string) => checkPermission(item)}
                      className={` 
                        bg-[#FFF2F9] hover:border-2 hover:border-[#F99CB5]
                    }`}
                    />
                  {/* )} */}
                </>
              {/* ) : (
                <div className="text-center text-[18px] text-[#4b4b4b] ">
                  You currently do not possess the necessary access rights to
                  perform that action....
                </div>
              )} */}
            </SheetContent>
          </Sheet>
          <div className="">
            <Image
              src={"/svgs/line-nav.svg"}
              width={5}
              height={10}
              alt="line"
            />
          </div>
          {/* <button className="flex items-center w-[40px] h-[40px] md:w-[28px] md:h-[28px] rounded-full bg-[#3D9587] justify-center "> */}
          {globalSettings?.logo ? (
            <Image
              className="md:h-[30px] md:w-[100px] cursor-pointer object-contain"
              src={globalSettings?.logo}
              width={100}
              height={100}
              alt=""
              onClick={() => router.push("/dashboard")}
            />
          ) : (
            <Image
              className="md:h-[30px] md:w-[100px] cursor-pointer"
              src={"/svgs/cooddle-logo.png"}
              width={100}
              height={100}
              alt=""
              onClick={() => router.push("/dashboard")}
            />
          )}
          {/* </button> */}
          {/* <button
            className="flex flex-col items-center"
            onClick={() => router.push("/dashboard")}
          >
            <div className="w-[40px] h-[40px] md:w-[28px] md:h-[28px] rounded-full bg-[#bd617a] flex items-center justify-center">
              <Image
                className="md:h-[14px] md:w-[14px]"
                src={"/svgs/navbar-second-icon.svg"}
                width={24}
                height={24}
                alt=""
              />
            </div>
          </button>
          <button className="flex flex-col items-center ">
            <div className="w-[40px] h-[40px] md:w-[28px] md:h-[28px] rounded-full bg-[#d6773f] flex items-center justify-center">
              <Image
                className="md:h-[14px] md:w-[14px]"
                src={"/svgs/navbar-third-icon.svg"}
                width={24}
                height={24}
                alt=""
              />
            </div>
          </button> */}
          <div className="">
            <Image
              src={"/svgs/line-nav.svg"}
              width={5}
              height={10}
              alt="line"
            />
          </div>
          {/* <div className="text-base	">Dashboard / Child Registration</div> */}
        </div>
        <div className="flex gap-5 items-center">
          {" "}
          {/* <div className="search-container">
            <input
              type="text"
              name="text"
              className="search-input"
              required
              placeholder={"Type to search..."}
            />
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 36 37"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M27.4384 25.0249C31.6066 19.669 31.2293 11.9217 26.3063 6.99873C20.9747 1.66709 12.3304 1.66709 6.99873 6.99873C1.66709 12.3304 1.66709 20.9747 6.99873 26.3063C11.9217 31.2293 19.669 31.6066 25.0249 27.4384L33.0867 35.5002C33.7532 36.1666 34.8337 36.1666 35.5002 35.5002C36.1666 34.8337 36.1666 33.7532 35.5002 33.0867L27.4384 25.0249ZM23.8929 9.41218C27.8916 13.4109 27.8916 19.8941 23.8929 23.8929C19.8941 27.8916 13.4109 27.8916 9.41218 23.8929C5.41345 19.8941 5.41345 13.4109 9.41218 9.41218C13.4109 5.41345 19.8941 5.41345 23.8929 9.41218Z"
                  fill="#272728"
                />
              </svg>
            </div>
          </div> */}
          <button className={`${handleSafeArrival() ? "text-[#3C9587] border border-[#3C9587] bg-[#F1FFF0]" : "text-[#4F1205] border border-[#FE9B0E] bg-[#FFEECD]"} flex items-center px-3 h-[40px] font-semibold  font[500] text-[16px] leading-6 rounded-lg focus:outline-none`} onClick={handleRoute}>
            {handleSafeArrival() ? <Image src={"/images/greenbus.png"} width={20} height={20} alt="sas" className="mr-2" /> : <Image src={"/svgs/bus.svg"} width={30} height={30} alt="sas" />} SAS
          </button>
          <Link href={"/reports"}>
            {" "}
            <div className="flex items-center h-[40px] px-2 border-2 border-[#FF4848] bg-white rounded-lg text-[#FFF]">
              <Image
                src={"/svgs/allergy.svg"}
                width={35}
                height={35}
                alt={"allergy"}
              />

              <div className="text-[16px] font-semibold leading-6 text-[#0E1F25] pr-2">
                Allergy
              </div>
            </div>
          </Link>
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/reports"}>
                  <Image
                    src={"/svgs/allergies-new.png"}
                    width={50}
                    height={50}
                    alt="menu"
                    className="pr-2"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-[#3D9587] p-3 text-center w-[80px] text-[white]">
               Allergies
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex flex-col items-center">
                <div className="lg:w-[32px] lg:h-[32px] md:w-[22px] md:h-[22px] rounded-full bg-[#3D9587] flex items-center justify-center">
                  <Image
                    className="lg:w-[20px] lg:h-[18px]"
                    src={"/svgs/plus-icon.svg"}
                    width={20}
                    height={18}
                    alt=""
                  />
                </div>
              </button>
            </DialogTrigger>
            <button>
              <Image
                className="lg:w-[36px] lg:h-[36px] md:w-[20px] md:h-[20px]"
                src={"/svgs/notification-icon.svg"}
                width="36"
                height="36"
                alt="user"
              />
            </button>
            <DialogContent className="sm:max-w-[340px] overflow-auto max-h-[350px]">
              <div className="grid grid-cols-2 gap-3 justify-items-center items-center">
                {components?.map((item, index) => {
                  // console.log('item', item?.permission)
                  return <>
                    {/* {checkPermissionAllowEdit(item?.permission) && <div key={index} className="cursor-pointer"> */}
                      <DialogClose asChild>
                        <>
                          <DialogClose asChild>
                            <Link
                              className="text-[14px] text-[#0E1F25] font-sans text-center pt-2"
                              href={item.href}
                            >
                              <Image
                                src={item.icon}
                                width={40}
                                height={40}
                                alt=""
                                className="mx-auto"
                              />
                              {`${item.title}`}
                            </Link>
                          </DialogClose>
                        </>
                      </DialogClose>
                    {/* </div>} */}
                  </>
                })}
              </div>
            </DialogContent>
          </Dialog>
          <div>
            <div className="dropdown cursor-pointer" ref={dropdownRef}>
              <Image
                src={
                  roledata?.user_detail?.photo || "/images/navbar-avatar.svg"
                }
                alt="Cinque Terre"
                width={36}
                height={36}
                onClick={() => setShowProfile(!showProfile)}
                className="w-9 h-9 rounded-full"
              />
              {showProfile && (
                <div className="dropdown-content p-2">
                  <div className=" flex items-center gap-1 justify-center">
                    <Image
                      src={
                        roledata?.user_detail?.photo ||
                        "/images/navbar-avatar.svg"
                      }
                      alt="Cinque Terre"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"

                    />
                    <div>
                      <div className="capitalize px-2 pt-3 font-semibold">
                        {roledata?.user_detail?.firstName}{" "}
                        {roledata?.user_detail?.lastName}
                      </div>
                      <div className="text-[14px] px-2 break-all">
                        {roledata?.user_detail?.email}
                      </div>
                      <div className="capitalize px-2 pb-3 text-[14px]">
                        {roledata?.role_detail?.roleName}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-around">
                    <div
                      className="px-2 py-3 text-[#00858E]"
                      onClick={handleViewProfile}
                    >
                      View Profile
                    </div>
                    <div
                      className="px-2 py-3 text-[#00858E]"
                      onClick={handlelogOut}
                    >
                      Log Out
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <AuthContextProvider>
        <ChatContextProvider>
          <Chat />
        </ChatContextProvider>
      </AuthContextProvider>
      {/* {modalOpen && incident && (
        <div>
          <Modal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"ActivityModal"}
          >
            <IncidentModal control={control} />
          </Modal>
        </div>
      )} */}
      <style>{`
      .hide-scroll::-webkit-scrollbar {
        display: none;
      }`}</style>
    </>
  );
}
