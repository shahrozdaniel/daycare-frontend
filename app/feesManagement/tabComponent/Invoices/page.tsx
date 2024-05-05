"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableContainer } from "../../Common.styled";
import { ColumnDef } from "@tanstack/react-table";
import UserTable from "../../components/UserTable";
import { User, columns } from "./columns";
import Image from "next/image";
import Modal from "@/components/common/Modal/Modal";
import AddInvoice from "../../ModalComponent/AddInvoice";
import { useForm } from "react-hook-form";
import InvoiceTable from "../../components/InvoiceTable";
import FormModal from "@/components/common/FormModal";
import {
  createInvoice,
  createInvoicePayment,
  getInvoiceDetails,
  getInvoiceList,
  updateInvoice,
} from "@/services/InvoiceManagementServices";
import { getDiscountList } from "@/services/discountManagementServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Date_time_conversion,
  handleUnauthorizedError,
} from "@/utils/utilityFunctions";
import { useRouter } from "next/navigation";
import { childEnrollmetnList } from "@/services/childrenActionServices";
import { getSubsidyProgramList } from "@/services/subsidyManagementServices";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddInvoiceValidationSchema,
  AddPaymentValidationSchema,
} from "../../ModalComponent/validationSchema";
import moment from "moment";
import { classroomlist } from "@/app/classroomManagement/classroomManagentAPI";
import EditInvoice from "../../ModalComponent/EditInvoice";
import AddPayment from "../../ModalComponent/AddPayment";
interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  //   data: TData[];
}

