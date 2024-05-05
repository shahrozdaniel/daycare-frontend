"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import EducatorManagementTable from "../educatorManagementTable";
import { EducatorColumn } from "../EducatorColumns";
import TableSwitch from "../tabSwitch";
import { educatorManagementListApi } from "../components/educatorManagementApi";
import {
  Date_time_conversion,
  getAMPMTime,
  getCurrentTime,
  handleUnauthorizedError,
} from "@/utils/utilityFunctions";
import FormModal from "@/components/common/FormModal";
import { useForm } from "react-hook-form";
import AddNewSubsidy from "@/app/feesManagement/ModalComponent/AddNewSubsidy";
import CheckInModal from "../components/ModalComponents/CheckInModal";
import CheckOutModal from "../components/ModalComponents/CheckOutModal";
import { CheckOutCheckInValidationSchema } from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { educatorCheckinCheckout } from "@/app/userManagement/userManagementApi";
import { toast } from "react-toastify";
import { handleWebpackExternalForEdgeRuntime } from "next/dist/build/webpack/plugins/middleware-plugin";
import { useRouter } from "next/navigation";
export type educatorTableType = {
  id: number;
  educatorName: any;
  ChildName: string;
  Classroom: string;
  ParentName: string;
  RegistrationDate: Date;
  joiningdate: string;
  earliestaval: string;
  status: string;
  checkOut: any;
  attendence: any;
  Duration: any;
  reloadtable?: any;
  openCheckInModal?: any;
  onformCheckInSubmit?: any;
  openCheckoutModal?: any;
  onformCheckOutSubmit?: any;
  setStaffId?: any;
  isActive?: any;
  start_date?: any;
};

