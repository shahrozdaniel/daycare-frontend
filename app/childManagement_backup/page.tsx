"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Switch from "@/components/common/Switch";

import { tableColumn } from "./components/tableColumns";
import ChildManagementTable from "./components/childManagementTable";
import TableSwitch from "./components/tabSwitch";
import {
  GetEnrolledTableColumns,
  GetWaitlistEnrollChildColumn,
} from "./components/enrolledTableColumn";
import {
  UpdateGraduationDateofEnrolledChild,
  approveEnrollment,
  assignClassroomEnrollment,
  childEnrollmetnList,
  childPendingList,
  childRegistrationList,
  childlistStatus,
} from "@/services/childrenActionServices";
import {
  Date_time_conversion,
  formatMessage,
  handleUnauthorizedError,
} from "@/utils/utilityFunctions";
import { useSearchParams } from "next/navigation";
import { pendingColoum } from "./components/waitListColum";

import { useGlobalContext } from "../context/store";
import FormModal from "@/components/common/FormModal";
import { useForm } from "react-hook-form";
import GraduateModal from "./components/GraduateModal";
import {
  AssignClassroomValidationSchema,
  GraduationModalValidationSchema,
} from "./components/graduateModalValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

import AllocateSeatModal from "./components/AllocateSeatModal";
import { getDiscountList } from "@/services/discountManagementServices";
import { getSubsidyProgramList } from "@/services/subsidyManagementServices";
import {
  createInvoice,
  createInvoicePayment,
} from "@/services/InvoiceManagementServices";
import {
  AddPaymentValidationSchema,
  AllocateSeatValidationSchema,
} from "../feesManagement/ModalComponent/validationSchema";
import AddPayment from "../feesManagement/ModalComponent/AddPayment";

import { ConfirmationModal } from "@/components/common/Modal/ConfirmationModal";
import AssignClassroomModal from "./components/AssignClassroomModal";
import { classroomlist } from "../classroomManagement/classroomManagentAPI";
export type waitlistTableType = {
  id: number;
  ChildName: any;
  Classroom: string;
  ParentName: string;
  RegistrationDate: Date;
  joiningdate: string;
  earliestaval: string;
  status: string;
  reloadTable?: any;
  isOpen?: any;
  setisOpen?: any;
  setApiAction?: any;
};

export type enrolledTableType = {
  id: number;
  childname: any;
  classroom: string;
  parentname: string;
  child_id: number;
  date: Date;
  checkin: string;
  checkout: string;
  reloadTable?: any;
};