export default function Invoices() {
  // const data: User[] = [
  //   {
  //     id: "1",
  //     childName: "Henry",
  //     amount: "1200",
  //     payer: "Charles",
  //     classroom: "Toddler",
  //     invoiceDate: "12/12/2023",
  //     dueDate: "15/12/2023",
  //     status: "string",
  //     action: "string",
  //   },
  //   {
  //     id: "1",
  //     childName: "Henry",
  //     amount: "1200",
  //     payer: "Charles",
  //     classroom: "Toddler",
  //     invoiceDate: "12/12/2023",
  //     dueDate: "15/12/2023",
  //     status: "string",
  //     action: "string",
  //   },
  //   {
  //     id: "1",
  //     childName: "Henry",
  //     amount: "1200",
  //     payer: "Charles",
  //     classroom: "Toddler",
  //     invoiceDate: "12/12/2023",
  //     dueDate: "15/12/2023",
  //     status: "string",
  //     action: "string",
  //   },
  //   {
  //     id: "1",
  //     childName: "Henry",
  //     amount: "1200",
  //     payer: "Charles",
  //     classroom: "Toddler",
  //     invoiceDate: "12/12/2023",
  //     dueDate: "15/12/2023",
  //     status: "string",
  //     action: "string",
  //   },
  //   {
  //     id: "1",
  //     childName: "Henry",
  //     amount: "1200",
  //     payer: "Charles",
  //     classroom: "Toddler",
  //     invoiceDate: "12/12/2023",
  //     dueDate: "15/12/2023",
  //     status: "string",
  //     action: "string",
  //   },
  // ];
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalopen, setEditModalOpen] = useState(false);
  const [paymentmodalopen, setPaymentModalOpen] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [classroomData, setclassroomData] = useState<any>([]);
  const [discountlist, setDiscountList] = useState<
    { value: number | string; label: string }[]
  >([]);
  const [childenrolldata, setChildEnrollData] = useState<
    { value: number | string; label: string }[]
  >([]);
  const [subsidyprogramlist, setSubsidyProgramlList] = useState<
    { value: number | string; label: string }[]
  >([]);
  const [invoicedata, setInvoiceData] = useState([]);
  let router = useRouter();

  let validationSchema: any = paymentmodalopen
    ? AddPaymentValidationSchema
    : AddInvoiceValidationSchema;
  const methods = useForm<any>({
    shouldUnregister: false,
    resolver: yupResolver(validationSchema),
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

  //this function will open the add invoice modal
  const openModal = () => {
    setModalOpen(true);
  };

  // this function will close the add invoice modal
  const closeModal = () => {
    reset();
    setModalOpen(false);
  };

  //this function will open the add payment modal
  const openPaymentModal = (row: any) => {
    setValue("paymentInvoiceId", row.id);
    setPaymentModalOpen(true);
  };

  // this function will close the add payment modal
  const closePaymentModal = () => {
    setPaymentModalOpen(false);
  };
  //this function will open the edit invoice modal
  const openEditModal = async (row: any) => {
    setEditModalOpen(true);
    try {
      let res = await getInvoiceDetails(row.id);
      let tempObject = {
        id: res.data.invoice.invoiceId,
        invoiceFor: res.data.invoice.invoiceFor,
        enrollmentId: Number(res.data.invoice.enrollmentId), // required
        discountId: Number(res.data.invoice.discountId), // optional
        subsidyId: Number(res.data.invoice.subsidyId), // optional
        amount: Number(res.data.invoice.totalAmount), // required
        notes: res.data.invoice.notes,
      };
      Object.entries(tempObject).map((key: any) => {
        setValue(key[0], key[1]);
      });
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
    // let objecttemp={
    //   invoiceFor: data.invoiceFor,
    //     enrollmentId: Number(data.enrollmentId), // required
    //     discountId: Number(data.discountId), // optional
    //     subsidyId: Number(data.subsidyId), // optional
    //     amount: Number(data.amount), // required
    //     notes: data.notes,

    // }
  };

  // this function will close the editmodal
  const closeEditModal = () => {
    reset();
    setEditModalOpen(false);
  };

  const getclassroomlist = async () => {
    let res;
    try {
      res = await classroomlist();
      if (res?.success) {
        let resultarr = res?.data?.list.map((item: any) => {
          return {
            id: item?.classroomId,
            name: item?.classroomName,
          };
        });
        setclassroomData(resultarr);
        // setPgination(res?.['data']?.['pagination'])
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
  };

  // form submit on add invoice
  const onformsubmit = async (data: any) => {
    try {
      let body = {
        invoiceFor: data.invoiceFor,
        enrollmentId: Number(data.enrollmentId), // required
        discountId: Number(data.discountId), // optional
        subsidyId: Number(data.subsidyId), // optional
        amount: Number(data.amount), // required
        planName: data.planName,
        planType: data.planType,
        notes: data.notes,
      };
      let result = await createInvoice(body);
      if (result.success) {
        toast.success(result.message);
        getInvoiceDataList();
        closeModal();
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
  // form submit on add invoice
  const onformPaymentsubmit = async (data: any) => {
    try {
      let body = {
        amount: Number(data.amount),
        invoiceId: Number(data.paymentInvoiceId),
        paymentMethod: data.paymentMethod,
        paymentDate: data.paymentDate,
        referenceNumber: data.referenceNumber,
        note: data.note,
      };

      let result = await createInvoicePayment(body);
      if (result.success) {
        toast.success(result.message);
        getInvoiceDataList();
        closePaymentModal();
      } else {
        toast.error(result.message);
        closePaymentModal();
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response.data.message);
    }
  };
  // form submit on edit invoice
  const onformEditsubmit = async (data: any) => {
    try {
      let body = {
        invoiceFor: data.invoiceFor,
        enrollmentId: Number(data.enrollmentId), // required
        discountId: Number(data.discountId), // optional
        subsidyId: Number(data.subsidyId), // optional
        amount: Number(data.amount), // required
        notes: data.notes,
      };
      let result = await updateInvoice(body, data.id);
      if (result.success) {
        toast.success(result.message);
        getInvoiceDataList();
        closeEditModal();
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

  const getenrolledChildlist = async () => {
    try {
      let result = await childEnrollmetnList();

      if (result.success) {
        let resultarrnew = result.data.map((item: any) => {
          return {
            value: item?.id,
            label: item?.child?.name,
          };
        });

        setChildEnrollData([
          { value: "", label: "Select child" },
          ...resultarrnew,
        ]);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err?.response?.data.message);
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
  const getInvoiceDataList = async () => {
    try {
      let res = await getInvoiceList();

      let resarr = res.data.invoices.map((item: any, index: number) => {
        return {
          id: item.invoice.invoiceId,
          childName: item.child,
          amount: item.invoice.totalAmount,
          payer: item.payers,
          classroom: item.child.classroom,
          invoiceDate: moment(item.createdAt).format("MM/DD/YYYY"),
          dueDate: Date_time_conversion(item.invoice.dueDate),
          status: item.invoice.status,
          openEditModal: openEditModal,
          openPaymentModal: openPaymentModal,
        };
      });
      setInvoiceData(resarr);
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(err.response?.data?.message || err.response?.data?.error);
    }
  };

  useEffect(() => {
    getInvoiceDataList();
  }, []);
  // get discount and enrollment id list
  useEffect(() => {
    getDiscountListData();
    getenrolledChildlist();
    getSubsidyListData();
    getclassroomlist();
  }, []);

  return (
    <>
      <InvoiceTable
        columns={columns}
        data={invoicedata}
        openModal={openModal}
        classroomData={classroomData}
      />

      {modalOpen && (
        <div>
          <FormModal
            modalOpen={modalOpen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeModal}
            modalName={"EditDiscountModal"}
            handleSubmit={handleSubmit}
            onformsubmit={onformsubmit}
          >
            {" "}
            <AddInvoice
              register={register}
              control={control}
              watch={watch}
              setValue={setValue}
              errors={errors}
              closeModal={closeModal}
              discountlist={discountlist}
              childenrolldata={childenrolldata}
              subsidyprogramlist={subsidyprogramlist}
            />
          </FormModal>
        </div>
      )}

      {editmodalopen && (
        <div>
          <FormModal
            modalOpen={editmodalopen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closeEditModal}
            modalName={"EditDiscountModal"}
            handleSubmit={handleSubmit}
            onformsubmit={onformEditsubmit}
          >
            {" "}
            <EditInvoice
              register={register}
              control={control}
              errors={errors}
              closeModal={closeEditModal}
              discountlist={discountlist}
              childenrolldata={childenrolldata}
              subsidyprogramlist={subsidyprogramlist}
            />
          </FormModal>
        </div>
      )}

      {paymentmodalopen && (
        <div>
          <FormModal
            modalOpen={paymentmodalopen}
            cancelText={"Cancel"}
            AddText={"Add"}
            closeModal={closePaymentModal}
            modalName={"EditDiscountModal"}
            handleSubmit={handleSubmit}
            onformsubmit={onformPaymentsubmit}
          >
            {" "}
            <AddPayment
              control={control}
              register={register}
              closeModal={closePaymentModal}
              errors={errors}
            />
          </FormModal>
        </div>
      )}
    </>
  );
}