const EducatorManagement = () => {
  const [activeTab, setActiveTab] = useState("waitlist"); // Default active tab

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const [educatorManagementData, setEducatorManagementData] = useState<any>([]);
  const [modalopen, setModalOpen] = useState(false);
  const [checkoutmodalopen, setCheckOutModalOpen] = useState(false);
  const [staffId, setStaffId] = useState(0);
  let validationschema: any = modalopen
    ? CheckOutCheckInValidationSchema[0]
    : checkoutmodalopen
    ? CheckOutCheckInValidationSchema[1]
    : null;
  let router = useRouter();
  const methods = useForm<any>({
    shouldUnregister: false,
    resolver: yupResolver(validationschema),
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

  //this function will open check in modal
  const openModal = () => {
    setModalOpen(true);
  };

  // this function will close check in  modal
  const closeModal = () => {
    setModalOpen(false);
  };

  //this function will open check out  modal
  const openCheckoutModal = () => {
    setCheckOutModalOpen(true);
  };

  // this function will close check out modal
  const closeCheckOutModal = () => {
    setCheckOutModalOpen(false);
  };

  const onformCheckInSubmit = async (data: any) => {
    try {
      let body = {
        staffId: staffId,
        actionType: "checkin",
        Time: data.checkIn,
      };
      let res = await educatorCheckinCheckout(body);
      if (res.success) {
        getEducatorManagementlist();
        closeModal();
        // console.log("res succes", res);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("error", error);
    }
  };

  const onformCheckOutSubmit = async (data: any) => {
    try {
      let body = {
        staffId: staffId,
        actionType: "checkout",
        Time: data.checkOut,
      };
      let res = await educatorCheckinCheckout(body);
      if (res.success) {
        getEducatorManagementlist();
        closeCheckOutModal();
        // console.log("res succes", res);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("error", error);
    }

    // handleCheckInCheckOut(staffId,"checkout")
  };
  const getEducatorManagementlist = async () => {
    let res;
    try {
      res = await educatorManagementListApi();
      if (res?.success) {
        let arrdata = res.data.map((item: any, index: any) => {
          return {
            id: item.id,
            educatorName: item?.userData,
            Classroom: item?.classroom,
            RoleName: item.rolename,
            isActive: item?.is_active,
            Date: item.attendance
              ? Date_time_conversion(item.attendance.date)
              : null,
            CheckIn: item.attendance
              ? getAMPMTime(item.attendance.checkInTime)
              : null,
            CheckOut: item.attendance
              ? getAMPMTime(item.attendance.checkOutTime)
              : null,
            Duration: item.attendance ? item.attendance.duration : null,
            attendence: item?.attendance,
            Incident: "--",
            reloadtable: getEducatorManagementlist,
            openCheckInModal: openModal,
            onformCheckInSubmit: onformCheckInSubmit,
            openCheckoutModal: openCheckoutModal,
            onformCheckOutSubmit: onformCheckOutSubmit,
            setStaffId: setStaffId,
            start_date: item?.start_date,
          };
        });
        setEducatorManagementData(arrdata);
      } else {
        setEducatorManagementData([]);
      }
      // console.log(res);
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message || err.response.data.error);
    }
  };
  // console.log("childManagementData", educatorManagementData);

  const CalculateTimeandOther = (data: any) => {
    // Parse date, check-in time, and check-out time
    const checkInDate: any = new Date(data.attendance.check_in);
    const checkOutDate: any = new Date(data.attendance.check_out);

    // Extract individual components
    const date = checkInDate.toISOString().split("T")[0];
    const checkInTime = formatTime(checkInDate);
    const checkOutTime = formatTime(checkOutDate);

    // Calculate duration
    const durationMilliseconds = checkOutDate - checkInDate;
    const hours = Math.floor(durationMilliseconds / (60 * 60 * 1000));
    const minutes = Math.floor(
      (durationMilliseconds % (60 * 60 * 1000)) / (60 * 1000)
    );

    return {
      date: date,
      checkIn: checkInTime,
      checkOut: checkOutTime,
      duration: `${hours}:${minutes}`,
    };
    // Helper function to format time (HH:mm:ss)
  };

  function formatTime(date: any) {
    return date.toISOString().split("T")[1].slice(0, 8);
  }
  useLayoutEffect(() => {
    getEducatorManagementlist();
  }, []);

  let tableData: any = [];

  useEffect(() => {
    setValue("checkIn", getCurrentTime());
    setValue("checkOut", getCurrentTime());
  }, []);

  return (
    <div className=" bg-[#2E3F3F] px-[45px] py-[30px] min-h-screen h-auto ">
      <div
        className="[box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px] h-full
            text-[#FFFFFF] p-8 overflow-auto bg-white rounded-2xl min-h-[35em]
            "
      >
        <div className="flex  lg:flex-row lg:items-center lg:justify-start md:flex-col md:justify-center md:items-center">
          {/* <Tabs defaultValue="Waitlist" className="w-[400px]">
          <TabsList className="bg-white border-b border-solid border-[#f7f7f7] rounded-none">
            <TabsTrigger
              value="Waitlist"
              className="hover:bg-[#eefcfc] focus:bg-[#eefcfc] active:bg-[#eefcfc] hover:text-[#00858e] focus:text-[#00858e] active:text-[#00858e] "
            >
              Waitlist
            </TabsTrigger>
            <TabsTrigger
              value="Enrolled"
              className="hover:bg-[#eefcfc] focus:bg-[#eefcfc] active:bg-[#eefcfc] hover:text-[#00858e] focus:text-[#00858e] active:text-[#00858e]"
            >
              Enrolled
            </TabsTrigger>
            <TabsTrigger
              value="Pending"
              className="hover:bg-[#eefcfc] focus:bg-[#eefcfc] active:bg-[#eefcfc] hover:text-[#00858e] focus:text-[#00858e] active:text-[#00858e]"
            >
              Pending
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Waitlist">waitlist</TabsContent>
          <TabsContent value="Enrolled">enrolled</TabsContent>
          <TabsContent value="Pending">pending</TabsContent>
        </Tabs> */}
          <div className="w-[400px]">
            <TableSwitch
              activeTab={activeTab}
              handleTabClick={handleTabClick}
            />
          </div>
          {/* <div className="flex gap-5">
          <div className="flex justify-between items-center gap-4 px-[34px] py-[13px] w-[220px] rounded-xl bg-[#E4F2FF] ">
            <div className="flex flex-col items-center ">
              <div className="w-[24px] h-[24px] rounded-full bg-blue-500 flex items-center justify-center">
                <Image
                  src={"/svgs/info-icon.svg"}
                  width={14}
                  height={14}
                  alt=""
                />
              </div>
              <p className="text-blue-500 text-center font-dm-sans text-xs font-medium">
                Stat 01
              </p>
            </div>
            <div className="border-[2px] border-solid border-[#3B82F6] h-full"></div>
            <p className="text-blue-500 text-center font-sans text-4xl font-medium leading-[38px]">
              50
            </p>
          </div>

          <div className="flex justify-between items-center gap-4 px-[34px] py-[13px] w-[220px] rounded-xl bg-[#E5F5EC] ">
            <div className="flex flex-col items-center ">
              <div className="w-[24px] h-[24px] rounded-full bg-[#47B881] flex items-center justify-center">
                <Image
                  src={"/svgs/success-icon.svg"}
                  width={14}
                  height={14}
                  alt=""
                />
              </div>
              <p className="text-[#47B881] text-center font-dm-sans text-xs font-medium">
                Stat 02
              </p>
            </div>
            <div className="border-[2px] border-solid border-[#47B881] h-full"></div>
            <p className="text-[#47B881] text-center font-sans text-4xl font-medium leading-[38px]">
              50
            </p>
          </div>

          <div className="flex justify-between items-center gap-4 px-[34px] py-[13px] w-[220px] rounded-xl bg-[#FFF7E1] ">
            <div className="flex flex-col items-center ">
              <div className="w-[24px] h-[24px] rounded-full bg-[#FFAD0D] flex items-center justify-center">
                <Image
                  src={"/svgs/time-icon.svg"}
                  width={14}
                  height={14}
                  alt=""
                />
              </div>
              <p className="text-[#FFAD0D] text-center font-dm-sans text-xs font-medium">
                Stat 03
              </p>
            </div>
            <div className="border-[2px] border-solid border-[#FFAD0D] h-full"></div>
            <p className="text-[#FFAD0D] text-center font-sans text-4xl font-medium leading-[38px]">
              50
            </p>
          </div>
        </div> */}
        </div>

        <EducatorManagementTable
          columns={EducatorColumn}
          data={educatorManagementData}
          reloadTable={getEducatorManagementlist}
        />

        {modalopen && (
          <div>
            <FormModal
              modalOpen={modalopen}
              cancelText={"Cancel"}
              AddText={"Add"}
              closeModal={closeModal}
              modalName={"AddDiscountModal"}
              handleSubmit={handleSubmit}
              onformsubmit={onformCheckInSubmit}
            >
              <CheckInModal
                control={control}
                register={register}
                errors={errors}
                closeModal={closeModal}
              />
            </FormModal>
          </div>
        )}

        {checkoutmodalopen && (
          <div>
            <FormModal
              modalOpen={checkoutmodalopen}
              cancelText={"Cancel"}
              AddText={"Add"}
              closeModal={closeCheckOutModal}
              modalName={"AddDiscountModal"}
              handleSubmit={handleSubmit}
              onformsubmit={onformCheckOutSubmit}
            >
              <CheckOutModal
                control={control}
                register={register}
                errors={errors}
                closeModal={closeCheckOutModal}
              />
            </FormModal>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducatorManagement;