const ChildManagementCard = () => {
  let searchparam = useSearchParams();
  let enrolledactive = searchparam?.get("enrolled");
  const [gradmodalopen, setGradModalOpen] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState<string>("");
  const [classroomData, setClassroomData] = useState<
    { value: number | string; label: string }[]
  >([]);
  const [childManagementData, setChildManagementData] = useState<any>([]);
  const [childEnrollData, setChildEnrollData] = useState<any>([]);
  const [waitlistenrollchild, setWaitlistEnrollChild] = useState<any>([]);
  const [waitlistenrollchildexport, setWaitlistEnrollChildExport] =
    useState<any>([]);
  const [childpendingData, setChildpendingData] = useState<any>([]);
  const [allocateseatopen, setAllocateSeatOpen] = useState<boolean>(false);
  const [addpaymentopen, setAddPaymentOpen] = useState<boolean>(false);
  const [openassignclassroom, setOpenAssignClassroom] =
    useState<boolean>(false);
  const [registrationId, setRegistrationId] = useState<string>("");
  const [discountlist, setDiscountList] = useState<
    { value: number | string; label: string }[]
  >([]);
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [apiAction, setApiAction] = useState<any>("");
  const [subsidyprogramlist, setSubsidyProgramlList] = useState<
    { value: number | string; label: string }[]
  >([]);
  const { permission, IsAdmin, globalSettings } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(false);
  let userPermission = permission?.role_detail?.permissions;

  const currentValidationSchema: any = allocateseatopen
    ? AllocateSeatValidationSchema
    : addpaymentopen
      ? AddPaymentValidationSchema
      : openassignclassroom
        ? AssignClassroomValidationSchema
        : GraduationModalValidationSchema;

  const {
    control,
    handleSubmit,
    register,
    setError,
    trigger,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(currentValidationSchema) });
  let router = useRouter();
  let activetab = window?.sessionStorage.getItem("activeTab")
    ? window?.sessionStorage.getItem("activeTab")
    : "pending";
  const [activeTab, setActiveTab] = useState<any>(activetab);
  // const [graduateDate, setGraduateDate] = useState<string>("");
  useEffect(() => {
    sessionStorage.clear();
    window?.sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

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
      }
    } catch (error) { }
  };

  // const enrolledData: enrolledTableType[] = [
  // {
  //   id: 1,
  //   childname: "efwef",
  //   classroom: "Toddler",
  //   parentname: "Casey jimiez",
  //   date: new Date(),
  //   checkin: "",
  //   checkout: "checkout",
  // },
  // ];
  // Default active tab

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const openGradModal = (data: any) => {
    setValue("graduationDate", data?.end_date);
    setGradModalOpen(true);
  };

  const closeGradModal = () => {
    reset();
    setGradModalOpen(false);
  };

  const openAllocateSeatModal = (id: string) => {
    setAllocateSeatOpen(true);
    setRegistrationId(id);
  };

  const closeAllocateSeatModal = () => {
    reset();
    setAllocateSeatOpen(false);
  };

  const openAddPaymentModal = async (row: any) => {
    setAddPaymentOpen(true);
    console.log("rppw", row);
    setValue("paymentInvoiceId", row.id);
    setValue("amountPayment", row.sub_total);
  };

  const closeAddPaymentModal = async () => {
    reset();
    setAddPaymentOpen(false);
  };

  const openAssignClassroomModal = async (data: any) => {
    setOpenAssignClassroom(true);
  };

  const closeAssignClassroomModal = async () => {
    reset();
    setOpenAssignClassroom(false);
  };
  const onFormSubmit = async (data: any) => {
    try {
      let body = {
        graduateDate: data.graduationDate,
      };
      let res = await UpdateGraduationDateofEnrolledChild(enrollmentId, body);

      if (res.success) {
        toast.success(formatMessage(res.message));
        closeGradModal();
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
  };

  // form submit on add invoice
  const onformInvoicesubmit = async (data: any) => {
    try {
      let body = {
        invoiceFor: data.invoiceFor,
        registrationId: Number(registrationId),
        discountId: Number(data.discountId), // optional
        subsidyId: Number(data.subsidyId), // optional
        amount: Number(data.amount), // required
        planName: data.planName,
        planType: data.planType,
        notes: data.notes,
      };
      let result = await createInvoice(body);
      if (result.success) {
        toast.success(formatMessage(result.message));
        // getInvoiceDataList();
        getChildManagementlist();
        closeAllocateSeatModal();
      } else {
        toast.error(result.message);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
  };

  // form submit on add invoice payment
  const onformPaymentsubmit = async (data: any) => {
    setLoading(true)
    try {
      let body = {
        amount: Number(data.amountPayment),
        invoiceId: Number(data.paymentInvoiceId),
        paymentMethod: data.paymentMethod,
        paymentDate: data.paymentDate,
        referenceNumber: data.referenceNumber,
        note: data.note,
        registrationId: registrationId,
      };

      let result = await createInvoicePayment(body);
      if (result.success) {
        toast.success(formatMessage(result.message));
        // getInvoiceDataList();
        getChildManagementlist();
        closeAddPaymentModal();
        setLoading(false)

      } else {
        toast.error(result.message);
        closeAddPaymentModal();
        setLoading(false)
      }
    } catch (err: any) {
      setLoading(false)
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
 
  };

  // approve enrollment function
  const handleApproveEnrollment = async (data: any) => {
    try {
      let body = {
        status: 1,
      };

      if (!data.classroom) {
        toast.error("Please assign classroom first");
      } else {
        let result = await approveEnrollment(body, data.id);
        if (result.success) {
          getWaitlistEnrollmentChild();
          enrolledChildlistlist();
          toast.success(formatMessage(result.message));
        }
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
  };

  // form submit on add invoice payment
  const onFormAssignClassroomSubmit = async (data: any) => {
    try {
      let body = {
        classroomId: Number(data.classroom),
      };
      let result = await assignClassroomEnrollment(body, enrollmentId);
      if (result.success) {
        // toast.success(result.message);
        handleApproveEnrollment(data);
        getWaitlistEnrollmentChild();
        closeAssignClassroomModal();
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
  };

  //  child Registration List
  const getChildManagementlist = async () => {
    setLoading(true);
    let res;
    try {
      res = await childRegistrationList();
      if (res?.success) {
        // console.log(res?.data)
        setChildManagementData(res?.data);
        setLoading(false);
      }
      // console.log(res);
    } catch (error) {
      setLoading(false);
    }
  };

  //   child enrollment List
  const enrolledChildlistlist = async () => {
    setLoading(true);
    let res;
    try {
      let status = "1";
      res = await childEnrollmetnList(status);
      if (res?.success) {
        // console.log(res?.data)
        setChildEnrollData(res?.data);
        setLoading(false);
      }
      // console.log(res);
    } catch (error) {
      setLoading(false);
    }
  };

  // child enrollment waitlist
  //   child enrollment List
  const getWaitlistEnrollmentChild = async () => {
    setLoading(true);
    let res;
    try {
      let status = "0";
      res = await childEnrollmetnList(status);
      if (res?.success) {
        // console.log(res?.data)
        let resarray = res?.data?.map((e: any) => {
          return {
            id: e?.id,
            child_id: e?.child_id,
            parent_id: e?.parent_id,
            ChildName: e?.child,
            name: e?.child?.name,
            classroom: e?.classroom_name,
            ParentName: `${e?.parent?.first_name} ${e?.parent?.last_name}`,
            date: Date_time_conversion(e?.start_date),
            RegistrationDate: Date_time_conversion(e?.created_at),
            checkin: e?.attendance ? e?.attendance?.check_in : null,
            checkout: e?.attendance ? e?.attendance.check_out : null,
            allergy: e?.child?.allergy_details,
            openGradModal: openGradModal,
            setEnrollmentId: setEnrollmentId,
            handleApproveEnrollment: handleApproveEnrollment,
            openAssignClassroomModal: openAssignClassroomModal,
            phoneNo: e?.parent?.phone_no,
            permission: userPermission?.child_management?.add_edit,
          };
        });

        let exportdata = res?.data?.map((e: any) => {
          return {
            id: e?.id,
            child_id: e?.child_id,
            parent_id: e?.parent_id,
            ChildName: e?.child?.name,
            classroom: e?.classroom_name,
            ParentName: `${e?.parent?.first_name} ${e?.parent?.last_name}`,
            RegistrationDate: Date_time_conversion(e?.created_at),
            date: Date_time_conversion(e?.start_date),
            checkin: e?.attendance ? e?.attendance?.check_in : null,
            checkout: e?.attendance ? e?.attendance.check_out : null,
            allergy: e?.child?.allergy_details?.allergies || null,
            phoneNo: e?.parent?.phone_no,
          };
        });
        setWaitlistEnrollChild(resarray || []);
        setWaitlistEnrollChildExport(exportdata || []);
        setLoading(false);
      }
      // console.log(res);
    } catch (error) {
      setLoading(false);
    }
  };
  const pendingChildlistlist = async () => {
    setLoading(true);
    let res;
    try {
      res = await childPendingList();
      if (res?.success) {
        // console.log(res?.data)
        setChildpendingData(res?.data);
        setLoading(false);
      }
      // console.log(res);
    } catch (error) {
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    getChildManagementlist();
    enrolledChildlistlist();
    pendingChildlistlist();
    getWaitlistEnrollmentChild();
    getclassroomlist();
  }, [activeTab]);

  let tableData: any = [];
  let waitListExportData: any = [];
  childManagementData?.map((e: any) => {
    // console.log(e)
    tableData.push({
      id: e?.registration_id,
      child_id: e?.child_id,
      parent_id: e?.parent_id,
      ChildName: e?.child || null,
      name: e?.child?.name,
      Classroom: e?.classroom_name,
      ParentName: `${e?.parents[0]?.first_name} ${e?.parents[0]?.last_name}`,
      RegistrationDate: Date_time_conversion(e?.created_at),
      joiningdate: Date_time_conversion(e?.start_date),
      earliestaval: e?.classroomWithEarliestAvailability,
      isClassroomCapacityFull: e?.isClassroomCapacityFull,
      status: e?.status == 1 ? "Profile Pending" : "Approved",
      phoneNo: e?.child?.parents?.phone_no,
      permission: userPermission?.child_management?.add_edit,
      openAllocateSeatModal: openAllocateSeatModal,
      openAddPaymentModal: openAddPaymentModal,
      invoice: e?.invoice,
      invoice_payments: e?.invoice_payments,
      setRegistrationId: setRegistrationId,
    });

    waitListExportData.push({
      id: e?.registration_id,
      child_id: e?.child_id,
      parent_id: e?.parent_id,
      ChildName: e?.child.name || null,
      Classroom: e?.classroom_name,
      ParentName: `${e?.child?.parents?.first_name} ${e?.child?.parents?.last_name}`,
      RegistrationDate: Date_time_conversion(e?.created_at),
      joiningdate: Date_time_conversion(e?.start_date),
      earliestaval: e?.classroomWithEarliestAvailability,
      status: e?.status == 1 ? "Profile Pending" : "Approved",
      phoneNo: e?.child?.parents?.phone_no,
    });
  });

  console.log("childpendingData : ", childpendingData);

  let PendingData: any = [];
  let exportenrolledData: any = [];
  childpendingData?.map((e: any) => {
    // console.log(e?.child_id)
    PendingData.push({
      id: e?.registration_id,
      child_id: e?.child_id,
      parent_id: e?.parent_id,
      name: e?.child?.name,
      ChildName: e?.child || null,
      Classroom: e?.classroom_name,
      ParentName: `${e?.parents[0]?.first_name} ${e?.parents[0]?.last_name}`,
      RegistrationDate: Date_time_conversion(e?.created_at),
      joiningdate: Date_time_conversion(e?.start_date),
      earliestaval: e?.classroomWithEarliestAvailability || null,
      status: e?.status == 0 ? "Approval Pending" : "Approval Rejected",
      statusId: e?.status,
      reloadTable: pendingChildlistlist,
      phoneNo: e?.child?.parents?.phone_no,
      permission: userPermission?.child_management?.add_edit,
      // permission:userPermission?.child_management
      setisOpen: setisOpen,
      setApiAction: setApiAction,
    });
    exportenrolledData.push({
      id: e?.registration_id,
      child_id: e?.child_id,
      parent_id: e?.parent_id,
      ChildName: e?.child.name || null,
      Classroom: e?.classroom_name,
      ParentName: `${e?.child?.parents?.first_name} ${e?.child?.parents?.last_name}`,
      RegistrationDate: Date_time_conversion(e?.created_at),
      joiningdate: Date_time_conversion(e?.start_date),
      earliestaval: e?.classroomWithEarliestAvailability,
      status: e?.status == 0 ? "Approval Pending" : "Approval Rejected",
      statusId: e?.status,
      phoneNo: e?.child?.parents?.phone_no,
    });
  });

  let enrolledData: any = [];
  let exportPendingData: any = [];
  childEnrollData?.map((e: any) => {
    console.log("e ", e);
    enrolledData.push({
      id: e?.id,
      child_id: e?.child_id,
      parent_id: e?.parent_id,
      ChildName: e?.child,
      name: e?.child?.name,
      classroom: e?.classroom_name,
      ParentName: `${e?.parent?.first_name} ${e?.parent?.last_name}`,
      date: e.start_date,
      checkin: e?.attendance ? e?.attendance?.check_in : null,
      checkout: e?.attendance ? e?.attendance.check_out : null,
      allergy: e?.child?.allergy_details,
      end_date: e?.end_date,
      openGradModal: openGradModal,
      setEnrollmentId: setEnrollmentId,
      phoneNo: e?.parent?.phone_no,
      permission: userPermission?.child_management?.add_edit,
    });
    exportPendingData.push({
      id: e?.id,
      child_id: e?.child_id,
      parent_id: e?.parent_id,
      ChildName: e?.child?.name,
      classroom: e?.classroom_name,
      ParentName: `${e?.parent?.first_name} ${e?.parent?.last_name}`,
      date: e.start_date,
      checkin: e?.attendance ? e?.attendance?.check_in : null,
      checkout: e?.attendance ? e?.attendance.check_out : null,
      allergy: e?.child?.allergy_details?.allergies || null,
      phoneNo: e?.parent?.phone_no,
    });
  });

  const getDiscountListData = async () => {
    try {
      let result = await getDiscountList();

      if (result.success) {
        let resultarr = result.data.list.map((item: any, index: number) => {
          return {
            value: Number(item.DiscountId),
            label: item.DiscountName,
          };
        });
        setDiscountList([
          { value: "", label: "Select Discount" },
          ...resultarr,
        ]);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
  };

  const getSubsidyListData = async () => {
    try {
      let result = await getSubsidyProgramList();
      if (result.success) {
        let resultarr = result.data.list.map((item: any, index: number) => {
          return {
            value: item.subsidyId,
            label: item.subsidyName,
          };
        });
        setSubsidyProgramlList([
          { value: "", label: "Select Subsidy" },
          ...resultarr,
        ]);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getDiscountListData();
    getSubsidyListData();
  }, []);

  const hanldeClose = () => {
    setisOpen(false);
  };
  const hadnleClick = () => {
    HandleStatus(apiAction?.id, apiAction?.status);
  };
  const HandleStatus = async (id: any, status: any) => {
    let body = {
      status: status, // can be 0/1/2
    };
    // console.log(id, status)
    let res;
    try {
      setLoading(true);
      res = await childlistStatus(id, body);
      if (res?.success) {
        setisOpen(false);
        toast.success(formatMessage(res?.message));
        setLoading(false);
        window.location.reload();
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };
  // console.log("registration id", registrationId);
  return (
    <>
      <div
        style={{
          backgroundColor: globalSettings?.backgroundColour || "#ECF2F4",
        }}
        className=" px-8 py-8 min-h-full"
      >
        <div className="flex lg:flex-row lg:items-center lg:justify-start md:flex-col md:justify-center md:items-center ">
          <div className="w-full">
            <TableSwitch
              activeTab={activeTab}
              waitlistdata={tableData}
              enrolledData={enrolledData}
              PendingData={PendingData}
              waitlistenrolldata={waitlistenrollchild}
              handleTabClick={handleTabClick}
            />
          </div>
        </div>

        {loading ? (
          <span className="loader"></span>
        ) : (
          <div className="bg-white rounded-br-2xl rounded-bl-2xl min-h-[32em]">
            {/*  Wait list Table  */}
            {(IsAdmin || userPermission?.child_management?.view) &&
              activeTab === "waitlist" && (
                <ChildManagementTable
                  columns={tableColumn}
                  data={tableData}
                  exportData={waitListExportData}
                />
              )}
            {/* Enrolled table  */}
            {(IsAdmin || userPermission?.child_management?.view) &&
              activeTab === "enrolled" && (
                <ChildManagementTable
                  columns={GetEnrolledTableColumns()}
                  data={enrolledData}
                  exportData={exportenrolledData}
                />
              )}
            {/* Registred Table  */}
            {(IsAdmin || userPermission?.child_management?.view) &&
              activeTab === "pending" && (
                <ChildManagementTable
                  columns={pendingColoum}
                  data={PendingData}
                  exportData={exportPendingData}
                  showStatus={true}
                />
              )}
            {/* Approval table  */}
            {(IsAdmin || userPermission?.child_management?.view) &&
              activeTab === "enrollmentWaitlist" && (
                <ChildManagementTable
                  columns={GetWaitlistEnrollChildColumn()}
                  data={waitlistenrollchild}
                  exportData={waitlistenrollchildexport}
                />
              )}
          </div>
        )}

        {gradmodalopen && (
          <FormModal
            modalOpen={gradmodalopen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeGradModal}
            modalName={"EditDiscountModal"}
            handleSubmit={handleSubmit}
            onformsubmit={onFormSubmit}
          >
            <GraduateModal
              closeModal={closeGradModal}
              register={register}
              control={control}
              error={errors}
            />
          </FormModal>
        )}

        {/* assign classroom modal*/}

        {openassignclassroom && (
          <FormModal
            modalOpen={openassignclassroom}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeAssignClassroomModal}
            modalName={"EditDiscountModal"}
            handleSubmit={handleSubmit}
            onformsubmit={onFormAssignClassroomSubmit}
          >
            <AssignClassroomModal
              closeModal={closeAssignClassroomModal}
              register={register}
              classroomData={classroomData}
              control={control}
              error={errors}
            />
          </FormModal>
        )}
        {/* assign classroom modal*/}

        {allocateseatopen && (
          <FormModal
            modalOpen={allocateseatopen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeAllocateSeatModal}
            modalName={"EditDiscountModal"}
            handleSubmit={handleSubmit}
            onformsubmit={onformInvoicesubmit}
          >
            <AllocateSeatModal
              register={register}
              control={control}
              watch={watch}
              setValue={setValue}
              errors={errors}
              closeModal={closeAllocateSeatModal}
              discountlist={discountlist}
              subsidyprogramlist={subsidyprogramlist}
              loading = {loading}
            />
          </FormModal>
        )}

        {addpaymentopen && (
          <div>
            <FormModal
              modalOpen={addpaymentopen}
              cancelText={"Cancel"}
              AddText={"Add"}
              closeModal={closeAddPaymentModal}
              modalName={"EditDiscountModal"}
              handleSubmit={handleSubmit}
              onformsubmit={onformPaymentsubmit}
            >
              {" "}
              <AddPayment
                control={control}
                register={register}
                closeModal={closeAddPaymentModal}
                errors={errors}
                loading = {loading}
              />
            </FormModal>
          </div>
        )}
        {isOpen && (
          <ConfirmationModal
            title={apiAction?.status == 2 ? "Reject Child" : "Approve Child"}
            content={
              apiAction?.status == 2
                ? "Are you sure you want to reject the child?"
                : "Are you sure you want to approve the child?"
            }
            modalOpen={isOpen}
            handleConfirm={hadnleClick}
            closeModal={() => setisOpen(false)}
            loading={loading}
          />
        )}
      </div>

      {/* {!checkHasPermission('child_management') && <NotPermission/>} */}
      <ToastContainer />
    </>
  );

  // return <ChildProfile />;
};

export default ChildManagementCard;
